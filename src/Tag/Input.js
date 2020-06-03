import React from 'react'
import PropTypes from 'prop-types'
import { PureComponent } from '../component'
import inputBorder from '../hoc/inputBorder'
import { tagClass } from '../styles'

class TagInput extends PureComponent {
  constructor(props) {
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

  bindRef(el) {
    this.element = el
  }

  handleChange(e) {
    const { value } = e.target
    const { onChange } = this.props
    if (onChange) onChange(value)
  }

  handleKeyUp(e) {
    const { onBlur, onKeyUp, onEnterPress } = this.props
    if (e.keyCode === 13) {
      if (onEnterPress) onEnterPress(e.target.value, e)
      else if (onBlur) onBlur(e.target.value, e)
    }
    if (onKeyUp) onKeyUp(e)
  }

  handleBlur(e) {
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

TagInput.propTypes = {
  value: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onKeyUp: PropTypes.func,
  onEnterPress: PropTypes.func,
  onFocus: PropTypes.func,
}

export default inputBorder({
  className: tagClass('input'),
})(TagInput)
