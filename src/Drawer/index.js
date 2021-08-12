import Modal from '../Modal'

// eslint-disable-next-line react/react-in-jsx-scope
const Drawer = props => <Modal {...props} drawer />
Drawer.defaultProps = {
  position: 'right',
  width: 'auto',
}
Drawer.displayName = 'ShineoutDrawer'
Drawer.Submit = Modal.Submit

export default Drawer
