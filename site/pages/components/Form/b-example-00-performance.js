import React from 'react'
import { Form, Input } from 'shineout'

const defaultValues = []
for (let i = 0; i <= 999; i++) {
  defaultValues.push('')
}

const rules = (values, _, callback) => {
  const names = new Map()
  values.forEach((v, i) => {
    if (!v) return
    if (names.has(v)) names.set(v, [...names.get(v), i])
    else names.set(v, [i])
  })
  const result = []
  names.forEach((v, k) => {
    if (k && v.length > 1) {
      // show error to input
      v.forEach(i => {
        result[i] = new Error(`Name "${k}" is existed.`)
      })
      // show error to item
      // v.forEach((i) => { result[i] = new Error(`Name "${k}"" is existed.`) })
    }
  })

  callback(result.length > 0 ? result : true)
}

export default function() {
  return (
    <Form
      onSubmit={data => {
        console.log(data)
      }}
    >
      <Form.FieldSet rules={[rules]} name="names" defaultValue={defaultValues}>
        {({ value, onChange }) => <Input popover="bottom-left" name="" width={200} value={value} onChange={onChange} />}
      </Form.FieldSet>

      <Form.Item label="">
        <Form.Submit>Submit</Form.Submit>
        <Form.Reset>Reset</Form.Reset>
      </Form.Item>
    </Form>
  )
}
