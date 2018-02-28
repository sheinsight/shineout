import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import List from './List'

export default function (Component, type = 'list') {
  const Datum = type === 'list' ? List : undefined

  return class extends PureComponent {
    static propTypes = {
      onChange: PropTypes.func,
      value: PropTypes.object,
    }

    constructor(props) {
      super(props)
      const { value } = props

      if (value instanceof Datum) {
        this.value = value
      } else {
        this.value = new Datum()
      }

      this.addValue = this.addValue.bind(this)
      this.checkValue = this.checkValue.bind(this)
      this.removeValue = this.removeValue.bind(this)
    }

    handleChange(...args) {
      if (this.props.onChange) {
        this.props.onChange(this.value.getValue(), ...args)
      }
    }

    addValue(value, index) {
      this.value.addValue(value)
      this.handleChange(value, index)
    }

    removeValue(value, index) {
      this.value.removeValue(value)
      this.handleChange(value, index)
    }

    checkValue(value) {
      return this.value.check(value)
    }

    render() {
      return (
        <Component
          {...this.props}
          addValue={this.addValue}
          checkValue={this.checkValue}
          removeValue={this.removeValue}
        />
      )
    }
  }
}
