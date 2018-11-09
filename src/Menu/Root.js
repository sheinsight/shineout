import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { defaultProps, getProps } from '../utils/proptypes'
import normalizeWheel from '../utils/dom/normalizeWheel'
import ScrollBar from '../Scroll/Bar'
import { menuClass } from '../styles'
import List from './List'
import { Provider } from './context'

class Root extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      activeKey: null,
      scrollTop: 0,
    }

    this.checkActive = this.checkActive.bind(this)
    this.handleClick = this.handleClick.bind(this)
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
    this.openKeys = {}
  }

  componentDidMount() {
    this.updateActive()
  }

  componentDidUpdate() {
    this.updateActive()
  }

  bindRootElement(el) {
    this.container = el
    if (!el) return
    this.wrapper = el.querySelector(`.${menuClass('wrapper')}`)
    this.rootElement = el.querySelector(`.${menuClass('root')}`)
  }

  bindItem(id, update) {
    this.items[id] = update
    return this.checkActive
  }

  unbindItem(id) {
    delete this.items[id]
  }

  checkActive(id, data) {
    const { active } = this.props
    if (typeof active === 'function') {
      return active(data)
    }
    return id === this.state.activeKey
  }

  updateActive() {
    Object.keys(this.items).forEach((id) => {
      const update = this.items[id]
      update(this.checkActive, this.state.activeKey)
    })
  }

  toggleOpenKeys(id, open) {
    if (open) this.openKeys[id] = true
    else delete this.openKeys[id]

    const hasOpen = Object.keys(this.openKeys).length > 0
    this.setState({ hasOpen })
  }

  handleScroll(top) {
    const { height } = this.container.getBoundingClientRect()
    const scrollHeight = this.rootElement.getBoundingClientRect().height
    this.wrapper.scrollTop = top * (scrollHeight - height)
    this.setState({ scrollTop: top })
  }

  handleWheel(e) {
    const wheel = normalizeWheel(e)
    const { height } = this.container.getBoundingClientRect()
    this.wrapper.scrollTop += wheel.pixelY
    this.setState({ scrollTop: this.wrapper.scrollTop / height })
    e.preventDefault()
  }

  handleClick(id, data) {
    const { onClick } = this.props
    this.setState({ activeKey: id })
    if (onClick) onClick(data)
  }

  renderItem(data) {
    const { renderItem } = this.props
    if (typeof renderItem === 'string') return data[renderItem]
    else if (typeof renderItem === 'function') return renderItem(data)
    return null
  }

  renderScrollBar() {
    if (!this.rootElement || !this.container) return null

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
        onScroll={this.handleScroll}
      />
    )
  }

  render() {
    const {
      keygen, data, mode, style, theme, defaultOpenKeys, inlineIndent, disabled, height,
    } = this.props

    const showScroll = (style.height || height) && mode === 'vertical'

    const className = classnames(
      menuClass(
        '_',
        mode,
        theme === 'dark' && 'dark',
        showScroll && 'scroll',
        this.state.hasOpen && 'has-open',
      ),
      this.props.className,
    )

    const rootStyle = {}
    if (style.width) rootStyle.width = style.width

    let bottomLine = 0
    if (showScroll && this.container) {
      bottomLine = this.container.getBoundingClientRect().bottom
    }

    return (
      <div
        className={className}
        onWheel={this.handleWheel}
        ref={this.bindRootElement}
        style={style}
      >
        <div className={menuClass('wrapper')}>
          <Provider value={this.providerValue}>
            <List
              className={menuClass('root')}
              data={data}
              defaultOpenKeys={defaultOpenKeys}
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
            />
          </Provider>
        </div>

        { showScroll && this.renderScrollBar() }
      </div>
    )
  }
}

Root.propTypes = {
  ...getProps(PropTypes, 'style', 'keygen'),
  active: PropTypes.func,
  data: PropTypes.array,
  defaultOpenKeys: PropTypes.array,
  disabled: PropTypes.func,
  inlineIndent: PropTypes.number,
  mode: PropTypes.oneOf(['inline', 'vertical', 'horizontal']),
  onClick: PropTypes.func,
  renderItem: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),
  scroll: PropTypes.bool,
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
}

export default Root
