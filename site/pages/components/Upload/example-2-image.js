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
      onUpload={(res, file, data) => ({ data })}
      renderResult={f => f.data}
      limit={3}
    />
  )
}
