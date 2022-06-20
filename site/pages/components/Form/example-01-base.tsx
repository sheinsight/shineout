/**
 * cn - 基本用法
 *    -- 表单内置了类似双向绑定的机制，根据表单元素的 name 属性自动下发、收集数据
 * en - Base
 *    -- The form has a two-way binding mechanism built in, automatically sending and collecting data based on the name property of the form element.
 */
import React, { useState, useEffect } from 'react'
import { Form, Input, Checkbox, Radio, Textarea, Select, DatePicker, Tree, Upload, TYPE } from 'shineout'

type FormProps<Value = any> = TYPE.Form.Props<Value>
type FormValue = FormProps['value']

const citys = [
  {
    name: 'JiangSu',
    children: [{ name: 'NanJing' }, { name: 'SuZhou' }, { name: 'YangZhou' }],
  },
  {
    name: 'ZheJiang',
    children: [{ name: 'HangZhou' }, { name: 'JiaQing' }, { name: 'WenZhou' }],
  },
]

const App: React.FC = () => {
  const [form] = useState({})
  const [value, setValue] = useState<FormValue>(undefined)

  useEffect(
    () => {
      setValue({
        age: 18,
        startDate: Date.now(),
        email: 'test@example.com',
        endDate: Date.now() + 86400000,
        favoriteColor: ['cyan', 'yellow'],
      })
    },
    [form]
  )

  return (
    <Form
      value={value}
      onChange={setValue}
      onSubmit={data => {
        console.log(data)
      }}
    >
      <Form.Item label="Email">
        <Input name="email" />
      </Form.Item>

      <Form.Item label="Password">
        <Input.Password name="password" type="password" />
      </Form.Item>

      <Form.Item label="Number">
        <Input.Number width={120} max={100} min={10} name="number" />
      </Form.Item>

      <Form.Item label="Name">
        <Input.Group style={{ width: 300 }}>
          <Input name="firstName" placeholder="First Name" />
          -
          <Input name="lastName" placeholder="Last Name" />
        </Input.Group>
      </Form.Item>

      <Form.Item label="">
        <Upload.Image
          limit={3}
          name="file"
          accept="image/*"
          renderResult={f => f.data}
          onSuccess={(_res, _file, data) => ({ data })}
          action="//jsonplaceholder.typicode.com/posts"
        />
      </Form.Item>

      <Form.Item label="Age">
        <Input style={{ width: 100 }} name="age" type="number" digits={0} defaultValue={0} />
      </Form.Item>

      <Form.Item label="Favorite Color">
        <Checkbox.Group
          keygen
          name="favoriteColor"
          data={['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']}
        />
      </Form.Item>

      <Form.Item label="Other Color">
        <Radio.Group name="otherColor" keygen data={['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']} />
      </Form.Item>

      <Form.Item label="Hate Color">
        <Select
          keygen
          clearable
          name="hateColor"
          style={{ width: 100 }}
          data={['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']}
        />
      </Form.Item>

      <Form.Item label="Date">
        <DatePicker
          range
          type="datetime"
          name={['startDate', 'endDate']}
          defaultValue={[Date.now() - 100000000, Date.now()]}
        />
      </Form.Item>

      <Form.Item label="Description">
        <Textarea name="desc" autosize />
      </Form.Item>

      <Form.Item label="From">
        <Form.Field name="from">
          <Tree data={citys} mode={2} keygen="name" renderItem="name" />
        </Form.Field>
      </Form.Item>

      <Form.Item label="">
        <Form.Submit>Submit</Form.Submit>
        <Form.Reset>Reset</Form.Reset>
      </Form.Item>
    </Form>
  )
}

export default App
