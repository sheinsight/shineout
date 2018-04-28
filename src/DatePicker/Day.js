import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import utils from './utils'
import { datepickerClass } from '../styles'
import Icon from './Icon'
import { getLocate } from './locate'

class Day extends PureComponent {
  constructor(props) {
    super(props)

    this.handleNextMonth = this.handleMonth.bind(this, 1)
    this.handlePrevMonth = this.handleMonth.bind(this, -1)
    this.handleNextYear = this.handleMonth.bind(this, 12)
    this.handlePrevYear = this.handleMonth.bind(this, -12)
    this.handleMonthModel = this.handleModelChange.bind(this, 'month')
    this.handleYearModel = this.handleModelChange.bind(this, 'year')
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

  getClassName(d) {
    const { current, value } = this.props
    return datepickerClass(
      current.getMonth() !== d.getMonth() && 'other-month',
      utils.isSameDay(d, value) && 'active',
    )
  }

  handleDayClick(date) {
    this.props.onChange(date, true)
  }

  handleMonth(month) {
    const { current, onChange } = this.props
    onChange(utils.addMonths(current, month))
  }

  handleModelChange(model) {
    this.props.onModelChange(model)
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
            <span onClick={this.handleMonthModel}>{getLocate('monthValues.short')[current.getMonth()]}</span>
          </span>

          <Icon onClick={this.handleNextMonth} name="AngleRight" />
          <Icon onClick={this.handleNextYear} name="AngleDoubleRight" />
        </div>

        <div className={datepickerClass('week')}>
          { getLocate('weekdayValues.narrow').map(w => <span key={w}>{w}</span>) }
        </div>

        <div className={datepickerClass('list')}>
          {
            days.map(d => (
              <span
                className={this.getClassName(d)}
                key={d.getTime()}
                onClick={this.handleDayClick.bind(this, d)}
              >
                {d.getDate()}
              </span>
            ))
          }
        </div>
      </div>
    )
  }
}

Day.propTypes = {
  current: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onModelChange: PropTypes.func.isRequired,
  value: PropTypes.object.isRequired,
}

export default Day
