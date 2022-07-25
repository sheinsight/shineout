/**
 * cn - 数据处理
 *    -- 设置 format 选项把数据对象格式化为指定的 value
 * en - Datum
 *    -- Set format property to format the data object to the specified value.
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
        format="id"
        keygen="id"
        defaultValue={3}
        prediction={(v, d) => v === d.id}
        style={style}
        placeholder="Select a city"
        renderItem="city"
      />

      <Select
        data={citys}
        multiple
        keygen="id"
        defaultValue={[3, 4]}
        format="id"
        placeholder="Select citys"
        renderItem="city"
      />
    </div>
  )
}
