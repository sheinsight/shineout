import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import shallowEqual from '../utils/shallowEqual'
import { datepickerClass } from '../styles'

const PICKER_V_MARGIN = 4

export default function(List) {
  class AbsoluteContainer extends Component {
    constructor(props) {
      super(props)

      this.lastStyle = {}
      this.element = document.createElement('div')
      this.element.className = datepickerClass('absolute-wrapper')
    }

    componentDidMount() {
      document.body.appendChild(this.element)
    }

    componentWillUnmount() {
      document.body.removeChild(this.element)
    }

    getStyle() {
      const { parentElement, show, position } = this.props
      const lazyResult = { focus: show, style: this.lastStyle }
      if (!show) return lazyResult

      const style = {}
      if (parentElement) {
        const rect = parentElement.getBoundingClientRect()
        const scrollRect = {}

        if (
          rect.bottom < scrollRect.top ||
          rect.bottom > scrollRect.bottom ||
          rect.right < scrollRect.left ||
          rect.left > scrollRect.right
        ) {
          return { focus: false, style: this.lastStyle }
        }

        style.position = 'absolute'
        const [h, v] = position.split('-')
        if (h === 'left') {
          style.left = rect.left + document.documentElement.scrollLeft
        } else {
          style.left = rect.right + document.documentElement.scrollLeft
          style.transform = 'translateX(-100%)'
        }
        if (v === 'bottom') {
          style.top = rect.bottom + document.documentElement.scrollTop + PICKER_V_MARGIN
        } else {
          style.top = rect.top + document.documentElement.scrollTop - PICKER_V_MARGIN
          style.transform = style.transform ? 'translate(-100%, -100%)' : 'translateY(-100%)'
        }
      }

      if (shallowEqual(style, this.lastStyle)) return lazyResult

      this.lastStyle = style
      return { focus: show, style }
    }

    render() {
      const { parentElement, position, show, className, ...other } = this.props
      const { focus, style } = show ? this.getStyle() : this.lastStyle
      return ReactDOM.createPortal(<List {...other} className={className} show={focus} style={style} />, this.element)
    }
  }

  AbsoluteContainer.propTypes = {
    show: PropTypes.bool,
    parentElement: PropTypes.object,
    className: PropTypes.string,
    position: PropTypes.oneOf(['left-top', 'left-bottom', 'right-top', 'right-bottom']),
    picker: PropTypes.string,
  }

  return AbsoluteContainer
}
