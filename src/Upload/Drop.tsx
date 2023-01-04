import React from 'react'
import PropType from 'prop-types'
import classnames from 'classnames'
import { uploadClass } from './styles'
import { accept as fileAccept } from '../utils'
import { DropProps } from './Props'

interface DropState {
  drop: boolean
}
export default class Drop<ValueItem> extends React.Component<DropProps<ValueItem>, DropState> {
  static propTypes = {
    disabled: PropType.bool,
    accept: PropType.string,
    multiple: PropType.bool,
    onDrop: PropType.func,
    dropData: PropType.any,
    children: PropType.any,
    drop: PropType.bool,
    className: PropType.string,
  }

  static defaultProps = {
    drop: false,
  }

  constructor(props: DropProps<ValueItem>) {
    super(props)
    this.state = {
      drop: false,
    }
    this.handleDrag = this.handleDrag.bind(this)
    this.handleFileDrop = this.handleFileDrop.bind(this)
  }

  handleFileDrop(e: React.DragEvent) {
    const { files } = e.dataTransfer
    const { accept, multiple, onDrop, dropData } = this.props
    const filter = accept ? Array.prototype.filter.call(files, (f: File) => fileAccept(f, accept)) : files
    if (!filter || filter.length === 0) return
    if (onDrop) onDrop(multiple ? filter : [filter[0]], dropData)
  }

  handleDrag(e: React.DragEvent) {
    const { disabled } = this.props
    if (disabled) return
    e.preventDefault()
    e.stopPropagation()
    this.setState({ drop: e.type === 'dragover' })
    if (e.type === 'drop') this.handleFileDrop(e)
  }

  render() {
    const { drop } = this.state
    const { children, className } = this.props
    if (!this.props.drop) return children
    return (
      <span
        className={classnames(className, uploadClass(drop && 'drop'))}
        onDragOver={this.handleDrag}
        onDragLeave={this.handleDrag}
        onDrop={this.handleDrag}
      >
        {children}
      </span>
    )
  }
}
