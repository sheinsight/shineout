import { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { defaultProps, getProps } from '../utils/proptypes'
import { getUidStr } from '../utils/uid'
import { open, close, destroy } from './events'

class Modal extends PureComponent {
  constructor(props) {
    super(props)
    this.id = getUidStr()
    this.handleClose = this.handleClose.bind(this)
  }

  componentDidMount() {
    // 首次渲染时如果modal设置的不显示,不执行其他操作
    if (this.props.visible) {
      open({
        ...this.props,
        content: this.props.children,
        id: this.id,
        onClose: this.handleClose,
      })
    }
  }

  componentDidUpdate(prevProps) {
    const option = {
      ...this.props,
      content: this.props.children,
      id: this.id,
      onClose: this.handleClose,
    }

    if (this.props.visible) open(option)
    else if (this.props.visible !== prevProps.visible) close(option)
  }

  componentWillUnmount() {
    destroy(this.id)
  }

  handleClose() {
    if (this.props.onClose) this.props.onClose()
  }

  render() {
    return null
  }
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

export default Modal
