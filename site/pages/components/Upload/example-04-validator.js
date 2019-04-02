/**
 * cn - 校验
 *    -- 通过 validator.imageSize 校验图片长宽，本例为 200px * 100px
 * en - Validator
 *    -- Set validator.imageSize to validate the width and height of the image.
 */
import React from 'react'
import { Upload } from 'shineout'
import FontAwesome from '../Icon/FontAwesome'

export default function() {
  return (
    <Upload.Image
      action="//jsonplaceholder.typicode.com/posts"
      accept="image/*"
      name="file"
      onSuccess={(res, file, data) => ({ data })}
      width={200}
      height={100}
      limit={1}
      renderResult={f => f.data}
      validator={{
        imageSize: img => (img.width !== 200 || img.height !== 100 ? new Error('only allow 200px * 100px') : undefined),
        ext: ext => (['jpg', 'png'].includes(ext) ? undefined : new Error('File extension must be jpg or png')),
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
