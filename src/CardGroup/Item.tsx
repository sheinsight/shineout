import React, { Fragment, ReactNode } from 'react'
import classname from 'classnames'
import Checkbox from '../Checkbox/Checkbox'
import { cardGroupClass } from './styles'
import Lazyload from '../Lazyload'
import { BaseCardGroupItemProps } from './Props'

class Item<T> extends React.Component<BaseCardGroupItemProps<T>, {}> {
  handleChange(value: T, _: any, checked: boolean) {
    const { onChange } = this.props
    if (onChange) onChange(checked, value)
  }

  renderChildren(content: ReactNode) {
    const { placeholder, container } = this.props
    if (!placeholder) return content
    return (
      <Lazyload container={container} placeholder={placeholder}>
        {content}
      </Lazyload>
    )
  }

  render() {
    const { style, className, container, children, placeholder, value, ...others } = this.props
    const cls = classname(cardGroupClass('item'), className)
    const showCheck = others.checked !== undefined
    const content = (
      <Fragment>
        {children}
        {showCheck && (
          <Checkbox {...others} onChange={this.handleChange.bind(this, value)} className={cardGroupClass('checkbox')} />
        )}
      </Fragment>
    )
    return (
      <div style={style} className={cls}>
        {this.renderChildren(content)}
      </div>
    )
  }
}

export default Item
