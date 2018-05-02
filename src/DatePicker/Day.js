import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import utils from './utils'
import { datepickerClass } from '../styles'
import Icon from './Icon'
import { getLocate } from './locate'

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
    this.handleMonthModel = this.handleModelChange.bind(this, 'month')
    this.handleYearModel = this.handleModelChange.bind(this, 'year')
    this.handleWeekLeave = this.handleWeek.bind(this, null)
  }

  getDays() {
    const { current } = this.props
    if (utils.isSameMonth(this.cachedDate, current) && this.cachedDays) {
      return this.cachedDays
    }
    this.cachedDays = utils.getDaysOfMonth(current)
    this.cachedDate = current

    return this.cachedDays
  }

  handleDayClick(date) {
    if (this.props.type === 'week' && date.getDay() === 0) {
      date = utils.addDays(date, 1)
    }
    this.props.onChange(date, true)
  }

  handleWeek(hover) {
    this.setState({ hover })
  }

  handleMonth(month) {
    const { current, onChange } = this.props
    onChange(utils.addMonths(current, month))
  }

  handleModelChange(model) {
    this.props.onModelChange(model)
  }

  renderDay(date) {
    const {
      current, disabled, value, type,
    } = this.props
    const { hover } = this.state
    const isDisabled = disabled ? disabled(date) : false

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
    } else {
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

  render() {
    const { current } = this.props
    const days = this.getDays()

    return (
      <div className={datepickerClass('day-picker')}>
        <div className={datepickerClass('header')}>
          <Icon onClick={this.handlePrevYear} name="AngleDoubleLeft" />
          <Icon onClick={this.handlePrevMonth} name="AngleLeft" />

          <span className={datepickerClass('ym')}>
            <span onClick={this.handleYearModel}>{current.getFullYear()}</span>
            <span onClick={this.handleMonthModel}>
              {getLocate('monthValues.short')[current.getMonth()]}
            </span>
          </span>

          <Icon onClick={this.handleNextMonth} name="AngleRight" />
          <Icon onClick={this.handleNextYear} name="AngleDoubleRight" />
        </div>

        <div className={datepickerClass('week')}>
          { getLocate('weekdayValues.narrow').map(w => <span key={w}>{w}</span>) }
        </div>

        <div className={datepickerClass('list')}>
          {
            days.map(d => this.renderDay(d))
          }
        </div>
      </div>
    )
  }
}

Day.propTypes = {
  current: PropTypes.object.isRequired,
  disabled: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  onModelChange: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.object.isRequired,
}

export default Day
