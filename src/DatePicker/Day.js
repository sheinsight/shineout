import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import utils from './utils'
import icons from '../icons'
import { datepickerClass } from '../styles'

const Icon = (icon, onClick) => <a href="javascript:;" className={datepickerClass('icon')} onClick={onClick}>{icon}</a>

class Day extends PureComponent {
  constructor(props) {
    super(props)

    this.handleNextMonth = this.handleMonth.bind(this, 1)
    this.handlePrevMonth = this.handleMonth.bind(this, -1)
    this.handleNextYear = this.handleMonth.bind(this, 12)
    this.handlePrevYear = this.handleMonth.bind(this, -12)
  }

  getDays() {
    const { value } = this.props
    if (utils.isSameMonth(this.cachedDate, value) && this.cachedDays) {
      return this.cachedDays
    }
    this.cachedDays = utils.getDaysOfMonth(value)
    this.cachedDate = value

    return this.cachedDays
  }

  getClassName(d) {
    const { value } = this.props
    return datepickerClass(
      value.getMonth() !== d.getMonth() && 'other-month',
      utils.isSameDay(d, value) && 'active',
    )
  }

  handleDayClick(date) {
    this.props.onChange(date, true)
  }

  handleMonth(month) {
    const { value, onChange } = this.props
    onChange(utils.addMonths(value, month))
  }

  render() {
    const { value } = this.props
    const days = this.getDays()

    return (
      <div className={datepickerClass('picker', 'day-picker')}>
        <div className={datepickerClass('header')}>
          { Icon(icons.AngleDoubleLeft, this.handlePrevYear) }
          { Icon(icons.AngleLeft, this.handlePrevMonth) }

          <span className={datepickerClass('ym')}>
            <a href="javascript:;">{value.getFullYear()}</a>
            <a href="javascript:;">{value.getMonth() + 1}</a>
          </span>

          { Icon(icons.AngleRight, this.handleNextMonth) }
          { Icon(icons.AngleDoubleRight, this.handleNextYear) }
        </div>

        <div className={datepickerClass('week')} />

        <div className={datepickerClass('list')}>
          {
            days.map(d => (
              <a
                className={this.getClassName(d)}
                key={d.getTime()}
                onClick={this.handleDayClick.bind(this, d)}
                href="javascript:;"
              >
                {d.getDate()}
              </a>
            ))
          }
        </div>
      </div>
    )
  }
}

Day.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.object.isRequired,
}

export default Day
