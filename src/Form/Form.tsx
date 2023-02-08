import React, { Component } from 'react'
import classnames from 'classnames'
import { getUidStr } from '../utils/uid'
import { formClass } from './styles'
import { FormError } from '../utils/errors'
import { defaultProps } from '../utils/defaultProps'
import { docScroll } from '../utils/dom/document'
import { IGNORE_BIND, SUBMIT_TOPIC } from '../Datum/types'
import { FieldSetProvider } from './FieldSet'
import { isRTL } from '../config'
import { formStatus, SimpleFormProps } from './Props'

const emptyValue = { path: '' }
const DefaultProps = {
  ...defaultProps,
  scrollToError: false,
  throttle: 1000,
}
class Form<Value> extends Component<SimpleFormProps<Value>> {
  static defaultProps = (DefaultProps as unknown) as SimpleFormProps<any>

  locked: boolean

  id: string

  element: HTMLFormElement

  validating: boolean

  form: {
    getValue: () => Value
    validate: () => Promise<unknown>
    validateFields: (fields: string[]) => Promise<unknown>
    validateFieldsWithError: (fields: string[]) => Promise<unknown>
    clearValidate: () => void
    submit: (withValidate: boolean) => void
    reset: () => void
  }

  constructor(props: SimpleFormProps<Value>) {
    super(props)

    this.bindElement = this.bindElement.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleReset = this.handleReset.bind(this)

    this.locked = false
    this.id = `form_${getUidStr()}`

    this.form = {
      getValue: () => this.props.datum.getValue(),
      validate: () => this.props.datum.validate(),
      validateFields: fields => this.props.datum.validateFields(fields).catch(() => {}),
      validateFieldsWithError: fields => this.props.datum.validateFields(fields),
      clearValidate: () => {
        this.props.datum.validateClear()
      },
      submit: (withValidate = true) => {
        if (withValidate) this.handleSubmit()
        else {
          const activeEl = document.activeElement as HTMLDivElement
          if (activeEl) activeEl.blur()

          if (this.props.onSubmit) this.props.onSubmit(this.props.datum.getValue())
          if (activeEl) activeEl.focus()
        }
      },
      reset: () => {
        this.handleReset()
      },
    }
  }

  componentDidMount() {
    const { formRef } = this.props
    if (formRef) {
      if (typeof formRef === 'function') {
        formRef(this.form)
      } else {
        formRef.current = this.form
      }
    }
    this.setStatus()
    if (this.element) {
      this.element.addEventListener('submit', this.handleSubmit)
    }
  }

  componentDidUpdate(prevProps: SimpleFormProps<Value>) {
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
    let status: formStatus = disabled === true ? 'disabled' : ''
    if (pending === true) status = 'pending'
    setFormStatus(status)
  }

  bindElement(el: HTMLFormElement) {
    this.element = el
  }

  scrollToError(err: Error) {
    const { scrollToError, onError } = this.props
    if (scrollToError !== false) {
      const el = this.element.querySelector(`.${formClass('invalid')}`) as HTMLElement
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

  handleSubmit(e?: Event) {
    if (e) {
      e.preventDefault()
    }
    if (e && (e.target as HTMLElement).getAttribute('id') !== this.id) return
    if (this.validating || this.locked) return

    this.validating = true

    // prevent duplicate submit
    this.locked = true
    setTimeout(() => {
      this.locked = false
    }, this.props.throttle)

    const { datum, onSubmit } = this.props

    const activeEl = document.activeElement as HTMLElement
    if (activeEl) activeEl.blur()
    datum.dispatch(SUBMIT_TOPIC)

    setTimeout(() => {
      datum
        .validate(IGNORE_BIND)
        .then(() => {
          this.validating = false
          // @ts-ignore
          const detail = e && e.nativeEvent && e.nativeEvent.detail
          if (onSubmit) onSubmit(datum.getValue(), detail, e)
          if (activeEl) activeEl.focus()
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

export default Form
