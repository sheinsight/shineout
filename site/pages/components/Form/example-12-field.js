/**
 * cn - 字段 Form.Field
 *    -- 支持 value 和 onChange 的组件可以放在 Form.Field 中。
 * en - Field
 */
import React, { PureComponent } from 'react'
import { Form } from 'shineout'
import { SketchPicker } from 'react-color'

const rules = {
  email: [
    { required: true, message: 'Please enter your email.' },
    { type: 'email', message: 'Please enter a valid email.' },
  ],
  password: [
    { required: true, message: 'Please enter password.' },
    { min: 7, message: 'Password must be at least {min} characters.' },
    { regExp: /[a-z]+/i, message: 'Password at least has one letter.' },
    (value, formdata, callback) => {
      if (/\d+/.test(value)) callback(true)
      else callback(new Error('Password at least has one numeral.'))
    },
  ],
}

// eslint-disable-next-line
function Input({ value = '', error, ...props }) {
  const style = { border: `solid 1px ${error ? 'red' : '#ccc'}`, outline: 'none' }
  return <input style={style} value={value} {...props} />
}

const colorStyle = {
  outer: {
    position: 'relative',
  },
  handle: {
    width: 16,
    height: 16,
    border: '4px solid #fff',
    display: 'block',
    boxSizing: 'content-box',
    boxShadow: '0 0 1px 0 rgba(0, 0, 0, 0.4)',
  },
  picker: {
    position: 'absolute',
    left: 0,
    top: '100%',
    marginTop: 4,
    zIndex: 1000,
  },
}

/* eslint-disable */
class ColorPicker extends PureComponent {
  constructor(props) {
    super(props)
    this.state = { showColor: false }
  }

  handleChange = (color) => {
    this.props.onChange(color.hex)
    this.setState({ showColor: false })
  }

  handleClick = () => { this.setState({ showColor: true }) }

  render() {
    const { color } = this.props
    return (
      <div style={colorStyle.outer}>
        <a style={{ ...colorStyle.handle, background: color }}
          onClick={this.handleClick}
          href="javascript:;" />
        {
          this.state.showColor &&
          <div style={colorStyle.picker}>
            <SketchPicker color={color} onChange={this.handleChange} />
          </div>
        }
      </div>
    )
  }
}
/* eslint-enable */

export default function () {
  return (
    <Form rules={rules} style={{ maxWidth: 500 }} onSubmit={d => console.log(d)}>
      <Form.Item required label="Email">
        <Form.Field defaultValue="test@email.com" name="email">
          { ({ value, onChange }) => <Input value={value} onChange={onChange} type="text" />}
        </Form.Field>
      </Form.Item>

      <Form.Item required label="Password" tip="Use at least one letter, one numeral, and seven characters.">
        <Form.Field name="password">
          { props => <Input {...props} type="password" /> }
        </Form.Field>
      </Form.Item>

      <Form.Item label="Favorite color" tip="Choose your favorite color.">
        <Form.Field name="color" defaultValue="#7ED321">
          {({ value, onChange }) => <ColorPicker color={value} onChange={onChange} />}
        </Form.Field>
      </Form.Item>

      <Form.Item label="">
        <Form.Submit>Submit</Form.Submit>
      </Form.Item>
    </Form>
  )
}
