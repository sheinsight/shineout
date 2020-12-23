import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import immer from 'immer'
import { getKey } from '../utils/uid'
import { defaultProps, getProps } from '../utils/proptypes'
import normalizeWheel from '../utils/dom/normalizeWheel'
import ScrollBar from '../Scroll/Bar'
import { menuClass } from '../styles'
import List from './List'
import { Provider } from './context'
import { isArray } from '../utils/is'
import { isRTL } from '../config'

const modeDirection = {
  'vertical-auto': 'y',
  vertical: 'y',
  horizontal: 'x',
}

const getOption = mode =>
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

function keyToMap(keys = [], value = true) {
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

class Root extends React.Component {
  constructor(props) {
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
    this.updateState()
  }

  componentDidUpdate() {
    this.updateState()
  }

  componentWillUnmount() {
    this.container.removeEventListener('wheel', this.handleWheel)
  }

  getOpenKeys() {
    const { openKeys, defaultOpenKeys } = this.props
    if (openKeys) return openKeys
    return this.hasToggled ? Array.from(this.state.openKeys.keys()) : defaultOpenKeys
  }

  bindRootElement(el) {
    this.container = el
    if (!el) return
    this.wrapper = el.querySelector(`.${menuClass('wrapper')}`)
    this.rootElement = el.querySelector(`.${menuClass('root')}`)
  }

  bindItem(id, updateActive, updateOpen, updateInPath) {
    this.items[id] = updateActive
    this.itemsOpen[id] = updateOpen
    this.itemsInPath[id] = updateInPath
    return [this.checkActive, this.checkOpen, this.checkInPath]
  }

  unbindItem(id) {
    delete this.items[id]
    delete this.itemsOpen[id]
    delete this.itemsInPath[id]
  }

  checkActive(id, data) {
    const { active } = this.props
    const act = typeof active === 'function' ? active(data) : id === this.state.activeKey
    if (act) this.state.activeKey = id
    return act
  }

  checkOpen(id) {
    const openKeys = this.getOpenKeys()
    if (isArray(openKeys)) {
      return openKeys.indexOf(id) > -1
    }
    return false
  }

  checkInPath(id) {
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
    const hasOpen = this.getOpenKeys().filter(k => data.find((d, i) => getKey(d, keygen, i) === k)).length > 0
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

  toggleOpenKeys(id, open) {
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

  handleScrollX(pos, param) {
    const sizeKey = pos === 'Top' ? 'height' : 'width'
    const size = this.container.getBoundingClientRect()[sizeKey]
    const scroll = this.rootElement.getBoundingClientRect()[sizeKey]
    this.wrapper[`scroll${pos}`] = param * (scroll - size)
    this.setState({ [`scroll${pos}`]: param })
  }

  handleScroll(top) {
    const { height } = this.container.getBoundingClientRect()
    const scrollHeight = this.rootElement.getBoundingClientRect().height
    this.wrapper.scrollTop = top * (scrollHeight - height)
    this.setState({ scrollTop: top })
  }

  handleWheel(e) {
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

  handleClick(id, data) {
    const { onClick } = this.props
    this.setState({ activeKey: id })
    if (onClick) onClick(data)
  }

  renderItem(data, index) {
    const { renderItem } = this.props
    if (typeof renderItem === 'string') return data[renderItem]
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
      keygen,
      data,
      mode,
      style,
      theme,
      inlineIndent,
      linkKey,
      disabled,
      height,
      toggleDuration,
      frontCaret,
    } = this.props
    const isVertical = mode.indexOf('vertical') === 0
    const showScroll = ((style.height || height) && isVertical) || mode === 'horizontal'

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

    const rootStyle = {}
    if (style.width && mode !== 'horizontal') rootStyle.width = style.width

    let bottomLine = 0
    let topLine = 0
    if (this.container) {
      const rect = this.container.getBoundingClientRect()
      bottomLine = rect.bottom
      topLine = rect.top
    }

    return (
      <div className={className} ref={this.bindRootElement} style={style}>
        <div className={menuClass('wrapper')}>
          <Provider value={this.providerValue}>
            <List
              className={menuClass('root')}
              data={data}
              disabled={disabled}
              inlineIndent={inlineIndent}
              keygen={keygen}
              level={0}
              mode={mode}
              onClick={this.handleClick}
              path=""
              renderItem={this.renderItem}
              open
              style={rootStyle}
              toggleOpenKeys={this.toggleOpenKeys}
              bottomLine={bottomLine}
              topLine={topLine}
              linkKey={linkKey}
              toggleDuration={toggleDuration}
              frontCaret={frontCaret}
            />
          </Provider>
        </div>

        {showScroll && this.renderScrollBar()}
      </div>
    )
  }
}

Root.propTypes = {
  ...getProps(PropTypes, 'style', 'keygen'),
  active: PropTypes.func,
  data: PropTypes.array,
  defaultOpenKeys: PropTypes.array,
  openKeys: PropTypes.array,
  disabled: PropTypes.func,
  inlineIndent: PropTypes.number,
  mode: PropTypes.oneOf(['inline', 'vertical', 'horizontal', 'vertical-auto']),
  onClick: PropTypes.func,
  renderItem: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  onOpenChange: PropTypes.func,
  toggleDuration: PropTypes.number,
  frontCaret: PropTypes.bool,
}

Root.defaultProps = {
  ...defaultProps,
  data: [],
  disabled: d => d.disabled,
  level: 0,
  keygen: 'id',
  mode: 'inline',
  inlineIndent: 24,
  active: () => false,
  renderItem: 'title',
  defaultOpenKeys: [],
  onClick: () => true,
  toggleDuration: 200,
}

export default Root
