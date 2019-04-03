/**
 * cn - 拖拽上传
 *    -- 将文件拖入指定区域，完成上传
 * en - Drag and Drop
 *    -- Drag files to a specific area, to upload.
 */
import React from 'react'
import { Upload } from 'shineout'
import FontAwesome from '../Icon/FontAwesome'

function DraggerImage() {
  return (
    <Upload.Image
      action="//jsonplaceholder.typicode.com/posts"
      accept="image/*"
      name="file"
      onSuccess={(res, file, data) => ({ data })}
      renderResult={f => f.data}
      limit={1}
      multiple
      onStart={f => console.log(f)}
      width={250}
    >
      <Upload.Dragger>
        <FontAwesome style={{ color: '#409dfd', fontSize: 20 }} name="upload" />
        <br />
        Click or Drag image to upload
      </Upload.Dragger>
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
    >
      <Upload.Dragger>
        <FontAwesome style={{ color: '#409dfd', fontSize: 20 }} name="upload" />
        <br />
        Click or Drag file to upload
      </Upload.Dragger>
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
