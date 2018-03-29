import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { selectClass } from '../styles'

class Option extends PureComponent {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    const { data, onClick, isActive } = this.props
    onClick(data, !isActive)
  }

  render() {
    const { data, isActive, renderItem } = this.props
    const className = selectClass('option', isActive && 'active')

    return (
      <a onClick={this.handleClick} className={className}>
        { renderItem(data) }
      </a>
    )
  }
}

Option.propTypes = {
  data: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
  ]).isRequired,
  isActive: PropTypes.bool,
  onClick: PropTypes.func,
  renderItem: PropTypes.func.isRequired,
}

export default Option
