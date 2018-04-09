import React, { PureComponent } from 'react'
import { defaultProps, getProps } from '../utils/proptypes'
import CreateModal from './createModal'

export default class Modal extends PureComponent {
  render() {
    return <CreateModal content={this.props.children} {...this.props} />
  }
}

Modal.success = function (options) {
  return <CreateModal {...options} footer={null} special />
}

Modal.propTypes = {
  ...getProps(),
}

Modal.defaultProps = {
  ...defaultProps,
  width: 256,
}
