import React, { PureComponent, cloneElement, isValidElement, CSSProperties } from 'react'
import { tooltipClass } from './styles'
import { scrollConsumer } from '../Scroll/context'
import { getUidStr } from '../utils/uid'
import { getPosition } from '../utils/dom/popover'
import getCommonContainer from '../utils/dom/popContainer'
import { ContainerOptions, ContainerProps, ToolPosition, TriggerType } from './Props'
import { ObjectType } from '../@types/common'
import { getRTLPosition } from '../config'

const DefaultProps = {
  animation: true,
  delay: 0,
  position: 'top' as ToolPosition,
  trigger: 'hover' as TriggerType,
}
export default function(options: ContainerOptions) {
  const { show, hide, move, isCurrent } = options

  class Container extends PureComponent<ContainerProps> {
    static defaultProps = DefaultProps

    id: string

    placeholderElement: HTMLElement

    showTimer: NodeJS.Timeout

    constructor(props: ContainerProps) {
      super(props)
      this.handleShow = this.handleShow.bind(this)
      this.handleDismiss = this.handleDismiss.bind(this)
      this.tryHide = this.tryHide.bind(this)
      this.elementRef = this.elementRef.bind(this)

      this.id = getUidStr()
    }

    componentDidUpdate(prevProps: ContainerProps) {
      if (!move || !isCurrent(this.id)) return

      const { scrollLeft, scrollTop } = this.props
      if (prevProps.scrollLeft !== scrollLeft || prevProps.scrollTop !== scrollTop) {
        const pos = this.getPosition()
        move(this.id, pos)
        this.tryHide()
      }
    }

    componentWillUnmount() {
      hide()
    }

    // eslint-disable-next-line class-methods-use-this
    getContainer() {
      return getCommonContainer()
    }

    getElement() {
      return this.placeholderElement.nextSibling as HTMLElement
    }

    getPosition() {
      const { position = DefaultProps.position } = this.props
      const el = this.getElement()
      return getPosition(getRTLPosition(position) as any, el, this.getContainer())
    }

    elementRef(el: HTMLElement) {
      this.placeholderElement = el
    }

    tryHide() {
      const { scrollElement } = this.props
      const rect = this.getElement().getBoundingClientRect()
      const scrollRect = scrollElement
        ? scrollElement.getBoundingClientRect()
        : { top: 0, bottom: 0, left: 0, right: 0 }

      if (
        rect.bottom < scrollRect.top ||
        rect.top > scrollRect.bottom ||
        rect.right < scrollRect.left ||
        rect.left > scrollRect.right
      ) {
        hide()
      }
    }

    handleShow() {
      if (this.showTimer) clearTimeout(this.showTimer)
      const { delay } = this.props
      if (!delay) {
        this.showSync()
      } else {
        this.showTimer = setTimeout(() => {
          this.showSync()
        }, delay)
      }
    }

    handleDismiss() {
      clearTimeout(this.showTimer)
      hide()
    }

    showSync() {
      const pos = this.getPosition()
      type PosType = typeof pos
      const style = Object.keys(pos).reduce(
        (data, key: keyof PosType) => {
          data[key] = pos[key]
          return data
        },
        {} as CSSProperties
      )
      const props = Object.assign({}, this.props, { style, position: getRTLPosition(this.props.position) })
      show(props, this.id, this.props.style, getCommonContainer())
    }

    render() {
      const { children, trigger, disabledChild, tip } = this.props

      if (!isValidElement(children)) {
        console.error(new Error('Tooltip children expect a single ReactElement.'))
        return null
      }

      if (!tip) return children

      const inner = disabledChild ? (
        <span className={tooltipClass('disabled-wrapper')} style={{ cursor: 'not-allowed' }}>
          {cloneElement(children, { style: { ...children.props.style, pointerEvents: 'none' } })}
        </span>
      ) : (
        children
      )

      const props: ObjectType = { key: 'el' }
      if (trigger === 'hover') {
        props.onMouseEnter = this.handleShow
        props.onMouseLeave = this.handleDismiss
      } else {
        props.onClick = (e: Event) => {
          if (e) e.stopPropagation()
          setTimeout(this.handleShow, 10)
          if (children.props.onClick) children.props.onClick()
        }
      }

      return [<noscript ref={this.elementRef} key="ns" />, cloneElement(inner, props)]
    }
  }

  return scrollConsumer(Container)
}
