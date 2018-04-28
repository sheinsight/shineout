import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { datepickerClass } from '../styles'
import Icon from './Icon'
import utils from './utils'
import { getLocate } from './locate'

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
    this.props.onModelChange('year')
  }

  handleMonthClick(month) {
    const { current, onChange, onModelChange } = this.props
    const date = new Date(current.getTime())
    date.setMonth(month)
    onChange(date)
    onModelChange('day')
  }

  render() {
    const { current, value } = this.props

    return (
      <div className={datepickerClass('picker', 'month-picker')}>
        <div className={datepickerClass('header')}>
          <Icon name="AngleLeft" onClick={this.handlePrevYear} />

          <span onClick={this.handleYearClick.bind(this)} className={datepickerClass('ym')}>
            {current.getFullYear()}
          </span>

          <Icon name="AngleRight" onClick={this.handleNextYear} />
        </div>

        <div className={datepickerClass('list')}>
          {
            getLocate('monthValues.short').map((m, i) => (
              <span
                key={i}
                className={datepickerClass(value.getFullYear() === current.getFullYear() && value.getMonth() === i && 'active')}
                onClick={this.handleMonthClick.bind(this, i)}
              >
                {m}
              </span>
            ))
          }
        </div>
      </div>
    )
  }
}

Month.propTypes = {
  current: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onModelChange: PropTypes.func.isRequired,
  value: PropTypes.object.isRequired,
}

export default Month
