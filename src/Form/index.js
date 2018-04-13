import { compose } from '../utils/func'
import Datum from '../Datum'
import inputable from './inputable'
import Form from './Form'
import Item from './Item'
import Field from './Field'
import BlockField from './BlockField'
import Block from './Block'
import Loop from './Loop'
import formButton from './formButton'
import { loopProvider } from './loopContext'
import { itemProvider } from './itemContext'
import { formProvider, formConsumer } from './formContext'

const exportForm = Datum.hoc({ type: 'form' }, formProvider(Form))
exportForm.Item = itemProvider(formConsumer(['labelWidth'], Item))
exportForm.Field = inputable({}, Field)
exportForm.Block = formConsumer(['formDatum'])(Block)
exportForm.BlockField = inputable({}, BlockField)
exportForm.Loop = compose(formConsumer(null), loopProvider)(Loop)

exportForm.Submit = formButton('submit')
exportForm.Reset = formButton('reset')
exportForm.Button = formButton('button')

exportForm.formConsumer = formConsumer

export default exportForm
