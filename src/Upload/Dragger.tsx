// obsolete code
import React from 'react'
import { PureComponent } from '../component'
import { uploadClass } from './styles'
import Drop from './Drop'
import { accept as attrAccept } from '../utils'

interface DraggerProps {
  children: any
  multiple: boolean
  addFile: (...args: any) => void
  accept: string
  disabled: boolean
  limit: number
}
class Dragger extends PureComponent<DraggerProps> {
  constructor(props: DraggerProps) {
    super(props)
    this.handleDrop = this.handleDrop.bind(this)
  }

  getMatchedFile(files = []) {
    const { accept } = this.props
    return Array.prototype.slice.call(files).filter((file: File) => attrAccept(file, accept))
  }

  handleDrop(files: File[]) {
    const { addFile } = this.props
    addFile({ files, fromDragger: true })
  }

  render() {
    const { children, disabled, multiple, limit, accept } = this.props
    return (
      <Drop
        className={uploadClass('dragger-wrapper')}
        drop
        disabled={disabled}
        multiple={multiple || limit > 1}
        accept={accept}
        onDrop={this.handleDrop}
      >
        <div className={uploadClass('dragger-area', disabled && 'disabled')}>{children}</div>
      </Drop>
    )
  }
}

export default Dragger
