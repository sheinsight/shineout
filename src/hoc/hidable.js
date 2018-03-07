import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { findDOMNode } from 'react-dom'
import { hidableClass } from '../styles'

/**
 * @param {*} Component
 * @param {*} duration
 * @param {*} type - fade, collapse
 */
export default function (Component, duration = 400, type = ['fade']) {
  class Hidable extends PureComponent {
    constructor(props) {
      super(props)

      this.state = {
        show: props.show,
      }

      this.bindElement = this.bindElement.bind(this)
    }

    componentDidMount() {
      if (!this.props.show) {
        this.height = this.element.offsetHeight
        this.element.style.display = 'none'
      }
    }

    componentWillReceiveProps(nextProps) {
      if (this.props.show !== nextProps.show) {
        if (nextProps.show) {
          this.element.style.display = 'block'
          setTimeout(() => {
            if (!this.isUnmounted) {
              this.setState({ show: true })
            }
          }, 10)
        } else {
          this.setState({ show: false })
          setTimeout(() => {
            if (this.state.show === false && !this.isUnmounted) {
              this.element.style.display = 'none'
            }
          }, duration)
        }
      }
    }

    componentWillUnmount() {
      this.isUnmounted = true
    }

    bindElement(el) {
      this.element = findDOMNode(el)
    }

    render() {
      const className = classnames(
        hidableClass('_', ...type, this.state.show && 'show'),
        this.props.className,
      )
      return (
        <Component ref={this.bindElement} {...this.props} className={className} />
      )
    }
  }

  Hidable.propTypes = {
    className: PropTypes.string,
    show: PropTypes.bool,
  }

  Hidable.defaultProps = {
    className: '',
    show: false,
  }

  return Hidable
}
