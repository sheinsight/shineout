import React, { Component, isValidElement, cloneElement } from 'react'
import { focusElement, preventPasteFile } from '../utils/dom/element'
import { treeSelectClass } from './styles'
import { InputProps } from './Props'

const DefaultValue = {
  text: '',
  updatAble: false,
}

class FilterInput extends Component<InputProps> {
  static defaultProps = DefaultValue

  editElement: HTMLSpanElement

  blurTimer: NodeJS.Timer

  handleBlur: React.FocusEventHandler<HTMLSpanElement> | undefined

  constructor(props: InputProps) {
    super(props)

    this.bindElement = this.bindElement.bind(this)
    this.handleInput = this.handleInput.bind(this)

    // for mutiple select
    this.props.setInputReset(this.reset.bind(this))
  }

  componentDidMount() {
    if (this.props.focus) {
      this.focus()
    }
  }

  shouldComponentUpdate() {
    return this.props.updatAble
  }

  componentDidUpdate(prevProps: InputProps) {
    if (this.props.focus === prevProps.focus || !this.props.focus) return
    this.focus()
  }

  reset() {
    if (this.editElement) this.editElement.innerText = ''
    if (this.blurTimer) clearTimeout(this.blurTimer)
  }

  focus() {
    requestAnimationFrame(() => {
      focusElement.select(this.editElement)
    })
  }

  bindElement(el: HTMLSpanElement) {
    this.editElement = el
  }

  handleInput(e: React.FormEvent<HTMLSpanElement>) {
    this.props.onFilter!((e.target as HTMLElement).innerText.replace('\feff ', '').trim())
  }

  render() {
    const { text, focus, multiple } = this.props
    const value = typeof text === 'string' ? text.replace(/<\/?[^>]*>/g, '') : text

    if (isValidElement(value)) {
      return cloneElement<any>(value, {
        className: treeSelectClass('input'),
        ref: this.bindElement,
        key: 'input',
        onInput: this.handleInput,
        contentEditable: focus,
      })
    }

    return (
      <span
        key="input"
        className={treeSelectClass('input', !multiple && 'full')}
        ref={this.bindElement}
        contentEditable={focus}
        onPaste={preventPasteFile}
        onInput={this.handleInput}
        onBlur={this.handleBlur}
        dangerouslySetInnerHTML={{ __html: value as string }}
      />
    )
  }
}

export default FilterInput
