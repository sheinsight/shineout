import React, { PureComponent } from 'react'
import classnames from 'classnames'
import { inputTitleClass } from '../InputTitle/styles'
import cleanProps from '../utils/cleanProps'
import Clear from './clear'
import { inputClass } from './styles'
import InputTitle from '../InputTitle'
import { Props } from './Props'

function regLength(size?: number) {
  return /\d+/.test(String(size)) && size! > 0 ? `{0,${size}}` : '*'
}

function fillNumber(val: string) {
  return (
    val
      .replace(/^(-)?(\.\d+)(?!=\.).*/g, '$10$2')
      // eslint-disable-next-line no-useless-escape
      .replace(/(-|^)0+(?=0\.?|[^0\.])/g, '$1')
      .replace(/\.$/, '')
  )
}

const DefaultValue = {
  type: 'text',
}

class Input extends PureComponent<Props> {
  static defaultProps: any = DefaultValue

  enterLock: boolean

  ref: HTMLInputElement

  enterPress: boolean

  constructor(props: Props) {
    super(props)
    this.enterLock = false
    this.handleChange = this.handleChange.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleKeyUp = this.handleKeyUp.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
    this.handleAutoSelect = this.handleAutoSelect.bind(this)
    this.bindRef = this.bindRef.bind(this)
  }

  defaultInfo = (value?: string) => {
    if (!value || value.length === 0) return null
    const { info } = this.props
    const text = `${value.length} / ${info}`
    if (typeof info === 'number' && value.length <= info) return text
    return new Error(text)
  }

  bindRef(el: HTMLInputElement) {
    const { forwardedRef } = this.props
    this.ref = el
    if (forwardedRef) forwardedRef(el)
  }

  isValidNumber(val: string) {
    const { numType } = this.props
    const noNeg = numType === 'non-negative' || numType === 'positive'
    const regExp = new RegExp(`^(${noNeg ? '' : '-'})?\\d*\\.?\\d*$`, 'g')
    return regExp.test(val)
  }

  formatValue(val: string) {
    let value = val
    const { type, digits, integerLimit, numType } = this.props
    const noNeg = numType === 'non-negative' || numType === 'positive'
    if (type !== 'number') return value

    const regExp = new RegExp(
      `^(${noNeg ? '' : '-'})?(\\d${regLength(integerLimit)})(${digits !== 0 ? `\\.\\d${regLength(digits)}` : ''})?.*$`,
      'g'
    )

    value = value.replace(regExp, '$1$2$3')
    return value
  }

  fixValue(val: string) {
    const { type, digits, autoFix, cancelChange, numType } = this.props
    if (type !== 'number' || val === '') return val
    if (/^[.-]+$/.test(val)) return ''
    let fixVal = fillNumber(val)
    if (numType === 'positive' && Number(fixVal) <= 0) return ''

    if (digits !== undefined && autoFix) {
      if (digits > 0) {
        fixVal = parseFloat(fixVal).toFixed(digits)
      } else {
        fixVal = parseInt(fixVal, 10).toString()
      }
      if (cancelChange) cancelChange()
    }
    return fixVal
  }

  invalidNumber(value: string) {
    const { digits, type, integerLimit } = this.props
    if (type !== 'number') return false

    let reg: string | RegExp = '^-?'
    if (!integerLimit) {
      reg += `\\d*`
    } else if (integerLimit > 0) {
      reg += `\\d{0,${integerLimit}}`
    }

    if (digits === undefined) {
      reg += '\\.?\\d*'
    } else if (digits >= 0) {
      reg += `\\.?\\d{0,${digits}}`
    }
    reg += '$'
    reg = new RegExp(reg)
    return !reg.test(value)
  }

