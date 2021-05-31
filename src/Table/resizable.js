import React from 'react'
import immer from 'immer'
import PropTypes from 'prop-types'

export default Table =>
  class extends React.Component {
    static propTypes = {
      columns: PropTypes.array.isRequired,
      onColumnResize: PropTypes.func,
      width: PropTypes.number,
    }

    constructor(props) {
      super(props)
      this.handleResize = this.handleResize.bind(this)
      this.setFitWidth = this.setFitWidth.bind(this)
      this.state = {
        columns: props.columns,
        delta: 0,
        fitWidth: 0,
      }
    }

    componentDidUpdate(prevProps) {
      const prevColumns = prevProps.columns
      const { columns } = this.props
      if (prevColumns !== columns) {
        if (prevColumns.length !== columns.length) {
          this.setState({ columns })
        } else {
          const widthed = immer(columns, draft => {
            draft.forEach((column, index) => {
              column.width = this.state.columns[index].width
            })
          })
          this.setState({ columns: widthed })
        }
      }
    }

    getWidth() {
      const { width } = this.props
      const { fitWidth } = this.state
      const showWidth = fitWidth || width
      if (typeof showWidth === 'number') return showWidth + this.state.delta
      return showWidth
    }

    setFitWidth(colgroup) {
      const changed = immer(this.state, draft => {
        let sum = 0
        draft.columns.forEach((col, index) => {
          const w = colgroup[index]
          console.log(w)
          if (w) col.width = w
          sum += w || 0
        })
        draft.fitWidth = sum
      })
      this.setState(changed)
    }

    handleResize(index, width, colgroup) {
      const { onColumnResize } = this.props
      const changed = immer(this.state, draft => {
        const column = draft.columns[index]
        draft.delta += parseFloat(width - (column.width || 0))
        colgroup[index] = width
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
      return (
        <Table {...other} width={width} columns={columns} onResize={this.handleResize} setFitWidth={this.setFitWidth} />
      )
    }
  }
