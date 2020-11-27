/**
 * cn - 自定义渲染
 *    -- 自定义内容渲染
 * en - Custom render
 *    -- Custom content render
 */
import React from 'react'
import { Transfer, Tree } from 'shineout'

const treeData = [
  {
    id: '1',
    text: '1',
    children: [
      {
        id: '1-1',
        text: '1-1',
        children: [{ id: '1-1-1', text: '1-1-1' }, { id: '1-1-2', text: '1-1-2' }],
      },
      { id: '1-2', text: '1-2' },
    ],
  },
  { id: '2', text: '2', children: [{ id: '2-1', text: '2-1' }, { id: '2-2', text: '2-2' }] },
  { id: '3', text: '3', children: [{ id: '3-1', text: '3-1' }] },
  { id: '4', text: '4', children: [{ id: '4-1', text: '4-1' }] },
  { id: '5', text: '5', children: [{ id: '5-1', text: '5-1' }] },
]

const handleData = (data, res = []) => {
  if (data.length <= 0) return res
  data.forEach(value => {
    const { children, ...ret } = value
    res.push(ret)
    if (children && children.length > 0) {
      handleData(children, res)
    }
  })
  return res
}

const flatData = handleData(treeData)

class TransferTree extends React.Component {
  constructor(props) {
    super(props)
    this.key = this.shortID()
    this.state = {
      key: this.shortID(),
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selectedKeys !== this.props.selectedKeys) {
      this.setState({ key: this.shortID() })
    }
  }

  // eslint-disable-next-line class-methods-use-this
  shortID() {
    const random = Math.random().toString(16)
    const now = (+new Date()).toString(16)
    return `${random.slice(random.length - 7)}-${now.slice(now.length - 7)}`
  }

  // eslint-disable-next-line class-methods-use-this
  compareValues(prev, cur) {
    if (prev !== cur) {
      return false
    }
    return true
  }

  render() {
    const { onSelected, selectedKeys } = this.props
    return (
      <Tree
        // key={this.state.key}
        defaultExpandAll
        data={treeData}
        keygen="id"
        mode={2}
        disabled={node => selectedKeys.includes(node.id)}
        onChange={vals => {
          console.log('value: ', vals)
          onSelected(vals)
        }}
        renderItem="text"
        value={selectedKeys}
      />
    )
  }
}

export default function() {
  return (
    <Transfer data={flatData} format="id" renderItem="text" keygen="id" titles={['Source', 'Target']}>
      {({ direction, onSelected, selectedKeys }) => {
        console.log('direction', direction)
        if (direction === 'left') {
          return <TransferTree onSelected={onSelected} selectedKeys={selectedKeys} />
        }
      }}
    </Transfer>
  )
}
