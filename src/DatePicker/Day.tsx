import React from 'react'
import { datepickerClass } from './styles'
import utils from './utils'
import paramUtils from './paramUtils'
import Icon from './Icon'
import { getLocale } from '../locale'
import { PureComponent } from '../component'
import Time from './Time'
import { isArray } from '../utils/is'
import { UnionPannelProps } from './Props'

const minStr = 'yyyy-MM-dd 00:00:00'
const maxStr = 'yyyy-MM-dd 23:59:59'

interface DayState {
  hover: Date | null
}

class Day extends PureComponent<UnionPannelProps, DayState> {
  handleNextMonth: () => void

  handlePrevMonth: () => void

  handleNextYear: () => void

  handlePrevYear: () => void

  handleMonthMode: () => void

  handleYearMode: () => void

  handleWeekLeave: () => void

  cachedDays: Date[]

  cachedDate: Date

  today: Date

  constructor(props: UnionPannelProps) {
    super(props)

    this.state = {
      hover: null,
    }

    this.handleNextMonth = this.handleMonth.bind(this, 1)
    this.handlePrevMonth = this.handleMonth.bind(this, -1)
    this.handleNextYear = this.handleMonth.bind(this, 12)
    this.handlePrevYear = this.handleMonth.bind(this, -12)
    this.handleMonthMode = this.handleModeChange.bind(this, 'month')
    this.handleYearMode = this.handleModeChange.bind(this, 'year')
    this.handleWeekLeave = this.handleWeek.bind(this, null)
    this.handleTimeChange = this.handleTimeChange.bind(this)
    this.handleDisabled = this.handleDisabled.bind(this)
    this.formatWithDefaultTime = this.formatWithDefaultTime.bind(this)
    props.disabledRegister(this.handleDisabled, 'day', props.index)
  }

  getOptions() {
    const { timeZone } = this.props
    return { timeZone, weekStartsOn: getLocale('startOfWeek') }
  }

  getDays() {
    const { current } = this.props
    if (!current) return this.cachedDays
    const date = utils.clearHMS(current, this.getOptions())
    if (this.cachedDate && utils.isSameMonth(this.cachedDate, date, this.getOptions()) && this.cachedDays) {
      return this.cachedDays
    }
    this.cachedDays = utils.getDaysOfMonth(date, this.getOptions())
    this.cachedDate = date

    return this.cachedDays
  }

  formatWithDefaultTime(i?: number) {
    let idx = 0
    const { current, defaultTime, index } = this.props
    if (typeof index === 'number') idx = index
    if (typeof i === 'number') idx = i
    if (!defaultTime[idx]) return current
    return utils.cloneTime(current, defaultTime[idx], utils.TIME_FORMAT, this.getOptions())
  }

  handleDayDoubleClick(date: Date) {
    const { type, defaultTime, index } = this.props
    // range & datetime & deafultTime
    if (type !== 'datetime' || !defaultTime.length || index === undefined) return
    this.handleDayClick(date, 0)
    this.handleDayClick(date, 1)
  }

  handleDayClick(date: Date, sync?: number) {
    const { type, allowSingle, rangeDate, min, max, index, value, onChangeSync } = this.props
    const current = (index === sync && value) || this.formatWithDefaultTime(sync)
    const onChange =
      typeof sync === 'number' && onChangeSync ? onChangeSync.bind(this.props, sync) : this.props.onChange
    if (type === 'week') {
      onChange(...paramUtils.weekHandleChangeParams(date, true, true))
    } else {
      let newDate: Date | string = utils.setTime(utils.toDate(date), current)
      // only can select day with the same day of min/max
      if (min && utils.compareAsc(newDate, min) < 0) utils.setTime(newDate, min)
      if (max && utils.compareAsc(newDate, max) > 0) utils.setTime(newDate, max)
      if (
        allowSingle &&
        isArray(rangeDate) &&
        index !== undefined &&
        rangeDate[index] &&
        utils.clearHMS(newDate, this.getOptions()).getTime() ===
          utils.clearHMS(rangeDate[index], this.getOptions()).getTime()
      )
        newDate = ''
      onChange(...paramUtils.dayHandleChangeParams(newDate, true, type !== 'datetime'))
    }
  }

