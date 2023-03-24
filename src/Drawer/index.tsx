import React from 'react'
import { DrawerProps } from './Props'
import Modal from '../Modal'

const Drawer = (props: DrawerProps) => <Modal {...props} drawer />
Drawer.defaultProps = {
  position: 'right',
  width: 'auto',
}
Drawer.displayName = 'ShineoutDrawer'
Drawer.Submit = Modal.Submit

export default Drawer
