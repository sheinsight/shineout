import React, { PureComponent } from 'react'
import { FileInputProps } from './Props'

const inputStyle = { display: 'none' }

class FileInput extends PureComponent<FileInputProps> {
  locked: boolean

  input: HTMLInputElement

  constructor(props: FileInputProps) {
    super(props)

    this.locked = false
    this.bindElement = this.bindElement.bind(this)
  }

  bindElement(el: HTMLInputElement) {
    this.input = el
  }

  click() {
    if (this.locked) return
    this.locked = true

    this.input.value = ''
    this.input.click()

    setTimeout(() => {
      this.locked = false
    }, 1000)
  }

  render() {
    const { accept, onChange, multiple, webkitdirectory } = this.props
    const OriginProps: {
      webkitdirectory?: string
      [props: string]: unknown
    } = {}
    if (webkitdirectory) {
      OriginProps.webkitdirectory = ''
    }
    return (
      <input
        ref={this.bindElement}
        accept={accept}
        multiple={multiple}
        onChange={onChange}
        style={inputStyle}
        type="file"
        {...OriginProps}
      />
    )
  }
}

export default FileInput
