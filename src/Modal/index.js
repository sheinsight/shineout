import { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { defaultProps, getProps } from '../utils/proptypes'
import { triggerModal } from './triggerModal'

export default class Modal extends PureComponent {
  componentDidMount() {
    // 首次渲染时如果modal设置的不显示,不执行其他操作
    if (this.props.visible) {
      triggerModal({
        ...this.props,
        content: this.props.children,
      })
    }
  }
  componentDidUpdate() {
    triggerModal({
      ...this.props,
      content: this.props.children,
    })
  }
  render() {
    return null
  }
}

Modal.success = function (options) {
  const option = {
    ...options,
    footer: null,
    special: true,
    iconType: 'Success',
    title: options.title || 'Success',
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