  handleChange(e: React.ChangeEvent, clearClick: boolean) {
    const { type, clearable } = this.props
    if (clearClick) {
      this.ref.focus()
      if (typeof clearable === 'function') clearable()
    }
    let { value } = e.target as HTMLInputElement
    if (clearClick && this.props.clearToUndefined) {
      this.props.onChange(value)
      return
    }

    if (type === 'number') {
      if (typeof value !== 'number') {
        value = String(value).replace(/。/g, '.')
      }
      if (!this.isValidNumber(value)) {
        return
      }
      value = this.formatValue(value)
    }

    this.props.onChange(value)
  }

  handleKeyDown(e: React.KeyboardEvent) {
    const { onKeyDown } = this.props
    if (e.keyCode === 13) this.enterPress = true
    if (onKeyDown) onKeyDown(e)
  }

  handleKeyUp(e: React.KeyboardEvent) {
    const { onKeyUp, onEnterPress } = this.props
    if (this.enterPress && e.keyCode === 13 && onEnterPress) {
      onEnterPress((e.target as HTMLInputElement).value, e)
      this.enterPress = false
    }
    if (onKeyUp) onKeyUp(e)
  }

  handleBlur(e: React.FocusEvent<HTMLInputElement>) {
    const { value } = e.target as HTMLInputElement
    const { forceChange, onBlur, clearToUndefined, cancelChange } = this.props
    if (cancelChange) cancelChange()
    const newVal = this.fixValue(value)
    const canForceChange = !(clearToUndefined && newVal === '' && this.props.value === undefined)
    if (canForceChange && forceChange && !this.invalidNumber(newVal)) forceChange(newVal)
    if (onBlur) onBlur(e)
  }

  handleAutoSelect(event: React.FocusEvent) {
    const { onFocus } = this.props
    const { autoSelect } = this.props
    if (autoSelect) {
      ;(event.currentTarget as HTMLInputElement).select()
    }
    if (typeof onFocus === 'function') {
      onFocus(event)
    }
  }

  renderInfo() {
    const { info } = this.props
    const notNumber = typeof info !== 'number'

    if (typeof info !== 'function' && notNumber) return null

    const textInfo = notNumber ? info : this.defaultInfo
    const res = textInfo(this.props.value)

    // empty
    if (!res) return null

    const isError = res instanceof Error
    const text = isError ? res.message : res
    return (
      <div key="info" style={{ minWidth: 'auto' }} className={inputClass('bottom-right', isError ? 'error' : 'tip')}>
        {text}
      </div>
    )
  }

  render() {
    const {
      type,
      defaultValue,
      digits,
      className,
      clearable,
      htmlName,
      forceChange,
      onEnterPress,
      forwardedRef,
      innerTitle,
      inputFocus,
      clearToUndefined,
      placeholder,
      ...other
    } = this.props
    const value = this.props.value == null || this.props.value === undefined ? '' : this.props.value
    const needClearUndefined = clearToUndefined && this.props.value !== undefined
    const showClear = !other.disabled && clearable && (value !== '' || needClearUndefined)
    const mc = classnames(
      className,
      showClear && inputClass('clearable'),
      innerTitle && inputTitleClass('hidable', 'item')
    )
    const isNumber = className && className.indexOf(inputClass('number')) > -1
    return [
      <InputTitle
        className={isNumber ? inputClass('number-title-box') : undefined}
        key="input"
        innerTitle={innerTitle}
        open={!!inputFocus || !!value}
      >
        <input
          {...cleanProps(other)}
          placeholder={needClearUndefined ? '' : placeholder}
          className={mc || undefined}
          name={other.name || htmlName}
          type={type === 'password' ? type : 'text'}
          value={value}
          ref={this.bindRef}
          key="input"
          onChange={this.handleChange as React.ChangeEventHandler<HTMLInputElement>}
          onKeyDown={this.handleKeyDown}
          onKeyUp={this.handleKeyUp}
          onBlur={this.handleBlur}
          onFocus={this.handleAutoSelect}
        />
      </InputTitle>,
      showClear && <Clear onClick={this.handleChange} key="close" clearResult={needClearUndefined ? undefined : ''} />,
      this.renderInfo(),
    ]
  }
}

export default Input
