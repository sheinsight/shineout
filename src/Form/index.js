import React from 'react'
import Datum from '../Datum'
import Form from './Form'
import Item from './Item'
import Button from '../Button'
import PrimaryButton from './PrimaryButton'
import { itemProvider } from './itemContext'
import { formProvider, formConsumer } from './formContext'

const exports = Datum.hoc(formProvider(Form), 'form', 'value')
exports.Item = itemProvider(formConsumer(['labelWidth'], Item))

exports.Submit = formConsumer(
  ['disabled'],
  props => <Button htmlType="submit" type="primary" {...props} />,
)

exports.Reset = formConsumer(
  ['disabled'],
  props => <Button htmlType="reset" {...props} />,
)

exports.Button = formConsumer(['disabled'], PrimaryButton)

export default exports
