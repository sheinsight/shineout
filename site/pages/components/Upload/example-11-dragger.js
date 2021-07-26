/**
 * cn - 拖拽上传
 *    -- 设置 drop 来支持拖拽上传
 * en - Drag and Drop
 *    -- set drop to Drag files to upload.
 */
import React from 'react'
import { Upload } from 'shineout'
import FontAwesome from '../Icon/FontAwesome'

const placholderStyle = { background: '#fafafa', textAlign: 'center', width: '100%', padding: 20 }

function DraggerImage() {
  return (
    <Upload.Image
      action="//jsonplaceholder.typicode.com/posts"
      accept="image/*"
      name="file"
      onSuccess={(res, file, data) => ({ data })}
      renderResult={f => f.data}
      limit={3}
      onStart={f => console.log(f)}
      width={250}
      drop
      disabled
    >
      <div style={placholderStyle}>
        <FontAwesome style={{ color: '#409dfd', fontSize: 20 }} name="image" />
        <p>Click or Drag image to upload</p>
      </div>
    </Upload.Image>
  )
}

function DraggerFile() {
  return (
    <Upload
      action="//jsonplaceholder.typicode.com/posts"
      multiple
      name="file"
      onSuccess={(res, file) => file.name}
      limit={3}
      style={{ width: 400 }}
      drop
      disabled
    >
      <div style={placholderStyle}>
        <FontAwesome style={{ color: '#409dfd', fontSize: 28 }} name="archive" />
        <p style={{ marginTop: 14 }}>Click or drag file to this area to upload</p>
      </div>
    </Upload>
  )
}

export default function() {
  return (
    <div>
      <DraggerImage />
      <br />
      <DraggerFile />
    </div>
  )
}
