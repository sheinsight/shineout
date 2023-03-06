/**
 * cn - 文字
 *    -- 通过 text 替换文字
 * en - Text
 *    -- Set text property to replace the default text..
 */
import React from 'react'
import { Pagination, TYPE } from 'shineout'

type PaginationProps = TYPE.Pagination.Props
type PaginationText = PaginationProps['text']
type PaginationLayout = PaginationProps['layout']

const info = ({ current, pageSize, total }: { current: number; pageSize: number; total: number }) => {
  let to = current * pageSize
  if (to > total) to = total
  const from = (current - 1) * pageSize + 1
  return `${from} to ${to} of ${total} items`
}

const layout: PaginationLayout = ['links', 'list', info]

const text: PaginationText = {
  next: 'Next',
  page: '/ page',
  prev: 'Previous',
}

const App: React.FC = () => <Pagination text={text} total={256} pageSize={50} layout={layout} />

export default App
