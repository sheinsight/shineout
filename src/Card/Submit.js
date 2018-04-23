import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Button from '../Button'
import { consumer } from './context'

class Submit extends PureComponent {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.props.onClick()
  }

  render() {
    const { onClick, ...other } = this.props
    return (
      <Button type="primary" {...other} onClick={this.handleClick} />
    )
  }
}

Submit.propTypes = {
  onClick: PropTypes.func,
}

export default consumer(Submit)
