import React, { isValidElement, cloneElement } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { getProps, defaultProps } from '../utils/proptypes'
import { menuClass } from '../styles'

class Item extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick(data) {
    if (this.props.data.disabled) return
    this.props.handleClick(data)
  }
  render() {
    const {
      data, renderItem, isActive, inlineIndent, mode,
    } = this.props
    const itemData = typeof renderItem === 'string' ? data[renderItem] : renderItem(data)
    const className = classnames(
      menuClass('item', this.props.data.disabled && 'disabled', {
        'item-selected': isActive,
      }),
      this.props.className,
    )
    return (
      <li
        className={className}
        style={mode === 'inline' ? { paddingLeft: inlineIndent } : {}}
      >
        {
          isValidElement(itemData) ?
            cloneElement(itemData, { onClick: () => this.handleClick(data) }) :
            <button onClick={() => this.handleClick(data)}>{itemData}</button>
        }
      </li>)
  }
}

Item.propTypes = {
  ...getProps(),
  data: PropTypes.object,
  menuKey: PropTypes.string,
  renderItem: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),
  isActive: PropTypes.bool,
  handleClick: PropTypes.func,
  inlineIndent: PropTypes.number,
}

Item.defaultProps = {
  ...defaultProps,
  data: {},
  menuKey: '',
  renderItem: 'title',
  isActive: false,
}

export default Item
