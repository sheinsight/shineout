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

  componentDidMount() {
    if (this.props.visible && !this.props.usePortal) {
      open(this.getOption(), false)
    }
  }

  shouldComponentUpdate(nextProps) {
    if (shallowEqual(this.props, nextProps)) return false
    if (nextProps.visible) return true
    close({ id: this.id })
    return !shallowEqual(this.props, nextProps) && nextProps.visible
  }

  componentDidUpdate(prevProps) {
    if (prevProps.visible !== this.props.visible && !this.props.usePortal) {
      open(this.getOption(), false)
    }
  }

  componentWillUnmount() {
    close({ id: this.id })
    destroy(this.id)
  }

  getOption() {
    const { children, usePortal, visible, ...props } = this.props
    return {
      ...props,
      content: children,
      id: this.id,
    }
  }

  render() {
    const { usePortal, visible } = this.props
    const option = this.getOption()

    if (visible && usePortal) return open(option, true)
    return null
  }
}

Modal.propTypes = {
  ...getProps(PropTypes),
  usePortal: PropTypes.bool,
}

Modal.defaultProps = {
  ...defaultProps,
  usePortal: true,
  visible: false,
}

Modal.displayName = 'ShineoutModal'

export default Modal
