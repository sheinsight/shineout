import React, { PureComponent, isValidElement, cloneElement } from 'react'
import PropTypes from 'prop-types'
import { focusElement } from '../utils/dom/element'
import { selectClass } from '../styles'

class FilterInput extends PureComponent {
  constructor(props) {
    super(props)

    this.bindElement = this.bindElement.bind(this)
    this.handleInput = this.handleInput.bind(this)

    // for mutiple select
    this.props.setInputReset(this.reset.bind(this))
  }

  componentDidMount() {
    if (this.props.focus) {
      this.props.onInputFocus()
      this.focus()
    }
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
    focusElement(this.editElement)
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
        className: selectClass('input', !multiple && 'full'),
        ref: this.bindElement,
        key: 'input',
        onInput: this.handleInput,
        contentEditable: focus,
      })
    }

    return (
      <span
        key="input"
        className={selectClass('input', !multiple && 'full')}
        ref={this.bindElement}
        contentEditable={focus}
        onInput={this.handleInput}
        dangerouslySetInnerHTML={{ __html: value }}
      />
    )
  }
}

FilterInput.propTypes = {
  focus: PropTypes.bool.isRequired,
  multiple: PropTypes.bool,
  onFilter: PropTypes.func.isRequired,
  onInputFocus: PropTypes.func.isRequired,
  setInputReset: PropTypes.func.isRequired,
  text: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
}

FilterInput.defaultProps = {
  text: '',
}

export default FilterInput
