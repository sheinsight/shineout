import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import shallowEqual from '../utils/shallowEqual'
import utils from './utils'

export default Origin => class extends PureComponent {
  static propTypes = {
    format: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    range: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.number,
    ]),
    type: PropTypes.string,
    value: PropTypes.any,
  }

  constructor(props) {
    super(props)

    this.state = { value: props.value }
    this.handleBlur = this.handleBlur.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    const { range, value } = this.props
    if (!value) return
    const format = this.getFormat()
    if (range) {
      const newValue = value.map((v) => {
        if (!v) return undefined
        return utils.format(utils.toDateWithFormat(v, format, undefined), format)
      })

      if (!shallowEqual(newValue, value)) {
        this.props.onChange(newValue)
      }
    } else {
      const newValue = utils.format(utils.toDateWithFormat(value, format, undefined), format)
      if (newValue !== value) this.props.onChange(newValue)
    }
  }

  componentDidUpdate(prevProps) {
    const { value } = this.props
    if (value !== prevProps.value && value !== this.state.value) {
      // eslint-disable-next-line
      this.setState({ value })
    }
  }

  getFormat() {
    const { format, type } = this.props
    if (format) return format
    switch (type) {
      case 'datetime':
        return 'yyyy-MM-dd HH:mm:ss'
      case 'month':
        return 'yyyy-MM'
      case 'time':
        return 'HH:mm:ss'
      case 'week':
        return 'yyyy WW'
      default:
        return 'yyyy-MM-dd'
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
