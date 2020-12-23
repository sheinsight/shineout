import React from 'react'
import PropTypes from 'prop-types'
import icons from '../icons'
import Item from './Item'
import { isRTL } from '../config'

class Prev extends React.PureComponent {
  renderPrev() {
    const { text } = this.props
    const rtl = isRTL()
    if (rtl) {
      return text.next || icons.AngleRight
    }
    return text.prev || icons.AngleLeft
  }

  render() {
    const { onChange, current, text, disabled, isSimple } = this.props
    const prev = current - 1
    const className = text.prev || isSimple ? `no-border arrow` : 'arrow'
    return (
      <Item className={className} page={prev} disabled={disabled || prev < 1} onClick={onChange}>
        {this.renderPrev()}
      </Item>
    )
  }
}

Prev.propTypes = {
  current: PropTypes.number.isRequired,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  text: PropTypes.object,
  isSimple: PropTypes.bool,
}

Prev.displayName = 'ShineoutPaginationPrev'

export default Prev
