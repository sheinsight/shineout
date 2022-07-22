/**
 * cn - 不使用 renderItem
 *    -- 当数据是字符串数组时，可以不传renderItem。
 * en - dont use renderItem
 *    -- When the data is a string array, renderItem can not be passed.
 */
import React from 'react'
import { List, TYPE } from 'shineout'

type ListItem = string
type ListProps = TYPE.List.Props<ListItem, ListItem>
type ListData = ListProps['data']

const data: ListData = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']

const App: React.FC = () => <List keygen bordered data={data} />

export default App
