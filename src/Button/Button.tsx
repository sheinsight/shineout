import React, { PureComponent, isValidElement, ReactNode } from 'react'
import classnames from 'classnames'
import { defaultProps } from '../utils/proptypes'
import Spin from '../Spin'
import { wrapSpan } from '../utils/dom/element'
import { buttonClass } from './styles'
import { isRTL } from '../config'
import { getDirectionClass } from '../utils/classname'

import { ButtonProps } from './interface'

class Button extends PureComponent<ButtonProps> {
  static displayName: string

  static Group: unknown

  static Once: unknown

  static defaultProps = {
    ...defaultProps,
    htmlType: 'button',
    outline: false,
    type: 'default',
  }

  getChildren() {
    const { children, loading, space } = this.props
    if (!children) return children
    const parsed = React.Children.map(wrapSpan(children, space), item => {
      if (loading && isValidElement(item) && (item.type as any).isShineoutIcon) return null
      return item
    }).filter((v: ReactNode) => v !== null)
    return parsed
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
      // eslint-disable-next-line
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
