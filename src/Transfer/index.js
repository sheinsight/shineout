import Transfer from './Transfer'
import inputable from '../Form/inputable'
import { compose } from '../utils/func'
import Datum from '../Datum'

const exportTransfer = compose(
  inputable,
  Datum.hoc({ bindProps: ['disabled', 'limit', 'format', 'prediction', 'separator'] })
)(Transfer)

exportTransfer.displayName = 'ShineoutTransfer'

export default exportTransfer
