import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { getProps, defaultProps } from '../utils/proptypes'
import { menuClass } from '../styles'

class Item extends React.Component {
  render() {
    const {
      data, itemRender, isActive, handleClick, inlineIndent,
    } = this.props
    const itemData = typeof itemRender === 'string' ? data[itemRender] : itemRender(data)
    const className = classnames(
      menuClass('item', {
        'item-selected': isActive,
      }),
      this.props.className,
    )
    return (
      <li
        className={className}
        style={{ paddingLeft: inlineIndent }}
      >
        <a onClick={handleClick}>{itemData}</a>
      </li>)
  }
}

Item.propTypes = {
  ...getProps(),
  data: PropTypes.object,
  menuKey: PropTypes.string,
  itemRender: PropTypes.oneOfType([
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
  itemRender: 'title',
  isActive: false,
}

export default Item
