import React from 'react'
import Datum from '../Datum'
import Form from './Form'
import Item from './Item'
import Button from '../Button'
import PrimaryButton from './PrimaryButton'
import formProvider from './formProvider'
import itemProvider from './itemProvider'
import consumer from './consumer'

const exports = Datum.hoc(formProvider(Form), 'form', 'data')
exports.Item = itemProvider(consumer(['labelWidth'], Item))

exports.Submit = consumer(['disabled'], props => <Button htmlType="submit" type="primary" {...props} />)
exports.Reset = consumer(['disabled'], props => <Button htmlType="reset" {...props} />)
exports.Button = consumer(['disabled'], PrimaryButton)

export default exports
