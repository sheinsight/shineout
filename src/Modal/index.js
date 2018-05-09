import Modal from './Modal'
import { method } from './events'
import Submit from '../Card/Submit'

Modal.success = method('success')
Modal.info = method('info')
Modal.error = method('error')
Modal.confirm = method('confirm')
Modal.Submit = Submit

export default Modal
