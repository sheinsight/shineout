/**
 * cn - T:tree-expand-mutate
 *    -- fixed: 修复 Table treeExpandKeys 在 data 包含不可序列化字段（DOM 节点、React ref）时报循环引用错误
 *    -- 验证直接修改 data 引用后 Table 仍能正常响应式更新
 * en - T:tree-expand-mutate
 *    --
 */
import React, { useState, useRef, useEffect } from 'react'
import { Table, Button, TYPE } from 'shineout'

interface TreeRowData {
  id: number
  name: string
  // 模拟用户 data 中存储了 DOM 节点引用（会导致循环引用）
  bindElement?: HTMLElement | null
  children?: TreeRowData[]
}

type TableColumnItem = TYPE.Table.ColumnItem<TreeRowData>

const columns: TableColumnItem[] = [
  {
    title: 'ID',
    render: 'id',
    width: 80,
    treeColumnsName: 'children',
    treeIndent: 20,
  },
  { title: 'Name', render: 'name' },
  {
    title: 'Element',
    render: d => (d.bindElement ? 'has DOM ref' : '-'),
  },
]

const App: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [data, setData] = useState<TreeRowData[]>([
    {
      id: 1,
      name: 'Parent 1',
      children: [
        { id: 11, name: 'Child 1-1' },
        { id: 12, name: 'Child 1-2' },
      ],
    },
    {
      id: 2,
      name: 'Parent 2',
      children: [
        { id: 21, name: 'Child 2-1' },
        { id: 22, name: 'Child 2-2', children: [{ id: 221, name: 'Child 2-2-1' }] },
      ],
    },
    {
      id: 3,
      name: 'Parent 3',
    },
  ])
  const [expandKeys, setExpandKeys] = useState<(number | string)[]>([1])

  // 模拟用户在 data 中绑定 DOM 节点（渲染后 DOM 节点上有 __reactFiber$ 循环引用）
  useEffect(() => {
    if (containerRef.current) {
      setData(prev => {
        const next = [...prev]
        next[0] = { ...next[0], bindElement: containerRef.current }
        return next
      })
    }
  }, [])

  const handleMutateData = () => {
    const newData = [...data]
    newData[0] = { ...newData[0], name: `Parent 1 (updated ${Date.now()})` }
    setData(newData)
  }

  const handleAddChild = () => {
    const newData = [...data]
    const parent = { ...newData[1] }
    parent.children = [...(parent.children || []), { id: Date.now(), name: `New Child ${Date.now()}` }]
    newData[1] = parent
    setData(newData)
    if (!expandKeys.includes(2)) {
      setExpandKeys([...expandKeys, 2])
    }
  }

  return (
    <div ref={containerRef}>
      <div style={{ marginBottom: 12 }}>
        <Button onClick={handleMutateData}>修改 data 引用</Button>
        <Button onClick={handleAddChild} style={{ marginLeft: 8 }}>
          给 Parent 2 添加子节点
        </Button>
        <Button onClick={() => setExpandKeys([1, 2, 22])} style={{ marginLeft: 8 }}>
          展开全部
        </Button>
        <Button onClick={() => setExpandKeys([])} style={{ marginLeft: 8 }}>
          收起全部
        </Button>
      </div>
      <Table
        data={data}
        columns={columns}
        keygen="id"
        treeColumnsName="children"
        treeExpandKeys={expandKeys}
        onTreeExpand={(openKeys: any) => setExpandKeys(openKeys)}
      />
    </div>
  )
}

export default App
