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
      const { value, onChange } = props

      if (value instanceof Datum) {
        this.datum = value
      } else if (Array.isArray(value)) {
        this.datum = new Datum({ value })
      } else {
        this.datum = new Datum(value)
      }

      if (!this.datum.onChange) {
        this.datum.onChange = onChange
      }
    }

    render() {
      return (
        <Component
          {...this.props}
          value={this.datum}
        />
      )
    }
  }
}
