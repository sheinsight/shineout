import React, { PureComponent } from 'react'
import { datepickerClass } from './styles'
import Icon from './Icon'
import utils from './utils'
import { getLocale } from '../locale'
import paramUtils from './paramUtils'
import { UnionPannelProps } from './Props'
import { isArray, isNumber } from '../utils/is'

const MONTHBASE = '2019-01-01 00:00:00'

class Month extends PureComponent<UnionPannelProps> {
  handleNextYear: () => void

  handlePrevYear: () => void

  constructor(props: UnionPannelProps) {
    super(props)

    this.handleNextYear = this.handleYearChange.bind(this, 1)
    this.handlePrevYear = this.handleYearChange.bind(this, -1)
    this.handleYearClick = this.handleYearClick.bind(this)
    this.handleDisabled = this.handleDisabled.bind(this)

    props.disabledRegister(this.handleDisabled, 'month', props.index)
  }

  getOptions() {
    const { timeZone } = this.props
    return { timeZone, weekStartsOn: getLocale('startOfWeek') }
  }

  handleYearChange(year: number) {
    const { current, onChange } = this.props
    onChange(...paramUtils.yearHandleChangeParams(utils.addYears(current, year, this.getOptions())))
  }

  handleYearClick() {
    this.props.onModeChange('year')
  }

  handleMonthClick(month: number) {
    const { current, onChange, onModeChange } = this.props
    let date = new Date(current.getTime())
    const isMonthType = this.props.type === 'month'
    date = utils.changeDate(date, 'month', month, this.getOptions())
    date = utils.changeDate(date, 'date', 1, this.getOptions())
    onChange(...paramUtils.monthHandleChangeParams(date, isMonthType, isMonthType))
    if (!isMonthType) onModeChange('day')
  }

  handleDisabled(date: Date) {
    const { min, disabled, range, type, index, rangeDate, max } = this.props

    let isDisabled = min && utils.compareMonth(min, date, 1, this.getOptions()) >= 0
    if (!isDisabled) {
      isDisabled = max && utils.compareMonth(date, max, 1, this.getOptions()) >= 0
    }

    if (!isDisabled && type === 'month' && typeof disabled === 'function') {
      isDisabled = disabled(date)
    }

    if (!isDisabled && index === 1 && isArray(rangeDate)) {
      if (
        isNumber(range) &&
        rangeDate[0] &&
        utils.compareAsc(date, utils.addSeconds(rangeDate[0], range, this.getOptions())) > 0
      ) {
        isDisabled = true
      }
    }
    return isDisabled
  }

  renderMonth(m: string, i: number) {
    const { value, current } = this.props
    let date = utils.toDate(MONTHBASE, this.getOptions())
    date = utils.changeDate(date, 'year', utils.getDateInfo(current, 'year', this.getOptions()), this.getOptions())
    date = utils.changeDate(date, 'month', i, this.getOptions())
    const isDisabled = this.handleDisabled(date)

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

export default Month
