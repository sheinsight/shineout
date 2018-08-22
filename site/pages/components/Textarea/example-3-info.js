/**
 * cn - 信息
 *    -- 设置 info 属性后，用户 focus 时显示 info 函数执行的结果，例如用户已输入文字长度。
 *    -- 如果 info 返回类型为 Error，不会隐藏。
 * en - Info
 *    -- The result of the info function is displayed when you focus.
 */
import React from 'react'
import { Textarea } from 'shineout'

const renderInfo = (value) => {
  if (value.length === 0) return null
  const text = `${value.length} / 20`
  if (value.length <= 20) return text
  return new Error(text)
}

export default function () {
  return (
    <Textarea rows={4} trim placeholder="input something" info={renderInfo} />
  )
}
