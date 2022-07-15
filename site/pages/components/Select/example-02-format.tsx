/**
 * cn - 数据处理
 *    -- 设置 format 选项把数据对象格式化为指定的 value
 * en - Datum
 *    -- Set format property to format the data object to the specified value.
 */
import React from 'react'
import { Select } from 'shineout'

interface SelectItem {
  id: number
  city: string
}
const citys: SelectItem[] = [
  { id: 1, city: 'Pune' },
  { id: 2, city: 'Accra' },
  { id: 3, city: 'Dhaka' },
  { id: 4, city: 'Bogota' },
  { id: 5, city: 'Nanjing' },
  { id: 6, city: 'Bandung' },
  { id: 7, city: 'Dongguan' },
  { id: 8, city: 'Chongqing' },
  { id: 9, city: 'Buenos Aires' },
  { id: 10, city: 'Osaka-Kobe-Kyoto' },
]
const style: React.CSSProperties = { width: 240, marginBottom: 12, display: 'block' }

const App: React.FC = () => (
  <div>
    <Select
      format="id"
      keygen="id"
      data={citys}
      style={style}
      defaultValue={3}
      renderItem="city"
      placeholder="Select a city"
      prediction={(v, d) => v === d.id}
    />

    <Select
      multiple
      keygen="id"
      format="id"
      data={citys}
      renderItem="city"
      defaultValue={[3, 4]}
      placeholder="Select citys"
    />
  </div>
)

export default App
