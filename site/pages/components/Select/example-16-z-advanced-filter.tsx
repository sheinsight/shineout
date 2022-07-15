/**
 * cn -
 *    -- 使用 onAdvancedFilter 属性开启高级筛选，可针对当前层级在筛选结果和原始数据间切换
 * en -
 *    -- In the advanced filter mode, you can switch between the filter results and the original data for the current level by pressing the button
 */
import React from 'react'
import { Select, TYPE } from 'shineout'

interface TreeData {
  value: string
  children?: TreeData[]
}
type SelectProps = TYPE.Select.Props<TreeData, string>
type SelectOnAdvancedFilter = SelectProps['onAdvancedFilter']

const data: TreeData[] = [
  {
    value: 'jiangsu',
    children: [
      {
        value: 'nanjing',
        children: [
          {
            value: 'jiangning',
          },
          {
            value: 'gulou',
          },
        ],
      },
      {
        value: 'suzhou',
      },
    ],
  },
  {
    value: 'anhui',
    children: [
      {
        value: 'hefei',
        children: [
          {
            value: 'feidong',
          },
          {
            value: 'feixi',
          },
        ],
      },
      {
        value: 'maanshan',
      },
    ],
  },
]

const App: React.FC = () => {
  const onAdvancedFilter: SelectOnAdvancedFilter = text => d => d.value.indexOf(text) > -1

  return (
    <Select
      absolute
      multiple
      clearable
      format="value"
      keygen="value"
      treeData={data}
      renderItem="value"
      showHitDescendants
      style={{ width: 250 }}
      onAdvancedFilter={onAdvancedFilter}
    />
  )
}

export default App
