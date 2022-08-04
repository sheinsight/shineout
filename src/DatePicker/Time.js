import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { datepickerClass } from './styles'
import TimeScroll from './TimeScroll'
import utils from './utils'
import { isRTL } from '../config'
import paramUtils from './paramUtils'

class Time extends PureComponent {
  constructor(props) {
    super(props)

    this.defaultValue = this.getDefaultTime()
    this.handleHourChange = this.handleChange.bind(this, 'hour')
    this.handleMinuteChange = this.handleChange.bind(this, 'minute')
    this.handleSecondChange = this.handleChange.bind(this, 'second')
    this.handleAMPMChange = this.handleChange.bind(this, 'ampm')
    this.handleDisabled = this.handleDisabled.bind(this)

    props.disabledRegister(this.handleDisabled, 'time', props.index)
  }

  getDefaultTime() {
    let idx = 0
    const current = utils.newDate()
    const { index, defaultTime, format } = this.props
    if (typeof index === 'number') idx = index
    if (!defaultTime[idx]) return current
    return utils.cloneTime(current, defaultTime[idx], format)
  }

  getValue() {
    return this.props.value || this.defaultValue
  }

  handleDisabled(value, val, mode, onlyVaild) {
    const { disabled, min, max, range, disabledTime } = this.props
    const [isDisabled, date] = paramUtils.judgeTimeByRange(val, value, mode, min, max, range, disabled, disabledTime)
    return onlyVaild ? isDisabled : [isDisabled, date]
  }

  handleChange(type, val) {
    const { format } = this.props
    const value = this.getValue()

    let mode = type

    if (type === 'hour') {
      if (format.indexOf('h') >= 0) {
        mode = 'h'
      } else {
        mode = 'H'
      }
    }
    const [isDisabled, date] = this.handleDisabled(value, val, mode)

    if (isDisabled) return
    this.props.onChange(...paramUtils.timeHandleChangeParams(date, true, false, 'time'))
  }

  renderTimeScroller(value, min, max, hours) {
    const { format, hourStep, minuteStep, secondStep, range, disabled, disabledTime } = this.props

    const rtl = isRTL()
    let res = [
      format.indexOf('H') >= 0 && (
        <TimeScroll
          key="HH"
          current={value}
          value={value.getHours()}
          mode="H"
          range={range}
          min={min}
          max={max}
          disabled={disabled}
          total={24}
          step={hourStep}
          onChange={this.handleHourChange}
          disabledTime={disabledTime}
        />
      ),
      format.indexOf('h') >= 0 && (
        <TimeScroll
          key="hh"
          current={value}
          mode="h"
          range={range}
          min={min}
          max={max}
          disabled={disabled}
          value={hours}
          total={12}
          step={hourStep}
          onChange={this.handleHourChange}
          disabledTime={disabledTime}
        />
      ),
      format.indexOf('m') >= 0 && (
        <TimeScroll
          key="mm"
          current={value}
          mode="m"
          range={range}
          min={min}
          max={max}
          disabled={disabled}
          value={value.getMinutes()}
          step={minuteStep}
          onChange={this.handleMinuteChange}
          disabledTime={disabledTime}
        />
      ),
      format.indexOf('s') >= 0 && (
        <TimeScroll
          key="ss"
          current={value}
          mode="s"
          range={range}
          min={min}
          max={max}
          disabled={disabled}
          value={value.getSeconds()}
          step={secondStep}
          onChange={this.handleSecondChange}
          disabledTime={disabledTime}
        />
      ),
      /a|A/.test(format) && (
        <TimeScroll
          key="ampm"
          current={value}
          mode="ampm"
          range={range}
          min={min}
          max={max}
          disabled={disabled}
          value={value.getHours() >= 12 ? 1 : 0}
          total={2}
          ampm
          onChange={this.handleAMPMChange}
          disabledTime={disabledTime}
        />
      ),
    ]

    if (rtl) {
      res = res.reverse()
    }

    return res
  }

  render() {
    const { format, min: mi, max: ma } = this.props
    const value = this.getValue()
    const className = datepickerClass('time-picker')

    let hours = value.getHours()
    if (format.indexOf('h') >= 0 && hours >= 12) {
      hours -= 12
    }

    // reset
    const min = utils.resetTimeByFormat(mi, format)
    const max = utils.resetTimeByFormat(ma, format)

    return <div className={className}>{this.renderTimeScroller(value, min, max, hours)}</div>
  }
}

Time.propTypes = {
  disabled: PropTypes.func,
  format: PropTypes.string.isRequired,
  min: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  max: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  onChange: PropTypes.func.isRequired,
  range: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  value: PropTypes.object,
  defaultTime: PropTypes.array,
  index: PropTypes.number,
  hourStep: PropTypes.number,
  minuteStep: PropTypes.number,
  secondStep: PropTypes.number,
  disabledTime: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  disabledRegister: PropTypes.func,
}

export default Time
