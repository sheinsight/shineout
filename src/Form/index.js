import { compose } from '../utils/func'
import Datum from '../Datum'
import { consumer as cardConsumer } from '../Card/context'
import inputable from './inputable'
import Form from './Form'
import Item from './Item'
import Field from './Field'
import BlockField from './BlockField'
import Block from './Block'
import Loop from './Loop'
import Flow from './Flow'
import FieldSet from './FieldSet'
import formButton from './formButton'
import { formProvider, formConsumer } from './formContext'
import useMode from './mode'

const exportForm = compose(
  Datum.hoc({ type: 'form', bindProps: ['removeUndefined', 'error'] }),
  formProvider
)(cardConsumer(Form, ['setFormStatus']))
exportForm.Item = formConsumer(['formDatum', 'labelWidth', 'labelAlign', 'labelVerticalAlign'])(Item)
exportForm.Field = inputable(Field)
exportForm.Block = formConsumer(['formDatum', 'combineRules'])(Block)
exportForm.BlockField = inputable(BlockField)
exportForm.Loop = formConsumer(null)(Loop)
exportForm.Flow = formConsumer(['formDatum'])(Flow)
exportForm.FieldSet = formConsumer(['formDatum'])(FieldSet)

exportForm.Submit = formButton('submit')
exportForm.Reset = formButton('reset')
exportForm.Button = formButton('button')

exportForm.formConsumer = formConsumer
exportForm.useMode = useMode

exportForm.displayName = 'ShineoutForm'
exportForm.Item.displayName = 'ShineoutFormItem'
exportForm.Field.displayName = 'ShineoutFormField'
exportForm.Block.displayName = 'ShineoutFormBlock'
exportForm.BlockField.displayName = 'ShineoutFormBlockField'
exportForm.Loop.displayName = 'ShineoutFormLoop'
exportForm.Flow.displayName = 'ShineoutFormFlow'
exportForm.FieldSet.displayName = 'ShineoutFormFieldSet'

export default exportForm
