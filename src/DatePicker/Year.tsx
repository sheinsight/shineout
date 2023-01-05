import React, { PureComponent } from 'react'
import { range as getRange } from '../utils/numbers'
import { datepickerClass } from './styles'
import Icon from './Icon'
import { getLocale } from '../locale'
import utils from './utils'
import paramUtils from './paramUtils'
import { isArray } from '../utils/is'
import { UnionPannelProps, Mode } from './Props'

const MONTHBASE = '2019-01-01 00:00:00'

class Year extends PureComponent<UnionPannelProps> {
  handlePrevRange: (year: number) => void

  handleNextRange: (year: number) => void

  constructor(props: UnionPannelProps) {
    super(props)

    this.handlePrevRange = this.handleRangeChange.bind(this, -15)
    this.handleNextRange = this.handleRangeChange.bind(this, 15)
    this.renderYear = this.renderYear.bind(this)
    this.handleDisabled = this.handleDisabled.bind(this)

    props.disabledRegister(this.handleDisabled, 'year', props.index)
  }

  getOptions() {
    const { timeZone } = this.props
    return { timeZone, weekStartsOn: getLocale('startOfWeek') }
  }

  handleChange(year: number) {
    const { current, onChange, onModeChange, type } = this.props
    const date = utils.changeDate(current, 'year', year, this.getOptions())
    const isYearType = this.props.type === 'year'
    onChange(...paramUtils.yearHandleChangeParams(date, isYearType, isYearType))
    if (isYearType) return
    let nextMode: Mode = 'month'
    if (type === 'quarter') {
      nextMode = type
    }
    onModeChange(nextMode)
  }

  handleRangeChange(year: number) {
    const { current, onChange } = this.props
    onChange(...paramUtils.yearHandleChangeParams(utils.addYears(current, year, this.getOptions())))
  }

  handleDisabled(date: Date) {
    const { min, disabled, range, type, index, rangeDate, max } = this.props
    let isDisabled = min && utils.compareYear(min, date, 1, this.getOptions()) >= 0
    if (!isDisabled) {
      isDisabled = max && utils.compareYear(date, max, 1, this.getOptions()) >= 0
    }

    if (!isDisabled && type === 'year' && typeof disabled === 'function') {
      isDisabled = disabled(date)
    }

    if (!isDisabled && index === 0 && isArray(rangeDate)) {
      if (rangeDate[1] && utils.compareAsc(date, utils.addSeconds(rangeDate[1], -range!, this.getOptions())) < 0) {
        isDisabled = true
      }
    }

    if (!isDisabled && index === 1 && isArray(rangeDate)) {
      if (
        rangeDate[0] &&
        utils.compareAsc(date, utils.addSeconds(rangeDate[0], range as number, this.getOptions())) > 0
      ) {
        isDisabled = true
      }
    }
    return isDisabled
  }

  renderYear(y: number) {
    const { value } = this.props
    const date = utils.changeDate(utils.toDate(MONTHBASE, this.getOptions()), 'year', y, this.getOptions())
    const isDisabled = this.handleDisabled(date)

    const className = datepickerClass(
      value && utils.getDateInfo(value, 'year', this.getOptions()) === y && 'active',
      isDisabled && 'disabled'
    )

    return (
      <span key={y} className={className} onClick={isDisabled ? undefined : this.handleChange.bind(this, y)}>
        {y}
      </span>
    )
  }

  render() {
    const { current } = this.props
    const cy = utils.getDateInfo(current, 'year', this.getOptions()) - 7
    const years = getRange(15, 0).map(i => cy + i)

    return (
      <div className={datepickerClass('year-picker')}>
        <div className={datepickerClass('header')}>
          <Icon name="AngleLeft" className="left" onClick={this.handlePrevRange as any} />

          <span className={datepickerClass('ym')}>{`${years[0]} ~ ${years[years.length - 1]}`}</span>

          <Icon name="AngleRight" className="right" onClick={this.handleNextRange as any} />
        </div>

        <div className={datepickerClass('list')}>{years.map(this.renderYear)}</div>
      </div>
    )
  }
}

export default Year
