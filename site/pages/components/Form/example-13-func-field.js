/**
 * cn -
 *    -- 示例：使用 Form.Field 引入 react-color
 * en -
 */
import React, { PureComponent } from 'react'
import { Form } from 'shineout'
import { SketchPicker } from 'react-color'

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
    const { value } = this.props
    return (
      <div style={colorStyle.outer}>
        <a style={{ ...colorStyle.handle, background: value }}
          onClick={this.handleClick}
          href="javascript:;" />
        {
          this.state.showColor &&
          <div style={colorStyle.picker}>
            <SketchPicker color={value} onChange={this.handleChange} />
          </div>
        }
      </div>
    )
  }
}
/* eslint-enable */

export default function () {
  return (
    <Form style={{ maxWidth: 500 }} onSubmit={d => console.log(d)}>
      <Form.Item label="Favorite color" tip="Choose your favorite color.">
        <Form.Field name="color" defaultValue="#7ED321">
          <ColorPicker />
        </Form.Field>
      </Form.Item>

      <Form.Item label="">
        <Form.Submit>Submit</Form.Submit>
      </Form.Item>
    </Form>
  )
}
