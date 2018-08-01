import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
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
    this.editElement.innerText = this.props.text
    if (this.props.focus === prevProps.focus || !this.props.focus) return
    this.props.onInputFocus()

    this.focus()
  }

  reset() {
    if (this.editElement) this.editElement.innerText = ''
    if (this.blurTimer) clearTimeout(this.blurTimer)
  }

  focus() {
    if (window.getSelection) {
      this.editElement.focus()
      const range = window.getSelection()
      range.selectAllChildren(this.editElement)
      range.collapseToEnd()
    } else if (document.selection) {
      const range = document.selection.createRange()
      range.moveToElementText(this.editElement)
      range.collapse(false)
      range.select()
    }
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
  text: PropTypes.string,
}

FilterInput.defaultProps = {
  text: '',
}

export default FilterInput
