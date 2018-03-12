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

exports.Submit = consumer(['disabled'], props => <Button htmlType="submit" type="primary" {...props} />)
exports.Reset = consumer(['disabled'], props => <Button htmlType="reset" {...props} />)
exports.Button = consumer(['disabled'], PrimaryButton)

export default exports
