/**
 * cn - 基本用法
 *    -- 基础的文件上传, onSuccess 的返回值会作为 value 传给 onChange
 * en - Base
 *    -- Basic usage for uploading file, the onSuccess's returns will be the onChange params

 */
import React from 'react'
import { Upload, Button } from 'shineout'
import FontAwesome from '../Icon/FontAwesome'

const App: React.FC = () => {
  const [value, setValue] = React.useState<string[]>([])

  return (
    <Upload
      action="//jsonplaceholder.typicode.com/posts"
      accept="image/*"
      value={value}
      name="file"
      onSuccess={(_res, file) => file.name}
      onChange={v => {
        setValue(v)
      }}
      limit={3}
      style={{ width: 300 }}
    >
      <Button>
        <FontAwesome name="upload" style={{ marginInlineEnd: 4 }} />
        Upload file
      </Button>
    </Upload>
  )
}
export default App
