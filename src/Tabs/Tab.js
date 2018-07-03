import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { tabsClass } from '../styles'

class Tab extends PureComponent {
  constructor(props) {
    super(props)
    this.bindElement = this.bindElement.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  bindElement(el) {
    this.element = el
  }

  handleClick() {
    this.props.onClick(this.props.id)
    this.props.moveToLeft(this.element.getBoundingClientRect())
  }

  render() {
    const {
      background, border, color, isActive, shape,
    } = this.props

    let style = {}
    if (shape !== 'line') {
      style = {
        background,
        color,
        borderColor: `${border} ${border} ${isActive ? background : border} ${border}`,
      }
    }

    return (
      <div
        ref={this.bindElement}
        className={tabsClass('tab', shape, isActive && 'active')}
        style={style}
        onClick={this.handleClick}
      >
        {this.props.children}
      </div>
    )
  }
}

Tab.propTypes = {
  background: PropTypes.string,
  border: PropTypes.string,
  children: PropTypes.any,
  color: PropTypes.string,
  id: PropTypes.any.isRequired,
  isActive: PropTypes.bool.isRequired,
  moveToLeft: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  shape: PropTypes.string,
}

Tab.defaultProps = {
  border: 'transparent',
}

export default Tab
