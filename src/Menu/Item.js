import React, { cloneElement } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { PureComponent } from '../component'
import { getKey, getUidStr } from '../utils/uid'
import { menuClass } from '../styles'
import List from './List'
import { consumer } from './context'
import { isLink } from '../utils/is'
import { isRTL } from '../config'

const getBaseIndent = (flag = false) => (flag ? 16 : 20)

const calcIndent = (flag, indent) => {
  if (!flag) return indent
  return Math.ceil((indent / 3) * 2)
}

class Item extends PureComponent {
  constructor(props) {
    super(props)

    this.id = `${props.path},${getUidStr()}`
    const key = this.getKey(props)
    const [activeUpdate, openUpdate, inPathUpdate] = props.bindItem(
      this.id,
      this.update.bind(this),
      this.updateOpen.bind(this),
      this.updateInPath.bind(this)
    )

    this.state = {
      open: openUpdate(key),
      isActive: activeUpdate(this.id, props.data),
      inPath: inPathUpdate(this.id),
      isHighLight: false,
    }

    this.bindElement = this.bindElement.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleSwitch = this.handleSwitch.bind(this)
    this.handleMouseEnter = this.handleToggle.bind(this, true)
    this.handleMouseLeave = this.handleToggle.bind(this, false)
    this.renderLink = this.renderLink.bind(this)
  }

  componentWillUnmount() {
    super.componentWillUnmount()
    this.props.unbindItem(this.id)
    this.unbindDocumentEvent()
  }

  getKey(props = this.props) {
    return getKey(props.data, props.keygen, props.index)
  }

  getCalcStyle() {
    const style = {}
    const { frontCaret, level, inlineIndent, mode } = this.props

    const rtl = isRTL()

    if (mode !== 'inline') return style

    const indent = calcIndent(frontCaret, inlineIndent)

    if (rtl) {
      style.paddingRight = getBaseIndent(frontCaret) + level * indent
    } else {
      style.paddingLeft = getBaseIndent(frontCaret) + level * indent
    }

    return style
  }

  bindElement(el) {
    this.element = el
  }

  unbindDocumentEvent() {
    document.removeEventListener('click', this.handleMouseLeave)
  }

  update(check, activePath) {
    const isActive = check(this.id, this.props.data)
    const isHighLight = activePath && isActive ? activePath.indexOf(this.id) > -1 : false

    this.setState({ isActive, isHighLight })
  }

  updateOpen(check) {
    const isOpen = check(this.getKey())
    this.setState({ open: isOpen })
  }

  updateInPath(check) {
    const inPath = check(this.id)
    this.setState({ inPath })
  }

  handleToggle(open) {
    const { toggleOpenKeys, toggleDuration } = this.props
    const key = this.getKey()

    if (this.toggleTimer) clearTimeout(this.toggleTimer)
    if (open) {
      toggleOpenKeys(key, true)
      document.addEventListener('click', this.handleMouseLeave)
    } else {
      this.toggleTimer = setTimeout(() => {
        toggleOpenKeys(key, false)
      }, toggleDuration)
      this.unbindDocumentEvent()
    }
  }

  handleClick(e) {
    const { data, onClick, mode, toggleOpenKeys } = this.props
    if (data.disabled) return

    if (mode === 'inline' && data.children && data.children.length) {
      toggleOpenKeys(this.getKey(), !this.state.open)
    }

    if (typeof data.onClick === 'function') {
      data.onClick(this.id, data)
    } else if (
      (!data.children || data.children.length === 0 || data.onClick === true) &&
      typeof onClick === 'function'
    ) {
      onClick(this.id, data)
    }
    const isLeaf = ((data || {}).children || []).length === 0
    if (!isLeaf) e.nativeEvent.stopImmediatePropagation()
  }

  handleItemClick(clickMethod, e) {
    clickMethod()
    this.handleClick(e)
  }

