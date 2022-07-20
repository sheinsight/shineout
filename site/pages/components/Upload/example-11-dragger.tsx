/**
 * cn - 拖拽上传
 *    -- 设置 drop 来支持拖拽上传
 * en - Drag and Drop
 *    -- set drop to Drag files to upload.
 */
import React from 'react'
import { Upload } from 'shineout'
import FontAwesome from '../Icon/FontAwesome'

const placholderStyle: React.CSSProperties = { background: '#fafafa', textAlign: 'center', width: '100%', padding: 20 }

const DraggerImage: React.FC = () => (
  <Upload.Image
    action="//jsonplaceholder.typicode.com/posts"
    accept="image/*"
    name="file"
    onSuccess={(_res, _file, data) => ({ data })}
    renderResult={f => f.data}
    limit={3}
    onStart={f => console.log(f)}
    width={250}
    drop
  >
    <div style={placholderStyle}>
      <FontAwesome style={{ color: '#409dfd', fontSize: 20 }} name="image" />
      <p>Click or Drag image to upload</p>
    </div>
  </Upload.Image>
)

const DraggerFile: React.FC = () => (
  <Upload
    action="//jsonplaceholder.typicode.com/posts"
    multiple
    name="file"
    onSuccess={(_res, file) => file.name}
    limit={3}
    style={{ width: 400 }}
    drop
  >
    <div style={placholderStyle}>
      <FontAwesome style={{ color: '#409dfd', fontSize: 28 }} name="archive" />
      <p style={{ marginTop: 14 }}>Click or drag file to this area to upload</p>
    </div>
  </Upload>
)

const App: React.FC = () => (
  <div>
    <DraggerImage />
    <br />
    <DraggerFile />
  </div>
)

export default App
