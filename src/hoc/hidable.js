import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import createReactContext from '../context'
import { PureComponent } from '../component'
import { getUidStr } from '../utils/uid'
import { hidableClass } from '../styles'

const context = createReactContext()

export const consumer = Origin => props => (
  <context.Consumer>{value => <Origin {...value} {...props} />}</context.Consumer>
)

/**
 * @param {*} Component
 * @param {*} duration
 * @param {*} type - fade, collapse, tranlate
 */
export default function(Component, { type = ['fade'], duration = 360, display = 'block' }) {
  const hasCollapse = type.indexOf('collapse') >= 0
  const needTransform = type.indexOf('scale-y') >= 0

  class Hidable extends PureComponent {
    constructor(props) {
      super(props)

      this.state = {
        show: props.show,
      }
      this.height = 0
      this.id = `__hidable_${getUidStr()}__`
    }

    componentDidMount() {
      super.componentDidMount()
      const el = this.getElement()
      if (!el) return

      if (this.props.show) return
      if (hasCollapse) this.height = el.offsetHeight

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

    getElement() {
      return document.querySelector(`.${this.id}`)
    }

    show() {
      const es = this.getElement().style
      es.display = display

      setTimeout(() => {
        if (this.$isMounted) {
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
      let animation = `animation-${duration}`
      if (!needTransform) {
        animation = `fade-${animation}`
      }
      const className = classnames(
        hidableClass('_', ...type, animation, this.state.show && 'show'),
        this.props.className,
        this.id
      )
      const provider = { visible: this.state.show }
      return (
        <context.Provider value={provider}>
          <Component {...this.props} className={className} />
        </context.Provider>
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
