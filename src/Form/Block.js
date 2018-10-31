import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import shallowEqual from '../utils/shallowEqual'
import DatumForm from '../Datum/Form'
import { Provider } from './formContext'

class Block extends PureComponent {
  constructor(props) {
    super(props)
    const { value, formDatum } = props

    this.datum = new DatumForm({
      onChange: this.handleChange.bind(this),
    })

    if (value) this.datum.setValue(value)

    this.reset = this.reset.bind(this)
    this.validate = this.validate.bind(this)

    if (formDatum) {
      formDatum.listen('reset', this.reset)
      formDatum.listen('validate', this.validate)
    }
  }

  componentDidUpdate() {
    const { value } = this.props
    if (!shallowEqual(value, this.prevValue)) {
      this.datum.setValue(value)
      this.prevValues = value
    }
  }

  componentWillUnmount() {
    const { formDatum } = this.props
    if (formDatum) {
      formDatum.unlisten('reset', this.reset)
      formDatum.unlisten('validate', this.validate)
    }
  }

  handleChange(value) {
    this.props.onChange(value)
  }

  reset() {
    this.datum.reset()
  }

  validate() {
    return this.datum.validate().then(e => e, e => e)
  }

  render() {
    const {
      children, labelAlign, labelWidth, rules,
    } = this.props

    if (rules && this.datum.rules !== rules) {
      this.datum.rules = Array.isArray(rules) ? {} : rules
    }

    return (
      <Provider value={{ formDatum: this.datum, labelWidth, labelAlign }}>
        {children}
      </Provider>
    )
  }
}

Block.propTypes = {
  children: PropTypes.any,
  formDatum: PropTypes.object,
  labelAlign: PropTypes.string,
  labelWidth: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  onChange: PropTypes.func.isRequired,
  rules: PropTypes.array,
  value: PropTypes.any,
}

export default Block
