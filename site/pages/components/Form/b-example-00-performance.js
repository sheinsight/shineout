import React from 'react'
import { Form, Input } from 'shineout'

const items = []
for (let i = 0; i <= 5000; i++) {
  items.push((
    <Input key={i} width={50} name={`input_${i}`} />
  ))
}

export default function () {
  return (
    <Form onSubmit={(data) => { console.log(data) }}>
      {items}

      <Form.Item label="">
        <Form.Submit>Submit</Form.Submit>
        <Form.Reset>Reset</Form.Reset>
      </Form.Item>
    </Form>
  )
}
