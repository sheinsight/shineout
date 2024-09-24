/**
 * cn - absolute-position
 *    -- absolute-position
 * en - absolute-position
 *    -- absolute-position
 */
import React from 'react'
import { TreeSelect } from 'shineout'

const data = [
  {
    id: '1',
    title: '1',
    children: [
      {
        id: '1-1',
        title: 'SHEIN X romwe xilie aaaaaaaaaaaaaaaaaasdsssssssss',
        children: [{ id: '1-1-1', title: '1-1-1' }, { id: '1-1-2', title: '1-1-2' }],
      },
      { id: '1-2', title: 'ss' },
    ],
  },
  {
    id: '2',
    title: 'SHEIN X romwe xilie aaaaaaaaaaaaaaaaaasdsssssssssSHEIN X romwe xilie aaaaaaaaaaaaaaaaaasdsssssssss',
    children: [{ id: '2-1', title: '2-1' }, { id: '2-2', title: '2-2' }],
  },
  {
    id: '3',
    title:
      'SHEIN X romwe xilie aaaaaaaaaaaaaaaaaasdsssssssssSHEIN X romwe xilie aaaaaaaaaaaaaaaaaasdsssssssssSHEIN X romwe xilie aaaaaaaaaaaaaaaaaasdsssssssss',
    children: [{ id: '3-1', title: '3-1' }],
  },
  { id: '4', title: 's', children: [{ id: '4-1', title: '4-1' }] },
  {
    id: '5',
    title: 'SHEIN X romwe xilie aaaaaaaaaaaaaaaaaasdsssssssss',
    children: [{ id: '5-1', title: '5-1' }],
  },
]
const App = () => {
  const [single, setSingle] = React.useState('')
  const [multi, setMulti] = React.useState([])
  const handleChangeSingle = v => {
    setSingle(v)
  }
  const handleChangeMultiple = v => {
    setMulti(v)
  }
  const handleFilter = (text: string) => d => d.title.indexOf(text) > -1
  return (
    <div>
      <TreeSelect
        onFilter={handleFilter}
        value={single}
        onChange={handleChangeSingle}
        clearable
        style={{ width: 250, marginBottom: 20 }}
        keygen="id"
        renderItem={node => `node ${node.title}`}
        data={data}
        absolute
        multiple
        compressed
      />
      {/* <br />
      <TreeSelect
        multiple
        onFilter={handleFilter}
        value={multi}
        onChange={handleChangeMultiple}
        clearable
        style={{ width: 250 }}
        keygen="id"
        renderItem={(node) => `node ${node.title}`}
        data={data}
        absolute
      /> */}
    </div>
  )
}
export default App
