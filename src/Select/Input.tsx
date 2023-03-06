import React, { Component, isValidElement, cloneElement } from 'react'
import { selectClass } from './styles'
import { focusElement, getCursorOffset, preventPasteFile } from '../utils/dom/element'
import { isString } from '../utils/is'
import { InputProps } from './Props'

const handleFocus = (e: React.FocusEvent) => {
  e.stopPropagation()
}

interface InputState {
  editable: boolean
}

const DefaultValue = {
  text: '',
  updatAble: false,
}

class FilterInput extends Component<InputProps, InputState> {
  static defaultProps = DefaultValue

  lastCursorOffset: number

  composition: boolean

  editElement: HTMLSpanElement

  lastSelect: { anchorOffset: number; focusOffset: number; text: string } | boolean

  lastMaxValue: string

  blurTimer: NodeJS.Timer

  constructor(props: InputProps) {
    super(props)

    this.state = {
      editable: false,
    }

    this.bindElement = this.bindElement.bind(this)
    this.handleInput = this.handleInput.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
    this.geHandleMax = this.geHandleMax.bind(this)
    this.handlePaste = this.handlePaste.bind(this)

    this.focusInput = this.focusInput.bind(this)
    this.handleCompositionStart = this.handleCompositionStart.bind(this)
    this.handleCompositionEnd = this.handleCompositionEnd.bind(this)

    // for mutiple select
    this.props.setInputReset(this.reset.bind(this))

    // set focus func to Select
    props.bindFocusInputFunc(this.focusInput)
  }

  componentDidMount() {
    if (this.props.focus) {
      this.props.onInputFocus()
      this.focus()
    }
  }

  shouldComponentUpdate() {
    return this.props.updatAble
  }

  componentDidUpdate(prevProps: InputProps) {
    if (this.props.focus === prevProps.focus || !this.props.focus) return
    this.props.onInputFocus()
    this.focus()
  }

  getProcessedValue(text: string) {
    const { trim } = this.props
    if (!trim && this.lastCursorOffset === 0 && /^\u00A0$/.test(text)) return ''
    return trim ? text.trim() : text.replace(/\u00A0/g, ' ')
  }

  handlePaste(e: React.ClipboardEvent) {
    const { convertBr } = this.props
    preventPasteFile(
      e,
      (text: string) => {
        if (window.getSelection) {
          const selection = window.getSelection()
          this.lastSelect = {
            anchorOffset: selection!.anchorOffset,
            focusOffset: selection!.focusOffset,
            text,
          }
        }
      },
      {
        convertBr,
      }
    )
  }

  geHandleMax(e: React.ChangeEvent) {
    const { maxLength } = this.props
    if (!maxLength || this.composition) {
      return true
    }
    let change = true
    const text = (e.target as HTMLElement).innerText
    if (text.length >= maxLength) {
      let lastPos
      // 输入的位置 需要考虑选中文本的情况
      if (window.getSelection) {
        lastPos = Math.min(window.getSelection()!.anchorOffset - (text.length > maxLength ? 1 : 0), maxLength)
      }
      if (!this.lastMaxValue) {
        this.lastMaxValue = text.slice(0, maxLength)
        // 粘贴文本的情况
      } else if (this.lastSelect && typeof this.lastSelect !== 'boolean') {
        const { anchorOffset, focusOffset, text: str } = this.lastSelect
        const start = anchorOffset < focusOffset ? anchorOffset : focusOffset
        const end = anchorOffset > focusOffset ? anchorOffset : focusOffset
        if (end - start > 0) {
          this.lastMaxValue =
            this.lastMaxValue.slice(0, start) + str.slice(0, end - start) + this.lastMaxValue.slice(end)
          lastPos = focusOffset
        } else {
          change = false
        }
      } else {
        change = false
      }
      // clear select info
      this.lastSelect = false
      ;(e.target as HTMLElement).innerText = this.lastMaxValue
      // 修改e.target.innerText后光标会变到最前面，这儿改变光标位置到上次光标的位置
      if (lastPos) {
        const selection = window.getSelection()
        const range = selection!.getRangeAt(0)
        let textNode = range.startContainer
        if (textNode.nodeName !== '#text') {
          ;[textNode] = textNode.childNodes as any
        }
        range.setStart(textNode, lastPos)
        range.collapse(true)
      }
    } else {
      this.lastMaxValue = ''
    }
    // eslint-disable-next-line consistent-return
    return change
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
    const { focusSelected } = this.props
    const action = focusSelected ? focusElement.select : focusElement.end
    requestAnimationFrame(() => {
      action(this.editElement)
    })
  }

  bindElement(el: HTMLSpanElement) {
    this.editElement = el
  }

  handleInput(e: any) {
    const { onFilter } = this.props
    const change = this.geHandleMax(e)
    if (!change) {
      return
    }
    const text = (e.target as HTMLElement).innerText.replace('\feff ', '')
    this.lastCursorOffset = getCursorOffset(text.length)
    const t = this.getProcessedValue(text)
    if (onFilter) onFilter(t)
  }

  handleBlur(e: React.FocusEvent) {
    const { text: txt } = this.props
    const text = this.getProcessedValue((e.target as HTMLElement).innerText.replace('\feff ', ''))
    this.focusInput(false)
    if (text === txt) return
    this.props.onInputBlur(text)
  }

  handleCompositionStart() {
    this.composition = true
  }

  handleCompositionEnd(e: any) {
    this.composition = false
    this.handleInput(e)
  }

  render() {
    const { text, focus, multiple } = this.props
    const value = typeof text === 'string' ? text.replace(/<\/?[^>]*>/g, '') : text
    const props = {
      className: selectClass('input', !focus && 'ellipsis', !multiple && 'full'),
      ref: this.bindElement,
      key: 'input',
      onInput: this.handleInput,
      contentEditable: focus || this.state.editable,
      onFocus: handleFocus,
      onBlur: this.handleBlur,
      title: !focus && isString(value) ? value : undefined,
      onCompositionStart: this.handleCompositionStart,
      onCompositionEnd: this.handleCompositionEnd,
    }
    if (isValidElement(value)) {
      if (value.type.toString() === 'Symbol(react.fragment)') {
        return cloneElement(<span>{value}</span>, {
          ...props,
          suppressContentEditableWarning: true,
        })
      }
      return cloneElement(value, {
        ...props,
        // @ts-ignore
        // cloneElement 中的默认类型 React.HTMLAttributes 缺失 suppressContentEditableWarning
        suppressContentEditableWarning: true,
      })
    }
    // @ts-ignore
    return <span dangerouslySetInnerHTML={{ __html: value }} {...props} onPaste={this.handlePaste} />
  }
}

export default FilterInput
