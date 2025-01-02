import { createContext } from 'react'
import { TableFix } from './Props'

interface TableContextProps {
  colgroup?: number[]
  fixed?: TableFix
}

const TableContext = createContext<TableContextProps>({} as TableContextProps)

export default TableContext
