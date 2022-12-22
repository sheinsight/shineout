import React, { isValidElement, cloneElement } from 'react'
import { defaultProps } from '../utils/proptypes'
import { DropdownNode, ItemProps } from './Props'

const DefaultProps = {
  ...defaultProps,
  data: {},
  renderItem: 'content',
}

interface ItemLinkProps {
  href?: string
  target?: string
  className?: string
  disabled?: boolean
  onClick?: () => void
  style?: React.CSSProperties
}

class Item extends React.PureComponent<ItemProps> {
  static defaultProps = DefaultProps

  constructor(props: ItemProps) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    if (!this.props.onClick) return
    this.props.onClick(this.props.data)
  }

  render() {
    const { data, itemClassName, renderItem, width, columns } = this.props
    const aWidth = width && columns ? (width - 2) / columns : undefined
    const props: ItemLinkProps = {
      disabled: (data as DropdownNode).disabled,
      onClick: this.handleClick,
      className: itemClassName,
      target: (data as DropdownNode).target,
      style: (aWidth ? { display: 'inline-block', width: aWidth } : null) as React.CSSProperties,
    }
    if ((data as DropdownNode).url) props.href = (data as DropdownNode).url

    let content
    if (isValidElement(data)) {
      content = data
    } else {
      // @ts-ignore
      content = typeof renderItem === 'string' ? data[renderItem as keyof typeof data] : renderItem(data)
    }

    if (isValidElement(content)) {
      return cloneElement(content, Object.assign(props, content.props))
    }
    return <a {...props}>{content}</a>
  }
}

export default Item
