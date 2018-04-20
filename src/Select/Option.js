import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { selectClass } from '../styles'

class Option extends PureComponent {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.handleEnter = this.handleHover.bind(this, props.index)
    this.handleLeave = this.handleHover.bind(this, undefined)
  }

  handleClick() {
    const {
      data, onClick, isActive, index,
    } = this.props

    onClick(!isActive, data, index)
  }

  handleHover(index) {
    this.props.onHover(index)
  }

  render() {
    const {
      data, isActive, index, renderItem, isHover,
    } = this.props
    const className = classnames(
      selectClass(
        'option',
        isActive && 'active',
        isHover && 'hover',
      ),
      `option-${index}`,
    )

    return (
      <a
        onClick={this.handleClick}
        onMouseEnter={this.handleEnter}
        onMouseLeave={this.handleLeave}
        className={className}
      >
        { renderItem(data, index) }
      </a>
    )
  }
}

Option.propTypes = {
  data: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
  ]).isRequired,
  index: PropTypes.number,
  isActive: PropTypes.bool,
  isHover: PropTypes.bool,
  onClick: PropTypes.func,
  onHover: PropTypes.func.isRequired,
  renderItem: PropTypes.func.isRequired,
}

export default Option
