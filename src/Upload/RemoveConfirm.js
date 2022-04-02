import React from 'react'
import PropTypes from 'prop-types'
import { Component } from '../component'
import Popover from '../Popover'

export default class RemoveConfirm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
    }
    this.handleRemoveConfirm = this.handleRemoveConfirm.bind(this)
    this.handleRemoveLater = this.handleRemoveLater.bind(this)
  }

  handleRemoveConfirm(visible) {
    const { onVisibleChange } = this.props
    if (onVisibleChange) onVisibleChange(visible)
    this.setState({ visible })
  }

  handleRemoveLater() {
    const { onRemove } = this.props
    return new Promise(resolve => {
      if (onRemove) onRemove()
      resolve()
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

RemoveConfirm.propTypes = {
  confirm: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onRemove: PropTypes.func,
  onVisibleChange: PropTypes.func,
}
