import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { cascaderClass } from '../styles'
import { focusElement, getCursorOffset } from '../utils/dom/element'

const handleFocus = e => {
  e.stopPropagation()
}

class FilterInput extends Component {
  constructor(props) {
    super(props)

    this.state = {
      editable: false,
    }

    this.bindElement = this.bindElement.bind(this)
    this.handleInput = this.handleInput.bind(this)
    this.handlePaste = this.handlePaste.bind(this)
    this.focusInput = this.focusInput.bind(this)
  }

  componentDidMount() {
    this.focusInput(true)
  }

  getProcessedValue(text) {
    const { trim } = this.props
    if (!trim && this.lastCursorOffset === 0 && /^\u00A0$/.test(text)) return ''
    return trim ? text.trim() : text.replace(/\u00A0/g, ' ')
  }

  reset() {
    if (this.editElement) this.editElement.innerText = ''
    if (this.blurTimer) clearTimeout(this.blurTimer)
  }

  focusInput(flag = false) {
    if (!flag) {
      this.setState({
        editable: false,
      })
      return
    }
    this.setState(
      {
        editable: true,
      },
      () => this.focus()
    )
  }

  focus() {
    requestAnimationFrame(() => {
      focusElement.end(this.editElement)
    })
  }

  bindElement(el) {
    this.editElement = el
  }

  handleInput(e) {
    const text = e.target.innerText.replace('\feff ', '')
    this.lastCursorOffset = getCursorOffset(text.length)
    const t = this.getProcessedValue(text)
    this.props.onFilter(t)
  }

  handlePaste(e) {
    const text = (e.clipboardData || window.clipboardData).getData('text/plain')
    if (!text) return
    e.preventDefault()
    document.execCommand('insertText', false, text)
    this.handleInput({ target: { innerText: text } })
  }

  render() {
    const { focus, filterText } = this.props
    const props = {
      className: cascaderClass('input', !focus && 'ellipsis'),
      ref: this.bindElement,
      key: 'input',
      onInput: this.handleInput,
      contentEditable: focus || this.state.editable,
      onFocus: handleFocus,
      onPaste: this.handlePaste,
    }

    return <span {...props} />
  }
}

FilterInput.propTypes = {
  onFilter: PropTypes.func.isRequired,
  trim: PropTypes.bool,
  focus: PropTypes.bool,
  filterText: PropTypes.string,
}

export default FilterInput
