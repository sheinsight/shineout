import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { datepickerClass } from '../styles'
import TimeScroll from './TimeScroll'
import utils from './utils'

class Time extends PureComponent {
  constructor(props) {
    super(props)

    this.defaultValue = this.getDefaultTime()
    this.handleHourChange = this.handleChange.bind(this, 'hour')
    this.handleMinuteChange = this.handleChange.bind(this, 'minute')
    this.handleSecondChange = this.handleChange.bind(this, 'second')
    this.handleAMPMChange = this.handleChange.bind(this, 'ampm')
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

  handleChange(type, val) {
    const { disabled, format, min, max, range } = this.props
    const value = this.getValue()

    let mode = type

    if (type === 'hour') {
      if (format.indexOf('h') >= 0) {
        mode = 'h'
      } else {
        mode = 'H'
      }
    }

    const [isDisabled, date] = utils.judgeTimeByRange(val, value, mode, min, max, range, disabled)

    if (isDisabled) return
    this.props.onChange(date, true, false, 'time')
  }

  render() {
    const { format, hourStep, minuteStep, secondStep, range, min: mi, max: ma, disabled } = this.props
    const value = this.getValue()
    const className = datepickerClass('time-picker')

    let hours = value.getHours()
    if (format.indexOf('h') >= 0 && hours >= 12) {
      hours -= 12
    }

    // reset
    const min = utils.resetTimeByFormat(mi && new Date(mi), format)
    const max = utils.resetTimeByFormat(ma && new Date(ma), format)

    return (
      <div className={className}>
        {format.indexOf('H') >= 0 && (
          <TimeScroll
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
          />
        )}
        {format.indexOf('h') >= 0 && (
          <TimeScroll
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
          />
        )}
        {format.indexOf('m') >= 0 && (
          <TimeScroll
            current={value}
            mode="m"
            range={range}
            min={min}
            max={max}
            disabled={disabled}
            value={value.getMinutes()}
            step={minuteStep}
            onChange={this.handleMinuteChange}
          />
        )}
        {format.indexOf('s') >= 0 && (
          <TimeScroll
            current={value}
            mode="s"
            range={range}
            min={min}
            max={max}
            disabled={disabled}
            value={value.getSeconds()}
            step={secondStep}
            onChange={this.handleSecondChange}
          />
        )}
        {/a|A/.test(format) && (
          <TimeScroll
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
          />
        )}
      </div>
    )
  }
}

Time.propTypes = {
  disabled: PropTypes.func,
  format: PropTypes.string.isRequired,
  min: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  max: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  onChange: PropTypes.func.isRequired,
  range: PropTypes.number,
  value: PropTypes.object,
  defaultTime: PropTypes.array,
  index: PropTypes.number,
  hourStep: PropTypes.number,
  minuteStep: PropTypes.number,
  secondStep: PropTypes.number,
}

export default Time
