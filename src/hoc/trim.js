import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

export default Origin => class extends PureComponent {
  static propTypes = {
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    trim: PropTypes.bool,
    value: PropTypes.any,
  }

  constructor(props) {
    super(props)
    this.handleBlur = this.handleBlur.bind(this)
  }

  handleBlur(e) {
    const {
      value, trim, onBlur, onChange,
    } = this.props

    if (trim) {
      const tv = e.target.value.trim()
      if (value !== tv) onChange(tv)
    }
    if (onBlur) onBlur(e)
  }

  render() {
    return <Origin {...this.props} onBlur={this.handleBlur} />
  }
}
