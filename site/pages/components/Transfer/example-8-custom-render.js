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

const compare = (prev, cur) => JSON.stringify(prev) !== JSON.stringify(cur)

class TransferTree extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: props.selectedKeys,
    }

    this.handleChange = this.handleChange.bind(this)
  }

  componentDidUpdate(prevProps) {
    if (compare(prevProps.value, this.props.value)) {
      this.updateValue()
    }
  }

  updateValue() {
    const { value } = this.props
    this.setState({
      value,
    })
  }

  handleChange(_, cur) {
    const { onSelected } = this.props
    const { value } = this.state
    console.log('change: ', cur)
    this.setState({ value: [...value, cur] })
    onSelected(cur)
  }

  render() {
    return (
      <div style={{ height: '100%', overflow: 'auto', padding: 12 }}>
        <Tree
          defaultExpandAll
          data={treeData}
          keygen="id"
          mode={2}
          onChange={this.handleChange}
          renderItem="text"
          value={this.state.value}
        />
      </div>
    )
  }
}

export default function() {
  return (
    <Transfer data={flatData} format="id" renderItem="text" keygen="id" titles={['Source', 'Target']}>
      {({ direction, onSelected, selectedKeys, value }) => {
        console.log('direction', direction)
        if (direction === 'left') {
          return <TransferTree onSelected={onSelected} selectedKeys={selectedKeys} value={value} />
        }
      }}
    </Transfer>
  )
}
