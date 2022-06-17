/**
 * cn - 表单
 *    -- Drawer 支持 Form 表单，并且支持 Form 的所有特性，表单提交可以使用 Drawer.Submit 来代替 Button[type=submit]
 * en - Form
 *    --The internal form of Drawer can use Drawer.Submit to trigger submit.
 */
import React, { useState } from 'react'
import { Drawer, Button, Form, Input, Message, TYPE } from 'shineout'

type DrawerProps = TYPE.Drawer.Props
type DrawerFooter = DrawerProps['footer']

type FormProps<Value = any> = TYPE.Form.Props<Value>
type FormRules = FormProps['rules']
type FormOnSubmit = FormProps['onSubmit']

const rules: FormRules = {
  email: [
    { required: true, message: 'Please enter your email.' },
    { type: 'email', message: 'Please enter a valid email.' },
  ],
  password: [
    { required: true, message: 'Please enter password.' },
    { min: 7, message: 'Password must be at least {min} characters.' },
    { regExp: /[a-z]+/i, message: 'Password at least has one letter.' },
    (value: string, callback: any) => {
      if (/\d+/.test(value)) callback(true)
      else callback(new Error('Password at least has one numeral.'))
    },
  ],
}

const App: React.FC = () => {
  const [visible, setVisible] = useState(false)

  const handleClose = () => {
    setVisible(false)
  }

  const show = () => {
    setVisible(true)
  }

  const handleSubmit: FormOnSubmit = data => {
    setVisible(false)
    Message.success(JSON.stringify(data))
  }

  const renderFooter = (): DrawerFooter => (
    <div>
      <Button onClick={handleClose}>Cancel</Button>
      <Drawer.Submit>Submit</Drawer.Submit>
    </div>
  )

  return (
    <div>
      <Button onClick={show}>Drawer Form</Button>

      <Drawer visible={visible} width={456} title="Form" onClose={handleClose} footer={renderFooter()}>
        <Form labelWidth={100} rules={rules} labelAlign="right" style={{ maxWidth: 400 }} onSubmit={handleSubmit}>
          <Form.Item required label="Email">
            <Input name="email" />
          </Form.Item>

          <Form.Item required label="Password">
            <Input name="password" type="password" />
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  )
}

export default App
