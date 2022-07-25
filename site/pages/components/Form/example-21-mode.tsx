/**
 * cn - 模式
 *    -- 使用 Form.useMode 可以创建一组指定 key 的组件，配合 Form 设置的 mode 属性过滤显示指定的元素
 * en - Mode
 *    -- Form.useMode creates a set of components, filters the specified element with the mode attribute of the Form.
 */
import React, { useState } from 'react'
import { Form, Input, Radio } from 'shineout'

const [CreateMode, EditMode, OtherMode] = Form.useMode('create', 'edit', 'other')

const App: React.FC = () => {
  const [mode, setMode] = useState('edit')
  const [initValue] = useState({})

  return (
    <div>
      <div style={{ marginBottom: 30 }}>
        <Radio.Group value={mode} onChange={v => setMode(v)} data={['create', 'edit', 'other']} keygen />
      </div>

      <Form
        mode={mode}
        value={initValue}
        onSubmit={data => {
          console.log(data)
        }}
      >
        <CreateMode>
          <Form.Item label="name">
            <Input name="name" />
          </Form.Item>
        </CreateMode>

        <EditMode>
          <Form.Item label="name" tip="Current mode is 'edit', can not change name.">
            <Input name="name" disabled />
          </Form.Item>
        </EditMode>

        <OtherMode>Ops...</OtherMode>
      </Form>
    </div>
  )
}

export default App
