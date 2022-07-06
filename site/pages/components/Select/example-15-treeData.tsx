/**
 * cn - 树形选择
 *    -- 通过设置 treeData 来实现树形选择。
 * en - Tree Select
 *    -- Set treeData to select with tree.
 */
import React, { useState } from 'react'
import { Select, TYPE } from 'shineout'
import data from 'doc/data/tree'

type SelectProps = TYPE.Select.Props<any, any>
type SelectDisabled = SelectProps['disabled']
type SelectOnChange = SelectProps['onChange']
type SelectRenderItem = SelectProps['renderItem']

const style: React.CSSProperties = { width: 250, marginBottom: 20 }

const App: React.FC = () => {
  const [single, setSingle] = useState('')
  const [multiple, setMultiple] = useState([])

  const renderItem: SelectRenderItem = v => `node ${v.text}`

  const handleMultiple: SelectOnChange = v => setMultiple(v)

  const handleSingleChange: SelectOnChange = v => setSingle(v)

  const disabled: SelectDisabled = v => v.text.startsWith('1')

  return (
    <div>
      <Select
        format="id"
        keygen="id"
        style={style}
        value={single}
        treeData={data}
        disabled={disabled}
        renderItem={renderItem}
        onChange={handleSingleChange}
      />
      <br />

      <Select
        multiple
        clearable
        format="id"
        keygen="id"
        style={style}
        treeData={data}
        value={multiple}
        disabled={disabled}
        renderItem={renderItem}
        onChange={handleMultiple}
      />
    </div>
  )
}

export default App
