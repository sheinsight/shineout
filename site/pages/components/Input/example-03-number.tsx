/**
 * cn - 数字
 *    -- type 为 number 时，输入时会做一次校验，禁止输入非数字类型字符
 *    -- 设置 digits 属性限制小数位数
 *    -- 设置 integerLimit 属性限制整数位数
 *    -- 设置 numType 来限制格式, 支持 'positive' 和 'non-negative'
 * en - Number
 *    -- When type is number, it is forbidden to input non-numeric characters, and the number of decimal places is limited according to the digits property
 *    -- set the digits property to limit the number of decimal places
 *    -- Set the integerLimit property to limit the number of integer digits
 *    -- set numType to limit the format of Number, support 'positive' and 'non-negative'
 */
import React from 'react'
import { Input } from 'shineout'

const style: React.CSSProperties = { marginBottom: 12 }

const App: React.FC = () => (
  <div style={{ width: 300 }}>
    <Input style={style} type="number" placeholder="digits undefined" />
    <Input style={style} digits={0} type="number" placeholder="digits 0" clearable />
    <Input style={style} digits={1} type="number" placeholder="digits 1" clearable />
    <Input style={style} digits={2} type="number" placeholder="digits 2" clearable />
    <Input style={style} numType="non-negative" type="number" placeholder="non-negative" />
    <Input style={style} type="number" integerLimit={3} placeholder="integerLimit 3" clearable />
    <Input style={style} autoFix digits={3} type="number" placeholder="digits 3; autoFix" clearable />
    <Input style={style} numType="positive" integerLimit={3} type="number" placeholder="positive;integerLimit 3" />
  </div>
)

export default App
