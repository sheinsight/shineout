import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { inputClass } from './styles'

class Clear extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e) {
    // do not blur
    e.preventDefault()

    const { onClick, clearResult } = this.props
    if (onClick) onClick({ target: { value: clearResult } }, true)
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
  clearResult: PropTypes.any,
}

export default Clear
