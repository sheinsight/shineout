/**
 * cn -
 *    -- 通过给 Form 设置 error，实现后端校验数据展示。在表单值被改变后，对应后端校验数据会被清空。<br />前端校验优先级大于后端校验。
 * en -
 *    -- By setting an error on the Form, the back-end validation data is presented. After the form value is changed, the corresponding back-end validation data is cleared. <br /> front-end validation priority is greater than back-end validation.
 */
import React from 'react'
import { Form, Input, Rule } from 'shineout'

const rules = Rule()

export default class extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      error: undefined,
      loading: false,
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit() {
    this.setState({ loading: true })

    setTimeout(() => {
      this.setState({
        loading: false,
        error: {
          email: 'The email has been registered',
        },
      })
    }, 1000)
  }

  render() {
    const { error, loading } = this.state

    return (
      <Form disabled={loading} error={error} style={{ maxWidth: 500 }} scrollToError={30} onSubmit={this.handleSubmit}>
        <Form.Item required label="Email">
          <Input name="email" title="Email" rules={[rules.required, rules.email]} />
        </Form.Item>

        <Form.Item required label="Name">
          <Input name="name" title="Name" rules={[rules.required, rules.isExist]} />
        </Form.Item>

        <Form.Item required label="Password" tip="At least one letter, one numeral, and 6 - 20 characters.">
          <Input
            name="password"
            title="Password"
            type="password"
            rules={[rules.required, rules.range(6, 20), rules.password]}
          />
        </Form.Item>

        <Form.Item label="">
          <Form.Button loading={loading}>Sumbit</Form.Button>
          <Form.Reset>Reset</Form.Reset>
        </Form.Item>
      </Form>
    )
  }
}
