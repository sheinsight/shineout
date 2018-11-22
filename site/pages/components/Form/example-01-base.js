/**
 * cn - 基本用法
 *    -- 表单内置了类似双向绑定的机制，根据表单元素的 name 属性自动下发、收集数据
 * en - Base
 *    -- The form has a two-way binding mechanism built in, automatically sending and collecting data based on the name property of the form element.
 */
import React, { PureComponent } from 'react'
import { Form, Input, Checkbox, Textarea, Select, DatePicker, Tree, Upload } from 'shineout'

const citys = [
  {
    name: 'JiangSu',
    children: [
      { name: 'NanJing' },
      { name: 'SuZhou' },
      { name: 'YangZhou' },
    ],
  },
  {
    name: 'ZheJiang',
    children: [
      { name: 'HangZhou' },
      { name: 'JiaQing' },
      { name: 'WenZhou' },
    ],
  },
]

export default class extends PureComponent {
  initValue = {
    email: 'test@example.com',
    age: 18,
  }

  render() {
    return (
      <Form value={this.initValue} scrollToError onSubmit={(data) => { console.log(data) }}>
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
            action="http://jsonplaceholder.typicode.com/posts"
            accept="image/*"
            name="file"
            onSuccess={(res, file, data) => ({ data })}
            renderResult={f => f.data}
            limit={3}
          />
        </Form.Item>

        <Form.Item label="Age">
          <Input style={{ width: 100 }} name="age" type="number" digits={0} defaultValue={0} />
        </Form.Item>

        <Form.Item label="Favorite Color">
          <Checkbox.Group
            name="favoriteColor"
            keygen={d => d}
            data={['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']}
          />
        </Form.Item>

        <Form.Item label="Hate Color">
          <Select
            name="hateColor"
            keygen={d => d}
            style={{ width: 100 }}
            data={['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']}
          />
        </Form.Item>

        <Form.Item label="Date">
          <DatePicker type="datetime" range name={['startDate', 'endDate']} />
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
}
