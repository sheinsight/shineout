import Transfer from './Transfer'
import inputable from '../Form/inputable'
import { compose } from '../utils/func'
import Datum from '../Datum'
import { TransferType, TransferBindType } from './Props'

const bindProps: TransferBindType[] = ['disabled', 'limit', 'format', 'prediction', 'separator']
const exportTransfer = compose(
  inputable,
  Datum.hoc({ bindProps })
)(Transfer)

exportTransfer.displayName = 'ShineoutTransfer'

export default exportTransfer as TransferType
