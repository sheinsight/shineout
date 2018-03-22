import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import DatumForm from '../Datum/Form'
import { Provider, formConsumer } from './formContext'

class Block extends PureComponent {
  constructor(props) {
    super(props)
    this.datum = new DatumForm({
      onChange: this.handleChange.bind(this),
    })
  }

  handleChange(value) {
    const { formDatum, name } = this.props
    formDatum.set(name, value)
  }

  render() {
    const {
      children, name, formDatum, ...props
    } = this.props

    let value = formDatum.get(name)
    if (value === undefined) value = {}

    this.datum.setValue(value)

    console.log('render block', name)

    const pv = {
      ...props,
      formDatum: this.datum,
    }

    return (
      <Provider value={pv}>
        {children}
      </Provider>
    )
  }
}

Block.propTypes = {
  children: PropTypes.any,
  formDatum: PropTypes.object.isRequired,
  name: PropTypes.string,
}

export default formConsumer(null, Block)
