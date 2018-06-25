import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import FileInput from './FileInput'

class FileUpload extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {}

    this.handleAddClick = this.handleAddClick.bind(this)
    this.handleFileChange = this.handleFileChange.bind(this)
    this.bindElement = this.bindElement.bind(this)
  }

  bindElement(input) {
    this.input = input
  }

  handleAddClick() {
    this.input.click()
  }

  handleFileChange(e) {
    this.props.onFileAdd(e.target)
  }

  render() {
    const { children } = this.props

    return (
      <div>
        <div onClick={this.handleAddClick}>
          {children}
          <FileInput ref={this.bindElement} onChange={this.handleFileChange} />
        </div>
      </div>
    )
  }
}

FileUpload.propTypes = {
  children: PropTypes.any,
  onFileAdd: PropTypes.func,
}

export default FileUpload
