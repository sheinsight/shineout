import React from 'react'
import PropTypes from 'prop-types'
import icons from '../icons'
import Item from './Item'
import { isRTL } from '../config'

class Next extends React.PureComponent {
  renderNext() {
    const { text } = this.props
    const rtl = isRTL()
    if (rtl) {
      return text.prev || icons.AngleLeft
    }
    return text.next || icons.AngleRight
  }

  render() {
    const { onChange, current, text, total, pageSize, disabled, isSimple } = this.props
    const max = Math.ceil(total / pageSize)
    const next = current + 1
    const className = text.next || isSimple ? `no-border arrow` : 'arrow'
    return (
      <Item className={className} page={next} disabled={disabled || next > max} onClick={onChange}>
        {this.renderNext()}
      </Item>
    )
  }
}

Next.propTypes = {
  current: PropTypes.number.isRequired,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  pageSize: PropTypes.number.isRequired,
  text: PropTypes.object,
  total: PropTypes.number.isRequired,
  isSimple: PropTypes.bool,
}

Next.displayName = 'ShineoutPaginationNext'

export default Next
