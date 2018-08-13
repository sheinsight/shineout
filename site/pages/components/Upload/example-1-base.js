/**
 * cn - 基本用法
 *    -- 基础的文件上传
 * en - Base
 *    -- Basic usage for uploading file

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
      onSuccess={(res, file) => file.name}
      limit={3}
      style={{ width: 300 }}
    >
      <Button><FontAwesome name="upload" /> Upload file</Button>
    </Upload>
  )
}
