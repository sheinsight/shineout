import React from 'react'
import { PureComponent } from '../component'
import inputBorder from '../hoc/inputBorder'
import { tagClass } from './styles'
import { TagInputProps } from './interface'

class TagInput extends PureComponent<TagInputProps> {
  element: HTMLInputElement

  constructor(props: TagInputProps) {
    super(props)
    this.bindRef = this.bindRef.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
    this.handleKeyUp = this.handleKeyUp.bind(this)
  }

  componentDidMount() {
    super.componentDidMount()
    if (this.element) this.element.focus()
  }

  bindRef(el: HTMLInputElement) {
    this.element = el
  }

  handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target
    const { onChange } = this.props
    if (onChange) onChange(value)
  }

  handleKeyUp(e: React.KeyboardEvent<HTMLInputElement> & React.FocusEvent<HTMLInputElement>) {
    const { onBlur, onKeyUp, onEnterPress } = this.props
    if (e.keyCode === 13) {
      if (onEnterPress) onEnterPress(e.target.value, e)
      else if (onBlur) onBlur(e.target.value, e as React.FocusEvent<HTMLInputElement>)
    }
    if (onKeyUp) onKeyUp(e)
  }

  handleBlur(e: React.FocusEvent<HTMLInputElement>) {
    const { onBlur } = this.props
    if (onBlur) onBlur(e.target.value, e)
  }

  render() {
    const { value, onFocus } = this.props

    return (
      <input
        ref={this.bindRef}
        type="text"
        value={value}
        onFocus={onFocus}
        onChange={this.handleChange}
        onKeyUp={this.handleKeyUp}
        onBlur={this.handleBlur}
      />
    )
  }
}

export default inputBorder({
  className: tagClass('input'),
})(TagInput)
