import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { inputClass } from '../styles'

class Clear extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e) {
    // do not blur
    e.preventDefault()

    const { onClick } = this.props
    if (onClick) onClick({ target: { value: '' } }, true)
  }

  render() {
    return (
      <div onMouseDown={this.handleClick} className={inputClass('clear-wrapper')}>
        <div className={inputClass('clear')} />
      </div>
    )
  }
}

Clear.propTypes = {
  onClick: PropTypes.func,
}

export default Clear
