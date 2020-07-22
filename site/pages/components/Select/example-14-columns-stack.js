/**
 * cn -
 *    -- columns 为 -1 时选项会堆叠展示， columnWidth 为选项框的宽度
 * en -
 *    -- Set columns -1, options will display end by end， columnsWidth is the width of the option box
 */
import React from 'react'
import { Select } from 'shineout'
import { fetchSync as fetchCity } from 'doc/data/city'

const citys = fetchCity(200)

export default function() {
  return (
    <Select
      data={citys}
      width={300}
      format="id"
      keygen="id"
      columns={-1}
      columnWidth={500}
      multiple
      prediction={(v, d) => v === d.id}
      placeholder="Select citys"
      renderItem="city"
      onFilter={text => d => d.city.toLowerCase().indexOf(text.toLowerCase()) >= 0}
      absolute
    />
  )
}
