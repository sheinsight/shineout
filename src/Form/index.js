import Datum from '../Datum'
import inputable from './inputable'
import Form from './Form'
import Item from './Item'
import Field from './Field'
import Block from './Block'
import Loop from './Loop'
import formButton from './formButton'
import { itemProvider } from './itemContext'
import { formProvider, formConsumer } from './formContext'

const exports = Datum.hoc(formProvider(Form), 'form', 'value')
exports.Item = itemProvider(formConsumer(['labelWidth'], Item))
exports.Field = inputable({}, Field)
exports.Block = formConsumer(['formDatum'])(Block)
exports.Loop = Loop

exports.Submit = formButton('submit')
exports.Reset = formButton('reset')
exports.Button = formButton('button')

exports.formConsumer = formConsumer

export default exports
