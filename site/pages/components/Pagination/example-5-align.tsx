/**
 * cn - 位置
 *    -- 内置了 3 种位置，left, center, right，默认为 left
 * en - Alignment
 *    -- Options: 'left', 'center', 'right', the default value is left.
 */
import React from 'react'
import { Pagination, TYPE } from 'shineout'

type PaginationProps = TYPE.Pagination.Props
type PaginationLayout = PaginationProps['layout']

const info = ({ total }: { total: number }) => `Total ${total}`

const layoutRight: PaginationLayout = [info, 'links']

const layoutCenter: PaginationLayout = ['links', info]

const App: React.FC = () => (
  <div>
    <Pagination align="center" total={100} layout={layoutCenter} />
    <br />
    <Pagination align="right" total={100} layout={layoutRight} />
  </div>
)

export default App
