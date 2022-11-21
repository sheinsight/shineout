import React, { PureComponent } from 'react'
import classnames from 'classnames'
import List from '../AnimationList'
import { tabsClass } from './styles'
import { PanelProps } from './Props'

const CollapseList = List(['collapse'], 'fast')

class Panel extends PureComponent<PanelProps> {
  isPristine: boolean

  static isTabPanel: boolean

  constructor(props: PanelProps) {
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

export default Panel
