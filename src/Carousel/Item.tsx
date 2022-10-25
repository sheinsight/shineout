import React, { PureComponent } from 'react'
import classnames from 'classnames'
import { carouselClass } from './styles'

interface CarouselItemProps {
  children?: React.ReactNode
  className?: string
  current?: boolean
  pre?: boolean
}

class Item extends PureComponent<CarouselItemProps> {
  render() {
    const { children, current, pre } = this.props
    const className = classnames(
      carouselClass('item', current && 'item-current', pre && 'item-pre'),
      this.props.className
    )
    return <div className={className}>{children}</div>
  }
}

export default Item
