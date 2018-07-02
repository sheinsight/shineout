/**
 * cn - 异常
 * en - Error
 */
import React from 'react'
import { Upload, Button } from 'shineout'
import FontAwesome from '../Icon/FontAwesome'

export default function () {
  return (
    <Upload
      action="/path-no-exist"
      accept="image/*"
      name="file"
      onUpload={(res, file) => file.name}
      onUploadError={(xhr) => {
        console.log(xhr)
        if (xhr.status === 404) return 'Url not found.'
        return 'Upload Fail.'
      }}
      limit={3}
    >
      <Button><FontAwesome name="upload" /> Upload file</Button>
    </Upload>
  )
}
