import React, { PureComponent } from 'react'
import classnames from 'classnames'
import { WatermarkFont, WatermarkProps } from './Props'
import { drawWatermark as drawWatermarkTile, getContentLines, getMarkSize, getStyleString, mergeFont } from './utils'
import { watermarkClass } from './styles'
import WatermarkContext, { DisabledWatermarkContext } from './context'

const DefaultFont: Required<WatermarkFont> = {
  color: 'rgba(0, 0, 0, 0.15)',
  fontSize: 16,
  fontWeight: 'normal',
  fontStyle: 'normal',
  fontFamily: 'sans-serif',
  textAlign: 'center',
}

const DefaultProps: Required<Pick<WatermarkProps, 'rotate' | 'zIndex' | 'gap' | 'inherit'>> = {
  rotate: -22,
  zIndex: 999,
  gap: [100, 100],
  inherit: true,
}

const DrawingProps: (keyof WatermarkProps)[] = [
  'content',
  'image',
  'width',
  'height',
  'rotate',
  'zIndex',
  'gap',
  'offset',
  'font',
]

const ObserverOptions: MutationObserverInit = {
  attributes: true,
  childList: true,
  subtree: true,
  attributeFilter: ['style', 'class', 'hidden', 'aria-hidden'],
}

class Watermark extends PureComponent<WatermarkProps> {
  static defaultProps = DefaultProps

  static displayName = 'ShineoutWatermark'

  container: HTMLDivElement | null = null

  targets = new Set<HTMLElement>()

  watermarks = new Map<HTMLElement, HTMLDivElement>()

  watermarkStyle = ''

  observer: MutationObserver | null = null

  renderToken = 0

  watermarkContext = {
    add: (element: HTMLElement) => this.addTarget(element),
    remove: (element: HTMLElement) => this.removeTarget(element),
  }

  componentDidMount() {
    if (this.container) this.targets.add(this.container)
    this.drawWatermark()
    this.observeTargets()
  }

  componentDidUpdate(prevProps: WatermarkProps) {
    if (DrawingProps.some(key => prevProps[key] !== this.props[key])) this.drawWatermark()
  }

  componentWillUnmount() {
    this.renderToken += 1
    if (this.observer) this.observer.disconnect()
    this.observer = null
    this.watermarks.forEach(watermark => {
      if (watermark.parentNode) watermark.parentNode.removeChild(watermark)
    })
    this.watermarks.clear()
    this.targets.clear()
    this.container = null
  }

  saveContainer = (container: HTMLDivElement | null) => {
    this.container = container
  }

  addTarget(element: HTMLElement) {
    if (this.targets.has(element)) return
    this.targets.add(element)
    if (this.watermarkStyle) this.appendWatermark(element)
    if (this.observer) this.observer.observe(element, ObserverOptions)
  }

  removeTarget(element: HTMLElement) {
    if (!this.targets.has(element)) return
    if (this.observer) this.observer.disconnect()
    const watermark = this.watermarks.get(element)
    this.watermarks.delete(element)
    this.targets.delete(element)
    if (watermark && watermark.parentNode === element) element.removeChild(watermark)
    this.observeTargets()
  }

  observeTargets() {
    if (typeof MutationObserver === 'undefined') return
    if (!this.observer) this.observer = new MutationObserver(this.handleMutations)
    this.observer.disconnect()
    this.targets.forEach(target => this.observer!.observe(target, ObserverOptions))
  }

  handleMutations = (mutations: MutationRecord[]) => {
    const restoreTargets = new Set<HTMLElement>()
    let removed = false
    mutations.forEach(mutation => {
      this.watermarks.forEach((watermark, target) => {
        if (mutation.type === 'childList' && Array.from(mutation.removedNodes).includes(watermark)) {
          removed = true
          restoreTargets.add(target)
        }
        if (mutation.type === 'childList' && mutation.target === watermark) restoreTargets.add(target)
        if (mutation.type === 'attributes' && mutation.target === watermark) restoreTargets.add(target)
      })
    })

    restoreTargets.forEach(target => this.restoreWatermark(target))
    if (removed) {
      const { onRemove } = this.props
      if (onRemove) onRemove()
    }
  }

