import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Icon from 'shineout/DatePicker/Icon'
import utils from 'shineout/DatePicker/utils'
import paramUtils from 'shineout/DatePicker/paramUtils'
import { datepickerClass } from './styles'

const Quarters = ['Q1', 'Q2', 'Q3', 'Q4']

class Quarter extends PureComponent {
  constructor(props) {
    super(props)
    this.handleNextYear = this.handleYearChange.bind(this, 1)
    this.handlePrevYear = this.handleYearChange.bind(this, -1)
    this.handleQuarterClick = this.handleQuarterClick.bind(this)
  }

  handleYearChange(year) {
    const { current, onChange } = this.props
    onChange(...paramUtils.yearHandleChangeParams(utils.addYears(current, year)))
  }

  handleYearClick() {
    this.props.onModeChange('year')
  }

  handleQuarterClick(date) {
    const { onChange } = this.props
    onChange(...paramUtils.quarterHandleChangeParams(date, true, true))
  }

  renderQuarter(q, i) {
    const { current, disabled, index, min, max, rangeDate, range, value, type } = this.props
    const year = current.getFullYear()
    const date = utils.parse(`${year} ${i + 1}`, 'yyyy Q')

    let isDisabled = min && utils.compareQuarter(min, date, 1) >= 0
    if (!isDisabled) {
      isDisabled = max && utils.compareQuarter(date, max, 1) >= 0
    }

    if (!isDisabled && type === 'quarter' && typeof disabled === 'function') {
      isDisabled = disabled(date)
    }

    if (!isDisabled && index === 0) {
      if (rangeDate[1] && utils.compareAsc(date, utils.addSeconds(rangeDate[1], -range)) < 0) {
        isDisabled = true
      }
    }

    if (!isDisabled && index === 1) {
      console.log(date, rangeDate[0])
      if (rangeDate[0] && utils.compareQuarter(date, utils.addSeconds(rangeDate[0], range)) > 0) {
        isDisabled = true
      }
    }

    // let hoverClass
    const classList = [isDisabled && 'disabled']
    if (rangeDate) {
      if (utils.isSameQuarter(date, rangeDate[index])) {
        classList.push('active')
      }
      // hoverClass = datepickerClass(
      //   rangeDate[0] &&
      //     utils.compareQuarter(rangeDate[0], date) <= 0 &&
      //     rangeDate[1] &&
      //     utils.compareQuarter(rangeDate[1], date) >= 0 &&
      //     'hover',
      //   // Datetime Picker range end datetime classname #330
      //   utils.isSameQuarter(rangeDate[index], date) && `hover-${index === 0 ? 'start' : 'end'} active`
      // )
    } else if (value) {
      if (utils.isSameQuarter(date, value)) {
        classList.push('active')
      }
    }
    return (
      <div
        key={date.getTime()}
        // className={hoverClass}
        onClick={isDisabled ? undefined : this.handleQuarterClick.bind(this, date, undefined)}
      >
        <span className={datepickerClass(...classList)}>{q}</span>
      </div>
    )
  }

  render() {
    const { current } = this.props
    return (
      <div className={datepickerClass('quarter-picker')}>
        <div className={datepickerClass('header')}>
          <Icon name="AngleLeft" className="left" onClick={this.handlePrevYear} />

          <span onClick={this.handleYearClick.bind(this)} className={datepickerClass('ym')}>
            {current.getFullYear()}
          </span>

          <Icon name="AngleRight" className="right" onClick={this.handleNextYear} />
        </div>
        <div className={datepickerClass('list')}>{Quarters.map((q, i) => this.renderQuarter(q, i))}</div>
      </div>
    )
  }
}

Quarter.propTypes = {
  current: PropTypes.object.isRequired,
  disabled: PropTypes.func,
  index: PropTypes.number,
  max: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  min: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  onChange: PropTypes.func.isRequired,
  onModeChange: PropTypes.func.isRequired,
  range: PropTypes.number,
  rangeDate: PropTypes.array,
  type: PropTypes.string.isRequired,
  value: PropTypes.object,
}

export default Quarter
