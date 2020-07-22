import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import config from '../config'

export default Origin =>
  class extends PureComponent {
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

    getTrim() {
      const { trim } = this.props
      if (trim !== undefined) return trim
      if (config.trim !== undefined) return config.trim
      return false
    }

    handleBlur(e) {
      const { value, onBlur, onChange } = this.props
      const trim = this.getTrim()
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
