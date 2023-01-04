import Modal from './Modal'
import { method, closeAll } from './events'
import Card from '../Card'

Modal.success = method('success')
Modal.info = method('info')
Modal.warn = method('warning')
Modal.error = method('error')
Modal.confirm = method('confirm')
Modal.show = method('normal')
Modal.Submit = Card.Submit
Modal.closeAll = closeAll

export default Modal
