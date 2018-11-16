import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { getUidStr } from '../utils/uid'
import { formClass } from '../styles'
import { getProps, defaultProps } from '../utils/proptypes'

class Form extends PureComponent {
  constructor(props) {
    super(props)

    this.bindElement = this.bindElement.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleReset = this.handleReset.bind(this)

    this.locked = false
    this.id = `form_${getUidStr()}`
  }

  componentDidMount() {
    this.setStatus()
  }

  componentDidUpdate() {
    this.setStatus()
  }

  setStatus() {
    const { disabled, pending, setFormStatus } = this.props
    if (!setFormStatus) return
    let status = disabled === true ? 'disabled' : ''
    if (pending === true) status = 'pending'
    setFormStatus(status)
  }

  bindElement(el) {
    this.element = el
  }

  handleSubmit(e) {
    e.preventDefault()
    if (e.target.id !== this.id) return
    if (this.validating || this.locked) return

    this.validating = true

    // prevent duplicate submit
    this.locked = true
    setTimeout(() => {
      this.locked = false
    }, this.props.throttle)

    const {
      datum, onError, onSubmit, scrollToError,
    } = this.props

    const { activeElement } = document
    if (activeElement) activeElement.blur()

    setTimeout(() => {
      datum.validate().then(() => {
        this.validating = false
        if (onSubmit) onSubmit(datum.getValue())
        if (activeElement) activeElement.focus()
      }).catch((err) => {
        this.validating = false
        if (onError) onError(err)
        if (scrollToError !== false) {
          const el = this.element.querySelector(`.${formClass('invalid')}`)
          if (el) {
            el.scrollIntoView()
            if (el.focus) el.focus()
          }
          if (typeof scrollToError === 'number' && scrollToError !== 0) {
            document.documentElement.scrollTop -= scrollToError
          }
        }
      })
    }, 10)
  }

  handleReset() {
    const { datum, onReset } = this.props
    datum.reset()
    if (onReset) onReset()
  }

  render() {
    const {
      layout, style, inline, disabled, datum, rules, pending,
    } = this.props

    if (datum && rules && datum.rules !== rules) {
      datum.rules = rules
    }

    const className = classnames(
      formClass(
        '_',
        layout,
        (disabled || pending) && 'disabled',
        inline && 'inline',
      ),
      this.props.className,
    )

    return (
      <form
        ref={this.bindElement}
        className={className}
        id={this.id}
        style={style}
        onReset={this.handleReset}
        onSubmit={this.handleSubmit}
      >
        {this.props.children}
      </form>
    )
  }
}

Form.propTypes = {
  ...getProps(PropTypes, 'disabled'),
  datum: PropTypes.object,
  disabled: PropTypes.bool,
  inline: PropTypes.bool,
  labelAlign: PropTypes.string,
  layout: PropTypes.string,
  pending: PropTypes.bool,
  onError: PropTypes.func,
  onReset: PropTypes.func,
  onSubmit: PropTypes.func,
  rules: PropTypes.object,
  scrollToError: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.number,
  ]),
  setFormStatus: PropTypes.func,
  throttle: PropTypes.number,
}

Form.defaultProps = {
  ...defaultProps,
  scrollToError: false,
  throttle: 1000,
}

export default Form
