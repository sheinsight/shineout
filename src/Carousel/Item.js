import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { carouselClass } from '../styles'

class Item extends PureComponent {
  render() {
    const { children, current, pre } = this.props
    const className = classnames(
      carouselClass('item', current && 'item-current', pre && 'item-pre'),
      this.props.className
    )
    return <div className={className}>{children}</div>
  }
}

Item.propTypes = {
  children: PropTypes.element,
  className: PropTypes.string,
  current: PropTypes.bool,
  pre: PropTypes.bool,
}

export default Item
