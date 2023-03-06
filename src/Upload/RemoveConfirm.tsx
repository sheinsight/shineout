import React from 'react'
import { Component } from '../component'
import Popover from '../Popover'
import { UploadRemoveConfirmProps } from './Props'

interface UploadRemoveConfirmState {
  visible: boolean
}
export default class RemoveConfirm extends Component<UploadRemoveConfirmProps, UploadRemoveConfirmState> {
  constructor(props: UploadRemoveConfirmProps) {
    super(props)
    this.state = {
      visible: false,
    }
    this.handleRemoveConfirm = this.handleRemoveConfirm.bind(this)
    this.handleRemoveLater = this.handleRemoveLater.bind(this)
  }

  handleRemoveConfirm(visible: boolean) {
    const { onVisibleChange } = this.props
    if (onVisibleChange) onVisibleChange(visible)
    this.setState({ visible })
  }

  handleRemoveLater() {
    const { onRemove } = this.props
    return new Promise(resolve => {
      if (onRemove) onRemove()
      resolve(undefined)
    })
  }

  render() {
    const { visible } = this.state
    const { confirm } = this.props
    if (!confirm) return null
    const confirmProps = typeof confirm === 'object' ? confirm : { children: confirm }
    return (
      <Popover.Confirm
        {...confirmProps}
        onOk={this.handleRemoveLater}
        visible={visible}
        onVisibleChange={this.handleRemoveConfirm}
      />
    )
  }
}
