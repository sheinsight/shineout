import { compose } from '../utils/func'
import Datum from '../Datum'
import { consumer as cardConsumer } from '../Card/context'
import inputable from './inputable'
import Form from './Form'
import Item from './Item'
import Field from './Field'
import Flow from './Flow'
import FieldSet from './FieldSet'
import formButton from './formButton'
import { formProvider, formConsumer } from './formContext'
import useMode from './mode'

const exportForm = compose(
  Datum.hoc({ type: 'form', bindProps: ['removeUndefined', 'error'] }),
  formProvider
)(cardConsumer(Form, ['setFormStatus']))
exportForm.Item = formConsumer(['formDatum', 'labelWidth', 'labelAlign', 'labelVerticalAlign', 'keepErrorHeight'])(Item)
exportForm.Field = inputable(Field)
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
exportForm.Flow.displayName = 'ShineoutFormFlow'
exportForm.FieldSet.displayName = 'ShineoutFormFieldSet'

export default exportForm
