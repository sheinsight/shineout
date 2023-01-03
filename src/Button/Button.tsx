import React, { PureComponent, isValidElement, ReactNode } from 'react'
import classnames from 'classnames'
import Spin from '../Spin'
import Group from './Group'
import Once from './Once'
import { wrapSpan } from '../utils/dom/element'
import { buttonClass } from './styles'
import { isRTL } from '../config'
import { getDirectionClass } from '../utils/classname'

import { ButtonProps } from './Props'

const DefaultProps = {
  size: 'default',
  htmlType: 'button' as 'button',
  outline: false,
  type: 'default',
}
class Button extends PureComponent<ButtonProps> {
  static displayName = 'ShineoutButton'

  static Group = Group

  static Once = Once

  static defaultProps = DefaultProps as ButtonProps

  getChildren() {
    const { children, loading, space } = this.props
    if (!children) return children
    const parsed = React.Children.map(wrapSpan(children, space), item => {
      if (loading && isValidElement(item) && (item.type as any).isShineoutIcon) return null
      return item
    })
    return (parsed || []).filter((v: ReactNode) => v !== null)
  }

  render() {
    const {
      outline: outlineProp,
      type: typeProp,
      size,
      href,
      htmlType,
      loading,
      disabled,
      onRef,
      shape,
      text,
      space,
      target,
      ...others
    } = this.props
    const isSecondary = typeProp === 'secondary' && !outlineProp && !text
    const type = isSecondary ? 'primary' : typeProp
    const outline = outlineProp || isSecondary
    let color = outline || type === 'default' ? undefined : '#fff'
    if (text) color = 'currentColor'
    const className = classnames(
      buttonClass('_', shape !== 'default' && shape, type, outline && 'outline', {
        large: size === 'large',
        small: size === 'small',
        text: text && 'text',
        rtl: isRTL(),
        disabled,
      }),
      this.props.className
    )

    if (href && !disabled) {
      return (
        <a href={href} {...others} className={className} ref={onRef}>
          {this.props.children}
        </a>
      )
    }

    const children = this.getChildren()
    return (
      // eslint-disable-next-line react/button-has-type
      <button {...others} ref={onRef} disabled={disabled || loading} type={htmlType} className={className}>
        {loading && (
          <span className={buttonClass(getDirectionClass('spin'))}>
            <Spin size={12} name="ring" color={color} />
          </span>
        )}
        {children}
      </button>
    )
  }
}

export default Button
