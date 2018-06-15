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
    const { children } = this.props
    return (
      <div className={tabsClass('tab')} onClick={this.handleClick}>
        {children}
      </div>
    )
  }
}

Tab.propTypes = {
  children: PropTypes.any,
  id: PropTypes.any.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default Tab
