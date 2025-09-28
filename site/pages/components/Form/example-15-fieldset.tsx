/**
 * cn - FieldSet (Loop)
 *    -- FieldSet children 为函数时，根据 name 从 Form 中获取 value （类型为 array），遍历这个 value 生成一组子组件。
 * en - FieldSet (Loop)
 *    -- When FieldSet's children is a function, takes the value (type is array) from the form by the name property, and generate a set of subcomponents.
 */
import React, { useState } from 'react'
import { Form, Input, Button, Rule, TYPE } from 'shineout'
import FontAwesome from '../Icon/FontAwesome'

interface Value {
  name?: string
  age?: number
  friends?: Value[]
}
type RuleFunc = TYPE.Rule.ValidFunc
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

const stockValidate: RuleFunc = (values, _, callback) => {
  console.log('stockValidate:>', values)
  callback(true)
}

const rules = Rule({ isExist, stockValidate })

const App: React.FC = () => {
  const [formValue, setFormValue] = useState<Value>({
    friends: [{ name: 'Hermione Granger', age: 16 }, {}],
  })
  const renderEmpty: FieldSetEmpty = onAppend => (
    <Button key="empty" onClick={() => onAppend({ name: '' })}>
      Add new friend
    </Button>
  )

  return (
    <Form
      value={formValue}
      onChange={setFormValue}
      onSubmit={data => {
        console.log(data)
      }}
    >
      <Form.Item label="Name">
        <Input name="name" defaultValue="Harry Potter" />
      </Form.Item>

      <div label="Friends">
        {formValue.friends.map((friend, index) => (
          <Form.FieldSet key={index} name={`friends[${index}]`}>
            <Form.Item style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
              <Form.Field name="name" rules={[rules.required, rules.stockValidate]}>
                {({ value, onChange }) => <Input value={value} onChange={onChange} />}
              </Form.Field>
              <Form.Field name="age">{({ value, onChange }) => <Input value={value} onChange={onChange} />}</Form.Field>
              <a
                style={{ margin: '0 12px' }}
                onClick={() => {
                  const newFriends = [...formValue.friends]
                  newFriends.push({ name: '', age: 16 })
                  setFormValue({ ...formValue, friends: newFriends })
                }}
              >
                <FontAwesome name="plus" />
              </a>
              <a
                onClick={() => {
                  const newFriends = [...formValue.friends]
                  newFriends.splice(index, 1)
                  setFormValue({ ...formValue, friends: newFriends })
                }}
              >
                <FontAwesome name="close" />
              </a>
            </Form.Item>
          </Form.FieldSet>
        ))}
        {/* <Form.FieldSet
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
                rules={[rules.required, rules.stockValidate]}
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
        </Form.FieldSet> */}
      </div>

      <Form.Item label="">
        <Form.Submit>Submit</Form.Submit>
        <Form.Reset>Reset</Form.Reset>
      </Form.Item>
    </Form>
  )
}

export default App
