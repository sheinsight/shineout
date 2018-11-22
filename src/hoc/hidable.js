import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { getUidStr } from '../utils/uid'
import PureComponent from '../PureComponent'
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

      this.id = `__hidable_${getUidStr()}__`
    }

    componentDidMount() {
      const el = this.getElement()
      if (!el) return

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

    getElement() {
      return document.querySelector(`.${this.id}`)
    }

    show() {
      const es = this.getElement().style
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
      const element = this.getElement()

      if (hasCollapse) {
        this.height = element.offsetHeight
        element.style.height = `${this.height}px`
        element.style.overflow = 'hidden'

        setTimeout(() => {
          element.style.height = 0
        }, 10)
      }

      setTimeout(() => {
        if (this.state.show === false && element) {
          element.style.display = 'none'
        }
      }, duration)
    }

    render() {
      const className = classnames(
        hidableClass('_', ...type, `animation-${duration}`, this.state.show && 'show'),
        this.props.className,
        this.id,
      )

      return (
        <Component
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
