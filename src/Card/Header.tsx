import React, { PureComponent } from 'react'
import classnames from 'classnames'
import icons from '../icons'
import { cardClass } from './styles'
import { isRTL } from '../config'
import { OriginCardHeaderProps } from "./Props"

class Header extends PureComponent<OriginCardHeaderProps> {

  renderIndicator() {
    const { collapsed } = this.props
    if (collapsed === undefined) return undefined
    const className = cardClass('indicator')
    return <span className={className}>{icons.AngleRight}</span>
  }

  render() {
    const { style, align, className, children, onCollapse, collapsed } = this.props

    const newClassName = classnames(cardClass('header', align, isRTL() && 'header-rtl'), className)
    const onClick = typeof collapsed === 'boolean' ? onCollapse : undefined

    return (
      <div style={style} onClick={onClick} className={newClassName}>
        {this.renderIndicator()}
        {children}
      </div>
    )
  }
}

export default Header