  handleTimeChange(time: Date) {
    if (this.props.onChange) this.props.onChange(...paramUtils.timeHandleChangeParams(time, true, false))
  }

  handleWeek(hover: boolean) {
    this.setState({ hover })
  }

  handleMonth(month: number) {
    const { current, onChange } = this.props
    // warning: month === 12 || month === -12, this is statement is year mode.
    if (month === -12 || month === 12) {
      onChange(...paramUtils.yearHandleChangeParams(utils.addMonths(current, month, this.getOptions())))
      return
    }
    onChange(...paramUtils.monthHandleChangeParams(utils.addMonths(current, month, this.getOptions())))
  }

  handleModeChange(mode: 'month' | 'year') {
    this.props.onModeChange(mode)
  }

  handleDayHover(date: Date) {
    const { onDayHover } = this.props

    if (onDayHover) onDayHover(date)
  }

  handleDisabled(date: Date, minDate?: Date, maxDate?: Date) {
    const { index, disabled, range, rangeTemp, min, max } = this.props
    const minD = minDate || (min && utils.toDate(utils.format(min, minStr, this.getOptions()), this.getOptions()))
    const maxD = maxDate || (max && utils.toDate(utils.format(max, maxStr, this.getOptions()), this.getOptions()))
    let isDisabled = disabled && typeof disabled === 'function' ? disabled(date) : false
    // only for single, single picker don't has index
    if (index === undefined && !isDisabled) {
      if ((minD && utils.compareAsc(date, minD) < 0) || (maxD && utils.compareAsc(date, maxD) > 0)) isDisabled = true
    }
    if (!isDisabled && index === 1 && rangeTemp) {
      if (
        (typeof range === 'number' &&
          utils.compareAsc(date, utils.addSeconds(rangeTemp, range, this.getOptions())) > 0) ||
        utils.compareAsc(date, utils.clearHMS(rangeTemp, this.getOptions())) < 0 ||
        (min && utils.compareAsc(date, utils.clearHMS(min, this.getOptions())) < 0) ||
        utils.compareAsc(date, max) > 0
      ) {
        isDisabled = true
      }
      // if (utils.compareAsc(date, min) < 0) isDisabled = true
    }

    if (!isDisabled && index === 0) {
      if (
        (min && utils.compareAsc(date, utils.clearHMS(min, this.getOptions())) < 0) ||
        utils.compareAsc(date, max) > 0
      ) {
        isDisabled = true
      }
    }
    return isDisabled
  }

  renderDay(date: Date, minD?: Date, maxD?: Date) {
    const { current, value, index, type, rangeDate } = this.props
    const { hover } = this.state
    const isDisabled = this.handleDisabled(date, minD, maxD)

    const classList = [
      utils.isSameDay(date, this.today, this.getOptions()) && 'today',
      utils.compareMonth(current, date, 0, this.getOptions()) !== 0 && 'other-month',
      isDisabled && 'disabled',
    ]

    let hoverClass
    const hoverProps: {
      onMouseEnter?: () => void
      onMouseLeave?: () => void
    } = {}
    const weekStart = getLocale('startOfWeek')
    const weekEnd = weekStart ? 0 : 6
    const day = utils.getDateInfo(date, 'day', this.getOptions())
    if (type === 'week') {
      hoverProps.onMouseEnter = this.handleWeek.bind(this, date)
      hoverProps.onMouseLeave = this.handleWeekLeave
      if (utils.isSameWeek(date, value, this.getOptions())) {
        hoverClass = datepickerClass('active', day === weekStart && 'hover-start', day === weekEnd && 'hover-end')
      } else if (hover && utils.isSameWeek(date, hover, this.getOptions())) {
        hoverClass = datepickerClass('hover', day === weekStart && 'hover-start', day === weekEnd && 'hover-end')
      }
    } else if (rangeDate && utils.compareMonth(current, date, 0, this.getOptions()) === 0 && index !== undefined) {
      hoverProps.onMouseEnter = this.handleDayHover.bind(this, date)

      classList.push(utils.isSameDay(date, rangeDate[index], this.getOptions()) && 'active')

      hoverClass = datepickerClass(
        utils.compareDay(rangeDate[0], date, 0, this.getOptions()) <= 0 &&
          utils.compareDay(rangeDate[1], date, 0, this.getOptions()) >= 0 &&
          'hover',
        // Datetime Picker range end datetime classname #330
        utils.isSameDay(rangeDate[index], date, this.getOptions()) && `hover-${index === 0 ? 'start' : 'end'} active`
      )
    } else if (value) {
      classList.push(utils.isSameDay(date, value, this.getOptions()) && 'active')
    }

    return (
      <div
        key={date.getTime()}
        className={hoverClass}
        onClick={isDisabled ? undefined : this.handleDayClick.bind(this, date, undefined)}
        onDoubleClick={isDisabled ? undefined : this.handleDayDoubleClick.bind(this, date, undefined)}
        {...hoverProps}
      >
        <span className={datepickerClass(...classList)}>{utils.getDateInfo(date, 'date', this.getOptions())}</span>
      </div>
    )
  }

