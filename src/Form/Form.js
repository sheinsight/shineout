import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { getUidStr } from '../utils/uid'
import { formClass } from '../styles'
import { FormError } from '../utils/errors'
import { getProps, defaultProps } from '../utils/proptypes'
import { docScroll } from '../utils/dom/document'
import { IGNORE_BIND } from '../Datum/types'
import { FieldSetProvider } from './FieldSet'
import { isRTL } from '../config'

const emptyValue = { path: '' }

class Form extends Component {
  constructor(props) {
    super(props)

    this.bindElement = this.bindElement.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleReset = this.handleReset.bind(this)

    this.locked = false
    this.id = `form_${getUidStr()}`

    this.form = {
      getValue: () => this.props.datum.getValue(),
      validate: () => this.props.datum.validate(),
      clearValidate: () => {
        this.props.datum.validateClear()
      },
      submit: (withValidate = true) => {
        if (withValidate) this.handleSubmit()
        else {
          const { activeElement } = document
          if (activeElement) activeElement.blur()

          if (this.props.onSubmit) this.props.onSubmit(this.props.datum.getValue())
          if (activeElement) activeElement.focus()
        }
      },
      reset: () => {
        this.handleReset()
      },
    }
  }

  componentDidMount() {
    const { formRef } = this.props
    if (formRef) formRef(this.form)
    this.setStatus()
    if (this.element) {
      this.element.addEventListener('submit', this.handleSubmit)
    }
  }

  componentDidUpdate(prevProps) {
    this.setStatus()
    if (prevProps.error !== this.props.error) this.props.datum.resetFormError(this.props.error)
  }

  componentWillUnmount() {
    this.props.datum.formUnmount = true
    if (this.element) {
      this.element.removeEventListener('submit', this.handleSubmit)
    }
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

  scrollToError(err) {
    const { scrollToError, onError } = this.props
    if (scrollToError !== false) {
      const el = this.element.querySelector(`.${formClass('invalid')}`)
      if (el) {
        el.scrollIntoView()
        if (el.focus) el.focus()
      }
      if (typeof scrollToError === 'number' && scrollToError !== 0) {
        docScroll.top -= scrollToError
      }
    }

    if (onError) onError(err)
    if (!(err instanceof FormError)) throw err
  }

  handleSubmit(e) {
    if (e) {
      e.preventDefault()
    }
    if (e && e.target.getAttribute('id') !== this.id) return
    if (this.validating || this.locked) return

    this.validating = true

    // prevent duplicate submit
    this.locked = true
    setTimeout(() => {
      this.locked = false
    }, this.props.throttle)

    const { datum, onSubmit } = this.props

    const { activeElement } = document
    if (activeElement) activeElement.blur()

    setTimeout(() => {
      datum
        .validate(IGNORE_BIND)
        .then(() => {
          this.validating = false
          if (onSubmit) onSubmit(datum.getValue(), e && e.nativeEvent && e.nativeEvent.detail, e)
          if (activeElement) activeElement.focus()
        })
        .catch(err => {
          this.validating = false
          // wait for render complete
          setTimeout(this.scrollToError.bind(this, err))
        })
    }, 10)
  }

  handleReset() {
    const { datum, onReset } = this.props
    datum.reset()
    if (onReset) onReset()
  }

  render() {
    const { layout, style, inline, disabled, datum, rules, pending } = this.props

    if (datum && rules && datum.rules !== rules) {
      datum.rules = rules
    }

    const className = classnames(
      formClass('_', layout, (disabled || pending) && 'disabled', inline && 'inline', isRTL() && 'rtl'),
      this.props.className
    )

    return (
      <form ref={this.bindElement} className={className} id={this.id} style={style} onReset={this.handleReset}>
        <FieldSetProvider value={emptyValue}>{this.props.children}</FieldSetProvider>
      </form>
    )
  }
}

Form.propTypes = {
  ...getProps(PropTypes, 'disabled'),
  datum: PropTypes.object,
  disabled: PropTypes.bool,
  inline: PropTypes.bool,
  layout: PropTypes.string,
  pending: PropTypes.bool,
  onError: PropTypes.func,
  onReset: PropTypes.func,
  onSubmit: PropTypes.func,
  rules: PropTypes.object,
  scrollToError: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  setFormStatus: PropTypes.func,
  throttle: PropTypes.number,
}

Form.defaultProps = {
  ...defaultProps,
  scrollToError: false,
  throttle: 1000,
}

export default Form
