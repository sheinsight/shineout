import React from 'react'
import immer from 'immer'
import PropTypes from 'prop-types'

import { compareColumns } from '../utils/shallowEqual'

export default Table =>
  class extends React.Component {
    static propTypes = {
      columns: PropTypes.array.isRequired,
      onColumnResize: PropTypes.func,
    }

    constructor(props) {
      super(props)
      this.handleResize = this.handleResize.bind(this)
      this.state = {
        columns: props.columns,
      }
    }

    componentDidUpdate(prevProps) {
      if (!compareColumns(prevProps.columns, this.props.columns)) {
        this.setState({ columns: this.props.columns })
      }
    }

    handleResize(index, width) {
      const { onColumnResize } = this.props
      const { columns } = this.state
      const changed = immer(columns, draft => {
        draft[index].width = width
      })
      if (onColumnResize) {
        onColumnResize(changed)
        return
      }
      this.setState({ columns: changed })
    }

    render() {
      const { columns } = this.state
      const { onColumnResize, ...other } = this.props
      return <Table {...other} columns={columns} onResize={this.handleResize} />
    }
  }
