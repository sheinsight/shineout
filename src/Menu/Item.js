import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { getProps, defaultProps } from '../utils/proptypes'
import { menuClass } from '../styles'

class Item extends React.Component {
  render() {
    console.log(this.props.selectKeys, this.props.menuKey)
    const className = classnames(
      menuClass('item', {
        'item-selected': this.props.selectKeys.find(key => key === this.props.menuKey),
      }),
      this.props.className,
    )
    return (<li className={className}>{this.props.data.content}</li>)
  }
}

Item.propTypes = {
  ...getProps(),
  data: PropTypes.object,
  menuKey: PropTypes.string,
}

Item.defaultProps = {
  ...defaultProps,
  data: {},
  menuKey: '',
}

export default Item
