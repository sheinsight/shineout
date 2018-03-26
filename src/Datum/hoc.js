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
      onDatumBind: PropTypes.func,
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

      // for radio, select
      if (!this.datum.limit && limit) this.datum.limit = limit

      const values = this.props[key]
      if (values) {
        this.datum.setValue(values)
        this.prevValues = values
      }

      if (onChange) {
        this.datum.onChange = onChange
      }
    }

    componentDidUpdate() {
      const values = this.props[key]
      if (!shallowEqual(values, this.prevValues)) {
        this.datum.setValue(values)
        this.prevValues = values
      }
    }

    render() {
      const { onDatumBind, ...props } = this.props
      if (onDatumBind) onDatumBind(this.datum)

      return (
        <Component
          {...props}
          datum={this.datum}
        />
      )
    }
  }
}
