import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { selectClass } from '../styles'

class FilterInput extends PureComponent {
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

  handleBlur(e) {
    const evt = { target: e.target }

    this.blurTimer = setTimeout(() => {
      this.props.onInputBlur(evt, true)
    }, 200)
  }

  render() {
    const { text, focus } = this.props
    const value = text.replace(/<\/?[^>]*>/g, '')

    return (
      <span
        key="input"
        className={selectClass('input')}
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
  onFilter: PropTypes.func.isRequired,
  onInputFocus: PropTypes.func.isRequired,
  onInputBlur: PropTypes.func.isRequired,
  setInputReset: PropTypes.func.isRequired,
  text: PropTypes.string,
}

FilterInput.defaultProps = {
  text: '',
}

export default FilterInput
