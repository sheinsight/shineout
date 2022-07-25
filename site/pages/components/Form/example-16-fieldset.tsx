/**
 * cn -
 *    -- FieldSet 内部如果只有一个Field而非对象，设置Field 的 name 为 "" 值
 * en -
 *    -- If FieldSet's children is a single Field, set Field name to "" .
 */
import React from 'react'
import { Form, Input, Button, Rule, TYPE } from 'shineout'
import FontAwesome from '../Icon/FontAwesome'

type Value = string
type RuleFunc = TYPE.Rule.validFunc
type FieldSetEmpty = TYPE.Form.FieldSetProps<Value>['empty']

const isExist: RuleFunc = (values, _, callback) => {
  const result: string | boolean | any[] | Error = []
  values.forEach((val: any, i: number) => {
    if (values.some((v: any, j: number) => val && i !== j && val === v)) {
      result[i] = new Error(`Name "${val}" is existed.`)
    }
  })

  callback(result.length > 0 ? result : true)
}

const rules = Rule({
  isExist,
})

const App: React.FC = () => {
  const renderEmpty: FieldSetEmpty = onAppend => (
    <Button key="empty" onClick={() => onAppend('')}>
      Add new friend
    </Button>
  )
  return (
    <Form
      onSubmit={data => {
        console.log(data)
      }}
    >
      <Form.Item label="Name">
        <Input name="name" defaultValue="Harry Potter" />
      </Form.Item>

      <Form.Item label="Friends">
        <Form.FieldSet
          name="friends"
          empty={renderEmpty}
          rules={[rules.min(2), rules.isExist]}
          defaultValue={['Hermione Granger', '']}
        >
          {({ onAppend, onRemove }) => (
            <Form.Item style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
              <Input
                name=""
                placeholder="Name"
                title="Friend name"
                rules={[rules.required]}
                style={{ width: 180, marginInlineEnd: 8 }}
              />
              <a style={{ margin: '0 12px' }} onClick={() => onAppend('')}>
                <FontAwesome name="plus" />
              </a>
              <a onClick={onRemove}>
                <FontAwesome name="close" />
              </a>
            </Form.Item>
          )}
        </Form.FieldSet>
      </Form.Item>

      <Form.Item label="">
        <Form.Submit>Submit</Form.Submit>
        <Form.Reset>Reset</Form.Reset>
      </Form.Item>
    </Form>
  )
}

export default App
