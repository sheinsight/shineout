import { Component } from 'react'
import PropTypes from 'prop-types'
import { defaultProps, getProps } from '../utils/proptypes'
import shallowEqual from '../utils/shallowEqual'
import { getUidStr } from '../utils/uid'
import { open, close, destroy } from './events'

class Modal extends Component {
  constructor(props) {
    super(props)
    this.id = getUidStr()
    this.visible = props.visible
  }

  shouldComponentUpdate(nextProps) {
    if (shallowEqual(this.props, nextProps)) return false
    if (nextProps.visible) return true
    close({ id: this.id })
    return !shallowEqual(this.props, nextProps) && nextProps.visible
  }

  componentWillUnmount() {
    close({ id: this.id })
    destroy(this.id)
  }

  render() {
    const option = {
      ...this.props,
      content: this.props.children,
      id: this.id,
    }

    if (this.props.visible) return open(option, true)
    return null
  }
}

Modal.propTypes = {
  ...getProps(PropTypes),
  onClose: PropTypes.func,
}

Modal.defaultProps = {
  ...defaultProps,
  visible: false,
}

Modal.displayName = 'ShineoutModal'

export default Modal
