import Modal from './Modal'
import { method } from './events'
import Card from '../Card'

Modal.success = method('success')
Modal.info = method('info')
Modal.error = method('error')
Modal.confirm = method('confirm')
Modal.Submit = Card.Submit

export default Modal
