import { Component } from 'react'
import { defaultProps } from '../utils/proptypes'
import shallowEqual from '../utils/shallowEqual'
import { getUidStr } from '../utils/uid'
import { open, close, destroy } from './events'
import Card from '../Card'
import { ModalProps, Options } from './Props'

const DefaultValue = {
  ...defaultProps,
  usePortal: true,
  visible: false,
  esc: true,
}

class Modal extends Component<ModalProps> {
  static defaultProps = DefaultValue

  id: string

  visible?: boolean

  static displayName: string

  static info: (option: ModalProps) => () => void

  static warn: (option: ModalProps) => () => void

  static error: (option: ModalProps) => () => void

  static confirm: (option: ModalProps) => () => void

  static show: (option: ModalProps) => () => void

  static success: (option: ModalProps) => () => void

  static closeAll: () => void

  static Submit: typeof Card.Submit

  constructor(props: ModalProps) {
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

  shouldComponentUpdate(nextProps: any) {
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

  getOption(): Options {
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

Modal.displayName = 'ShineoutModal'

export default Modal
