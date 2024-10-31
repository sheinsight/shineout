import React, { ComponentType } from 'react'
import immer from 'immer'
import { GetResizeProps, SimpleTableProps } from './Props'

interface ScrollState<DataItem, Value> {
  columns: SimpleTableProps<DataItem, Value>['columns']
  delta: number
}
export default <DataItem, Value, Props extends SimpleTableProps<DataItem, Value>>(Table: ComponentType<Props>) =>
  class extends React.Component<GetResizeProps<Props, DataItem>, ScrollState<DataItem, Value>> {
    constructor(props: GetResizeProps<Props, DataItem>) {
      super(props)
      this.handleResize = this.handleResize.bind(this)
      this.state = {
        columns: props.columns,
        delta: 0,
      }
    }

    componentDidUpdate(prevProps: GetResizeProps<Props, DataItem>) {
      const prevColumns = prevProps.columns
      const { columns, onColumnResize } = this.props
      if (prevColumns !== columns) {
        if (prevColumns.length !== columns.length) {
          // eslint-disable-next-line react/no-did-update-set-state
          this.setState({ columns })
        } else {
          const widthed = onColumnResize
            ? columns
            : immer(columns, draft => {
                draft.forEach((column, index) => {
                  column.width = this.state.columns[index].width
                })
              })
          // eslint-disable-next-line react/no-did-update-set-state
          this.setState({ columns: widthed })
        }
      }
    }

    getWidth() {
      const { width } = this.props
      const { columns } = this.state
      if (typeof width === 'number') {
        const sum = columns.reduce((s, col) => s + (col.width || 0), 0)
        const w = width + this.state.delta
        return w > sum ? w : sum
      }
      return width
    }

    handleResize(startIndex: number, newResizingwidth: number, colgroup: number[], colspan: number) {
      if (colgroup === undefined) return
      const { onColumnResize } = this.props
      const endIndex = startIndex + colspan - 1
      const oldRsizingColsWidth = colgroup
        .filter((_, i) => i >= startIndex && i <= endIndex)
        .reduce((sum, w) => sum + w, 0)

      const changed = immer(this.state, draft => {
        draft.delta += newResizingwidth - oldRsizingColsWidth

        draft.columns.forEach((col, i) => {
          const w = colgroup[i]
          if (w) col.width = w
        })
      })
      if (onColumnResize) {
        onColumnResize(changed.columns)
        return
      }
      this.setState(changed)
    }

    render() {
      const { columns } = this.state
      const { onColumnResize, ...other } = this.props
      const width = this.getWidth()
      return <Table {...(other as Props)} width={width} columns={columns} onResize={this.handleResize} />
    }
  }
