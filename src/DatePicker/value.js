import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

export default Origin => class extends PureComponent {
  static propTypes = {
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    value: PropTypes.any,
  }

  constructor(props) {
    super(props)

    this.state = { value: props.value }
    this.handleBlur = this.handleBlur.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidUpdate(prevProps) {
    const { value } = this.props
    if (value !== prevProps.value && value !== this.state.value) {
      // eslint-disable-next-line
      this.setState({ value })
    }
  }

  handleChange(value, callback) {
    this.setState({ value }, callback)
  }

  handleBlur() {
    this.props.onChange(this.state.value)
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
