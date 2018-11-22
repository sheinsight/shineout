import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { datepickerClass } from '../styles'
import utils from './utils'
import Icon from './Icon'
import { getLocale } from '../locale'
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
  }

  getDays() {
    const { current } = this.props
    if (this.cachedDate && this.cachedDate.getTime() === current.getTime() && this.cachedDays) {
      return this.cachedDays
    }
    this.cachedDays = utils.getDaysOfMonth(current)
    this.cachedDate = current

    return this.cachedDays
  }

  handleDayClick(date) {
    const { current, type } = this.props
    if (type === 'week') {
      if (date.getDay() === 0) {
        date = utils.addDays(date, 1)
      }
      this.props.onChange(date, true, true)
    } else {
      const newDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        current.getHours(),
        current.getMinutes(),
        current.getSeconds(),
      )
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
    const {
      current, disabled, value, type, rangeDate, range, rangeTemp,
    } = this.props
    const { hover } = this.state
    let isDisabled = disabled ? disabled(date) : false

    if (!isDisabled && typeof range === 'number' && rangeTemp) {
      if (utils.compareAsc(date, utils.addSeconds(rangeTemp, range)) > 0 ||
        utils.compareAsc(date, utils.addSeconds(rangeTemp, -range)) < 0) {
        isDisabled = true
      }
    }

    const classList = [
      current.getMonth() !== date.getMonth() && 'other-month',
      isDisabled && 'disabled',
    ]

    let hoverClass
    const hoverProps = {}
    if (type === 'week') {
      hoverProps.onMouseEnter = this.handleWeek.bind(this, date)
      hoverProps.onMouseLeave = this.handleWeekLeave
      if (utils.isSameWeek(date, value)) {
        hoverClass = datepickerClass(
          'active',
          date.getDay() === 0 && 'hover-start',
          date.getDay() === 6 && 'hover-end',
        )
      } else if (hover && utils.isSameWeek(date, hover)) {
        hoverClass = datepickerClass(
          'hover',
          date.getDay() === 0 && 'hover-start',
          date.getDay() === 6 && 'hover-end',
        )
      }
    } else if (rangeDate && current.getMonth() === date.getMonth()) {
      hoverProps.onMouseEnter = this.handleDayHover.bind(this, date)

      hoverClass = datepickerClass(
        utils.compareAsc(rangeDate[0], date) <= 0 && utils.compareAsc(rangeDate[1], date) >= 0 && 'hover',
        utils.isSameDay(rangeDate[0], date) && 'hover-start active',
        utils.isSameDay(rangeDate[1], date) && 'hover-end active',
      )
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
    const match = format.match(/[H|h].*/)
    // eslint-disable-next-line
    if (match) format = match[0]
    const value = rangeDate ? utils.toDateWithFormat(rangeDate[index], format) : this.props.value
    if (!value) return undefined

    return (
      <div className={datepickerClass('datetime')}>
        <Time {...this.props} value={value} onChange={this.handleTimeChange} />
        <span>{utils.format(value, format)}</span>
      </div>
    )
  }

  render() {
    const { current, min, max } = this.props
    const days = this.getDays()

    return (
      <div className={datepickerClass('day-picker')}>
        <div className={datepickerClass('header')}>
          <Icon
            name="AngleDoubleLeft"
            disabled={min && current.getFullYear() <= min.getFullYear()}
            onClick={this.handlePrevYear}
          />
          <Icon
            name="AngleLeft"
            disabled={min && utils.compareMonth(current, min, 1) <= 0}
            onClick={this.handlePrevMonth}
          />

          <span className={datepickerClass('ym')}>
            <span onClick={this.handleYearMode}>{current.getFullYear()}</span>
            <span onClick={this.handleMonthMode}>
              {getLocale('monthValues.short')[current.getMonth()]}
            </span>
          </span>

          <Icon
            name="AngleRight"
            disabled={max && utils.compareMonth(current, max, -1) >= 0}
            onClick={this.handleNextMonth}
          />
          <Icon
            onClick={this.handleNextYear}
            disabled={max && current.getFullYear() >= max.getFullYear()}
            name="AngleDoubleRight"
          />
        </div>

        <div className={datepickerClass('week')}>
          { getLocale('weekdayValues.narrow').map(w => <span key={w}>{w}</span>) }
        </div>

        <div className={datepickerClass('list')}>
          {
            days.map(d => this.renderDay(d))
          }
        </div>

        { this.renderTimepicker() }
      </div>
    )
  }
}

Day.propTypes = {
  current: PropTypes.object.isRequired,
  disabled: PropTypes.func,
  format: PropTypes.string,
  index: PropTypes.number,
  max: PropTypes.object,
  min: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  onDayHover: PropTypes.func,
  onModeChange: PropTypes.func.isRequired,
  range: PropTypes.number,
  rangeDate: PropTypes.array,
  rangeTemp: PropTypes.object,
  showTimePicker: PropTypes.bool,
  type: PropTypes.string.isRequired,
  value: PropTypes.object,
}

export default Day
