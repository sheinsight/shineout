import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { tabsClass } from '../styles'

class Panel extends PureComponent {
  constructor(props) {
    super(props)
    this.isPristine = true
  }

  render() {
    const {
      children, background, color, isActive,
    } = this.props
    if (!isActive && this.isPristine) return null
    this.isPristine = false

    const style = Object.assign({ background: background || '#fff', color }, this.props.style)

    return (
      <div style={style} className={tabsClass('panel', isActive && 'show')}>
        {children}
      </div>
    )
  }
}

Panel.isTabPanel = true

Panel.propTypes = {
  background: PropTypes.string,
  color: PropTypes.string,
  children: PropTypes.any,
  isActive: PropTypes.bool,
  style: PropTypes.object,
}

export default Panel
