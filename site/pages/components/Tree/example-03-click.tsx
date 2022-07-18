/**
 * cn - 点击事件
 *    -- 设置 onClick 属性监听节点点击
 * en - Click
 *    -- Set the onClick property to listen the node click.
 */
import React from 'react'
import produce from 'immer'
import { Tree, TYPE } from 'shineout'
import tree from 'doc/data/tree'

type dataItem = typeof tree[0]
type TreeProps = TYPE.Tree.Props<dataItem, string[]>

const keyGenerator: TreeProps['keygen'] = (node, parentKey) => `${parentKey},${node.id}`.replace(/^,/, '')

const App: React.FC = () => {
  const [active, setActive] = React.useState<TreeProps['active']>()
  const [data, setData] = React.useState<TreeProps['data']>(tree)
  const handleClick: TreeProps['onClick'] = React.useCallback((_, id) => {
    setActive(id)
  }, [])
  const handleEdit = React.useCallback(e => {
    const newText = e.target.value
    const path = (active || '').split(',')
    const nextData = produce(data, draft => {
      let target: any = draft
      path.forEach((id, index) => {
        target = target.find((d: dataItem) => d.id === id)
        if (target && index < path.length - 1) target = target.children
      })
      if (target) {
        target.text = newText
      }
    })
    setData(nextData)
    setActive(undefined)
  }, [])

  const renderItem: TreeProps['renderItem'] = React.useCallback(
    (node, _, isActive) =>
      isActive ? (
        <input
          // eslint-disable-next-line
        autoFocus
          onBlur={handleEdit}
          onKeyDown={event => {
            if (event.keyCode === 13 && event.target) (event.target as HTMLInputElement).blur()
          }}
          defaultValue={node.text}
          type="text"
        />
      ) : (
        `node ${node.text}`
      ),
    []
  )

  return (
    <Tree
      active={active}
      data={data}
      keygen={keyGenerator}
      defaultExpanded={['1']}
      onClick={handleClick}
      renderItem={renderItem}
    />
  )
}

export default App
