import React, { Component, isValidElement, cloneElement } from 'react'
import PropTypes from 'prop-types'
import { selectClass } from '../styles'
import { focusElement } from '../utils/dom/element'

const focusSelectAll = element => {
  requestAnimationFrame(() => {
    focusElement.select(element)
  })
}

class FilterInput extends Component {
  constructor(props) {
    super(props)

    this.bindElement = this.bindElement.bind(this)
    this.handleInput = this.handleInput.bind(this)
    this.handleBlur = this.handleBlur.bind(this)

    // for mutiple select
    this.props.setInputReset(this.reset.bind(this))
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

  reset() {
    if (this.editElement) this.editElement.innerText = ''
    if (this.blurTimer) clearTimeout(this.blurTimer)
  }

  focus() {
    focusSelectAll(this.editElement)
  }

  bindElement(el) {
    this.editElement = el
  }

  handleInput(e) {
    const { trim } = this.props
    const text = e.target.innerText.replace('\feff ', '')
    this.props.onFilter(trim ? text.trim() : text)
  }

  handleBlur(e) {
    const { trim } = this.props
    const text = e.target.innerText.replace('\feff ', '')
    this.props.onInputBlur(trim ? text.trim() : text)
  }

  render() {
    const { text, focus, multiple } = this.props
    const value = typeof text === 'string' ? text.replace(/<\/?[^>]*>/g, '') : text

    if (isValidElement(value)) {
      return cloneElement(value, {
        className: selectClass('input', !focus && 'ellipsis', !multiple && 'full'),
        ref: this.bindElement,
        key: 'input',
        onInput: this.handleInput,
        contentEditable: focus,
      })
    }

    return (
      <span
        key="input"
        className={selectClass('input', !focus && 'ellipsis', !multiple && 'full')}
        ref={this.bindElement}
        contentEditable={focus}
        onInput={this.handleInput}
        onBlur={this.handleBlur}
        dangerouslySetInnerHTML={{ __html: value }}
      />
    )
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
}

FilterInput.defaultProps = {
  text: '',
  updatAble: false,
}

export default FilterInput
