import React, { PureComponent } from 'react'
import icons from '../icons'
import Input from './Input'
import { inputClass } from './styles'
import { isRTL } from '../config'
import { sub } from '../utils/numbers'
import { getDirectionClass } from '../utils/classname'
import { InputNumber, NumberValue } from './Props'

const DefaultValue = {
  step: 1,
  allowNull: false,
  hideArrow: false,
}

class Number extends PureComponent<InputNumber> {
  static defaultProps: any = DefaultValue

  hold: boolean

  handleAddClick: React.MouseEventHandler<HTMLAnchorElement>

  handleSubClick: React.MouseEventHandler<HTMLAnchorElement>

  keyPressTimeOut: NodeJS.Timer

  constructor(props: InputNumber) {
    super(props)

    this.handleBlur = this.handleBlur.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleAddClick = this.handleCalc.bind(this, props.step)
    this.handleSubClick = this.handleCalc.bind(this, -props.step!)
    this.handleMouseUp = this.handleMouseUp.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleKeyUp = this.handleKeyUp.bind(this)
  }

  componentWillUnmount() {
    this.hold = false
    if (this.keyPressTimeOut) clearTimeout(this.keyPressTimeOut)
  }

  // handleChange(value: NumberValue) {
  //   this.handleChange(NumberValue)
  // }

  handleChange(value?: NumberValue, check?: boolean, isEmpty?: boolean) {
    if (isEmpty || value === undefined) {
      this.props.onChange(value)
      return
    }

    if (!check) {
      if (new RegExp('^-?\\d*\\.?\\d*$').test(value as string)) {
        this.props.onChange(value)
      }
      return
    }
    const { digits, step = DefaultValue.step, numType, allowNull = DefaultValue.allowNull } = this.props

    if (numType === 'positive' && value! <= 0) {
      value = allowNull ? null : undefined
    } else if (typeof digits === 'number') {
      value = parseFloat((value as number).toFixed(digits))
    } else {
      const stepStr = step.toString()
      const dot = stepStr.lastIndexOf('.')
      if (dot >= 0) value = parseFloat((value as number).toFixed(stepStr.length - dot))
    }

    const { min, max } = this.props

    if (max !== undefined && value! > max) value = max
    if (min !== undefined && value! < min) value = min

    if (value !== this.props.value) {
      this.props.onChange(value)
    }
  }

  handleBlur(e: React.FocusEvent<HTMLInputElement>) {
    this.hold = false
    let value: number | null = parseFloat(e.target.value)
    // for the empty
    if (e.target.value === '' && this.props.allowNull) {
      value = null
    }
    // eslint-disable-next-line no-restricted-globals
    if (isNaN(value as number)) value = 0
    if (this.props.clearToUndefined && e.target.value === '' && this.props.value === undefined) {
      this.handleChange(undefined, true, true)
    } else {
      this.handleChange(value, true, value === null)
    }
    this.props.onBlur(e)
  }

  changeValue(mod: number) {
    if (this.props.disabled) return
    let val = this.props.value
    if (val === 0) val = '0'
    let value = parseFloat(`${val || ''}`.replace(/,/g, ''))
    // eslint-disable-next-line
    if (isNaN(value)) value = 0

    const { numType, integerLimit } = this.props

    const calculateVal = sub(value, mod)
    if (numType === 'positive' && calculateVal <= 0) {
      return
    }
    if (numType === 'non-negative' && calculateVal < 0) {
      return
    }

    if (integerLimit && String(parseInt((calculateVal as unknown) as string, 10)).length > integerLimit) {
      return
    }

    this.handleChange(calculateVal, true)
  }

  longPress(mod: number) {
    if (!this.hold) return
    setTimeout(() => {
      this.changeValue(mod)
      this.longPress(mod)
    }, 50)
  }

  handleKeyDown(e: React.KeyboardEvent) {
    const { step = DefaultValue.step } = this.props
    this.hold = true
    if (e.keyCode !== 38 && e.keyCode !== 40) return
    e.preventDefault()
    const mod = e.keyCode === 38 ? step : -step
    this.changeValue(mod)
    if (this.keyPressTimeOut) clearTimeout(this.keyPressTimeOut)
    this.keyPressTimeOut = setTimeout(() => {
      this.longPress(mod)
    }, 600)
  }

  handleCalc(mod: number, e: React.MouseEvent) {
    const { onMouseDown } = this.props
    if (onMouseDown) onMouseDown(e)
    this.hold = true
    this.changeValue(mod)
    this.keyPressTimeOut = setTimeout(() => {
      this.longPress(mod)
    }, 1000)
  }

  handleKeyUp() {
    this.hold = false
    if (this.keyPressTimeOut) clearTimeout(this.keyPressTimeOut)
  }

  handleMouseUp(e: React.MouseEvent) {
    const { onMouseUp } = this.props
    if (onMouseUp) onMouseUp(e)
    this.hold = false
    if (this.keyPressTimeOut) clearTimeout(this.keyPressTimeOut)
  }

  renderArrowGroup() {
    const { hideArrow } = this.props
    if (hideArrow) return []
    return [
      <a
        key="up"
        // do not need the tab to focus
        tabIndex={-1}
        className={inputClass('number-up')}
        onMouseDown={this.handleAddClick}
        onMouseUp={this.handleMouseUp}
        onMouseLeave={this.handleMouseUp}
      >
        {icons.AngleRight}
      </a>,

      <a
        key="down"
        // do not need the tab to focus
        tabIndex={-1}
        className={inputClass('number-down')}
        onMouseDown={this.handleSubClick}
        onMouseUp={this.handleMouseUp}
        onMouseLeave={this.handleMouseUp}
      >
        {icons.AngleRight}
      </a>,
    ]
  }

  renderRTL() {
    const { onChange, allowNull, hideArrow, value, defaultValue, ...other } = this.props
    return [
      ...this.renderArrowGroup(),
      <Input
        key="input"
        value={value as string}
        {...other}
        className={inputClass(!hideArrow && getDirectionClass('number'), 'rtl')}
        onChange={this.handleChange}
        onKeyDown={this.handleKeyDown}
        onKeyUp={this.handleKeyUp}
        onBlur={this.handleBlur}
        type="number"
      />,
    ]
  }

  render() {
    const { onChange, allowNull, hideArrow, defaultValue, value, ...other } = this.props
    const rtl = isRTL()
    if (rtl) {
      return this.renderRTL()
    }
    return [
      <Input
        key="input"
        value={value as string}
        {...other}
        className={inputClass(!hideArrow && getDirectionClass('number'))}
        onChange={this.handleChange}
        onKeyDown={this.handleKeyDown}
        onKeyUp={this.handleKeyUp}
        onBlur={this.handleBlur}
        type="number"
      />,
      ...this.renderArrowGroup(),
    ]
  }
}

export default Number
