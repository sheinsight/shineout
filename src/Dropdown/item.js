import React from 'react'
import PropTypes from 'prop-types'
import { getProps, defaultProps } from '../utils/proptypes'

class Item extends React.PureComponent {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick() {
    if (!this.props.onClick) return
    this.props.onClick(this.props.data)
  }
  render() {
    const {
      data, itemClassName, itemRender, width, columns,
    } = this.props
    const aWidth = (width && columns) ? (width - 2) / columns : undefined
    return (
      <a
        onClick={this.handleClick}
        className={itemClassName}
        href={data.url ? data.url : 'javascript:;'}
        style={aWidth ? { display: 'inline-block', width: aWidth } : null}
      >
        {typeof itemRender === 'string' ? data[itemRender] : itemRender(data)}
      </a>)
  }
}

Item.propTypes = {
  ...getProps(),
  data: PropTypes.object,
  onClick: PropTypes.func,
  itemRender: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),
  columns: PropTypes.number,
}

Item.defaultProps = {
  ...defaultProps,
  data: {},
  itemRender: 'content',
}

export default Item
