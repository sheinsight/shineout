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
  }

  handleChange(value) {
    console.log('block change.', value)
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
  labelWidth: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  onChange: PropTypes.func.isRequired,
  value: PropTypes.any,
}

export default Block
