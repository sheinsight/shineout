import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

export default (Origin) => {
  class DatePickerValue extends PureComponent {
    constructor(props) {
      super(props)

      this.state = { value: props.value }
      this.handleBlur = this.handleBlur.bind(this)
      this.handleChange = this.handleChange.bind(this)
    }

    handleChange(value, callback) {
      this.setState({ value }, callback)
    }

    handleBlur() {
      if (this.state.value !== this.props.value) {
        this.props.onChange(this.state.value)
      }
      this.props.onBlur()
    }

    render() {
      const { value } = this.state

      return (
        <Origin
          {...this.props}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          value={value}
        />
      )
    }
  }

  DatePickerValue.propTypes = {
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    value: PropTypes.any,
  }

  if (React.createContext) {
    DatePickerValue.getDerivedStateFromProps = (props, state) => {
      if (props.value !== state.value) {
        return {
          value: props.value,
        }
      }
      return null
    }
  } else {
    // eslint-disable-next-line
    DatePickerValue.prototype.componentWillReceiveProps = function (nextProps) {
      const { value } = nextProps
      if (value !== this.props.value && value !== this.state.value) {
        this.setState({ value })
      }
    }
  }

  return DatePickerValue
}
