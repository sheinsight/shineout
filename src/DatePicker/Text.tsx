import React, { PureComponent } from 'react'
import { getParent, focusElement } from '../utils/dom/element'
import utils from './utils'
import { datepickerClass } from './styles'
import { getLocale } from '../locale'
import { TextProps } from './Props'

let target: HTMLElement | null = null
document.addEventListener(
  'mousedown',
  e => {
    // eslint-disable-next-line prefer-destructuring
    target = e.target as HTMLElement
  },
  true
)

const DefaultValue = {
  value: '',
}

class Text extends PureComponent<TextProps> {
  static defaultProps = DefaultValue

  element: HTMLSpanElement

  constructor(props: TextProps) {
    super(props)

    this.handleBlur = this.handleBlur.bind(this)
    this.handleInput = this.handleInput.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
    this.bindElement = this.bindElement.bind(this)
  }

  componentDidUpdate(prevProps: TextProps) {
    if (
      prevProps.focus !== this.props.focus &&
      this.props.focus &&
      this.element &&
      (this.props.focusElement === this.element || !this.props.focusElement)
    ) {
      focusElement.end(this.element)
    }
  }

  getOptions() {
    const { timeZone } = this.props
    return { timeZone, weekStartsOn: getLocale('startOfWeek') }
  }

  bindElement(el: HTMLSpanElement) {
    const { onTextSpanRef } = this.props
    this.element = el
    if (onTextSpanRef) onTextSpanRef(el)
  }

  handleBlur(e: React.FocusEvent<HTMLSpanElement>) {
    const { format, index, onChange, value } = this.props
    const txt = e.target.innerText
    if (getParent(target, `.${datepickerClass('picker')}`)) return
    if (txt === value) return
    if (txt.trim().length === 0) {
      onChange(undefined, index, e)
    } else {
      const newValue = utils.toDateWithFormat(txt, format as string, undefined, this.getOptions())
      // if translate fail, clear
      if (!newValue) {
        // @ts-ignore
        this.element.innerText = null
      }
      onChange(newValue, index, e)
    }
  }

  handleFocus(e: React.FocusEvent) {
    const { onTextSpanRef } = this.props
    if (onTextSpanRef) onTextSpanRef(e.target as HTMLSpanElement)
  }

  handleInput(e: React.KeyboardEvent<HTMLSpanElement>) {
    if (e.keyCode === 13) {
      e.preventDefault()
      e.stopPropagation()
      this.element.blur()
      this.handleBlur(e as any)

      // must wait for handleBlur to finish executing
      Promise.resolve().then(() => {
        document.dispatchEvent(new Event('mousedown', { bubbles: true }))
      })
    }
  }

  render() {
    const { className, inputable, value, placeholder, disabled, focus } = this.props

    if (!inputable || disabled || !focus) {
      return (
        <span onClick={this.handleFocus as any} className={className}>
          {value || placeholder}
        </span>
      )
    }

    return (
      <span
        ref={this.bindElement}
        contentEditable={inputable}
        onBlur={this.handleBlur}
        onFocus={this.handleFocus}
        onKeyDown={this.handleInput}
        className={className}
        dangerouslySetInnerHTML={{ __html: value }}
      />
    )
  }
}

export default Text
