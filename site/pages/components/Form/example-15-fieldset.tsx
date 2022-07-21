/**
 * cn - FieldSet (Loop)
 *    -- FieldSet children 为函数时，根据 name 从 Form 中获取 value （类型为 array），遍历这个 value 生成一组子组件。
 * en - FieldSet (Loop)
 *    -- When FieldSet's children is a function, takes the value (type is array) from the form by the name property, and generate a set of subcomponents.
 */
import React from 'react'
import { Form, Input, Button, Rule, TYPE } from 'shineout'
import FontAwesome from '../Icon/FontAwesome'

interface Friends {
  name: string
  age: number
}
interface Value {
  name?: string
  friends?: Friends[]
}
type RuleFunc = TYPE.Rule.validFunc
type FieldSetEmpty = TYPE.Form.FieldSetProps<Value>['empty']

interface ValueMap {
  [x: string]: string | boolean
}
const isExist: RuleFunc = (values, _, callback: any) => {
  const result: any[] = []
  const valueMap: ValueMap = {}
  values.forEach(({ name }: Value, i: number) => {
    if (!name) return
    if (valueMap[name]) result[i] = { name: new Error(`Name "${name}" is existed.`) }
    else valueMap[name] = true
  })
  callback(result.length > 0 ? result : true)
}

const rules = Rule({ isExist })

const App: React.FC = () => {
  const renderEmpty: FieldSetEmpty = onAppend => (
    <Button key="empty" onClick={() => onAppend({ name: '' })}>
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
          defaultValue={[{ name: 'Hermione Granger', age: 16 }, {}]}
        >
          {({ onAppend, onRemove }) => (
            <Form.Item style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
              <Input
                name="name"
                placeholder="Name"
                title="Friend name"
                rules={[rules.required]}
                style={{ width: 180, marginInlineEnd: 8 }}
              />
              <Input
                name="age"
                type="number"
                placeholder="Age"
                title="Friend age"
                style={{ width: 60 }}
                rules={[rules.min(18)]}
              />
              <a style={{ margin: '0 12px' }} onClick={() => onAppend({ age: 16 })}>
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
