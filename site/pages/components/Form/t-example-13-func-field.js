/**
 * cn -
 *    -- 示例：使用 Form.Field 引入 react-color
 * en -
 *    -- Example: use Form.Field to introduce react-color.
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
  cover: {
    position: 'fixed',
    top: '0px',
    right: '0px',
    bottom: '0px',
    left: '0px',
  },
}

/* eslint-disable */
class ColorPicker extends PureComponent {
  constructor(props) {
    super(props)
    this.state = { showPicker: false }
  }

  handleChange = (color) => { this.props.onChange(color.hex) }

  handleClose = () => { this.setState({ showPicker: false }) }

  handleClick = () => { this.setState({ showPicker: true }) }

  render() {
    const { value } = this.props
    return (
      <div style={colorStyle.outer}>
        <a style={{ ...colorStyle.handle, background: value }}
          onClick={this.handleClick} />
        {
          this.state.showPicker &&
          <div style={colorStyle.picker}>
            <div style={colorStyle.cover} onClick={this.handleClose}/>
            <SketchPicker color={value} onChange={this.handleChange} />
          </div>
        }
      </div>
    )
  }
}
/* eslint-enable */

export default function() {
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
