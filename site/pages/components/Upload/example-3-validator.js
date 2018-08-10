/**
 * cn - 图片尺寸
 *    -- 通过 validator.imageSize 校验图片尺寸，本例为 200px * 100px
 * en - Size
 *    -- Use validator.imageSize to check the size of the image. This example is 200px * 100px.
 */
import React from 'react'
import { Upload } from 'shineout'
import FontAwesome from '../Icon/FontAwesome'

export default function () {
  return (
    <Upload.Image
      action="http://jsonplaceholder.typicode.com/posts"
      accept="image/*"
      name="file"
      onUpload={(res, file, data) => ({ data })}
      width={200}
      height={100}
      limit={1}
      renderResult={f => f.data}
      validator={{
        imageSize: img => ((img.width !== 200 || img.height !== 100) ? new Error('only allow 200px * 100px') : undefined),
      }}
    >
      <div style={{ margin: 'auto', color: '#999', textAlign: 'center' }}>
        <FontAwesome name="upload" /> Upload Image
        <br />
        Allow size 200 * 100
      </div>
    </Upload.Image>
  )
}
