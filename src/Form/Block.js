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

    this.validate = this.validate.bind(this)
    this.reset = this.reset.bind(this)

    if (props.formDatum) {
      props.formDatum.listen('reset', this.reset)
      props.formDatum.listen('validate', this.validate)
    }
  }

  componentWillUnmount() {
    const { formDatum } = this.props
    if (formDatum) {
      formDatum.unlisten('reset', this.reset)
      formDatum.unlisten('validate', this.validate)
    }
  }

  reset() {
    this.datum.reset()
  }

  handleChange(value) {
    this.props.onChange(value)
  }

  validate() {
    return this.datum.validate().then(e => e, e => e)
  }

  render() {
    const {
      children, value, rules, labelWidth,
    } = this.props

    if (rules && this.datum.rules !== rules) {
      this.datum.rules = rules
    }
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
  rules: PropTypes.array,
  value: PropTypes.any,
}

export default Block
