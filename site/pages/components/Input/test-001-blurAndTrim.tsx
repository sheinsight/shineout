/**
 * cn - blur trim
 *    -- 修复 Form 中 点击提交按钮触发 input blur 的时候由于 delay 导致 form onSubmit 的input数据没有触发trim问题
 */
import React from 'react'
import { Input, Form } from 'shineout'

const App: React.FC = () => {
  const [value, setValue] = React.useState<{ color?: string }>({})
  return (
    <Form
      onSubmit={(d: { color?: string }) => {
        console.log('值', d)
        setValue(d)
      }}
    >
      <Input delay={500} name="color" trim clearToUndefined clearable />
      <Form.Submit id="search">搜索</Form.Submit>
      <div>
        <span>提交值：</span>
        <span className="submit-value">{value.color}</span>
      </div>
    </Form>
  )
}

export default App
