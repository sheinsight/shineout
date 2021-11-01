import React from 'react'
import Modal from '../Modal'

const Drawer = props => <Modal {...props} drawer />
Drawer.defaultProps = {
  position: 'right',
  width: 'auto',
}
Drawer.displayName = 'ShineoutDrawer'
Drawer.Submit = Modal.Submit

export default Drawer
