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
import { PickerProps, Mode } from './Props'

interface PickerState {
  mode: Mode
}

class Picker extends PureComponent<PickerProps, PickerState> {
  defaultCurrent: Date | Date[]

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

  handleQuick(quick: { invalid: boolean; value: Date[]; name?: string }) {
    const { onChange } = this.props
    onChange(...paramUtils.quickHandleChangeParams(quick.value[0], true, null, null, quick))
  }

  handleMouse(isEnter: boolean, e: Event) {
    // stop
    e.stopPropagation()

    const { index, handleHover } = this.props
    if (handleHover && index !== undefined) handleHover(index, isEnter)
  }

  handleModeChange(mode: Mode) {
    setTimeout(() => {
      this.setState({ mode })
    }, 10)
  }

  render() {
    const { mode } = this.state
    const { current, index, ...otherProps } = this.props

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
          <Render
            {...otherProps}
            current={(current || this.defaultCurrent) as Date}
            onModeChange={this.handleModeChange}
          />
        </div>
      )
    return (
      <div onMouseEnter={this.handleEnter} onMouseLeave={this.handleLeave}>
        <Render
          {...otherProps}
          index={index}
          current={(current || this.defaultCurrent) as Date}
          onModeChange={this.handleModeChange}
        />
      </div>
    )
  }
}

export default Picker
