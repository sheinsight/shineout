/**
 * cn - 校验
 *    -- 设置了 rules，会自动校验输入数据，设置了 popover 会在指定位置弹出
 *    -- 如果没有设置 popover，不会弹出错误提示。
 *    -- 有错误时，提示框不会隐藏。
 * en - validate
 */
import React from 'react'
import { Input } from 'shineout'

const style = { marginBottom: 12 }
const rules = [
  { required: true, message: 'Please enter your email.' },
  { type: 'email', message: 'Please enter a valid email.' },
]

export default function () {
  return (
    <div style={{ width: 300 }}>
      <Input
        style={style}
        placeholder="email"
        rules={rules}
        tip="Email, required"
        popover="top-left"
      />
    </div>
  )
}
