import React from 'react'
import PropTypes from 'prop-types'
import { PureComponent } from '../component'
import { uploadClass } from '../styles'
import { accept as attrAccept } from '../utils'

class Dragger extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      dragType: '',
    }

    this.handleFileDrop = this.handleFileDrop.bind(this)
  }

  getMatchedFile(files = []) {
    const { accept } = this.props
    return Array.prototype.slice.call(files).filter(file => attrAccept(file, accept))
  }

  handleDrop(e) {
    const { multiple, addFile } = this.props
    if (!addFile) return
    const fileList = this.getMatchedFile(e.dataTransfer.files)
    if (!fileList || fileList.length <= 0) return
    const files = multiple ? fileList : [fileList[0]]
    addFile({ files, fromDragger: true })
  }

  handleFileDrop(e) {
    const { disabled } = this.props
    if (disabled) return
    e.preventDefault()
    this.setState({ dragType: e.type })
    if (e.type === 'drop') this.handleDrop(e)
  }

  render() {
    const { children, disabled } = this.props
    const { dragType } = this.state
    return (
      <div
        onDragOver={this.handleFileDrop}
        onDragLeave={this.handleFileDrop}
        onDrop={this.handleFileDrop}
        className={uploadClass('dragger-area', dragType === 'dragover' && 'dragger-hover', disabled && 'disabled')}
      >
        {children}
      </div>
    )
  }
}

Dragger.propTypes = {
  children: PropTypes.any,
  multiple: PropTypes.bool,
  addFile: PropTypes.func,
  accept: PropTypes.string,
  disabled: PropTypes.bool,
}

export default Dragger
