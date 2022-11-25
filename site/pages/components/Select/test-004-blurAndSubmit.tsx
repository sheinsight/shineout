/**
 * cn - 创建选项 blur 后点击回调搜索
 *    -- 修复blur 后延迟导致 onSubmit 的数据不对的问题
 */
import React from 'react'
import { Select, Form } from 'shineout'

type SelectItem = string

const style: React.CSSProperties = { width: 240, marginBottom: 12 }
const data: SelectItem[] = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']

const App: React.FC = () => {
  const [value, setValue] = React.useState<{ color?: string }>({})
  return (
    <Form
      onSubmit={(d: { color?: string }) => {
        setValue(d)
      }}
    >
      <Select name="color" style={style} data={data} keygen placeholder="input color" onCreate />
      <Form.Submit>搜索</Form.Submit>
      <div>
        <span>提交值：</span>
        <span className="submit-value">{value.color}</span>
      </div>
    </Form>
  )
}

export default App
