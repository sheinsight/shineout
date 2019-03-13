import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import shallowEqual from '../utils/shallowEqual'
import { datepickerClass } from '../styles'
import { docScroll } from '../utils/dom/document'

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
        style.position = 'absolute'
        const [h, v] = position.split('-')
        if (h === 'left') {
          style.left = rect.left + docScroll.left
        } else {
          style.left = rect.right + docScroll.left
          style.transform = 'translateX(-100%)'
        }
        if (v === 'bottom') {
          style.top = rect.bottom + docScroll.top + PICKER_V_MARGIN
        } else {
          style.top = rect.top + docScroll.top - PICKER_V_MARGIN
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
