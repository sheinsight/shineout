import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { getProps, defaultProps } from '../utils/proptypes'
import { menuClass } from '../styles'

class Item extends React.Component {
  render() {
    const className = classnames(
      menuClass('item'),
      this.props.className,
    )
    return (<li className={className}>{this.props.data.content}</li>)
  }
}

Item.propTypes = {
  ...getProps(),
  data: PropTypes.object,
}

Item.defaultProps = {
  ...defaultProps,
  data: {},
}

export default Item
