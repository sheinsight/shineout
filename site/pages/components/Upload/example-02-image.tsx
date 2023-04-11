/**
 * cn - 上传图片
 *    -- 使用 Upload.Image 处理带预览的图片上传
 * en - Image
 *    -- Use Upload.Image to upload and preview images.
 */
import React from 'react'
import { Upload } from 'shineout'

const App: React.FC = () => (
  <Upload.Image
    drop
    action="//jsonplaceholder.typicode.com/posts"
    accept="image/*"
    name="file"
    onSuccess={(res, file, data) => {
      console.log(res, file)
      return { data }
    }}
    renderResult={f => f.data}
    limit={3}
    onStart={f => console.log(f)}
  />
)
export default App
