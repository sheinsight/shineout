/**
 * cn - 图片
 * en - Image
 */
import React from 'react'
import { Upload } from 'shineout'

export default function () {
  return (
    <Upload.Image
      action="http://jsonplaceholder.typicode.com/posts"
      accept="image/*"
      name="file"
      onUpload={(res, file) => file.name}
      withCredentials
      limit={3}
    />
  )
}
