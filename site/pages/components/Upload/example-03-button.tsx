/**
 * cn - 按钮上传
 *    -- 使用 Upload.Button 展示单个文件的上传进度
 * en - Button
 *    -- Use Upload.Button to show the upload progress of individual files
 */
import React from 'react'
import { Upload } from 'shineout'

const App: React.FC = () => (
  <Upload.Button
    action="//jsonplaceholder.typicode.com/posts"
    name="file"
    onSuccess={(_res, file) => file.name}
    loading="正在上传..."
    placeholder="点击上传"
    type="primary"
  />
)

export default App
