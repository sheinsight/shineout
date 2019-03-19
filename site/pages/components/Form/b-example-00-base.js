/**
 * cn - 基本用法
 *    -- 表单内置了类似双向绑定的机制，根据表单元素的 name 属性自动下发、收集数据
 * en - Base
 *    -- The form has a two-way binding mechanism built in, automatically sending and collecting data based on the name property of the form element.
 */
import React, { PureComponent } from 'react'
import { Form, Input, Checkbox, Radio, Textarea, Select, DatePicker, Tree, Upload } from 'shineout'
import format from 'date-fns/format'

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

// eslint-disable-next-line
const CDP = ({ value, onChange, ...props }) => (
  <DatePicker
    {...props}
    value={value.map(v => format(v, 'yyyy-MM-dd'))}
    onChange={vs => onChange(vs.map(v => new Date(v).getTime()))}
  />
)

export default class extends PureComponent {
  constructor(props) {
    super(props)

    this.state = { value: undefined }
  }

  componentDidMount() {
    this.handleChange({
      email: 'test@example.com',
      age: 18,
      favoriteColor: ['cyan', 'yellow'],
      startDate: Date.now(),
      endDate: Date.now() + 86400000,
    })
  }

  handleChange = value => {
    this.setState({ value })
  }

  render() {
    return (
      <Form
        value={this.state.value}
        onChange={this.handleChange}
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
            action="//jsonplaceholder.typicode.com/posts"
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
            keygen
            data={['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']}
          />
        </Form.Item>

        <Form.Item label="Other Color">
          <Radio.Group name="otherColor" keygen data={['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']} />
        </Form.Item>

        <Form.Item label="Hate Color">
          <Select
            name="hateColor"
            keygen
            style={{ width: 100 }}
            data={['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']}
          />
        </Form.Item>

        <Form.Item label="Date">
          <Form.Field name={['startDate', 'endDate']}>
            <CDP type="datetime" range defaultValue={[Date.now() - 100000000, Date.now()]} />
          </Form.Field>
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
