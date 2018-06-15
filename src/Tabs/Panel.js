import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { tabsClass } from '../styles'

class Panel extends PureComponent {
  constructor(props) {
    super(props)
    this.isPristine = true
  }

  render() {
    const { children, isActive } = this.props
    if (!isActive && this.isPristine) return null
    this.isPristine = false

    return (
      <div className={tabsClass('panel', isActive && 'show')}>
        {children}
      </div>
    )
  }
}

Panel.isTabPanel = true

Panel.propTypes = {
  isActive: PropTypes.bool,
  children: PropTypes.any,
}

export default Panel
