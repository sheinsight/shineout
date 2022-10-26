import React, {  PureComponent } from "react"
import classnames from 'classnames'
import List from '../AnimationList'
import { cardClass } from './styles'
import { isRTL } from '../config'
import { OriginCardBodyProps } from './Props'
import {  } from "./context"

const CollapseList = List(['collapse'], 'fast')

class Body extends PureComponent<OriginCardBodyProps> {
  render() {
    const { className, collapsed, collapsible, onCollapse, ...other } = this.props
    const newClassName = classnames(cardClass('body', isRTL() && 'body-rtl'), className)

    if (!collapsible) return <div {...other} className={newClassName} />

    const onClick = typeof collapsed === 'boolean' ? onCollapse : undefined
    return (
      <CollapseList show={!collapsed}>
        <div {...other} className={newClassName}>
          {other.children}
          {collapsible === 'bottom' && (
            <div className={cardClass('foldup')} onClick={onClick}>
              <span />
            </div>
          )}
        </div>
      </CollapseList>
    )
  }
}

export default Body
