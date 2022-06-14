import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { range as getRange } from '../utils/numbers'
import { datepickerClass } from './styles'
import Icon from './Icon'
import utils from './utils'
import paramUtils from './paramUtils'

const MONTHBASE = '2019-01-01 00:00:00'

class Year extends PureComponent {
  constructor(props) {
    super(props)

    this.handlePrevRange = this.handleRangeChange.bind(this, -15)
    this.handleNextRange = this.handleRangeChange.bind(this, 15)
    this.renderYear = this.renderYear.bind(this)
  }

  handleChange(year) {
    const { current, onChange, onModeChange, type } = this.props
    const date = new Date(current.getTime())
    date.setFullYear(year)
    const isYearType = this.props.type === 'year'
    onChange(...paramUtils.yearHandleChangeParams(date, isYearType, isYearType))
    if (isYearType) return
    let nextMode = 'month'
    if (type === 'quarter') {
      nextMode = type
    }
    onModeChange(nextMode)
  }

  handleRangeChange(year) {
    const { current, onChange } = this.props
    onChange(...paramUtils.yearHandleChangeParams(utils.addYears(current, year)))
  }

  renderYear(y) {
    const { value, min, disabled, range, type, index, rangeDate, max } = this.props
    const date = utils.toDate(MONTHBASE)
    date.setFullYear(y)

    let isDisabled = min && utils.compareYear(min, date, 1) >= 0
    if (!isDisabled) {
      isDisabled = max && utils.compareYear(date, max, 1) >= 0
    }

    if (!isDisabled && type === 'month' && typeof disabled === 'function') {
      isDisabled = disabled(date)
    }

    if (!isDisabled && index === 0) {
      if (rangeDate[1] && utils.compareAsc(date, utils.addSeconds(rangeDate[1], -range)) < 0) {
        isDisabled = true
      }
    }

    if (!isDisabled && index === 1) {
      if (rangeDate[0] && utils.compareAsc(date, utils.addSeconds(rangeDate[0], range)) > 0) {
        isDisabled = true
      }
    }

    const className = datepickerClass(value && value.getFullYear() === y && 'active', isDisabled && 'disabled')

    return (
      <span key={y} className={className} onClick={isDisabled ? undefined : this.handleChange.bind(this, y)}>
        {y}
      </span>
    )
  }

  render() {
    const { current } = this.props
    const cy = current.getFullYear() - 7
    const years = getRange(15, 0).map(i => cy + i)

    return (
      <div className={datepickerClass('year-picker')}>
        <div className={datepickerClass('header')}>
          <Icon name="AngleLeft" className="left" onClick={this.handlePrevRange} />

          <span className={datepickerClass('ym')}>{`${years[0]} ~ ${years[years.length - 1]}`}</span>

          <Icon name="AngleRight" className="right" onClick={this.handleNextRange} />
        </div>

        <div className={datepickerClass('list')}>
          {years.map(this.renderYear)}
        </div>
      </div>
    )
  }
}

Year.propTypes = {
  disabled: PropTypes.func,
  current: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onModeChange: PropTypes.func.isRequired,
  value: PropTypes.object,
  type: PropTypes.string,
  max: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  min: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  range: PropTypes.number,
  index: PropTypes.number,
  rangeDate: PropTypes.array,
}

export default Year
