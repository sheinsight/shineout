/**
 * cn - 布局
 *    -- 通过 layout 属性来控制组件是否显示以及显示的位置
 * en - Layout
 *    -- Use the layout property to control whether the child elements is displayed and where is displayed.
 */
import React from 'react'
import { Pagination, TYPE } from 'shineout'

type PaginationProps = TYPE.Pagination.Props
type PaginationLayout = PaginationProps['layout']

const info = ({ total }: { total: PaginationLayout }) => `total ${total}`

const App: React.FC = () => (
  <Pagination
    total={128}
    pageSize={50}
    text={{ jumper: 'Go to {input}' }}
    onChange={(...args) => console.log(args)}
    layout={['links', 'list', info, 'jumper']}
  />
)

export default App
