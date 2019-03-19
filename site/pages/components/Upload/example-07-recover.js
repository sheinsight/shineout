/**
 * cn - 恢复删除
 *    -- 设置 recoverAble 为 true，点击删除后，文件会标记为已删除，可以通过恢复图标恢复
 * en - Recover
 *    -- Set reconverAble to true, Clicking delete icon will not remove the file, but will mark it as deleted.
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
        limit={2}
        name="file"
        recoverAble
        onSuccess={(res, file) => file.name}
        style={{ width: 300, marginBottom: 30 }}
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
        onSuccess={(res, file, data) => ({ data })}
        renderResult={f => f.data}
      />
    </div>
  )
}
