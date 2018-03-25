import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import DatumForm from '../Datum/Form'
import { Provider } from './formContext'

class Block extends PureComponent {
  constructor(props) {
    super(props)
    this.datum = new DatumForm({
      onChange: this.handleChange.bind(this),
    })

    this.reset = this.reset.bind(this)
    if (props.formDatum) props.formDatum.listen('reset', this.reset)
  }

  componentWillUnmount() {
    const { formDatum } = this.props
    if (formDatum) formDatum.unlisten('reset', this.reset)
  }

  reset() {
    this.datum.reset()
  }

  handleChange(value) {
    this.props.onChange(value)
  }

  render() {
    const { children, value, labelWidth } = this.props

    this.datum.setValue(value)

    return (
      <Provider value={{ formDatum: this.datum, labelWidth }}>
        {children}
      </Provider>
    )
  }
}

Block.propTypes = {
  children: PropTypes.any,
  formDatum: PropTypes.object,
  labelWidth: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  onChange: PropTypes.func.isRequired,
  value: PropTypes.any,
}

export default Block
