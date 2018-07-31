/**
 * cn - 信息
 *    -- 多行文本输入框
 * en - Info
 */
import React from 'react'
import { Textarea } from 'shineout'

const renderInfo = (value) => {
  if (value.length === 0) return null
  const text = `Current character length is ${value.length}`
  if (value.length < 20) return text
  return new Error(text)
}

export default function () {
  return (
    <Textarea rows={4} placeholder="input something" info={renderInfo} />
  )
}
