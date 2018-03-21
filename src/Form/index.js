import Datum from '../Datum'
import Form from './Form'
import Item from './Item'
import formButton from './formButton'
import { itemProvider } from './itemContext'
import { formProvider, formConsumer } from './formContext'

const exports = Datum.hoc(formProvider(Form), 'form', 'value')
exports.Item = itemProvider(formConsumer(['labelWidth'], Item))

exports.Submit = formButton('submit')
exports.Reset = formButton('reset')
exports.Button = formButton('button')

export default exports
