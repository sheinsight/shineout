/**
 * cn - 可选择
 *    -- 选中值取值提供了 4 种模式
 *    -- 0: 只返回完全选中的节点，包含父节点
 *    -- 1: 返回全部选中的节点和半选中的父节点
 *    -- 2: 只返回选中的子节点
 *    -- 3: 如果父节点选中，只返回父节点
 *    -- 4: 所选即所得
 * en - onChange
 *    -- Selected values provide 4 modes
 *    -- 0: Return only the fully selected node, including the parent node.
 *    -- 1: Return the fully selected nodes and semi-selected parent nodes.
 *    -- 2: Return only the selected child node.
 *    -- 3: Return only the parent node, if the parent node is selected.
 *    -- 4: What you choose is what you get.
 */
import React from 'react'
import { Tree, Radio, config, TYPE } from 'shineout'
import data from 'doc/data/tree'

type DataItem = typeof data[0]
type TreeProps = TYPE.Tree.Props<DataItem, string[]>

const resultStyle: TreeProps['style'] = {
  position: 'absolute',
  right: 30,
  top: 100,
  bottom: 40,
  width: 240,
  overflow: 'auto',
  background: '#f2f2f2',
  padding: 10,
  zIndex: 100,
}
if (config.direction === 'rtl') {
  resultStyle.left = resultStyle.right
  delete resultStyle.right
}

const modeList = [
  { value: 0, text: 'mode=0 (full)' },
  { value: 1, text: 'mode=1 (half)' },
  { value: 2, text: 'mode=2 (child only)' },
  { value: 3, text: 'mode=3 (shallow)' },
  { value: 4, text: 'mode=4 (freedom)' },
]

function getValue(list: DataItem[], value: string[]) {
  const [node] = list
  if (!node) return
  value.push(node.id)
  if (node.children) getValue(node.children, value)
}
const defaultValue: string[] = []
getValue(data, defaultValue)

const App: React.FC = () => {
  const [value, setValue] = React.useState<TreeProps['value']>(defaultValue)
  const [mode, setMode] = React.useState<TreeProps['mode']>(1)
  console.log(mode)

  const handleChange: TreeProps['onChange'] = v => {
    setValue(v)
  }
  const handleModeChange = (v: TreeProps['mode']) => {
    setMode(v)
    // setValue([])
  }
  const renderItem: TreeProps['renderItem'] = node => `node ${node.id}`

  return (
    <div>
      <Radio.Group
        keygen="value"
        value={mode}
        format="value"
        onChange={handleModeChange}
        data={modeList}
        renderItem="text"
      />

      <br />

      <Tree
        data={data}
        disabled={mode === 1}
        defaultExpanded={['0', '2']}
        keygen="id"
        mode={mode}
        onChange={handleChange}
        renderItem={renderItem}
        value={value}
      />

      <div style={resultStyle}>
        Current select value:
        <pre style={{ background: '#f2f2f2' }}>{JSON.stringify(value, null, 2)}</pre>
      </div>
    </div>
  )
}

export default App
