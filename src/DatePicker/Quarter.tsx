import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Icon from './Icon'
import utils from './utils'
import paramUtils from './paramUtils'
import { datepickerClass } from './styles'
import { getLocale } from '../locale'

const Quarters = ['Q1', 'Q2', 'Q3', 'Q4']

class Quarter extends PureComponent {
  constructor(props) {
    super(props)
    this.handleNextYear = this.handleYearChange.bind(this, 1)
    this.handlePrevYear = this.handleYearChange.bind(this, -1)
    this.handleQuarterClick = this.handleQuarterClick.bind(this)
    this.handleDisabled = this.handleDisabled.bind(this)

    props.disabledRegister(this.handleDisabled, 'quarter', props.index)
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

  handleQuarterClick(date) {
    const { onChange } = this.props
    onChange(...paramUtils.quarterHandleChangeParams(date, true, true))
  }

  handleDisabled(date) {
    const { disabled, index, min, max, rangeDate, range, type } = this.props

    let isDisabled = min && utils.compareQuarter(min, date, 1, this.getOptions()) >= 0
    if (!isDisabled) {
      isDisabled = max && utils.compareQuarter(date, max, 1, this.getOptions()) >= 0
    }

    if (!isDisabled && type === 'quarter' && typeof disabled === 'function') {
      isDisabled = disabled(date)
    }

    if (!isDisabled && index === 0) {
      if (
        rangeDate[1] &&
        utils.compareQuarter(date, utils.addSeconds(rangeDate[1], -range, this.getOptions()), 0, this.getOptions()) < 0
      ) {
        isDisabled = true
      }
    }

    if (!isDisabled && index === 1) {
      if (
        rangeDate[0] &&
        utils.compareQuarter(date, utils.addSeconds(rangeDate[0], range, this.getOptions()), 0, this.getOptions()) > 0
      ) {
        isDisabled = true
      }
    }
    return isDisabled
  }

  renderQuarter(q, i) {
    const { current, index, rangeDate, value } = this.props
    const year = utils.getDateInfo(current, 'year', this.getOptions())
    const date = utils.parse(`${year} ${i + 1}`, 'yyyy Q', this.getOptions())
    const isDisabled = this.handleDisabled(date)
    // let hoverClass
    const classList = [isDisabled && 'disabled']
    if (rangeDate) {
      if (utils.isSameQuarter(date, rangeDate[index], this.getOptions())) {
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
      if (utils.isSameQuarter(date, value, this.getOptions())) {
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
            {utils.getDateInfo(current, 'year', this.getOptions())}
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
  timeZone: PropTypes.string,
  disabledRegister: PropTypes.func,
}

export default Quarter
