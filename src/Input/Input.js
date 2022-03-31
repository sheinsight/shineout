import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { inputTitleClass } from '../InputTitle/styles'
import cleanProps from '../utils/cleanProps'
import Clear from './clear'
import { inputClass } from './styles'
import InputTitle from '../InputTitle'

function isNumber(val) {
  return !Number.isNaN(Number(val))
}

function regLength(size) {
  return size && size > 0 ? `{0,${size}}` : '*'
}

class Input extends PureComponent {
  constructor(props) {
    super(props)
    this.enterLock = false
    this.handleChange = this.handleChange.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleKeyUp = this.handleKeyUp.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
    this.handleAutoSelect = this.handleAutoSelect.bind(this)
    this.bindRef = this.bindRef.bind(this)
  }

  defaultInfo = value => {
    if (!value || value.length === 0) return null
    const { info } = this.props
    const text = `${value.length} / ${info}`
    if (value.length <= info) return text
    return new Error(text)
  }

  bindRef(el) {
    const { forwardedRef } = this.props
    this.ref = el
    if (forwardedRef) forwardedRef(el)
  }

  formatValue(val) {
    let value = val
    const { type, digits, integerNum, positiveInteger } = this.props
    if (type !== 'number') return value

    if (positiveInteger) {
      value = val.replace(/\D|^0/g, '').substr(0, integerNum)
    } else if (digits) {
      const regExp = new RegExp(`^(\\-)?(\\d${regLength(integerNum)})(\\.\\d${regLength(digits)})?.*$`, 'g')
      value = val.replace(/[^\d.]/g, '').replace(regExp, '$1$2$3')
    } else {
      value = val.replace(/[\D]/g, '').substr(0, integerNum)
    }
    return value
  }

  fixValue(val) {
    const { type, digits } = this.props
    if (type !== 'number') return val
    let formatValue = val
    if (formatValue !== '' && isNumber(formatValue)) {
      if (digits > 0) {
        formatValue = parseFloat(formatValue).toFixed(digits)
      } else {
        formatValue = parseInt(formatValue, 10).toString()
      }
    }
    return formatValue
  }

  invalidNumber(value) {
    const { digits, type, integerNum } = this.props
    if (type !== 'number') return false

    let reg = '^-?'
    if (integerNum === undefined) {
      reg += `\\d*`
    } else if (integerNum >= 0) {
      reg += `\\d{0,${integerNum}}`
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

  handleChange(e, clearClick) {
    const { type, clearable, digits } = this.props
    if (clearClick) {
      this.ref.focus()
      if (typeof clearable === 'function') clearable()
    }
    let { value } = e.target
    if (clearClick && this.props.clearToUndefined) {
      this.props.onChange(value)
      return
    }

    if (type === 'number' && typeof value !== 'number') value = String(value).replace(/。/g, '.')
    value = this.formatValue(value)
    this.props.onChange(value)
  }

  handleKeyDown(e) {
    const { onKeyDown } = this.props
    if (e.keyCode === 13) this.enterPress = true
    if (onKeyDown) onKeyDown(e)
  }

  handleKeyUp(e) {
    const { onKeyUp, onEnterPress } = this.props
    if (this.enterPress && e.keyCode === 13 && onEnterPress) {
      onEnterPress(e.target.value, e)
      this.enterPress = false
    }
    if (onKeyUp) onKeyUp(e)
  }

  handleBlur(e) {
    const { value } = e.target
    const newVal = this.fixValue(value)
    const { forceChange, onBlur, clearToUndefined, cancleChange } = this.props
    cancleChange()
    if (onBlur) onBlur(e)
    if (this.invalidNumber(newVal)) return
    if (clearToUndefined && newVal === '' && this.props.value === undefined) {
      return
    }
    if (forceChange) forceChange(newVal)
  }

  handleAutoSelect(event) {
    const { autoSelect } = this.props
    if (autoSelect) {
      event.currentTarget.select()
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
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
          onKeyUp={this.handleKeyUp}
          onBlur={this.handleBlur}
          onMouseUp={this.handleAutoSelect}
        />
      </InputTitle>,
      showClear && <Clear onClick={this.handleChange} key="close" clearResult={needClearUndefined ? undefined : ''} />,
      this.renderInfo(),
    ]
  }
}

Input.propTypes = {
  className: PropTypes.string,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  digits: PropTypes.number,
  integerNum: PropTypes.number,
  positiveInteger: PropTypes.bool,
  autoSelect: PropTypes.bool,
  forceChange: PropTypes.func,
  htmlName: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  cancleChange: PropTypes.func,
  onEnterPress: PropTypes.func,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onFocus: PropTypes.func,
  clearable: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  info: PropTypes.oneOfType([PropTypes.func, PropTypes.number]),
  forwardedRef: PropTypes.func,
  onKeyDown: PropTypes.func,
  onKeyUp: PropTypes.func,
  innerTitle: PropTypes.node,
  inputFocus: PropTypes.bool,
  clearToUndefined: PropTypes.bool,
  placeholder: PropTypes.string,
}

Input.defaultProps = {
  type: 'text',
}

export default Input
