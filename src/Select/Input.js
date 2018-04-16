import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class FilterInput extends PureComponent {
  constructor(props) {
    super(props)

    this.state = { value: '' }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    console.log(e.target.value)
    this.setState({ value: e.target.value })
  }

  handleBlur() {
    this.props.onFilter(this.state.value)
  }

  render() {
    const { placeholder } = this.props
    const { value } = this.state
    console.log(111111111)
    return (
      <input
        placeholder={placeholder}
        autoFocus
        value={value}
        onChange={this.handleChange}
      />
    )
  }
}

FilterInput.propTypes = {
  onFilter: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
}

export default FilterInput
