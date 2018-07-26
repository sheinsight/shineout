import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import immer from 'immer'
import { getKey, getUidStr } from '../utils/uid'
import { menuClass } from '../styles'
import List from './List'
import { consumer } from './context'

class Item extends PureComponent {
  constructor(props) {
    super(props)

    this.id = `${props.path},${getUidStr()}`

    const key = getKey(props.data, props.keygen, props.index)

    this.state = {
      open: props.defaultOpenKeys.indexOf(key) > -1,
      isActive: props.bindItem(this.id, this.update.bind(this))(this.id, props.data),
      isHighLight: false,
    }

    this.handleClick = this.handleClick.bind(this)
    this.handleMouseEnter = this.handleToggle.bind(this, true)
    this.handleMouseLeave = this.handleToggle.bind(this, false)
  }

  componentWillUnmount() {
    this.props.unbindItem(this.id)
    this.unbindDocumentEvent()
  }

  unbindDocumentEvent() {
    document.removeEventListener('click', this.handleMouseLeave)
  }

  update(check, activePath) {
    const isActive = check(this.id, this.props.data)
    const isHighLight = activePath ? activePath.indexOf(this.id) > -1 : false

    this.setState({ isActive, isHighLight })
  }

  handleToggle(open) {
    if (this.toggleTimer) clearTimeout(this.toggleTimer)
    if (open) {
      this.setState({ open })
      document.addEventListener('click', this.handleMouseLeave)
    } else {
      this.toggleTimer = setTimeout(() => {
        this.setState({ open: false })
      }, 200)
      this.unbindDocumentEvent()
    }
  }

  handleClick() {
    const { data, onClick, mode } = this.props
    if (data.disabled) return

    if (mode === 'inline') {
      this.setState(immer((state) => {
        state.open = !state.open
      }))
    }

    if (typeof data.onClick === 'function') {
      data.onClick(this.id, data)
    } else if ((!data.children || data.onClick === true) && typeof onClick === 'function') {
      onClick(this.id, data)
    }
  }

  render() {
    const {
      data, renderItem, mode, keygen, level, onClick, inlineIndent, defaultOpenKeys,
    } = this.props
    const { open, isActive, isHighLight } = this.state
    const { children = [] } = data

    const className = menuClass(
      'item',
      data.disabled && 'disabled',
      children.length > 0 ? 'has-children' : 'no-children',
      isActive && 'active',
      open && 'open',
      isHighLight && 'highlight',
    )

    const style = {}
    const events = {}
    if (mode === 'inline') {
      style.paddingLeft = 20 + (level * inlineIndent)
    } else {
      events.onMouseEnter = this.handleMouseEnter
      events.onMouseLeave = this.handleMouseLeave
    }

    return (
      <li className={className} {...events}>
        <a
          href="javascript:;"
          className={menuClass('title')}
          style={style}
          onClick={this.handleClick}
        >
          {renderItem(data)}
        </a>
        {
          children.length > 0 &&
          <List
            data={children}
            defaultOpenKeys={defaultOpenKeys}
            renderItem={renderItem}
            keygen={keygen}
            inlineIndent={mode === 'horizontal' ? 0 : inlineIndent}
            mode={mode === 'horizontal' ? 'inline' : mode}
            onClick={onClick}
            path={this.id}
            level={level + 1}
            open={open}
          />
        }
      </li>
    )
  }
}

Item.propTypes = {
  bindItem: PropTypes.func,
  data: PropTypes.object,
  defaultOpenKeys: PropTypes.array,
  index: PropTypes.number,
  inlineIndent: PropTypes.number,
  level: PropTypes.number,
  keygen: PropTypes.any,
  mode: PropTypes.string,
  onClick: PropTypes.func,
  path: PropTypes.string,
  renderItem: PropTypes.func,
  unbindItem: PropTypes.func,
}

export default consumer(Item)
