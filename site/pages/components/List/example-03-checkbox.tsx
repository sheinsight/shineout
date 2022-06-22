/**
 * cn - 选择行
 *    -- 设置 onChange 属性，会自动添加选择行
 * en - Select
 *    -- Set the onChange property will automatically add a row with checkbox.
 */
import React, { useState, useEffect } from 'react'
import { List, Checkbox, TYPE } from 'shineout'
import { fetch } from 'doc/data/user'

type ListProps = TYPE.List.Props<any, any>
type ListData = ListProps['data']
type ListOnChange = ListProps['onChange']
type ListRenderItem = ListProps['renderItem']

type CheckboxProps = TYPE.Checkbox.Props<any>
type CheckboxOnChange = CheckboxProps['onChange']

const style: React.CSSProperties = {
  padding: 12,
  display: 'flex',
  lineHeight: '22px',
  alignItems: 'center',
  justifyContent: 'flex-start',
  borderBottom: '1px solid #e8ebf0',
}

const App: React.FC = () => {
  const [value, setValue] = useState([1])
  const [current, setCurrent] = useState(1)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<ListData[]>([])

  const fetchData = (c: number) => {
    setLoading(true)
    fetch.get('List', { current, pageSize: 10, sorter: '', username: '' }).then((_data: { data: any }) => {
      setData([...data, ..._data.data])
      setCurrent(c)
      setLoading(false)
    })
  }

  const getChecked = () => {
    if (!value || value.length <= 0) return false
    if (value.length === data.length) return true
    return 'indeterminate'
  }

  const onChange: ListOnChange = selectedValue => {
    console.log('selectValue: ', selectedValue)
    setValue(selectedValue)
  }

  const checkboxOnChange: CheckboxOnChange = (flag: any) => {
    if (flag) {
      setValue(data.map((v: any) => v.id))
      return
    }
    setValue([])
  }

  const renderItem: ListRenderItem = rowData => (
    <div>{`From ${rowData.country}. Name: ${rowData.firstName}-${rowData.lastName}`}</div>
  )

  useEffect(() => {
    fetchData(1)
  }, [])

  return (
    <div>
      <div style={style}>
        <Checkbox checked={getChecked()} onChange={checkboxOnChange} />
        <div>{`Selected ${value.length}`}</div>
      </div>
      <List
        format="id"
        keygen="id"
        data={data}
        value={value}
        loading={loading}
        onChange={onChange}
        renderItem={renderItem}
      />
    </div>
  )
}

export default App
