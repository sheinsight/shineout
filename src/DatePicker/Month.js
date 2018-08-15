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

    date.setMonth(month, 1)
    onChange(date, isMonthType, isMonthType)
    if (!isMonthType) onModeChange('day')
  }

  renderMonth(m, i) {
    const {
      current, value, min, max, disabled, range, type,
    } = this.props
    const date = new Date(current.getTime())
    date.setMonth(i)

    let isDisabled = (min && utils.compareMonth(min, date, 1) >= 0) ||
      (max && utils.compareMonth(max, date, -1) <= 0)

    if (!isDisabled && type === 'month' && typeof disabled === 'function') {
      isDisabled = disabled(date)
    }

    if (!isDisabled && min && range && utils.compareAsc(date, utils.addSeconds(min, range)) > 0) {
      isDisabled = true
    }

    if (!isDisabled && max && range && utils.compareAsc(date, utils.addSeconds(max, -range)) < 0) {
      isDisabled = true
    }

    const className = datepickerClass(
      utils.isSameMonth(value, date) && 'active',
      isDisabled && 'disabled',
    )

    return (
      <span
        key={i}
        className={className}
        onClick={isDisabled ? undefined : this.handleMonthClick.bind(this, i)}
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
  disabled: PropTypes.func,
  max: PropTypes.object,
  min: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  onModeChange: PropTypes.func.isRequired,
  range: PropTypes.number,
  type: PropTypes.string.isRequired,
  value: PropTypes.object,
}

export default Month
