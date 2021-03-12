/**
 * cn - 创建选项
 *    -- 设置 onCreate 属性可以通过输入创建选项
 * en - Create by input
 *    -- Set the onCreate property can create options by inputting.
 */
import React from 'react'
import { Select } from 'shineout'

const data = [{ id: 0, title: 'red' }, { id: 1, title: 'blue' }]

export default function() {
  return (
    <Select
      multiple
      width={240}
      data={data}
      format="id"
      keygen="id"
      renderItem="title"
      hideCreateOption
      onCreate={text => {
        console.log('onCreate: ', text)
        if (typeof text === 'object') return text
        return { title: text, id: text }
      }}
    />
  )
}
