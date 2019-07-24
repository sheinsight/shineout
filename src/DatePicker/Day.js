import React from 'react'
import PropTypes from 'prop-types'
import { datepickerClass } from '../styles'
import utils from './utils'
import Icon from './Icon'
import { getLocale } from '../locale'
import { PureComponent } from '../component'
import Time from './Time'

class Day extends PureComponent {
  constructor(props) {
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
    this.formatWithDefaultTime = this.formatWithDefaultTime.bind(this)
  }

  getDays() {
    const { current } = this.props
    if (!current) return this.cachedDays
    if (this.cachedDate && utils.isSameMonth(this.cachedDate, current) && this.cachedDays) {
      return this.cachedDays
    }
    this.cachedDays = utils.getDaysOfMonth(current)
    this.cachedDate = current

    return this.cachedDays
  }

  formatWithDefaultTime() {
    const { current, defaultTime } = this.props
    if (!defaultTime[0]) return current
    return utils.cloneTime(current, defaultTime[0], utils.TIME_FORMAT)
  }

  handleDayClick(date) {
    const { type, allowSingle, rangeDate, index } = this.props
    const current = this.formatWithDefaultTime()
    if (type === 'week') {
      if (date.getDay() === 0) {
        date = utils.addDays(date, 1)
      }
      this.props.onChange(date, true, true)
    } else {
      let newDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        current.getHours(),
        current.getMinutes(),
        current.getSeconds()
      )
      if (allowSingle && rangeDate[index] && newDate.getTime() === rangeDate[index].getTime()) newDate = ''
      this.props.onChange(newDate, true, type !== 'datetime')
    }
  }

  handleTimeChange(time, change, end, mode) {
    this.props.onChange(time, true, false, mode)
  }

  handleWeek(hover) {
    this.setState({ hover })
  }

  handleMonth(month) {
    const { current, onChange } = this.props
    onChange(utils.addMonths(current, month))
  }

  handleModeChange(mode) {
    this.props.onModeChange(mode)
  }

  handleDayHover(date) {
    this.props.onDayHover(date)
  }

  renderDay(date) {
    const { current, disabled, value, index, type, rangeDate, range, rangeTemp } = this.props
    const { hover } = this.state
    let isDisabled = disabled ? disabled(date) : false

    if (!isDisabled && typeof range === 'number' && rangeTemp && index === 1) {
      if (utils.compareAsc(date, utils.addSeconds(rangeTemp, range)) > 0 || utils.compareAsc(date, rangeTemp) < 0) {
        isDisabled = true
      }
    }

    const classList = [
      utils.isSameDay(date, this.today) && 'today',
      current.getMonth() !== date.getMonth() && 'other-month',
      isDisabled && 'disabled',
    ]

    let hoverClass
    const hoverProps = {}
    if (type === 'week') {
      hoverProps.onMouseEnter = this.handleWeek.bind(this, date)
      hoverProps.onMouseLeave = this.handleWeekLeave
      if (utils.isSameWeek(date, value)) {
        hoverClass = datepickerClass('active', date.getDay() === 0 && 'hover-start', date.getDay() === 6 && 'hover-end')
      } else if (hover && utils.isSameWeek(date, hover)) {
        hoverClass = datepickerClass('hover', date.getDay() === 0 && 'hover-start', date.getDay() === 6 && 'hover-end')
      }
    } else if (rangeDate && current.getMonth() === date.getMonth()) {
      hoverProps.onMouseEnter = this.handleDayHover.bind(this, date)

      classList.push(utils.isSameDay(date, rangeDate[index]) && 'active')

      hoverClass = datepickerClass(
        utils.compareAsc(rangeDate[0], date) <= 0 && utils.compareAsc(rangeDate[1], date) >= 0 && 'hover',
        utils.isSameDay(rangeDate[index], date) && 'hover-start active'
      )
      // utils.isSameDay(rangeDate[1], date) && 'hover-end active'
    } else if (value) {
      classList.push(utils.isSameDay(date, value) && 'active')
    }

    return (
      <div
        key={date.getTime()}
        className={hoverClass}
        onClick={isDisabled ? undefined : this.handleDayClick.bind(this, date)}
        {...hoverProps}
      >
        <span className={datepickerClass(...classList)}>{date.getDate()}</span>
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

    const value = rangeDate ? utils.toDateWithFormat(rangeDate[index], format) : this.props.value
    if (!value) return undefined

    return (
      <div className={datepickerClass('datetime')}>
        <Time {...this.props} format={format} value={value} onChange={this.handleTimeChange} />
        <span>{utils.format(value, format)}</span>
      </div>
    )
  }

  render() {
    const { current, min, index } = this.props
    const days = this.getDays()
    this.today = utils.newDate()

    return (
      <div className={datepickerClass('day-picker')}>
        <div className={datepickerClass('title')}>{getLocale('pickerTitle')[index]}</div>
        <div className={datepickerClass('header')}>
          <Icon
            name="AngleDoubleLeft"
            disabled={!!(min && current.getFullYear() <= min.getFullYear())}
            onClick={this.handlePrevYear}
          />
          <Icon
            name="AngleLeft"
            disabled={!!(min && utils.compareMonth(current, min) <= 0)}
            onClick={this.handlePrevMonth}
          />

          <span className={datepickerClass('ym')}>
            <span onClick={this.handleYearMode}>{current.getFullYear()}</span>
            <span onClick={this.handleMonthMode}>{getLocale('monthValues.short')[current.getMonth()]}</span>
          </span>

          <Icon
            name="AngleRight"
            // disabled={max && utils.compareMonth(current, max, 0) >= 0}
            onClick={this.handleNextMonth}
          />
          <Icon
            onClick={this.handleNextYear}
            // disabled={max && current.getFullYear() >= max.getFullYear()}
            name="AngleDoubleRight"
          />
        </div>

        <div className={datepickerClass('week')}>
          {getLocale('weekdayValues.narrow').map(w => (
            <span key={w}>{w}</span>
          ))}
        </div>

        <div className={datepickerClass('list')}>{days.map(d => this.renderDay(d))}</div>

        <div style={{ flex: 1 }} />

        {this.renderTimepicker()}
      </div>
    )
  }
}

Day.propTypes = {
  current: PropTypes.object.isRequired,
  disabled: PropTypes.func,
  format: PropTypes.string,
  index: PropTypes.number,
  max: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  min: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  onChange: PropTypes.func.isRequired,
  onDayHover: PropTypes.func,
  onModeChange: PropTypes.func.isRequired,
  range: PropTypes.number,
  rangeDate: PropTypes.array,
  rangeTemp: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  showTimePicker: PropTypes.bool,
  type: PropTypes.string.isRequired,
  value: PropTypes.object,
  defaultTime: PropTypes.array,
  allowSingle: PropTypes.bool,
}

export default Day
