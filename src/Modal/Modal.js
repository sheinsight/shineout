import { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { defaultProps, getProps } from '../utils/proptypes'
import { getUidStr } from '../utils/uid'
import { open, close, destroy } from './events'

class Modal extends PureComponent {
  constructor(props) {
    super(props)
    this.id = getUidStr()
    this.visible = props.visible
  }

  componentDidMount() {
    // 首次渲染时如果modal设置的不显示,不执行其他操作
    if (this.props.visible) {
      open({
        ...this.props,
        content: this.props.children,
        id: this.id,
      })
    }
  }

  componentDidUpdate() {
    const option = {
      ...this.props,
      content: this.props.children,
      id: this.id,
    }

    if (this.props.visible) open(option)
    else close(option)
  }

  componentWillUnmount() {
    destroy(this.id)
  }

  render() {
    return null
  }
}

Modal.propTypes = {
  ...getProps(PropTypes),
  onClose: PropTypes.func,
}

Modal.defaultProps = {
  ...defaultProps,
}

export default Modal
