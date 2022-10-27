import React from 'react'
import Day from './Day'
import Time from './Time'
import Year from './Year'
import Month from './Month'
import utils from './utils'
import Quick from './Quick'
import Quarter from './Quarter'
import paramUtils from './paramUtils'
import { getLocale } from '../locale'
import { datepickerClass } from './styles'
import { PureComponent } from '../component'
import { DatePickerProps, DatePickerValue, DateTimeType } from './interface'

export type Mode = 'year' | 'month' | 'quarter' | 'time' | 'day' | 'minute' | 'second' | 'hour'

export interface PickerProps {
  index: number
  current: DatePickerValue
  max?: DatePickerProps['max']
  min?: DatePickerProps['min']
  type: DatePickerProps['type']
  value: DatePickerProps['value']
  format?: DatePickerProps['format']
  onChange: DatePickerProps['onChange']
  children: DatePickerProps['children']
  timeZone: DatePickerProps['timeZone']
  disabled?: DatePickerProps['disabled']
  defaultTime?: [Date, Date]
  handleHover: (index: number, isEnter: boolean) => void
}

interface PickerState {
  mode: Mode
}

class Picker extends PureComponent<PickerProps, PickerState> {
  defaultCurrent: any

  handleEnter: React.MouseEventHandler<HTMLDivElement>

  handleLeave: React.MouseEventHandler<HTMLDivElement>

  constructor(props: PickerProps) {
    super(props)

    let mode: Mode
    switch (props.type) {
      case 'year':
        mode = 'year'
        break
      case 'month':
        mode = 'month'
        break
      case 'quarter':
        mode = 'quarter'
        break
      case 'time':
        mode = 'time'
        break
      default:
        mode = 'day'
    }

    this.state = { mode }
    const format = 'yyyy-MM-dd HH:mm:ss'
    this.defaultCurrent = utils.toDateWithFormat(
      utils.formatDateWithDefaultTime(
        utils.newDate(undefined, this.getOptions()),
        undefined,
        Array.isArray(props.defaultTime) ? props.defaultTime[0] : props.defaultTime,
        format,
        this.getOptions()
      ),
      format,
      undefined,
      this.getOptions()
    )
    this.handleModeChange = this.handleModeChange.bind(this)
    this.handleEnter = this.handleMouse.bind(this, true)
    this.handleLeave = this.handleMouse.bind(this, false)
    this.handleQuick = this.handleQuick.bind(this)
  }

  getOptions() {
    const { timeZone } = this.props
    return { timeZone, weekStartsOn: getLocale('startOfWeek') }
  }

  handleQuick(quick: { name: string; value: DatePickerValue }) {
    const { onChange } = this.props
    const value = [
      ...paramUtils.quickHandleChangeParams(
        (quick.value as [DateTimeType, DateTimeType])[0],
        true,
        null,
        null,
        quick
      )[0],
    ]
    if (onChange) onChange(value[0], value[1])
  }

  handleMouse(isEnter: boolean, e: Event) {
    // stop
    e.stopPropagation()

    const { index, handleHover } = this.props

    handleHover(index, isEnter)
  }

  handleModeChange(mode: Mode) {
    setTimeout(() => {
      this.setState({ mode })
    }, 10)
  }

  render() {
    const { mode } = this.state
    const { current, index, children, ...otherProps } = this.props

    let Render
    switch (mode) {
      case 'year':
        Render = Year
        break
      case 'month':
        Render = Month
        break
      case 'time':
        Render = Time
        break
      case 'quarter':
        Render = Quarter
        break
      default:
        Render = Day
    }

    // only range has index prop
    if (index === undefined)
      return (
        <div className={datepickerClass('split')}>
          <Quick {...otherProps} current={current || this.defaultCurrent} onChange={this.handleQuick} />
          <Render {...otherProps} current={current || this.defaultCurrent} onModeChange={this.handleModeChange} />
        </div>
      )

    return (
      <div onMouseEnter={this.handleEnter} onMouseLeave={this.handleLeave}>
        <Render
          {...otherProps}
          index={index}
          current={current || this.defaultCurrent}
          onModeChange={this.handleModeChange}
        />
      </div>
    )
  }
}

export default Picker
