/**
 * cn -
 *    -- 通过 headers 配置请求头部信息
 *    -- 通过 params 配置提交到服务器的额外参数
 * en -
 *    -- Use the property headers to configure the request header.
 *    -- Use the property params to configure the request params.
 */
import React from 'react'
import { Upload, Message } from 'shineout'

export default function() {
  return (
    <Upload.Button
      action="//jsonplaceholder.typicode.com/posts"
      name="file"
      accept="./xls,.xlsx"
      onSuccess={res => {
        const result = JSON.parse(res)
        if (result.id) return Message.success(`导入成功.`)
        return Message.error('导入失败')
      }}
      loading="正在上传..."
      placeholder="导入excel文件"
      type="primary"
      headers={{
        token: localStorage.getItem('token'),
      }}
      params={{ userId: 'test' }}
    />
  )
}
