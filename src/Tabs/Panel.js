import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import List from '../AnimationList'
import { tabsClass } from '../styles'

const CollapseList = List(['collapse'], 'fast')

class Panel extends PureComponent {
  constructor(props) {
    super(props)
    this.isPristine = true
  }

  render() {
    const { children, background, color, isActive, collapsible, collapsed, lazy } = this.props
    if (!isActive && this.isPristine && lazy) return null
    this.isPristine = false

    const style = Object.assign({ background: background || '#fff', color }, this.props.style)
    const className = classnames(tabsClass('panel', isActive && 'show'), this.props.className)

    const result = (
      <div style={style} className={className}>
        {children}
      </div>
    )

    if (!collapsible) return result

    return <CollapseList show={!collapsed}>{result}</CollapseList>
  }
}

Panel.isTabPanel = true

Panel.propTypes = {
  background: PropTypes.string,
  className: PropTypes.string,
  collapsed: PropTypes.bool,
  collapsible: PropTypes.bool,
  color: PropTypes.string,
  children: PropTypes.any,
  isActive: PropTypes.bool,
  style: PropTypes.object,
  lazy: PropTypes.bool,
}

export default Panel
