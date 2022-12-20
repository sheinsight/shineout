import React from 'react'
import classnames from 'classnames'
import immer from 'immer'
import { getKey } from '../utils/uid'
import normalizeWheel from '../utils/dom/normalizeWheel'
import ScrollBar from '../Scroll/Bar'
import { menuClass } from './styles'
import List from './List'
import { Provider } from './context'
import { isArray } from '../utils/is'
import { isRTL } from '../config'
import { Component } from '../component'
import { RootProps, WH, Position, Direction, Mode } from './Props'

interface State {
  hasOpen?: boolean
  scrollTop: number
  scrollLeft: number
  activeKey: null | string
  openKeys: Map<string, boolean>
}

export const DefaultProps = {
  data: [],
  level: 0,
  keygen: 'id',
  mode: 'inline',
  inlineIndent: 24,
  renderItem: 'title',
  defaultOpenKeys: [],
  onClick: () => true,
  toggleDuration: 200,
  frontCaretType: 'solid',
  style: {},
  disabled: (d: { disabled: boolean }) => d.disabled,
}

const modeDirection: {
  inline?: string
  vertical?: string
  horizontal?: string
  'vertical-auto'?: string
} = {
  'vertical-auto': 'y',
  vertical: 'y',
  horizontal: 'x',
}

const getOption = (
  mode: Mode
): {
  key: WH
  pos: Position
  direction: Direction
} =>
  mode.indexOf('vertical') === 0
    ? {
        key: 'height',
        pos: 'Top',
        direction: 'Y',
      }
    : {
        key: 'width',
        pos: 'Left',
        direction: 'X',
      }

function keyToMap<T>(keys: T[] = [], value = true) {
  const keyMap = new Map()
  keys.forEach(v => {
    keyMap.set(v, value)
  })
  return keyMap
}

// function isSubMenu(el) {
//   if (el.matches(`.${menuClass('sub')}`)) return true
//   if (!el.parentElement) return false
//   return isSubMenu(el.parentElement)
// }

class Root<U, T extends string> extends Component<RootProps<U, T>, State> {
  static defaultProps = DefaultProps

  static displayName: string

  handleScrollLeft: any

  handleScrollTop: any

  items: {
    [id: string]: <F, K>(checkActive: F, key: K) => void
  }

  itemsOpen: {
    [id: string]: <F>(checkOpen: F) => void
  }

  itemsInPath: {
    [id: string]: <F>(checkInPath: F) => void
  }

  providerValue: {
    bindItem: <Active, Open, InPath>(id: string, active: Active, open: Open, inPath: InPath) => [Active, Open, InPath]
    unbindItem: (id: string) => void
  }

  container: HTMLDivElement

  hasToggled: boolean

  wrapper: HTMLDivElement

  rootElement: HTMLUListElement

  constructor(props: RootProps<U, T>) {
    super(props)

    this.state = {
      activeKey: null,
      scrollTop: 0,
      scrollLeft: 0,
      openKeys: keyToMap(props.defaultOpenKeys),
    }

    this.checkOpen = this.checkOpen.bind(this)
    this.checkActive = this.checkActive.bind(this)
    this.checkInPath = this.checkInPath.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleScrollLeft = this.handleScrollX.bind(this, 'Left')
    this.handleScrollTop = this.handleScrollX.bind(this, 'Top')
    this.handleScroll = this.handleScroll.bind(this)
    this.handleWheel = this.handleWheel.bind(this)
    this.renderItem = this.renderItem.bind(this)
    this.bindRootElement = this.bindRootElement.bind(this)
    this.toggleOpenKeys = this.toggleOpenKeys.bind(this)
    this.providerValue = {
      bindItem: this.bindItem.bind(this),
      unbindItem: this.unbindItem.bind(this),
    }

    this.items = {}
    this.itemsOpen = {}
    this.itemsInPath = {}
  }

  componentDidMount() {
    super.componentDidMount()
    this.updateState()
  }

  componentDidUpdate() {
    this.updateState()
  }

  componentWillUnmount() {
    this.container.removeEventListener('wheel', this.handleWheel)
    super.componentWillUnmount()
  }

