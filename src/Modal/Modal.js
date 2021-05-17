import PropTypes from 'prop-types'
import { Component } from 'react'
import { defaultProps, getProps } from '../utils/proptypes'
import shallowEqual from '../utils/shallowEqual'
import { getUidStr } from '../utils/uid'
import { open, close, destroy } from './events'

class Modal extends Component {
  constructor(props) {
    super(props)
    this.id = getUidStr()
    this.visible = props.visible
    this.handleUpdate = this.handleUpdate.bind(this)
  }

  componentDidMount() {
    if (this.props.visible && !this.props.usePortal) {
      open(this.getOption(), false)
    }
  }

  shouldComponentUpdate(nextProps) {
    if (shallowEqual(this.props, nextProps)) return false
    if (nextProps.visible) return true
    close({ ...this.props, id: this.id }, this.handleUpdate)
    return !shallowEqual(this.props, nextProps) && nextProps.visible
  }

  componentDidUpdate() {
    if (this.props.visible && !this.props.usePortal) {
      open(this.getOption(), false)
    }
  }

  componentWillUnmount() {
    const { usePortal } = this.props
    close({ id: this.id })
    destroy(this.id, !usePortal)
  }

  getOption() {
    const { children, usePortal, visible, ...props } = this.props
    return {
      ...props,
      content: children,
      id: this.id,
      from: 'modal', // overwrite props from
    }
  }

  handleUpdate() {
    const { destroy: destroyProps } = this.props
    if (destroyProps) this.forceUpdate()
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
  destroy: PropTypes.bool,
}

Modal.defaultProps = {
  ...defaultProps,
  usePortal: true,
  visible: false,
  esc: true,
}

Modal.displayName = 'ShineoutModal'

export default Modal
