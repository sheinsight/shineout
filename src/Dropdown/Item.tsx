import React, { isValidElement, cloneElement } from 'react'
import { defaultProps } from '../utils/proptypes'
import { DropdownNode, DropdownProps } from './Props'

const DefaultProps = {
  ...defaultProps,
  data: {},
  renderItem: 'content',
}

interface ItemProps {
  data: DropdownNode
  itemClassName: string
  width: DropdownProps['width']
  onClick: DropdownProps['onClick']
  columns: DropdownProps['columns']
  // renderItem: ((data: DropdownNode) => ReactNode) | string
  renderItem: DropdownProps['renderItem']
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
