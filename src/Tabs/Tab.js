import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { tabsClass } from '../styles'

class Tab extends PureComponent {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.props.onClick(this.props.id)
  }

  render() {
    const {
      background, border, color, isActive,
    } = this.props
    const style = {
      background,
      color,
      borderColor: `${border} ${border} ${isActive ? background : border} ${border}`,
    }

    return (
      <div
        className={tabsClass('tab', isActive && 'active')}
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
  onClick: PropTypes.func.isRequired,
}

Tab.defaultProps = {
  border: 'transparent',
}

export default Tab
