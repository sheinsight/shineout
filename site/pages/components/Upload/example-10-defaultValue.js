/**
 * cn - 默认值
 *    -- 默认值示例
 * en - defaultValue
 *    -- defaultValue example
 */
import React from 'react'
import { Upload, Button } from 'shineout'
import FontAwesome from '../Icon/FontAwesome'

export default function() {
  const defaultValue = [
    {
      name: 'test file.png',
      url: '../images/1_s.jpg',
    },
  ]

  return (
    <div>
      <Upload
        action="//jsonplaceholder.typicode.com/posts"
        accept="image/*"
        multiple
        limit={2}
        name="file"
        onSuccess={(res, file) => ({ name: file.name })}
        style={{ width: 300, marginBottom: 30 }}
        defaultValue={defaultValue}
        renderResult={f => f.name}
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
        limit={1}
        recoverAble
        onSuccess={(res, file, data) => ({ url: data })}
        renderResult={f => f.url}
        defaultValue={defaultValue}
      />
    </div>
  )
}
