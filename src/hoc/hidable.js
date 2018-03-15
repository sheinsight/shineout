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
export default function (Component, duration = 480, type = ['fade']) {
  class Hidable extends PureComponent {
    constructor(props) {
      super(props)

      this.state = {
        show: props.show,
      }

      this.bindElement = this.bindElement.bind(this)
    }

    componentDidMount() {
      this.height = this.element.offsetHeight
      if (!this.props.show) {
        if (type[0] === 'fade') {
          this.element.style.display = 'none'
        } else if (type[0] === 'collapse') {
          this.element.style.height = 0
        }
      }
    }

    componentDidUpdate(prevProps) {
      if (this.props.show !== prevProps.show) {
        if (this.props.show) {
          if (type[0] === 'fade') {
            this.element.style.display = 'block'
            setTimeout(() => {
              if (!this.isUnmounted) {
                this.setState({ show: true })
              }
            }, 10)
          } else if (type[0] === 'collapse') {
            this.element.style.height = `${this.height}px`
            setTimeout(() => {
              if (!this.isUnmounted) {
                this.setState({ show: true })
                this.element.style.height = 'auto'
              }
            }, duration)
          }
        } else {
          if (type[0] === 'collapse') {
            this.height = this.element.offsetHeight
            this.element.style.height = `${this.height}px`
            setTimeout(() => {
              this.element.style.height = 0
            }, 10)
          }
          // eslint-disable-next-line
          this.setState({ show: false })
          setTimeout(() => {
            if (this.state.show === false && !this.isUnmounted) {
              if (type[0] === 'fade') {
                this.element.style.display = 'none'
              }
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
