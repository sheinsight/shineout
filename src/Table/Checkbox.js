import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Checkbox from '../Checkbox'

export default class extends PureComponent {
  static propTypes = {
    data: PropTypes.object.isRequired,
    addValue: PropTypes.func.isRequired,
    checkValue: PropTypes.func.isRequired,
    removeValue: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(value, checked, index) {
    const { data, addValue, removeValue } = this.props
    if (checked) {
      addValue(data, index)
    } else {
      removeValue(data, index)
    }

    this.forceUpdate()
  }

  render() {
    const { data, checkValue } = this.props
    const checked = checkValue(data)
    return (
      <Checkbox {...this.props} checked={checked} onChange={this.handleChange} />
    )
  }
}
