/**
 * cn - 文件大小
 *    -- 文件大小校验，本例为 10KB
 * en -
 *    -- Set validator.size to validate the size of the file. This example is 10KB.
 */
import React from 'react'
import { Upload, Button } from 'shineout'
import FontAwesome from '../Icon/FontAwesome'

export default function() {
  return (
    <div>
      <Upload
        action="//jsonplaceholder.typicode.com/posts"
        accept="image/*"
        multiple
        name="file"
        onSuccess={(res, file) => file.name}
        style={{ width: 300, marginBottom: 30 }}
        validator={{
          size: s => (s > 10240 ? new Error('max file size is 10KB') : undefined),
        }}
        validatorHandle={(error, file) => {
          console.log(error, file)
          return true
        }}
      >
        <Button>
          <FontAwesome name="upload" /> Upload file
        </Button>
      </Upload>

      <Upload.Image
        action="//jsonplaceholder.typicode.com/posts"
        accept="image/*"
        multiple
        name="file"
        onSuccess={(res, file, data) => ({ data })}
        validator={{
          size: s => (s > 10240 ? new Error('max file size is 10KB') : undefined),
        }}
        renderResult={f => f.data}
      />
    </div>
  )
}