  handleSwitch(e) {
    const { renderItem, data, index } = this.props
    const item = renderItem(data, index)
    if (item.props && item.props.onClick) {
      this.handleItemClick(item.props.onClick, e)
    } else {
      this.handleClick(e)
    }
  }

  renderLink(data) {
    const { linkKey } = this.props
    if (!linkKey) return null
    if (typeof linkKey === 'function') return linkKey(data)
    return data[linkKey]
  }

  renderItem(hasChilds = false, style) {
    const { renderItem, data, index, frontCaret } = this.props
    const item = renderItem(data, index)
    const link = this.renderLink(data)
    if (isLink(item)) {
      const mergeClass = classnames(menuClass('title'), item.props && item.props.className)
      const mergeStyle = Object.assign({}, style, item.props && item.props.style)
      return cloneElement(item, { className: mergeClass, style: mergeStyle, onClick: this.handleSwitch })
    }

    const props = {
      className: menuClass('title'),
      style,
      onClick: this.handleClick,
    }
    if (link) props.href = link

    if (frontCaret) {
      return (
        <a {...props}>
          <div className={menuClass('caret', hasChilds && 'has-childs')} />
          {item}
        </a>
      )
    }

    return <a {...props}>{item}</a>
  }

  render() {
    const {
      data,
      renderItem,
      mode,
      keygen,
      level,
      onClick,
      inlineIndent,
      disabled,
      toggleOpenKeys,
      bottomLine,
      topLine,
      linkKey,
      toggleDuration,
      frontCaret,
    } = this.props
    const { open, isActive, isHighLight, inPath } = this.state
    const { children: dChildren } = data
    const children = dChildren || []

    const isDisabled = typeof disabled === 'function' ? disabled(data) : disabled

    let isUp = false
    if (mode === 'vertical-auto' && this.element) {
      isUp = this.element.getBoundingClientRect().bottom - topLine > (bottomLine - topLine) / 2
    }

    const hasChilds = children.length > 0

    const className = menuClass(
      'item',
      isDisabled === true && 'disabled',
      hasChilds ? 'has-children' : 'no-children',
      isActive && 'active',
      open && 'open',
      isUp && 'open-up',
      isHighLight && 'highlight',
      inPath && 'in-path',
      frontCaret && 'caret-solid'
    )

    const style = this.getCalcStyle()
    const events = {}
    if (mode !== 'inline') {
      events.onMouseEnter = this.handleMouseEnter
      events.onMouseLeave = this.handleMouseLeave
    }

    return (
      <li className={className} {...events} ref={this.bindElement}>
        {this.renderItem(hasChilds, style)}
        {hasChilds && (
          <List
            // className={menuClass('sub')}
            data={children}
            disabled={disabled}
            renderItem={renderItem}
            keygen={keygen}
            inlineIndent={mode === 'horizontal' ? 0 : inlineIndent}
            mode={mode === 'horizontal' ? 'inline' : mode}
            onClick={onClick}
            path={this.id}
            level={level + 1}
            open={open}
            toggleOpenKeys={toggleOpenKeys}
            linkKey={linkKey}
            toggleDuration={toggleDuration}
            frontCaret={frontCaret}
          />
        )}
      </li>
    )
  }
}

Item.propTypes = {
  bindItem: PropTypes.func,
  bottomLine: PropTypes.number,
  topLine: PropTypes.number,
  data: PropTypes.object,
  disabled: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  index: PropTypes.number,
  inlineIndent: PropTypes.number,
  level: PropTypes.number,
  keygen: PropTypes.any,
  mode: PropTypes.string,
  onClick: PropTypes.func,
  path: PropTypes.string,
  renderItem: PropTypes.func,
  toggleOpenKeys: PropTypes.func,
  unbindItem: PropTypes.func,
  linkKey: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  toggleDuration: PropTypes.number,
  frontCaret: PropTypes.bool,
}

export default consumer(Item)
