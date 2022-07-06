import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { datepickerClass } from './styles'
import Icon from './Icon'
import utils from './utils'
import { getLocale } from '../locale'
import paramUtils from './paramUtils'

const MONTHBASE = '2019-01-01 00:00:00'

class Month extends PureComponent {
  constructor(props) {
    super(props)

    this.handleNextYear = this.handleYearChange.bind(this, 1)
    this.handlePrevYear = this.handleYearChange.bind(this, -1)
    this.handleYearClick = this.handleYearClick.bind(this)
  }

  getOptions() {
    const { timeZone } = this.props
    return { timeZone, weekStartsOn: getLocale('startOfWeek') }
  }

  handleYearChange(year) {
    const { current, onChange } = this.props
    onChange(...paramUtils.yearHandleChangeParams(utils.addYears(current, year, this.getOptions())))
  }

  handleYearClick() {
    this.props.onModeChange('year')
  }

  handleMonthClick(month) {
    const { current, onChange, onModeChange } = this.props
    let date = new Date(current.getTime())
    const isMonthType = this.props.type === 'month'
    date = utils.changeDate(date, 'month', month, this.getOptions())
    date = utils.changeDate(date, 'date', 1, this.getOptions())
    onChange(...paramUtils.monthHandleChangeParams(date, isMonthType, isMonthType))
    if (!isMonthType) onModeChange('day')
  }

  renderMonth(m, i) {
    const { value, min, disabled, range, type, current, index, rangeDate, max } = this.props
    let date = utils.toDate(MONTHBASE, this.getOptions())
    date = utils.changeDate(date, 'year', utils.getDateInfo(current, 'year', this.getOptions()), this.getOptions())
    date = utils.changeDate(date, 'month', i, this.getOptions())

    let isDisabled = min && utils.compareMonth(min, date, 1, this.getOptions()) >= 0
    if (!isDisabled) {
      isDisabled = max && utils.compareMonth(date, max, 1, this.getOptions()) >= 0
    }

    if (!isDisabled && type === 'month' && typeof disabled === 'function') {
      isDisabled = disabled(date)
    }

    if (!isDisabled && index === 0) {
      if (rangeDate[1] && utils.compareAsc(date, utils.addSeconds(rangeDate[1], -range, this.getOptions())) < 0) {
        isDisabled = true
      }
    }

    if (!isDisabled && index === 1) {
      if (rangeDate[0] && utils.compareAsc(date, utils.addSeconds(rangeDate[0], range, this.getOptions())) > 0) {
        isDisabled = true
      }
    }

    const className = datepickerClass(
      utils.isSameMonth(value, date, this.getOptions()) && 'active',
      isDisabled && 'disabled'
    )

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
            {utils.getDateInfo(current, 'year', this.getOptions())}
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
  max: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  min: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  onChange: PropTypes.func.isRequired,
  onModeChange: PropTypes.func.isRequired,
  range: PropTypes.number,
  type: PropTypes.string.isRequired,
  value: PropTypes.object,
  index: PropTypes.number,
  rangeDate: PropTypes.array,
  timeZone: PropTypes.string,
}

export default Month
