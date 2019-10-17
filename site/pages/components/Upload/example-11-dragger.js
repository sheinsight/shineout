/**
 * cn - 拖拽上传
 *    -- 设置 drop 来支持拖拽上传
 * en - Drag and Drop
 *    -- set drop to Drag files to upload.
 */
import React from 'react'
import { Upload, Button } from 'shineout'
import FontAwesome from '../Icon/FontAwesome'

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
    >
      <div style={{ textAlign: 'center', width: '100%', padding: 20 }}>
        <FontAwesome style={{ color: '#409dfd', fontSize: 20 }} name="image" />
        <br />
        Click or Drag image to upload
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
      style={{ width: 300 }}
      drop
    >
      <Button>
        <FontAwesome name="file" />
        &nbsp; Drop file to upload
      </Button>
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
