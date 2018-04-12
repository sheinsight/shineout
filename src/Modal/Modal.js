import { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { defaultProps, getProps } from '../utils/proptypes'
import { getUidStr } from '../utils/uid'
import { triggerModal } from './triggerModal'

class Modal extends PureComponent {
  constructor(props) {
    super(props)
    this.id = getUidStr()
  }
  componentDidMount() {
    // 首次渲染时如果modal设置的不显示,不执行其他操作
    if (this.props.visible) {
      triggerModal({
        ...this.props,
        content: this.props.children,
        id: this.id,
      })
    }
  }
  componentDidUpdate() {
    triggerModal({
      ...this.props,
      content: this.props.children,
      id: this.id,
    })
  }
  render() {
    return null
  }
}

/**
 * 成功弹窗
 * @param options
 */
const success = function (options) {
  const id = getUidStr()
  const option = {
    ...options,
    footer: null,
    special: true,
    iconType: 'Success',
    title: options.title || 'Success',
    visible: true,
    id,
    onOk() {
      if (options.onOk) {
        options.onOk()
      }
      triggerModal({ ...this, visible: false })
    },
  }
  return triggerModal(option)
}

/**
 * 信息弹窗
 */
const info = function (options) {
  const id = getUidStr()
  const option = {
    ...options,
    footer: null,
    special: true,
    iconType: 'Info',
    title: options.title || 'Info',
    visible: true,
    id,
    onOk() {
      if (options.onOk) {
        options.onOk()
      }
      triggerModal({ ...this, visible: false })
    },
  }
  return triggerModal(option)
}

/**
 * 错误信息弹窗
 * @param options
 */
const error = function (options) {
  const id = getUidStr()
  const option = {
    ...options,
    footer: null,
    special: true,
    iconType: 'Error',
    title: options.title || 'Error',
    visible: true,
    id,
    onOk() {
      if (options.onOk) {
        options.onOk()
      }
      triggerModal({ ...this, visible: false })
    },
  }
  return triggerModal(option)
}
/**
 * 确认弹窗
 * @param options
 */
const confirm = function (options) {
  const id = getUidStr()
  const option = {
    ...options,
    footer: null,
    special: true,
    iconType: 'Confirm',
    title: options.title || 'Confirm',
    visible: true,
    id,
    onOk() {
      if (options.onOk) {
        options.onOk()
      }
      triggerModal({ ...this, visible: false })
    },
    onCancel() {
      if (options.onCancel) {
        options.onCancel()
      }
      triggerModal({ ...this, visible: false })
    },
  }
  return triggerModal(option)
}

Modal.propTypes = {
  ...getProps(),
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
}

Modal.defaultProps = {
  ...defaultProps,
}

export { Modal, success, info, error, confirm }
