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

  /**
   * Get the disabled time range
   *
   * @param {array} ts [min: boolean, max: boolean]
   * @returns [min: [hour, mins, sec] | false, max: [hour, mins, sec] | false]
   * @memberof Time
   */
  getDisabledTime(ts) {
    // ts: [min: boolean, max: boolean]
    const { min, max } = this.props
    if (ts[0]) {
      ts[0] = [min.getHours(), min.getMinutes(), min.getSeconds()]
    }
    if (ts[1]) {
      ts[1] = [max.getHours(), max.getMinutes(), max.getSeconds()]
    }
    return [
      this.resetByValue(ts[0], (n, m) => n > m, (n, m) => n < m),
      this.resetByValue(ts[1], (n, m) => n < m, (n, m) => n > m),
    ]
  }

  // eslint-disable-next-line class-methods-use-this
  getDisabledByType(type = null, ts = []) {
    const target = ['h', 'm', 's'].indexOf(type)
    return ts.map(v => v && v[target])
  }

  /**
   * reset disabled time range by value
   *  if judge return true, disabled time range will be set with null
   *  if all return true, disabled time range will be set with 99(all numbers is disabled)
   *
   * for this.getDisabledTime()
   *
   * @param {array} ts [hour: number, min: number, sec: number]
   * @param {function} judge (value, limit) => boolean
   * @param {function} all (value, limit) => boolean
   * @returns [hour: number, min: number, sec: number]
   * @memberof Time
   */
  resetByValue(ts, judge, all) {
    // ts: [hour: number, min: number, sec: number]
    const value = this.getValue()
    if (!ts || !value) return false
    /**
     * Judge the hours according to the judge and all func
     * if judge return true, mins and seconds will be set with null
     * if all return true, mins and seconds will be set with 99(all mins and sec is disabled)
     */
    let v = value.getHours()
    if (judge(v, ts[0])) {
      ts[1] = null
      ts[2] = null
      return ts
    }

    if (all(v, ts[0])) {
      ts[1] = 99
      ts[2] = 99
      return ts
    }

    /**
     * Judge the minutes according to the judge and all func
     * if judge return true, seconds will be set with null
     * if all return true, seconds will be set with 99(all sec is disabled)
     */
    v = value.getMinutes()
    if (judge(v, ts[1])) {
      ts[2] = null
      return ts
    }

    if (all(v, ts[1])) {
      ts[2] = 99
      return ts
    }

    return ts
  }

  /**
   * Determine whether there is disabled time
   *  for this.getDisabledTime()
   *
   *
   * @returns [min: boolean, max: boolean]
   * @memberof Time
   */
  haveDisabledTime() {
    const value = this.getValue()
    const { min, max } = this.props
    const result = []
    // judge date equal min or max
    const current = utils.format(value, 'yyyy-MM-dd 00:00:00')
    let judgeValue = utils.format(min, 'yyyy-MM-dd 00:00:00')
    result.push(utils.isEqual(current, judgeValue))

    judgeValue = utils.format(max, 'yyyy-MM-dd 00:00:00')
    result.push(utils.isEqual(current, judgeValue))
    return result
  }

  handleChange(type, val) {
    const { disabled, format, min, max, range } = this.props
    const value = this.getValue()
    const date = new Date(value.getTime())
    let hours

    switch (type) {
      case 'hour':
        if (format.indexOf('h') >= 0 && date.getHours() >= 12) {
          date.setHours(val + 12)
        } else {
          date.setHours(val)
        }
        break
      case 'minute':
        date.setMinutes(val)
        break
      case 'second':
        date.setSeconds(val)
        break
      case 'ampm':
        hours = date.getHours()
        if (val === 1 && hours < 12) date.setHours(hours + 12)
        else if (val === 0 && hours >= 12) date.setHours(hours - 12)
        break
      default:
    }

    let isDisabled
    if (disabled) isDisabled = disabled(date)

    // remove the start pos condition
    // if support min and max in range mode, then start Picker also can limit the time.
    // if (pos !== 'start') {
    if (!isDisabled && min) {
      if (utils.compareAsc(date, min) < 0) return
      if (range && utils.compareAsc(date, utils.addSeconds(min, range)) > 0) return
    }
    if (!isDisabled && max) {
      if (utils.compareAsc(date, max) > 0) return
      if (range && utils.compareAsc(date, utils.addSeconds(max, -range)) < 0) return
    }
    // }

    if (isDisabled) return
    this.props.onChange(date, true, false, 'time')
  }

  render() {
    const { format } = this.props
    const value = this.getValue()
    const className = datepickerClass('time-picker')

    let hours = value.getHours()
    if (format.indexOf('h') >= 0 && hours >= 12) {
      hours -= 12
    }

    const disabledTime = this.getDisabledTime(this.haveDisabledTime())

    return (
      <div className={className}>
        {format.indexOf('H') >= 0 && (
          <TimeScroll
            value={value.getHours()}
            total={24}
            onChange={this.handleHourChange}
            timeRange={this.getDisabledByType('h', disabledTime)}
          />
        )}
        {format.indexOf('h') >= 0 && (
          <TimeScroll
            value={hours}
            total={12}
            onChange={this.handleHourChange}
            timeRange={this.getDisabledByType('h', disabledTime)}
          />
        )}
        {format.indexOf('m') >= 0 && (
          <TimeScroll
            value={value.getMinutes()}
            onChange={this.handleMinuteChange}
            timeRange={this.getDisabledByType('m', disabledTime)}
          />
        )}
        {format.indexOf('s') >= 0 && (
          <TimeScroll
            value={value.getSeconds()}
            onChange={this.handleSecondChange}
            timeRange={this.getDisabledByType('s', disabledTime)}
          />
        )}
        {/a|A/.test(format) && (
          <TimeScroll value={value.getHours() >= 12 ? 1 : 0} total={2} ampm onChange={this.handleAMPMChange} />
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
}

export default Time
