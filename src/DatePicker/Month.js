import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { datepickerClass } from '../styles'
import Icon from './Icon'
import utils from './utils'
import { getLocale } from '../locale'

class Month extends PureComponent {
  constructor(props) {
    super(props)

    this.handleNextYear = this.handleYearChange.bind(this, 1)
    this.handlePrevYear = this.handleYearChange.bind(this, -1)
    this.handleYearClick = this.handleYearClick.bind(this)
  }

  handleYearChange(year) {
    const { current, onChange } = this.props
    onChange(utils.addYears(current, year))
  }

  handleYearClick() {
    this.props.onModeChange('year')
  }

  handleMonthClick(month) {
    const { current, onChange, onModeChange } = this.props
    const date = new Date(current.getTime())
    const isMonthType = this.props.type === 'month'

    date.setMonth(month)
    onChange(date, isMonthType, isMonthType)
    if (!isMonthType) onModeChange('day')
  }

  renderMonth(m, i) {
    const {
      current, value, min, max,
    } = this.props
    const date = new Date(current.getFullYear(), i, 1)

    const disabled = (min && utils.compareMonth(min, date) >= 0) ||
      (max && utils.compareMonth(max, date) <= 0)

    const className = datepickerClass(
      utils.isSameMonth(value, date) && 'active',
      disabled && 'disabled',
    )

    return (
      <span
        key={i}
        className={className}
        onClick={disabled ? undefined : this.handleMonthClick.bind(this, i)}
      >
        {m}
      </span>
    )
  }

  render() {
    const { current } = this.props

    return (
      <div className={datepickerClass('month-picker')}>
        <div className={datepickerClass('header')}>
          <Icon name="AngleLeft" onClick={this.handlePrevYear} />

          <span onClick={this.handleYearClick.bind(this)} className={datepickerClass('ym')}>
            {current.getFullYear()}
          </span>

          <Icon name="AngleRight" onClick={this.handleNextYear} />
        </div>

        <div className={datepickerClass('list')}>
          { getLocale('monthValues.short').map(this.renderMonth.bind(this)) }
        </div>
      </div>
    )
  }
}

Month.propTypes = {
  current: PropTypes.object.isRequired,
  max: PropTypes.object,
  min: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  onModeChange: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.object,
}

export default Month
