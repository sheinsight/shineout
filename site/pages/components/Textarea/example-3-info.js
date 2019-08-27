/**
 * cn - 信息
 *    -- 设置 info 为数字, 设定最大长度，用户 focus 时会显示用户已输入文字长度。
 *    -- 如果超出长度， 则会报错. 不会隐藏。
 * en - Info
 *    -- Set info to number, set the maximum length, and the user's focus shows the length of text that the user has entered.
 *    -- If the length is exceeded, the error is reported. It is not hidden.
 */
import React from 'react'
import { Textarea } from 'shineout'

export default function() {
  return <Textarea rows={4} trim placeholder="input something" info={10} />
}
