import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import List from './List'
import Form from './Form'

const types = {
  form: Form,
  list: List,
}

export default function (Component, type = 'list', key = 'value') {
  const Datum = types[type]

  return class extends PureComponent {
    static propTypes = {
      onChange: PropTypes.func,
      datum: PropTypes.object,
    }

    constructor(props) {
      super(props)
      const { datum, onChange } = props

      if (datum instanceof Datum) {
        this.datum = datum
      } else {
        this.datum = new Datum(datum)
      }

      if (props[key]) this.datum.setValue(props[key])

      if (!this.datum.onChange) {
        this.datum.onChange = onChange
      }
    }

    render() {
      return (
        <Component
          {...this.props}
          datum={this.datum}
        />
      )
    }
  }
}
