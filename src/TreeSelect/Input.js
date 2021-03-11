import React, { Component, isValidElement, cloneElement } from 'react'
import PropTypes from 'prop-types'
import { focusElement } from '../utils/dom/element'
import { treeSelectClass } from '../styles'

class FilterInput extends Component {
  constructor(props) {
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

  componentDidUpdate(prevProps) {
    if (this.props.focus === prevProps.focus || !this.props.focus) return
    this.focus()
  }

  reset() {
    if (this.editElement) this.editElement.innerText = ''
    if (this.blurTimer) clearTimeout(this.blurTimer)
  }

  focus() {
    focusElement.select(this.editElement)
  }

  bindElement(el) {
    this.editElement = el
  }

  handleInput(e) {
    this.props.onFilter(e.target.innerText.replace('\feff ', '').trim())
  }

  render() {
    const { text, focus, multiple } = this.props
    const value = typeof text === 'string' ? text.replace(/<\/?[^>]*>/g, '') : text

    if (isValidElement(value)) {
      return cloneElement(value, {
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
  updatAble: PropTypes.bool,
  setInputReset: PropTypes.func.isRequired,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
}

FilterInput.defaultProps = {
  text: '',
  updatAble: false,
}

export default FilterInput
