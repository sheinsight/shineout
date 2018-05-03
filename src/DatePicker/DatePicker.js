import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import List from '../List'
import Icon from './Icon'
import utils from './utils'
import Picker from './Picker'
import { datepickerClass, inputClass } from '../styles'

const FadeList = List(['fade'], 'fast')

class DatePicker extends PureComponent {
  constructor(props) {
    super(props)

    this.state = { focus: false }

    this.bindElement = this.bindElement.bind(this)
    this.handleFocus = this.handleToggle.bind(this, true)
    this.handleBlur = this.handleToggle.bind(this, false)
    this.handleChange = this.handleChange.bind(this)

    this.firstRender = false
  }

  getFormat() {
    const { format, type } = this.props
    if (format) return format
    switch (type) {
      case 'date':
        return 'YYYY-MM-DD'
      case 'month':
        return 'YYYY-MM'
      case 'time':
        return 'HH:mm:ss'
      case 'week':
        return 'YYYY WW'
      default:
        return 'YYYY-MM-DD HH:mm:ss'
    }
  }

  bindElement(el) {
    this.element = el
  }

  handleToggle(focus) {
    if (this.props.disabled === true) return
    if (focus === this.state.focus) return

    if (focus === true) this.firstRender = true
    this.setState({ focus })

    if (focus) this.props.onFocus()
    else this.props.onBlur()
  }

  handleChange(value, blur) {
    this.props.onChange(utils.format(value, this.getFormat()))
    if (blur) this.element.blur()
  }

  render() {
    const {
      value, disabled, size, placeholder, type,
    } = this.props
    const { focus } = this.state
    const format = this.getFormat()
    const date = typeof value === 'string'
      ? utils.parse(value, this.getFormat(), new Date())
      : utils.toDate(value)

    // eslint-disable-next-line
    const current = isNaN(date) ? new Date() : date

    const className = datepickerClass(
      'inner',
      size,
      focus && 'focus',
      this.state.position,
    )

    return (
      <div
        className={className}
        tabIndex={-1}
        ref={this.bindElement}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
      >
        <div className={datepickerClass('result')}>
          {
            // eslint-disable-next-line
            isNaN(date)
              ? <span className={inputClass('placeholder')}>{placeholder}</span>
              : utils.format(date, format)
          }
          <Icon name={type === 'time' ? 'Clock' : 'Calendar'} />
        </div>
        <FadeList show={focus} className={datepickerClass('picker')}>
          {
            this.firstRender &&
            <Picker
              format={format}
              disabled={typeof disabled === 'function' ? disabled : undefined}
              onChange={this.handleChange}
              type={type}
              value={current}
            />
          }
        </FadeList>
      </div>
    )
  }
}

DatePicker.propTypes = {
  disabled: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.func,
  ]),
  format: PropTypes.string,
  placeholder: PropTypes.any,
  onBlur: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  size: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.object,
  ]),
}

DatePicker.defaultProps = {
  placeholder: <span>&nbsp;</span>,
  type: 'date',
}

export default DatePicker
