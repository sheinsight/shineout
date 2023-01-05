import React from 'react'
import { ModalProps } from '../Modal/Props'
import Modal from '../Modal'

const Drawer = (props: ModalProps) => <Modal {...props} drawer />
Drawer.defaultProps = {
  position: 'right',
  width: 'auto',
}
Drawer.displayName = 'ShineoutDrawer'
Drawer.Submit = Modal.Submit

export default Drawer
