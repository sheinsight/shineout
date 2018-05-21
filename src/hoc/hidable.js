import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { findDOMNode } from 'react-dom'
import { hidableClass } from '../styles'

/**
 * @param {*} Component
 * @param {*} duration
 * @param {*} type - fade, collapse, tranlate
 */
export default function (Component, type = ['fade'], duration = 360) {
  const hasCollapse = type.indexOf('collapse') >= 0

  class Hidable extends PureComponent {
    constructor(props) {
      super(props)

      this.state = {
        show: props.show,
      }

      this.bindElement = this.bindElement.bind(this)
    }

    componentDidMount() {
      const el = this.element

      this.height = el.offsetHeight
      if (this.props.show) return

      el.style.display = 'none'
      if (hasCollapse) {
        el.style.overflow = 'hidden'
        el.style.height = 0
      }
    }

    componentDidUpdate(prevProps) {
      if (this.props.show === prevProps.show) return

      if (this.props.show) this.show()
      else this.hide()
    }

    componentWillUnmount() {
      this.isUnmounted = true
    }

    show() {
      const es = this.element.style
      es.display = 'block'

      setTimeout(() => {
        if (!this.isUnmounted) {
          this.setState({ show: true })

          if (hasCollapse) {
            es.height = `${this.height}px`

            setTimeout(() => {
              es.height = 'auto'
              es.overflow = ''
            }, duration)
          }
        }
      }, 10)
    }

    hide() {
      this.setState({ show: false })

      if (hasCollapse) {
        this.height = this.element.offsetHeight
        this.element.style.height = `${this.height}px`
        this.element.style.overflow = 'hidden'

        setTimeout(() => {
          this.element.style.height = 0
        }, 10)
      }

      setTimeout(() => {
        if (this.state.show === false && this.element) {
          this.element.style.display = 'none'
        }
      }, duration)
    }

    bindElement(el) {
      this.element = findDOMNode(el)
    }

    render() {
      const className = classnames(
        hidableClass('_', ...type, `animation-${duration}`, this.state.show && 'show'),
        this.props.className,
      )

      return (
        <Component
          ref={this.bindElement}
          {...this.props}
          className={className}
        />
      )
    }
  }

  Hidable.propTypes = {
    className: PropTypes.string,
    show: PropTypes.bool,
    height: PropTypes.number,
  }

  Hidable.defaultProps = {
    className: '',
    show: false,
  }

  return Hidable
}
