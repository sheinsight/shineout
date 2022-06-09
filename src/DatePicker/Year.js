import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { range } from '../utils/numbers'
import { datepickerClass } from './styles'
import Icon from './Icon'
import utils from './utils'
import paramUtils from './paramUtils'

class Year extends PureComponent {
  constructor(props) {
    super(props)

    this.handlePrevRange = this.handleRangeChange.bind(this, -15)
    this.handleNextRange = this.handleRangeChange.bind(this, 15)
  }

  handleChange(year) {
    const { current, onChange, onModeChange, type } = this.props
    const date = new Date(current.getTime())
    date.setFullYear(year)
    onChange(...paramUtils.yearHandleChangeParams(date))
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

  render() {
    const { current, value } = this.props
    const cy = current.getFullYear() - 7
    const years = range(15, 0).map(i => cy + i)

    return (
      <div className={datepickerClass('year-picker')}>
        <div className={datepickerClass('header')}>
          <Icon name="AngleLeft" className="left" onClick={this.handlePrevRange} />

          <span className={datepickerClass('ym')}>{`${years[0]} ~ ${years[years.length - 1]}`}</span>

          <Icon name="AngleRight" className="right" onClick={this.handleNextRange} />
        </div>

        <div className={datepickerClass('list')}>
          {years.map(y => (
            <span
              key={y}
              className={datepickerClass(value && value.getFullYear() === y && 'active')}
              onClick={this.handleChange.bind(this, y)}
            >
              {y}
            </span>
          ))}
        </div>
      </div>
    )
  }
}

Year.propTypes = {
  current: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onModeChange: PropTypes.func.isRequired,
  value: PropTypes.object,
  type: PropTypes.string,
}

export default Year
