import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { inputClass } from '../Input/styles'
import { getParent, focusElement } from '../utils/dom/element'
import utils from './utils'
import { datepickerClass } from './styles'
import { getLocale } from '../locale'

let target = null
document.addEventListener(
  'mousedown',
  e => {
    // eslint-disable-next-line prefer-destructuring
    target = e.target
  },
  true
)

class Text extends PureComponent {
  constructor(props) {
    super(props)

    this.handleBlur = this.handleBlur.bind(this)
    this.handleInput = this.handleInput.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
    this.handleSpanClick = this.handleSpanClick.bind(this)
    this.bindElement = this.bindElement.bind(this)
  }

  componentDidUpdate(prevProps) {
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

  bindElement(el) {
    const { onTextSpanRef } = this.props
    this.element = el
    if (onTextSpanRef) onTextSpanRef(el)
  }

  handleBlur(e) {
    const { format, index, onChange, value } = this.props
    const txt = e.target.innerText
    if (getParent(target, `.${datepickerClass('picker')}`)) return
    if (txt === value) return
    if (txt.trim().length === 0) {
      onChange(undefined, index, e)
    } else {
      const newValue = utils.toDateWithFormat(txt, format, undefined, this.getOptions())
      // if translate fail, clear
      if (!newValue) {
        this.element.innerText = null
      }
      onChange(newValue, index, e)
    }
  }

  handleFocus(e) {
    const { onTextSpanRef } = this.props
    if (onTextSpanRef) onTextSpanRef(e.target)
  }

  handleSpanClick() {
    const { onTextSpanRef } = this.props
    if (onTextSpanRef && this.element) onTextSpanRef(this.element)
  }

  handleInput(e) {
    if (e.keyCode === 13) {
      e.preventDefault()
      e.stopPropagation()
      this.element.blur()
      this.handleBlur(e)

      // must wait for handleBlur to finish executing
      Promise.resolve().then(() => {
        document.dispatchEvent(new Event('mousedown', { bubbles: true }))
      })
    }
  }

  render() {
    const { className, inputable, value, placeholder, disabled, focus } = this.props
    const showInput = inputable && !disabled && focus
    const hideStyle = { display: 'none' }
    return (
      <>
        {inputable ? (
          <span
            style={!showInput ? hideStyle : undefined}
            ref={this.bindElement}
            key="edit"
            contentEditable={inputable}
            onBlur={this.handleBlur}
            onFocus={this.handleFocus}
            onKeyDown={this.handleInput}
            className={className}
            dangerouslySetInnerHTML={{ __html: value }}
          />
        ) : null}
        <span
          style={showInput ? hideStyle : undefined}
          key="placeholder"
          onClick={this.handleSpanClick}
          className={classnames(!value && inputClass('placeholder'), className)}
        >
          {value || placeholder}
        </span>
      </>
    )
  }
}

Text.propTypes = {
  disabled: PropTypes.bool,
  className: PropTypes.string,
  format: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  index: PropTypes.number,
  inputable: PropTypes.bool,
  onChange: PropTypes.func,
  placeholder: PropTypes.any,
  value: PropTypes.string,
  onTextSpanRef: PropTypes.func,
  focus: PropTypes.bool,
  focusElement: PropTypes.instanceOf(Element),
  timeZone: PropTypes.string,
}

Text.defaultProps = {
  value: '',
}

export default Text
