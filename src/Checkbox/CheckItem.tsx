import React, {  KeyboardEvent } from "react"
import classnames from 'classnames'
import { PureComponent } from '../component'
import {  defaultProps } from '../utils/proptypes'
import { getUidStr } from '../utils/uid'
import { getDirectionClass } from '../utils/classname'
import { isEnterPress } from '../utils/is'
import Input from '../Input'
import { checkinputClass } from './styles'
import { isRTL } from '../config'
import getDataset from '../utils/dom/getDataset'
import {CheckItemProps, SimpleCheckProps, SimpleRadioProps, SimpleSwitchProps, CheckValueType, CheckType} from "./Props"

export interface CheckboxState {
  checked?: CheckValueType
}

function checkItem(type: 'checkbox') : React.ComponentClass<SimpleCheckProps>
function checkItem(type: 'radio') : React.ComponentClass<SimpleRadioProps>
function checkItem(type: 'switch') : React.ComponentClass<SimpleSwitchProps>
function checkItem(type: CheckType): React.ComponentClass<CheckItemProps, CheckboxState> {
  class CheckItem extends PureComponent<CheckItemProps, CheckboxState> {

    static defaultProps: any = {
      ...defaultProps,
      htmlValue: true,
      onClick: undefined,
      content: [],
    }

    id: string

    input: null | HTMLElement

    el: null | HTMLElement

    constructor(props:CheckItemProps  ) {
      super(props)

      this.state = {
        checked: typeof props.checked === 'function' ? undefined : props.checked,
      }

      this.id = `cb_${getUidStr()}`
      this.input = null
      this.el = null
      this.handleChange = this.handleChange.bind(this)
      this.handleInputChange = this.handleInputChange.bind(this)
      this.handleEnter = this.handleEnter.bind(this)
      this.bindRef = this.bindRef.bind(this)
    }

    componentDidUpdate(prevProps: CheckItemProps) {
      const { checked, inputable, value, htmlValue } = this.props
      if (prevProps.value !== value && checked === undefined) {
        // eslint-disable-next-line
        this.setState({ checked: inputable ? !!value : value === htmlValue })
      }
    }

    getChecked() {
      const { checked, value, htmlValue } = this.props
      // 传函数的用法
      if (typeof checked === 'function') return (checked as any) (htmlValue)
      if (checked !== undefined) return checked
      if (this.state.checked === undefined) return value === htmlValue
      return this.state.checked
    }

    getProp(key: keyof CheckItemProps) {
      if (this.props[key] !== undefined) return this.props[key]
      return this.state[key as keyof CheckboxState]
    }

    bindRef(el: HTMLLabelElement) {
      if (el) this.el = el
    }

    handleEnter(e:KeyboardEvent) {
      if (isEnterPress(e)) {
        this.handleChange({
          target: {
            checked: !this.getChecked(),
          },
        })
        // e.target.click()
        // if (this.el) this.el.focus()
      }
    }

    handleChange(e: {target: {checked: boolean}}) {
      const { onChange, onRawChange, index, inputable } = this.props
      const { checked } = e.target
      this.setState({ checked }, () => this.el!.focus())

      if (type === 'switch' && onChange) {
        onChange(checked)
        return
      }

      let value = inputable ? this.props.value : this.props.htmlValue

      if (onRawChange) onRawChange(value, checked)

      value = checked ? value : undefined
      if (onChange) onChange(value, checked, index)
    }

    handleInputChange(val: string) {
      const { onChange, index } = this.props
      const checked = val.length > 0
      if (onChange) onChange(val, checked, index)
    }

    render() {
      const { disabled, style, content, size, children, inputable, onClick } = this.props

      const rtl = isRTL()

      const checked = this.getChecked()
      const isSwitch = type === 'switch'

      const className = classnames(
        checkinputClass(
          '_',
          disabled && 'disabled',
          checked === true && 'checked',
          checked === 'indeterminate' && 'indeterminate',
          isSwitch && 'switch',
          `${type}-container`,
          rtl && 'rtl',
          {
            large: size === 'large',
            small: size === 'small',
          }
        ),
        this.props.className
      )

      const [checkedChildren, uncheckedChildren] = content || []
      const switchChildren =
        isSwitch && size !== 'small' ? (
          <span className={checkinputClass('switch-children')}>{checked ? checkedChildren : uncheckedChildren}</span>
        ) : null

      const value = typeof this.props.value === 'string' ? this.props.value : ''

      return (
        <label
          onKeyDown={this.handleEnter}
          className={className}
          style={style}
          htmlFor={this.id}
          tabIndex={disabled ? undefined : 0}
          ref={this.bindRef}
          /* @ts-ignore */
          disabled={disabled}
          {...getDataset(this.props)}
        >
          {switchChildren}
          <input
            id={this.id}
            disabled={disabled}
            tabIndex={-1}
            type={isSwitch ? 'checkbox' : type}
            onClick={onClick}
            onChange={this.handleChange}
            checked={checked}
          />
          <i className={checkinputClass('indicator', type)} />
          {children && !isSwitch && <span className={checkinputClass('desc')}>{children}</span>}
          {inputable && !isSwitch && checked && (
            <Input className={checkinputClass('text')} onChange={this.handleInputChange} value={value} />
          )}
          {isSwitch && <span className={checkinputClass(getDirectionClass('switch-indicator'))} />}
        </label>
      )
    }
  }

  return CheckItem
}

export default checkItem
