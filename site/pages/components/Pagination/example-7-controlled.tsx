/**
 * cn - 受控组件
 *    -- 同时设置 current 和 onChange 属性，可以作为受控组件使用
 * en - Controlled
 *    -- Set both the current and onChange properties for being used as a controlled component.
 */
import React, { useState } from 'react'
import { Input, Pagination, TYPE } from 'shineout'

type PaginationProps = TYPE.Pagination.Props
type PaginationText = TYPE.Pagination.TextParams
type PaginationOnChange = PaginationProps['onChange']

const info = ({ current }: { current: number }) => `Current page ${current}`

const text: PaginationText = {
  next: 'Next',
  page: '/ page',
  prev: 'Previous',
}

const App: React.FC = () => {
  const [current, setCurrent] = useState(1)
  const [pageSize, setPageSize] = useState(20)

  const handleChange: PaginationOnChange = (c, p) => {
    setCurrent(c)
    setPageSize(p)
  }

  const handleCurrentChange = (v: any) => setCurrent(Number(v))

  return (
    <div>
      <span>跳转至：</span>

      <Input.Number
        min={1}
        max={50}
        value={current}
        onChange={handleCurrentChange}
        style={{ width: 100, marginBottom: 20 }}
      />

      <Pagination
        text={text}
        total={1000}
        current={current}
        pageSize={pageSize}
        onChange={handleChange}
        layout={['links', 'list']}
      />
      <br />
      <Pagination current={current} onChange={handleChange} pageSize={pageSize} total={1000} layout={['links', info]} />
    </div>
  )
}

export default App
