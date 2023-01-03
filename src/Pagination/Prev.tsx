import React from 'react'
import icons from '../icons'
import Item from './Item'
import { isRTL } from '../config'
import { NextProps } from './Props'

class Prev extends React.PureComponent<NextProps> {
  static displayName: string

  renderPrev() {
    const { text } = this.props
    const rtl = isRTL()
    if (rtl) {
      return text!.next || icons.AngleRight
    }
    return text!.prev || icons.AngleLeft
  }

  render() {
    const { onChange, current, text, disabled, isSimple } = this.props
    const prev = current - 1
    const className = text!.prev || isSimple ? `no-border arrow` : 'arrow'
    return (
      <Item className={className} page={prev} disabled={disabled || prev < 1} onClick={onChange}>
        {this.renderPrev()}
      </Item>
    )
  }
}

Prev.displayName = 'ShineoutPaginationPrev'

export default Prev
