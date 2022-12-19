import React, { isValidElement, cloneElement } from 'react'
import { defaultProps } from '../utils/proptypes'
import { ItemProps } from './Props'

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

class Item<Item> extends React.PureComponent<ItemProps<Item>> {
  static defaultProps = DefaultProps

  constructor(props: ItemProps<Item>) {
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
      disabled: data.disabled,
      onClick: this.handleClick,
      className: itemClassName,
      target: data.target,
      style: (aWidth ? { display: 'inline-block', width: aWidth } : null) as React.CSSProperties,
    }
    if (data.url) props.href = data.url

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
