/**
 * cn - 加载中
 *    -- 数据加载中，为true时会展示一个默认的[Spin](/components/Spin)组件，可以传入一个自定义的Spin代替
 * en - Loading
 *    -- When it is true, a default [Spin](/components/Spin) component will be displayed, a custom loading icon can be passed in to replace.
 */
import React from 'react'
import { Select, Spin } from 'shineout'

const data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']

export default function() {
  return (
    <div>
      <Select keygen data={data} loading defaultValue="" style={{ width: 240 }} />
      <br />
      <br />
      <Select
        keygen
        style={{ width: 240 }}
        data={data}
        defaultValue=""
        loading={<Spin size={18} name="four-dots" color="green" />}
      />
    </div>
  )
}
