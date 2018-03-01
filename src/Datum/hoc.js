import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import List from './List'

export default function (Component, type = 'list') {
  const Datum = type === 'list' ? List : undefined

  return class extends PureComponent {
    static propTypes = {
      onChange: PropTypes.func,
      datum: PropTypes.object,
      value: PropTypes.array,
    }

    constructor(props) {
      super(props)
      const { datum, onChange, value } = props

      if (datum instanceof Datum) {
        this.datum = datum
      } else {
        this.datum = new Datum(datum)
      }

      if (value) this.datum.initValue(value)

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
