/**
 * cn -
 *    -- 返回原始数据的对象时，借助 prediction 函数来判断是否匹配
 * en -
 *    -- When the type of value is object,use the function of prediction to match.
 */
import React from 'react'
import { Select } from 'shineout'

const citys = [
  { id: 1, city: 'Osaka-Kobe-Kyoto' },
  { id: 2, city: 'Dhaka' },
  { id: 3, city: 'Pune' },
  { id: 4, city: 'Buenos Aires' },
  { id: 5, city: 'Nanjing' },
  { id: 6, city: 'Accra' },
  { id: 7, city: 'Chongqing' },
  { id: 8, city: 'Dongguan' },
  { id: 9, city: 'Bandung' },
  { id: 10, city: 'Bogota' },
]
const style = { width: 240, marginBottom: 12, display: 'block' }

export default function() {
  return (
    <div>
      <Select
        data={citys}
        keygen="id"
        prediction={(v, d) => v.id === d.id}
        style={style}
        placeholder="Select a city"
        renderItem="city"
        defaultValue={{ id: 6, city: 'Accra' }}
      />
    </div>
  )
}
