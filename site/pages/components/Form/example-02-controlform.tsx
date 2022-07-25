/**
 * cn - 表单方法
 *    -- 可以通过 formRef 去获得表单的一些方法集, 包含校验, 清空校验, 提交等.
 * en - Form Methods
 *    -- You can use formRef to get some methods of the form, including validation, clear validation, submission, etc.
 */
import React, { useEffect, useState } from 'react'
import { Form, Input, Button, Rule, TYPE } from 'shineout'

type FormRef = TYPE.Form.Ref<any>
type FormProps = TYPE.Form.Props<any>
type FormValue = FormProps['value']

const rules = Rule()

const App: React.FC = () => {
  const [form, setForm] = useState<FormRef>()
  const [value, setValue] = useState<FormValue>()

  useEffect(() => {}, [])

  return (
    <Form
      value={value}
      formRef={(f: FormRef) => {
        setForm(f)
      }}
      onChange={setValue}
      onSubmit={data => {
        console.log(data)
      }}
    >
      <div style={{ margin: '20px 0' }}>
        <Button onClick={() => form!.reset()}>reset</Button>
        <Button onClick={() => form!.submit()}>submit</Button>
        <Button onClick={() => form!.validate()}>validate</Button>
        <Button onClick={() => form!.clearValidate()}>clear validate</Button>
        <Button onClick={() => console.log(form!.getValue())}>get value</Button>
        <Button onClick={() => form!.submit(false)}>submit without validate</Button>
      </div>

      <Form.Item label="name">
        <Input name="name" rules={[rules.required]} />
      </Form.Item>

      <Form.Item label="Password">
        <Input.Password name="password" type="password" rules={[rules.required]} />
      </Form.Item>

      <Form.Item label="">
        <Form.Submit>Submit</Form.Submit>
        <Form.Reset>Reset</Form.Reset>
      </Form.Item>
    </Form>
  )
}

export default App
