/**
 * cn - 数字
 *    -- type 为 number 时，输入时会做一次校验，禁止输入非数字类型字符，并且根据 digits 属性限制小数位数
 * en - Number
 *    -- When type is number, it is forbidden to input non-numeric characters, and the number of decimal places is limited according to the digits property
 */
import React from 'react'
import { Input } from 'shineout'

const style = { marginBottom: 12 }

export default function() {
  return (
    <div style={{ width: 300 }}>
      <Input style={style} type="number" placeholder="digits undefined" />
      <Input style={style} digits={0} type="number" placeholder="digits 0" />
      <Input style={style} digits={1} type="number" placeholder="digits 1" />
      <Input style={style} digits={2} type="number" placeholder="digits 2" />
      <Input style={style} digits={3} type="number" placeholder="digits 3" />
    </div>
  )
}
