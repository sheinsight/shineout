import React from 'react'
import classnames from 'classnames'
import { Component } from '../component'
import { curry } from '../utils/func'
import { popoverClass } from '../Popover/styles'
import { buttonClass } from '../Button/styles'
import { inputClass } from '../Input/styles'
import { inputBorderClass } from '../Form/styles'
import Popover from '../Popover'
import { isRTL } from '../config'
import getDataset from '../utils/dom/getDataset'
import { RegularAttributes } from '../@types/common'
import { PopoverProps } from '../Popover/interface'

interface Options {
  tag: 'label' | 'div' | 'span'
  isGroup?: boolean
  overflow?: string
  className?: ((props: { [name: string]: any }) => string) | string
  from?: string
  enterPress?: boolean
}

interface InputBorderProps {
  autoFocus?: boolean
  disabled?: boolean | (() => boolean)
  onBlur?: (e: React.MouseEvent<HTMLElement>) => void
  onFocus?: (e: React.MouseEvent<HTMLElement>) => void
  size?: RegularAttributes.Size
  border?: boolean
  className?: string
  tip?: any
  popover?: RegularAttributes.Position
  width?: string | number
  error?: Error
  popoverProps?: PopoverProps
  underline?: boolean
  style?: React.CSSProperties
}

type filterKeys =
  | 'border'
  | 'className'
  | 'tip'
  | 'popover'
  | 'width'
  | 'error'
  | 'popoverProps'
  | 'underline'
  | 'style'

export default curry(
  <U extends InputBorderProps>(options: Options, Origin: React.ComponentType<Omit<U, filterKeys>>) =>
    class extends Component<U, { focus?: boolean }> {
      static defaultProps: any = {
        border: true,
        style: {},
        popoverProps: {},
      }

      el: HTMLElement | null

      constructor(props: U) {
        super(props)
        this.el = null
        this.state = {
          focus: props.autoFocus,
        }
        this.bindRef = this.bindRef.bind(this)
        this.handleBlur = this.handleBlur.bind(this)
        this.handleFocus = this.handleFocus.bind(this)
        // this.enterPress = this.enterPress.bind(this)
      }

      bindRef(el: HTMLElement | null) {
        this.el = el
      }

      handleBlur(event: React.MouseEvent<HTMLElement>) {
        this.setState({ focus: false })
        const { onBlur } = this.props
        if (onBlur) onBlur(event)
      }

      handleFocus(event: React.MouseEvent<HTMLElement>) {
        this.setState({ focus: true })
        const { onFocus } = this.props
        if (onFocus) onFocus(event)
      }

      renderHelp(focus?: boolean) {
        const { error, tip, popover, popoverProps = {} } = this.props
        const classList = ['input-tip']
        const position = popover || (isRTL() ? 'bottom-right' : 'bottom-left')

        const styles =
          popoverProps.style && popoverProps.style.width
            ? popoverProps.style
            : Object.assign({ minWidth: 200, maxWidth: 400 }, popoverProps.style || {})

        // 只有有错需要popover，或者tip被focus才显示
        if ((error && popover) || (tip && focus)) {
          if (error) classList.push('input-error')
          return (
            <Popover
              getPopupContainer={() => this.el}
              {...popoverProps}
              visible
              style={styles}
              className={popoverClass(...classList)}
              position={position}
            >
              {error ? error.message : tip}
            </Popover>
          )
        }
        return null
      }

      render() {
        const {
          className,
          border,
          size,
          tip,
          popover,
          width,
          style,
          error,
          popoverProps,
          underline,
          ...other
        } = this.props
        const { focus } = this.state

        const rtl = isRTL()

        const Tag = options.tag || 'label'

        const newStyle = Object.assign({ width }, style)
        const isDisabled = typeof other.disabled === 'function' ? false : !!other.disabled
        const newClassName = classnames(
          inputBorderClass(rtl && 'rtl'),
          inputClass(
            '_',
            rtl && 'rtl',
            focus && !isDisabled && 'focus',
            isDisabled && 'disabled',
            options.isGroup && 'group',
            size,
            newStyle.width && 'inline',
            !border && 'no-border',
            options.overflow && `overflow-${options.overflow}`,
            error && 'invalid',
            popover && error && 'focus',
            underline && 'underline'
          ),
          buttonClass(options.isGroup && 'group', options.from === 'input' && options.isGroup && 'from-input-group'),
          typeof options.className === 'function' ? options.className(this.props) : options.className,
          this.props.className
        )

        return (
          <Tag
            ref={this.bindRef}
            className={newClassName}
            style={newStyle}
            tabIndex={options.enterPress ? 0 : undefined}
            {...getDataset(other)}
          >
            <Origin
              {...other as U}
              size={size}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              inputFocus={focus}
            />
            {this.renderHelp(focus)}
          </Tag>
        )
      }
    }
)
