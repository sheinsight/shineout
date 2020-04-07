import React from 'react'
import immer from 'immer'
import PropTypes from 'prop-types'

import { compareColumns } from '../utils/shallowEqual'

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
      this.state = {
        columns: props.columns,
        delta: 0,
      }
    }

    componentDidUpdate(prevProps) {
      if (!compareColumns(prevProps.columns, this.props.columns)) {
        this.setState({ columns: this.props.columns })
      }
    }

    getWidth() {
      const { width } = this.props
      if (typeof width === 'number') return width + this.state.delta
      return width
    }

    handleResize(index, width) {
      const { onColumnResize } = this.props
      const changed = immer(this.state, draft => {
        const column = draft.columns[index]
        if (column.width) {
          draft.delta += parseFloat(width - column.width)
        }
        column.width = width
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
      return <Table {...other} width={width} columns={columns} onResize={this.handleResize} />
    }
  }
