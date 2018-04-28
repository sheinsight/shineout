import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import utils from './utils'
import Picker from './Picker'
import { datepickerClass } from '../styles'

class DatePicker extends PureComponent {
  constructor(props) {
    super(props)

    this.state = { focus: false }
    this.handleFocus = this.handleToggle.bind(this, true)
    this.handleBlur = this.handleToggle.bind(this, false)
    this.handleChange = this.handleChange.bind(this)
  }

  handleToggle(focus) {
    if (focus === this.state.focus) return

    this.setState({ focus })

    if (focus) this.props.onFocus()
    else this.props.onBlur()
  }

  handleChange(value) {
    this.props.onChange(utils.format(value, this.props.format))
  }

  render() {
    const {
      value, format, disabled, size, placeholder,
    } = this.props
    const date = utils.toDate(value)

    console.log(value, date)

    const className = datepickerClass(
      'inner',
      size,
      this.state.focus && 'focus',
      this.state.position,
      disabled && 'disabled',
    )

    return (
      <div
        className={className}
        tabIndex={-1}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
      >
        <div className={datepickerClass('result')}>
          {
            // eslint-disable-next-line
            isNaN(date) ? placeholder : utils.format(date, format)
          }
        </div>
        <Picker value={date} onChange={this.handleChange} />
      </div>
    )
  }
}

DatePicker.propTypes = {
  disabled: PropTypes.bool,
  format: PropTypes.string,
  placeholder: PropTypes.string,
  onBlur: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  size: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.object,
  ]),
}

DatePicker.defaultProps = {
  format: 'YYYY-MM-DD HH:mm:ss',
  placeholder: ' ',
}

export default DatePicker
