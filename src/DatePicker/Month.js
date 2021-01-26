import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { datepickerClass } from '../styles'
import Icon from './Icon'
import utils from './utils'
import { getLocale } from '../locale'

const MONTHBASE = '2019-01-01 00:00:00'

class Month extends PureComponent {
  constructor(props) {
    super(props)

    this.handleNextYear = this.handleYearChange.bind(this, 1)
    this.handlePrevYear = this.handleYearChange.bind(this, -1)
    this.handleYearClick = this.handleYearClick.bind(this)
  }

  handleYearChange(year) {
    const { current, onChange } = this.props
    onChange(...utils.yearHandleChangeParams(utils.addYears(current, year)))
  }

  handleYearClick() {
    this.props.onModeChange('year')
  }

  handleMonthClick(month) {
    const { current, onChange, onModeChange } = this.props
    const date = new Date(current.getTime())
    const isMonthType = this.props.type === 'month'

    date.setMonth(month, 1)
    onChange(...utils.monthHandleChangeParams(date, isMonthType, isMonthType))
    if (!isMonthType) onModeChange('day')
  }

  renderMonth(m, i) {
    const { value, min, disabled, range, type, current } = this.props
    const date = new Date(MONTHBASE)
    date.setMonth(i)
    date.setFullYear(current.getFullYear())

    let isDisabled = min && utils.compareMonth(min, date, 1) >= 0

    if (!isDisabled && type === 'month' && typeof disabled === 'function') {
      isDisabled = disabled(date)
    }

    if (!isDisabled && min && typeof range === 'number' && utils.compareAsc(date, utils.addSeconds(min, range)) > 0) {
      isDisabled = true
    }

    // if (!isDisabled && max && range && utils.compareAsc(date, utils.addSeconds(max, -range)) < 0) {
    //   isDisabled = true
    // }

    const className = datepickerClass(utils.isSameMonth(value, date) && 'active', isDisabled && 'disabled')

    return (
      <span key={i} className={className} onClick={isDisabled ? undefined : this.handleMonthClick.bind(this, i)}>
        {m}
      </span>
    )
  }

  render() {
    const { current } = this.props

    return (
      <div className={datepickerClass('month-picker')}>
        <div className={datepickerClass('header')}>
          <Icon name="AngleLeft" className="left" onClick={this.handlePrevYear} />

          <span onClick={this.handleYearClick.bind(this)} className={datepickerClass('ym')}>
            {current.getFullYear()}
          </span>

          <Icon name="AngleRight" className="right" onClick={this.handleNextYear} />
        </div>

        <div className={datepickerClass('list')}>{getLocale('monthValues.short').map(this.renderMonth.bind(this))}</div>
      </div>
    )
  }
}

Month.propTypes = {
  current: PropTypes.object.isRequired,
  disabled: PropTypes.func,
  // max: PropTypes.object,
  min: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  onChange: PropTypes.func.isRequired,
  onModeChange: PropTypes.func.isRequired,
  range: PropTypes.number,
  type: PropTypes.string.isRequired,
  value: PropTypes.object,
}

export default Month
