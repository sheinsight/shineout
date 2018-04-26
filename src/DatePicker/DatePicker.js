import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import utils from './utils'

class DatePicker extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {}
  }

  handleChange(value) {
    this.props.onChange(utils.format(value, this.props.format))
  }

  render() {
    const { value, format } = this.props
    const date = utils.toDate(value)

    console.log(date)

    return (
      <div>
        {
          // eslint-disable-next-line
          isNaN(date)
            ? <span>&nbsp;</span>
            : utils.format(value, format)
        }
      </div>
    )
  }
}

DatePicker.propTypes = {
  format: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.object,
  ]),
}

DatePicker.defaultProps = {
  format: 'YYYY-MM-DD HH:mm:ss',
}

export default DatePicker
