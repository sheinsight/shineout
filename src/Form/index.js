import { compose } from '../utils/func'
import Datum from '../Datum'
import inputable from './inputable'
import Form from './Form'
import Item from './Item'
import Field from './Field'
import FuncField from './FuncField'
import BlockField from './BlockField'
import Block from './Block'
import Loop from './Loop'
import formButton from './formButton'
import { loopProvider } from './loopContext'
import { itemProvider } from './itemContext'
import { formProvider, formConsumer } from './formContext'

const exports = Datum.hoc({ type: 'form' }, formProvider(Form))
exports.Item = itemProvider(formConsumer(['labelWidth'], Item))
exports.Field = inputable({}, Field)
exports.FuncField = inputable({}, FuncField)
exports.Block = formConsumer(['formDatum'])(Block)
exports.BlockField = inputable({}, BlockField)
exports.Loop = compose(formConsumer(null), loopProvider)(Loop)

exports.Submit = formButton('submit')
exports.Reset = formButton('reset')
exports.Button = formButton('button')

exports.formConsumer = formConsumer

export default exports