  renderTimepicker() {
    const { rangeDate, index, showTimePicker } = this.props
    if (this.props.type !== 'datetime') return undefined
    if (!showTimePicker) return undefined

    let { format } = this.props
    if (/^[T|t]$/.test(format)) {
      format = 'HH:mm:ss'
    } else {
      const match = format.match(/[H|h].*/)
      // eslint-disable-next-line
      if (match) format = match[0]
    }

    const value =
      rangeDate && index !== undefined
        ? utils.toDateWithFormat(rangeDate[index], format, undefined, this.getOptions())
        : this.props.value
    if (!value) return undefined

    return (
      <div className={datepickerClass('datetime')}>
        <Icon name="Clock" className="clock" />
        <Time {...this.props} format={format} value={value} onChange={this.handleTimeChange} />
        <span>{utils.format(value, format, this.getOptions())}</span>
      </div>
    )
  }

  render() {
    const { current, min, index, max } = this.props
    const days = this.getDays()
    this.today = utils.newDate(undefined, this.getOptions())
    const minDate = min && utils.toDate(utils.format(min, minStr, this.getOptions()), this.getOptions())
    const maxDate = max && utils.toDate(utils.format(max, maxStr, this.getOptions()), this.getOptions())
    return (
      <div className={datepickerClass('day-picker')}>
        <div className={datepickerClass('title')}>{index !== undefined && getLocale('pickerTitle')[index]}</div>
        <div className={datepickerClass('header')}>
          <Icon
            name="AngleDoubleLeft"
            className="left"
            disabled={!!(min && utils.compareYear(current, min, -1, this.getOptions()) === -1)}
            onClick={this.handlePrevYear}
          />
          <Icon
            name="AngleLeft"
            className="left"
            disabled={!!(min && utils.compareMonth(current, min, 0, this.getOptions()) <= 0)}
            onClick={this.handlePrevMonth}
          />

          <span className={datepickerClass('ym')}>
            <span onClick={this.handleYearMode}>{utils.getDateInfo(current, 'year', this.getOptions())}</span>
            <span onClick={this.handleMonthMode}>
              {getLocale('monthValues.short')[utils.getDateInfo(current, 'month', this.getOptions())]}
            </span>
          </span>

          <Icon name="AngleRight" className="right" onClick={this.handleNextMonth} />
          <Icon onClick={this.handleNextYear} name="AngleDoubleRight" className="right" />
        </div>

        <div className={datepickerClass('week')}>
          {getLocale('weekdayValues.narrow').map((w: string) => (
            <span key={w}>{w}</span>
          ))}
        </div>

        <div className={datepickerClass('list')}>{days.map(d => this.renderDay(d, minDate, maxDate))}</div>

        <div style={{ flex: 1 }} />

        {this.renderTimepicker()}
      </div>
    )
  }
}

export default Day
