/**
 * cn -
 *    -- columns 为 -1 时选项会堆叠展示， columnWidth 为选项框的宽度
 * en -
 *    -- Set columns -1, options will display end by end， columnsWidth is the width of the option box
 */
import React from 'react'
import { Select, TYPE } from 'shineout'
import { fetchSync as fetchCity } from 'doc/data/city'

interface SelectItem {
  id: number
  city: string
}
type SelectProps = TYPE.Select.Props<SelectItem, number[]>
type SelectOnFilter = SelectProps['onFilter']

const citys: SelectItem[] = fetchCity(200)

const App: React.FC = () => {
  const onFilter: SelectOnFilter = text => d => d.city.toLowerCase().indexOf(text.toLowerCase()) >= 0

  return (
    <Select
      absolute
      multiple
      format="id"
      keygen="id"
      width={300}
      data={citys}
      columns={-1}
      renderItem="city"
      columnWidth={500}
      onFilter={onFilter}
      placeholder="Select citys"
      prediction={(v, d) => v === d.id}
    />
  )
}

export default App
