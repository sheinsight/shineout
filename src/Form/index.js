import React from 'react'
import Datum from '../Datum'
import provider from './provider'
import Form from './Form'
import Item from './Item'
import Button from '../Button'
import PrimaryButton from './PrimaryButton'
import consumer from './consumer'

const exports = Datum.hoc(provider(Form), 'form', 'data')
exports.Item = consumer(['labelWidth'], Item)

exports.Submit = prop => <Button htmlType="submit" type="primary">{prop.children}</Button>
exports.Reset = prop => <Button htmlType="reset">{prop.children}</Button>
exports.Button = PrimaryButton

export default exports