  getOpenKeys() {
    const { openKeys, defaultOpenKeys } = this.props
    if (openKeys) return openKeys
    return this.hasToggled ? Array.from(this.state.openKeys.keys()) : defaultOpenKeys
  }

  bindRootElement(el: HTMLDivElement) {
    this.container = el
    if (!el) return
    this.wrapper = el.querySelector(`.${menuClass('wrapper')}`)!
    this.rootElement = el.querySelector(`.${menuClass('root')}`)!
  }

  bindItem(id: string, updateActive: () => void, updateOpen: () => void, updateInPath: () => void) {
    this.items[id] = updateActive
    this.itemsOpen[id] = updateOpen
    this.itemsInPath[id] = updateInPath
    return [this.checkActive, this.checkOpen, this.checkInPath]
  }

  unbindItem(id: string) {
    delete this.items[id]
    delete this.itemsOpen[id]
    delete this.itemsInPath[id]
  }

  checkActive(id: string, data: U) {
    const { active } = this.props
    const act = typeof active === 'function' ? active(data) : id === this.state.activeKey
    // @ts-ignore 历史原因，待优化
    if (act) this.state.activeKey = id
    if (!act && this.state.activeKey === id) {
      // @ts-ignore 历史原因，待优化
      this.state.activeKey = ''
    }
    return act
  }

  checkOpen(id: string) {
    const openKeys = this.getOpenKeys()
    if (isArray(openKeys)) {
      return openKeys.indexOf(id) > -1
    }
    return false
  }

  checkInPath(id: string) {
    const { activeKey } = this.state
    if (!activeKey || !id) return false
    return activeKey.indexOf(id) >= 0
  }

  updateState() {
    const { mode } = this.props
    this.updateActive()
    this.updateOpen()
    this.updateInPath()
    if (!this.container) return
    const bindMethod = mode !== 'inline' ? this.container.addEventListener : this.container.removeEventListener
    bindMethod.call(this.container, 'wheel', this.handleWheel, { passive: false })
  }

  updateActive() {
    Object.keys(this.items).forEach(id => {
      const update = this.items[id]
      update(this.checkActive, this.state.activeKey)
    })
  }

  updateOpen() {
    const { data, keygen } = this.props
    Object.keys(this.itemsOpen).forEach(id => {
      const update = this.itemsOpen[id]
      update(this.checkOpen)
    })
    const hasOpen = this.getOpenKeys()!.filter(k => data!.find((d, i) => getKey(d, keygen, i) === k)).length > 0
    if (hasOpen !== this.state.hasOpen) {
      this.setState({ hasOpen })
    }
  }

  updateInPath() {
    Object.keys(this.itemsInPath).forEach(id => {
      const update = this.itemsInPath[id]
      update(this.checkInPath)
    })
  }

  toggleOpenKeys(id: string, open: boolean) {
    const newOpenKeys = immer(keyToMap(this.getOpenKeys()), draft => {
      if (open) {
        draft.set(id, true)
      } else draft.delete(id)
    })
    this.hasToggled = true
    const keys = Array.from(newOpenKeys.keys())
    const { onOpenChange = () => {}, openKeys } = this.props
    if (openKeys) {
      onOpenChange(keys)
      return
    }
    this.setState({ openKeys: newOpenKeys, hasOpen: keys.length > 0 })
    onOpenChange(keys)
  }

  handleScrollX(pos: Position, param: number) {
    const sizeKey = pos === 'Top' ? 'height' : 'width'
    const size = this.container.getBoundingClientRect()[sizeKey]
    const scroll = this.rootElement.getBoundingClientRect()[sizeKey]
    this.wrapper[`scroll${pos}`] = param * (scroll - size)
    this.setState({ [`scroll${pos}`]: param })
  }

  handleScroll(top: number) {
    const { height } = this.container.getBoundingClientRect()
    const scrollHeight = this.rootElement.getBoundingClientRect().height
    this.wrapper.scrollTop = top * (scrollHeight - height)
    this.setState({ scrollTop: top })
  }

