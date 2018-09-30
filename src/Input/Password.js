import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Input from './Input'

class Password extends PureComponent {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(val) {
    const { value, point } = this.props
    const newValue = []
    val.split('').forEach((v, i) => {
      newValue.push(v === point ? value[i] : v)
    })

    this.props.onChange(newValue.join(''))
  }

  render() {
    const { point, ...others } = this.props
    const value = Array.from({ length: this.props.value.length }, () => point).join('')
    return (
      <Input {...others} type="text" value={value} onChange={this.handleChange} />
    )
  }
}

Password.propTypes = {
  onChange: PropTypes.func,
  point: PropTypes.string,
  value: PropTypes.string,
}

Password.defaultProps = {
  value: '',
  point: '•',
}

export default Password
