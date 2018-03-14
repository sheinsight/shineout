import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import shallowEqual from '../utils/shallowEqual'
import List from './List'
import Form from './Form'

const types = {
  form: Form,
  list: List,
}

export default function (Component, type = 'list', key = 'value', limit) {
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

      if (!this.datum.limit && limit) this.datum.limit = limit

      if (!this.datum.onChange) {
        this.datum.onChange = onChange
      }
    }

    trySetValue() {
      const values = this.props[key]
      if (values && !shallowEqual(values, this.prevValues)) {
        console.log('set value')
        this.datum.setValue(values)
        this.prevValues = values
      }
    }

    render() {
      this.trySetValue()

      return (
        <Component
          {...this.props}
          datum={this.datum}
        />
      )
    }
  }
}
