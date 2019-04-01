import React, { isValidElement, cloneElement } from 'react'
import PropTypes from 'prop-types'
import { PureComponent } from '../component'
import { getKey, getUidStr } from '../utils/uid'
import { menuClass } from '../styles'
import List from './List'
import { consumer } from './context'

class Item extends PureComponent {
  constructor(props) {
    super(props)

    this.id = `${props.path},${getUidStr()}`
    const key = this.getKey(props)
    const [activeUpdate, openUpdate] = props.bindItem(this.id, this.update.bind(this), this.updateOpen.bind(this))
    this.state = {
      open: openUpdate(key),
      isActive: activeUpdate(this.id, props.data),
      isHighLight: false,
    }

    this.bindElement = this.bindElement.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleMouseEnter = this.handleToggle.bind(this, true)
    this.handleMouseLeave = this.handleToggle.bind(this, false)
  }

  componentWillUnmount() {
    super.componentWillUnmount()
    this.props.unbindItem(this.id)
    this.unbindDocumentEvent()
  }

  getKey(props = this.props) {
    return getKey(props.data, props.keygen, props.index)
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

  handleToggle(open) {
    const { toggleOpenKeys } = this.props
    const key = this.getKey()

    if (this.toggleTimer) clearTimeout(this.toggleTimer)
    if (open) {
      toggleOpenKeys(key, true)
      document.addEventListener('click', this.handleMouseLeave)
    } else {
      this.toggleTimer = setTimeout(() => {
        toggleOpenKeys(key, false)
      }, 200)
      this.unbindDocumentEvent()
    }
  }

  handleClick() {
    const { data, onClick, mode, toggleOpenKeys } = this.props
    if (data.disabled) return

    if (mode === 'inline' && data.children) {
      toggleOpenKeys(this.getKey(), !this.state.open)
    }

    if (typeof data.onClick === 'function') {
      data.onClick(this.id, data)
    } else if ((!data.children || data.onClick === true) && typeof onClick === 'function') {
      onClick(this.id, data)
    }
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
    } = this.props
    const { open, isActive, isHighLight } = this.state
    const { children = [] } = data

    const isDisabled = typeof disabled === 'function' ? disabled(data) : disabled

    let isUp = false
    if (mode === 'vertical' && this.element) {
      isUp = this.element.getBoundingClientRect().bottom + 60 > bottomLine
    }

    const className = menuClass(
      'item',
      isDisabled === true && 'disabled',
      children.length > 0 ? 'has-children' : 'no-children',
      isActive && 'active',
      open && 'open',
      isUp && 'open-up',
      isHighLight && 'highlight'
    )

    const style = {}
    const events = {}
    if (mode === 'inline') {
      style.paddingLeft = 20 + level * inlineIndent
    } else {
      events.onMouseEnter = this.handleMouseEnter
      events.onMouseLeave = this.handleMouseLeave
    }
    let item = renderItem(data)
    if (isValidElement(item) && (item.type === 'a' || (item.type && item.type.displayName === 'Link'))) {
      item = cloneElement(item, { className: menuClass('title') })
    } else {
      item = (
        <a href="javascript:;" className={menuClass('title')} style={style} onClick={this.handleClick}>
          {item}
        </a>
      )
    }

    return (
      <li className={className} {...events} ref={this.bindElement}>
        {item}
        {children.length > 0 && (
          <List
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
          />
        )}
      </li>
    )
  }
}

Item.propTypes = {
  bindItem: PropTypes.func,
  bottomLine: PropTypes.number,
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
}

export default consumer(Item)
