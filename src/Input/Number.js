import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import icons from '../icons'
import Input from './Input'
import { inputClass } from '../styles'

class Number extends PureComponent {
  constructor(props) {
    super(props)

    this.handleBlur = this.handleBlur.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleAddClick = this.handleCalc.bind(this, props.step)
    this.handleSubClick = this.handleCalc.bind(this, -props.step)
    this.handleMouseUp = this.handleMouseUp.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleKeyUp = this.handleKeyUp.bind(this)
  }

  componentWillUnmount() {
    this.hold = false
    if (this.keyPressTimeOut) clearTimeout(this.keyPressTimeOut)
  }

  handleChange(value, check) {
    if (!check) {
      if (new RegExp('^-?\\d*\\.?\\d*$').test(value)) {
        this.props.onChange(value)
      }
      return
    }

    const stepStr = this.props.step.toString()
    const dot = stepStr.lastIndexOf('.')
    if (dot >= 0) value = parseFloat(value.toFixed(stepStr.length - dot))

    const { min, max } = this.props

    if (max !== undefined && value > max) value = max
    if (min !== undefined && value < min) value = min


    if (value !== this.props.value) {
      this.props.onChange(value)
    }
  }

  handleBlur(e) {
    let value = parseFloat(e.target.value)
    // eslint-disable-next-line
    if (isNaN(value)) value = 0
    this.handleChange(value, true)
    this.props.onBlur(e)
  }

  changeValue(mod) {
    if (this.props.disabled) return
    let value = parseFloat(this.props.value)
    // eslint-disable-next-line
    if (isNaN(value)) value = 0
    this.handleChange(value + mod, true)
  }

  longPress(mod) {
    if (!this.hold) return
    setTimeout(() => {
      this.changeValue(mod)
      this.longPress(mod)
    }, 50)
  }

  handleKeyDown(e) {
    const { step } = this.props
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

  handleCalc(mod) {
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

  handleMouseUp() {
    this.hold = false
    if (this.keyPressTimeOut) clearTimeout(this.keyPressTimeOut)
  }

  render() {
    const { onChange, ...other } = this.props
    return [
      <Input
        key="input"
        {...other}
        className={inputClass('number')}
        onChange={this.handleChange}
        onKeyDown={this.handleKeyDown}
        onKeyUp={this.handleKeyUp}
        onBlur={this.handleBlur}
        type="number"
      />,

      <a
        key="up"
        className={inputClass('number-up')}
        href="javascript:;"
        onMouseDown={this.handleAddClick}
        onMouseUp={this.handleMouseUp}
        onMouseLeave={this.handleMouseUp}
      >
        {icons.AngleRight}
      </a>,

      <a
        key="down"
        className={inputClass('number-down')}
        href="javascript:;"
        onMouseDown={this.handleSubClick}
        onMouseUp={this.handleMouseUp}
        onMouseLeave={this.handleMouseUp}
      >
        {icons.AngleRight}
      </a>,
    ]
  }
}

Number.propTypes = {
  disabled: PropTypes.bool,
  min: PropTypes.number,
  max: PropTypes.number,
  onBlur: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  step: PropTypes.number,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
}

Number.defaultProps = {
  step: 1,
}

export default Number
