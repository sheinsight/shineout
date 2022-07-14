/**
 * cn -
 *    -- 示例：使用 Form.Field 引入 react-color
 * en -
 *    -- Example: use Form.Field to introduce react-color.
 */
import React, { useState } from 'react'
import { Form } from 'shineout'
import { SketchPicker } from 'react-color'

/* eslint-disable */

const ColorPicker = (props: { value?: string; onChange?: (v: string) => void }) => {
  const { value, onChange } = props
  const [showPicker, setShowPicker] = useState(false)

  const handleClick = () => {
    setShowPicker(true)
  }

  const handleClose = () => {
    setShowPicker(false)
  }

  const handleChange = (color: { hex: string }) => {
    onChange!(color.hex)
  }

  return (
    <div
      style={{
        position: 'relative',
      }}
    >
      <a
        style={{
          width: 16,
          height: 16,
          display: 'block',
          background: value,
          border: '4px solid #fff',
          boxSizing: 'content-box',
          boxShadow: '0 0 1px 0 rgba(0, 0, 0, 0.4)',
        }}
        onClick={handleClick}
      />
      {showPicker && (
        <div style={{ position: 'absolute', left: 0, top: '100%', marginTop: 4, zIndex: 1000 }}>
          <div
            style={{ position: 'fixed', top: '0px', right: '0px', bottom: '0px', left: '0px' }}
            onClick={handleClose}
          />
          <SketchPicker color={value} onChange={handleChange} />
        </div>
      )}
    </div>
  )
}

const App: React.FC = () => (
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

export default App
