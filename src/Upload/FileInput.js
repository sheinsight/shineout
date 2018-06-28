import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

const inputStyle = { display: 'none' }

class FileInput extends PureComponent {
  constructor(props) {
    super(props)

    this.locked = false
    this.bindElement = this.bindElement.bind(this)
  }

  bindElement(el) {
    this.input = el
  }

  click() {
    if (this.locked) return
    this.locked = true

    this.input.value = ''
    this.input.click()

    setTimeout(() => { this.locked = false }, 1000)
  }

  render() {
    const { accept, onChange, multiple } = this.props

    return (
      <input
        ref={this.bindElement}
        accept={accept}
        multiple={multiple}
        onChange={onChange}
        style={inputStyle}
        type="file"
      />
    )
  }
}

FileInput.propTypes = {
  accept: PropTypes.string,
  multiple: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
}

export default FileInput
