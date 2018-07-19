import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import shallowEqual from '../utils/shallowEqual'
import { scrollConsumer } from '../Scroll/context'
import { selectClass } from '../styles'
import OptionList from './OptionList'

class AbsoluteList extends PureComponent {
  constructor(props) {
    super(props)

    this.lastStyle = {}
  }

  getStyle() {
    const {
      parentElement, position, scrollElement, focus,
    } = this.props
    const lazyResult = { focus, style: this.lastStyle }
    if (!focus) return lazyResult

    const style = {}
    if (parentElement) {
      const rect = parentElement.getBoundingClientRect()
      const scrollRect = scrollElement ? scrollElement.getBoundingClientRect() : {}

      if (rect.bottom < scrollRect.top || rect.bottom > scrollRect.bottom ||
        rect.right < scrollRect.left || rect.left > scrollRect.right) {
        return { focus: false, style: this.lastStyle }
      }

      style.position = 'absolute'
      style.width = rect.width
      style.left = rect.left + document.documentElement.scrollLeft
      if (position === 'drop-down') {
        style.top = rect.top + rect.height + document.documentElement.scrollTop
      } else {
        style.bottom = -(rect.top + document.documentElement.scrollTop)
      }
    }

    if (shallowEqual(style, this.lastStyle)) return lazyResult

    this.lastStyle = style
    return { focus, style }
  }

  render() {
    const {
      parentElement, position, scrollLeft, scrollTop, scrollElement, ...props
    } = this.props
    const className = selectClass('absolute-wrapper', position)
    const { focus, style } = props.focus ? this.getStyle() : this.lastStyle

    return (
      <OptionList {...props} focus={focus} className={className} style={style} />
    )
  }
}

AbsoluteList.propTypes = {
  focus: PropTypes.bool,
  onBlur: PropTypes.func,
  parentElement: PropTypes.object,
  position: PropTypes.string,
  scrollElement: PropTypes.object,
  scrollLeft: PropTypes.number,
  scrollTop: PropTypes.number,
}

export default scrollConsumer(AbsoluteList)
