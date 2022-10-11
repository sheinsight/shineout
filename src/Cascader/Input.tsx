import React, { Component, FocusEvent, ChangeEvent, ClipboardEvent } from 'react'
import { cascaderClass } from './styles'
import { focusElement, getCursorOffset, preventPasteFile } from '../utils/dom/element'

const handleFocus = (e: FocusEvent) => {
  e.stopPropagation()
}

interface Props<T> {
  onFilter: (text: string) => (d: T) => boolean
  trim: boolean
  focus: boolean
  filterText: string
}

interface State {
  editable: boolean
}

class FilterInput<T> extends Component<Props<T>, State> {
  lastCursorOffset: number

  editElement: HTMLSpanElement

  blurTimer: number

  constructor(props: Props<T>) {
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

  getProcessedValue(text: string) {
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

  bindElement(el: HTMLSpanElement) {
    this.editElement = el
  }

  handleInput(e: ChangeEvent<HTMLSpanElement>) {
    const text = e.target.innerText.replace('\feff ', '')
    this.lastCursorOffset = getCursorOffset(text.length)
    const t = this.getProcessedValue(text)
    this.props.onFilter(t)
  }

  // eslint-disable-next-line class-methods-use-this
  handlePaste(e: ClipboardEvent<HTMLSpanElement>) {
    preventPasteFile(e)
  }

  render() {
    const { focus } = this.props
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

export default FilterInput