  restoreWatermark(target: HTMLElement) {
    const watermark = this.watermarks.get(target)
    const { watermarkStyle } = this
    if (!watermark || !watermarkStyle) return
    if (watermark.getAttribute('style') !== watermarkStyle) watermark.setAttribute('style', watermarkStyle)
    if (watermark.hasAttribute('class')) watermark.removeAttribute('class')
    if (watermark.hasAttribute('hidden')) watermark.removeAttribute('hidden')
    if (watermark.getAttribute('aria-hidden') !== 'true') watermark.setAttribute('aria-hidden', 'true')
    while (watermark.firstChild) watermark.removeChild(watermark.firstChild)
    if (watermark.parentNode !== target) target.appendChild(watermark)
  }

  drawWatermark() {
    if (!this.container) return
    const {
      content,
      image,
      font = {},
      width,
      height,
      rotate = DefaultProps.rotate,
      gap = DefaultProps.gap,
      offset,
      zIndex = DefaultProps.zIndex,
    } = this.props
    const mergedFont = mergeFont(DefaultFont, font)
    const lines = getContentLines(content, mergedFont)
    const measureCanvas = document.createElement('canvas')
    const measureContext = measureCanvas.getContext('2d')
    if (!measureContext) return
    const [markWidth, markHeight] = getMarkSize(measureContext, lines, image, width, height)
    const ratio = window.devicePixelRatio || 1
    const renderToken = this.renderToken + 1
    this.renderToken = renderToken
    const renderContent = (drawContent: typeof lines | HTMLImageElement) => {
      if (renderToken !== this.renderToken || !this.container) return false
      try {
        const result = drawWatermarkTile(drawContent, rotate, ratio, markWidth, markHeight, gap[0], gap[1])
        if (!result) return false
        this.applyWatermark(result, gap, offset, zIndex)
        return true
      } catch (error) {
        return false
      }
    }

    if (image) {
      const imageElement = new Image()
      imageElement.onload = () => {
        if (!renderContent(imageElement)) renderContent(lines)
      }
      imageElement.onerror = () => renderContent(lines)
      imageElement.crossOrigin = 'anonymous'
      imageElement.referrerPolicy = 'no-referrer'
      imageElement.src = image
    } else {
      renderContent(lines)
    }
  }

  applyWatermark(
    result: { dataURL: string; width: number },
    gap: [number, number],
    offset: [number, number] | undefined,
    zIndex: number
  ) {
    const gapXCenter = gap[0] / 2
    const gapYCenter = gap[1] / 2
    let positionLeft = (offset ? offset[0] : gapXCenter) - gapXCenter
    let positionTop = (offset ? offset[1] : gapYCenter) - gapYCenter
    let left = 0
    let top = 0
    let overlayWidth = '100%'
    let overlayHeight = '100%'
    if (positionLeft > 0) {
      left = positionLeft
      overlayWidth = `calc(100% - ${positionLeft}px)`
      positionLeft = 0
    }
    if (positionTop > 0) {
      top = positionTop
      overlayHeight = `calc(100% - ${positionTop}px)`
      positionTop = 0
    }

    const watermarkStyle = getStyleString({
      position: 'absolute',
      left: `${left}px`,
      top: `${top}px`,
      width: overlayWidth,
      height: overlayHeight,
      zIndex,
      pointerEvents: 'none',
      backgroundRepeat: 'repeat',
      backgroundImage: `url('${result.dataURL}')`,
      backgroundSize: `${Math.floor(result.width)}px`,
      backgroundPosition: `${positionLeft}px ${positionTop}px`,
    })
    this.watermarkStyle = watermarkStyle
    this.targets.forEach(target => this.appendWatermark(target))
  }

  appendWatermark(target: HTMLElement) {
    let watermark = this.watermarks.get(target)
    if (!watermark) {
      watermark = document.createElement('div')
      this.watermarks.set(target, watermark)
    }
    watermark.setAttribute('style', this.watermarkStyle)
    watermark.removeAttribute('class')
    watermark.removeAttribute('hidden')
    watermark.setAttribute('aria-hidden', 'true')

    if (watermark.parentNode !== target) target.appendChild(watermark)
  }

  render() {
    const { children, className, style, inherit = DefaultProps.inherit } = this.props
    const contextValue = inherit ? this.watermarkContext : DisabledWatermarkContext
    return (
      <div ref={this.saveContainer} className={classnames(watermarkClass('_'), className)} style={style}>
        <WatermarkContext.Provider value={contextValue}>{children}</WatermarkContext.Provider>
      </div>
    )
  }
}

export default Watermark
