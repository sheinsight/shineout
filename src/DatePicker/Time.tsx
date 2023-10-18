import React, { PureComponent } from 'react'
import { datepickerClass } from './styles'
import TimeScroll from './TimeScroll'
import utils from './utils'
import { isRTL } from '../config'
import paramUtils from './paramUtils'
import { getLocale } from '../locale'
import { UnionPannelProps, TimeMode } from './Props'

class Time extends PureComponent<UnionPannelProps> {
  defaultValue: Date

  handleMinuteChange: (val: number) => void

  handleHourChange: (val: number) => void

  handleSecondChange: (val: number) => void

  handleAMPMChange: (val: number) => void

  constructor(props: UnionPannelProps) {
    super(props)

    this.defaultValue = this.getDefaultTime()
    this.handleHourChange = this.handleChange.bind(this, 'hour')
    this.handleMinuteChange = this.handleChange.bind(this, 'minute')
    this.handleSecondChange = this.handleChange.bind(this, 'second')
    this.handleAMPMChange = this.handleChange.bind(this, 'ampm')
    this.handleDisabled = this.handleDisabled.bind(this)

    props.disabledRegister(this.handleDisabled, 'time', props.index)
  }

  getOptions() {
    const { timeZone } = this.props
    return { timeZone, weekStartsOn: getLocale('startOfWeek') }
  }

  getDefaultTime() {
    let idx = 0
    const current = utils.newDate(undefined, this.getOptions())
    const { index, defaultTime, format } = this.props
    if (typeof index === 'number') idx = index
    if (!defaultTime[idx]) return current
    return utils.cloneTime(current, defaultTime[idx], format, this.getOptions())
  }

  getValue() {
    return this.props.value || this.defaultValue
  }

  handleDisabled(
    value: Date,
    val: number,
    mode: 'H' | 'h' | 'm' | 'minute' | 's' | 'second' | 'ampm',
    onlyVaild?: boolean
  ) {
    const { disabled, min, max, range, disabledTime, index, rangeDate } = this.props
    const [isDisabled, date] = paramUtils.judgeTimeByRange({
      target: val,
      value,
      mode,
      min,
      max,
      range,
      disabled,
      disabledTime,
      index,
      rangeDate,
      options: this.getOptions(),
    })
    return onlyVaild ? isDisabled : [isDisabled, date]
  }

  handleChange(type: 'hour' | 'minute' | 'second' | 'ampm', val: number) {
    const { format } = this.props
    const value = this.getValue()

    let mode: TimeMode | 'h' | 'H' = type

    if (type === 'hour') {
      if (format.indexOf('h') >= 0) {
        mode = 'h'
      } else {
        mode = 'H'
      }
    }
    const [isDisabled, date] = this.handleDisabled(value, val, mode as
      | 'H'
      | 'h'
      | 'm'
      | 'minute'
      | 's'
      | 'second'
      | 'ampm') as [boolean, Date]

    if (isDisabled) return
    this.props.onChange(...paramUtils.timeHandleChangeParams(date, true, false, true))
    this.props.onChange(paramUtils.timeHandleChangeParams(date, true, false)[0])
  }

  renderTimeScroller(value: Date, min: Date | null, max: Date | null, hours: number) {
    const {
      format,
      hourStep,
      minuteStep,
      secondStep,
      range,
      disabled,
      disabledTime,
      index,
      rangeDate,
      timeZone,
    } = this.props

    const rtl = isRTL()
    let res = [
      format.indexOf('H') >= 0 && (
        <TimeScroll
          key="HH"
          current={value}
          value={utils.getDateInfo(value, 'hour', this.getOptions())}
          mode="H"
          range={range}
          min={min}
          max={max}
          disabled={disabled}
          total={24}
          step={hourStep}
          onChange={this.handleHourChange}
          disabledTime={disabledTime}
          index={index}
          rangeDate={rangeDate}
          timeZone={timeZone}
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
          index={index}
          rangeDate={rangeDate}
          timeZone={timeZone}
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
          value={utils.getDateInfo(value, 'minute', this.getOptions())}
          step={minuteStep}
          onChange={this.handleMinuteChange}
          disabledTime={disabledTime}
          index={index}
          rangeDate={rangeDate}
          timeZone={timeZone}
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
          value={utils.getDateInfo(value, 'second', this.getOptions())}
          step={secondStep}
          onChange={this.handleSecondChange}
          disabledTime={disabledTime}
          index={index}
          rangeDate={rangeDate}
          timeZone={timeZone}
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
          value={utils.getDateInfo(value, 'hour', this.getOptions()) >= 12 ? 1 : 0}
          total={2}
          ampm
          onChange={this.handleAMPMChange}
          disabledTime={disabledTime}
          index={index}
          rangeDate={rangeDate}
          timeZone={timeZone}
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
    const min = utils.resetTimeByFormat(mi, format, this.getOptions())
    const max = utils.resetTimeByFormat(ma, format, this.getOptions())

    return <div className={className}>{this.renderTimeScroller(value, min, max, hours)}</div>
  }
}

export default Time
