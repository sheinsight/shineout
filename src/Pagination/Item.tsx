import React, { PureComponent } from 'react'
import { getDirectionClass } from '../utils/classname'
import { paginationClass } from './styles'
import { PaginationItem } from './Props'

const DefaultValue = {
  disabled: false,
  isCurrent: false,
}

class Item extends PureComponent<PaginationItem> {
  static defaultProps = DefaultValue

  constructor(props: PaginationItem) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    const { page, onClick } = this.props
    onClick(page)
  }

  render() {
    const { children, isCurrent, disabled } = this.props
    const className = paginationClass(getDirectionClass('item'), this.props.className, isCurrent && 'current')

    return (
      // @ts-ignore
      <a className={className} disabled={disabled || isCurrent} onClick={this.handleClick}>
        {children}
      </a>
    )
  }
}

export default Item
