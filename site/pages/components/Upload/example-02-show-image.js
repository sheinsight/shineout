/**
 * cn - 自定义结果内容
 *    -- 使用  renderContent 可以自定义上传之后的图片结果.
 * en - Custom result content
 *    -- Use renderContent to customize the image results after uploading.
 */
import React from 'react'
import { Upload, Message } from 'shineout'

export default function() {
  return (
    <Upload.Image
      action="//jsonplaceholder.typicode.com/posts"
      accept="image/*"
      name="file"
      onSuccess={(res, file, data) => ({ data })}
      renderResult={f => f.data}
      limit={3}
      onStart={f => console.log(f)}
      renderContent={(d, v, i, values) => {
        console.log(d, v, i, values)
        return (
          <div onClick={() => Message.info('i am click')}>
            <img width="100%" src={d} alt="not found" />
          </div>
        )
      }}
    />
  )
}
