import React, { Component, isValidElement, cloneElement } from 'react'
import PropTypes from 'prop-types'
import { selectClass } from './styles'
import { focusElement, getCursorOffset, preventPasteFile } from '../utils/dom/element'
import { isString } from '../utils/is'

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

  componentDidUpdate(prevProps) {
    if (this.props.focus === prevProps.focus || !this.props.focus) return
    this.props.onInputFocus()
    this.focus()
  }

  getProcessedValue(text) {
    const { trim } = this.props
    if (!trim && this.lastCursorOffset === 0 && /^\u00A0$/.test(text)) return ''
    return trim ? text.trim() : text.replace(/\u00A0/g, ' ')
  }

  handlePaste(e) {
    const { convertBr } = this.props
    preventPasteFile(
      e,
      text => {
        if (window.getSelection) {
          const selection = window.getSelection()
          this.lastSelect = {
            anchorOffset: selection.anchorOffset,
            focusOffset: selection.focusOffset,
            text,
          }
        }
      },
      {
        convertBr,
      }
    )
  }

  geHandleMax(e) {
    const { maxLength } = this.props
    if (!maxLength || this.composition) {
      return true
    }
    let change = true
    const text = e.target.innerText
    if (text.length >= maxLength) {
      let lastPos
      // 输入的位置 需要考虑选中文本的情况
      if (window.getSelection) {
        lastPos = Math.min(window.getSelection().anchorOffset - (text.length > maxLength ? 1 : 0), maxLength)
      }
      if (!this.lastMaxValue) {
        this.lastMaxValue = text.slice(0, maxLength)
        // 粘贴文本的情况
      } else if (this.lastSelect) {
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

      e.target.innerText = this.lastMaxValue
      // 修改e.target.innerText后光标会变到最前面，这儿改变光标位置到上次光标的位置
      if (lastPos) {
        const selection = window.getSelection()
        const range = selection.getRangeAt(0)
        let textNode = range.startContainer
        if (textNode.nodeName !== '#text') {
          ;[textNode] = textNode.childNodes
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

  bindElement(el) {
    this.editElement = el
  }

  handleInput(e) {
    const change = this.geHandleMax(e)
    if (!change) {
      return
    }
    const text = e.target.innerText.replace('\feff ', '')
    this.lastCursorOffset = getCursorOffset(text.length)
    const t = this.getProcessedValue(text)
    this.props.onFilter(t)
  }

  handleBlur(e) {
    const { text: txt } = this.props
    const text = this.getProcessedValue(e.target.innerText.replace('\feff ', ''))
    this.focusInput(false)
    if (text === txt) return
    this.props.onInputBlur(text)
  }

  handleCompositionStart() {
    this.composition = true
  }

  handleCompositionEnd(e) {
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
      title: !focus && isString(value) ? value : null,
      onCompositionStart: this.handleCompositionStart,
      onCompositionEnd: this.handleCompositionEnd,
    }

    if (isValidElement(value)) {
      return cloneElement(value, {
        ...props,
        suppressContentEditableWarning: true,
      })
    }

    return <span dangerouslySetInnerHTML={{ __html: value }} {...props} onPaste={this.handlePaste} />
  }
}

FilterInput.propTypes = {
  focus: PropTypes.bool.isRequired,
  multiple: PropTypes.bool,
  onFilter: PropTypes.func.isRequired,
  onInputBlur: PropTypes.func.isRequired,
  onInputFocus: PropTypes.func.isRequired,
  updatAble: PropTypes.bool,
  setInputReset: PropTypes.func.isRequired,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  trim: PropTypes.bool,
  focusSelected: PropTypes.bool,
  bindFocusInputFunc: PropTypes.func,
  // collapse: PropTypes.func,
  maxLength: PropTypes.number,
  convertBr: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
}

FilterInput.defaultProps = {
  text: '',
  updatAble: false,
}

export default FilterInput
