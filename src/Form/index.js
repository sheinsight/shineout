import Datum from '../Datum'
import provider from './provider'
import Form from './Form'

const exports = Datum.hoc(provider(Form), 'form', 'data')

export default exports
