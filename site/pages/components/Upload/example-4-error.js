/**
 * cn -
 *    -- 文件大小校验，本例为 10KB
 * en -
 */
import React from 'react'
import { Upload, Button } from 'shineout'
import FontAwesome from '../Icon/FontAwesome'

export default function () {
  return (
    <Upload
      action="http://jsonplaceholder.typicode.com/posts"
      accept="image/*"
      name="file"
      onUpload={(res, file) => file.name}
      validator={{
        size: s => (s > 10240 ? new Error('max size is 10KB') : undefined),
      }}
    >
      <Button><FontAwesome name="upload" /> Upload file</Button>
    </Upload>
  )
}