  handleWheel(
    e: WheelEvent & {
      axis: number
      wheelDelta: number
      wheelDeltaY: number
      wheelDeltaX: number
      HORIZONTAL_AXIS: number
    }
  ) {
    // if (isSubMenu(e.target)) return
    const { mode } = this.props
    const { key, pos, direction } = getOption(mode)
    const wheel = normalizeWheel(e)
    const size = this.container.getBoundingClientRect()[key]
    // const size = this.rootElement.getBoundingClientRect()[key] - this.container.getBoundingClientRect()[key]
    this.wrapper[`scroll${pos}`] += wheel[`pixel${direction}`]
    const precent = this.wrapper[`scroll${pos}`] / size
    this.setState({ [`scroll${pos}`]: precent > 1 ? 1 : precent })
    // this.setState({ [`scroll${pos}`]: size === 0 ? 0 : this.wrapper[`scroll${pos}`] / size })
    e.preventDefault()
  }

  handleClick(id: string, data: U) {
    const { onClick } = this.props
    this.setState({ activeKey: id })
    if (onClick) onClick(data)
  }

  renderItem(data: U, index: number) {
    const { renderItem } = this.props
    if (typeof renderItem === 'string') return data[renderItem as keyof typeof data]
    if (typeof renderItem === 'function') return renderItem(data, index)
    return null
  }

  renderScrollBar() {
    if (!this.rootElement || !this.container) return null

    const { mode } = this.props
    const direction = modeDirection[mode]

    if (!direction) return null

    if (direction === 'x') {
      const { width } = this.container.getBoundingClientRect()
      const scrollWidth = this.rootElement.getBoundingClientRect().width
      if (scrollWidth <= width) return null

      return (
        <ScrollBar
          className={menuClass('bar')}
          length={width}
          scrollLength={scrollWidth}
          offset={this.state.scrollLeft}
          onScroll={this.handleScrollLeft}
          direction="x"
        />
      )
    }

    const length = this.container.getBoundingClientRect().height
    const scrollHeight = this.rootElement.getBoundingClientRect().height
    if (scrollHeight < length) return null

    return (
      <ScrollBar
        className={menuClass('bar')}
        forceHeight={length}
        length={length}
        scrollLength={scrollHeight}
        offset={this.state.scrollTop}
        onScroll={this.handleScrollTop}
      />
    )
  }

  render() {
    const {
      data,
      mode,
      style,
      theme,
      height,
      keygen,
      linkKey,
      disabled,
      caretColor,
      frontCaret,
      inlineIndent,
      looseChildren,
      frontCaretType,
      toggleDuration,
      parentSelectable,
    } = this.props
    const isVertical = mode.indexOf('vertical') === 0
    const showScroll = (((style && style.height) || height) && isVertical) || mode === 'horizontal'

    const rtl = isRTL()

    const className = classnames(
      menuClass(
        '_',
        isVertical ? 'vertical' : mode,
        theme === 'dark' && 'dark',
        showScroll && 'scroll',
        this.state.hasOpen && 'has-open',
        rtl && 'rtl'
      ),
      this.props.className
    )

    const rootStyle: React.CSSProperties = {}
    if (style && style.width && mode !== 'horizontal') rootStyle.width = style.width

    let bottomLine = 0
    let topLine = 0
    if (this.container) {
      const rect = this.container.getBoundingClientRect()
      bottomLine = rect.bottom
      topLine = rect.top
    }

    return (
      <div className={className} ref={this.bindRootElement} style={{ ...style, height }}>
        <div className={menuClass('wrapper')}>
          <Provider value={this.providerValue}>
            <List
              path=""
              level={0}
              mode={mode}
              data={data}
              keygen={keygen}
              style={rootStyle}
              topLine={topLine}
              linkKey={linkKey}
              disabled={disabled}
              frontCaret={frontCaret}
              bottomLine={bottomLine}
              caretColor={caretColor}
              onClick={this.handleClick}
              inlineIndent={inlineIndent}
              renderItem={this.renderItem}
              className={menuClass('root')}
              looseChildren={looseChildren}
              frontCaretType={frontCaretType}
              toggleDuration={toggleDuration}
              parentSelectable={parentSelectable}
              toggleOpenKeys={this.toggleOpenKeys}
            />
          </Provider>
        </div>

        {showScroll && this.renderScrollBar()}
      </div>
    )
  }
}

export default Root
