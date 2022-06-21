/**
 * cn - 密码
 *    -- Input.Password 模拟密码输入框，用来阻止 Chrome 提示记住密码。
 * en - Password
 *    -- Input.Password is a mock input of type 'password', used for disable Chrome autofill.
 */
import React from 'react'
import { Input } from 'shineout'

export default function() {
  return <Input.Password placeholder="input password" />
}
