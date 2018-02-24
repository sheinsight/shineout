import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Pagination from '../Pagination'

function getData(data, pager) {
  if (!Array.isArray(data)) return data
  if (data.length <= pager.pageSize) return data

  const start = (pager.current - 1) * pager.pageSize
  return data.slice(start, start + pager.pageSize)
}

export default function (Component) {
  return class extends PureComponent {
    static propTypes = {
      data: PropTypes.any,
      loading: PropTypes.bool,
      pagination: PropTypes.object.isRequired,
    }

    constructor(props) {
      super(props)

      const pp = props.pagination
      this.state = {
        current: pp.current || pp.defaultCurrent || 1,
        pageSize: pp.pageSize || 10,
      }

      this.handleChange = this.handleChange.bind(this)
    }

    getCurrent() {
      return this.props.pagination.current || this.state.current
    }

    getPageSize() {
      return this.props.pagination.pageSize || this.state.pageSize
    }

    getPager(data, pagination) {
      const { loading } = this.props
      const total = Array.isArray(data) ? data.length : 0
      return Object.assign(
        {
          current: this.getCurrent(),
          pageSize: this.getPageSize(),
          total,
          disabled: loading,
        },
        pagination,
        { onChange: this.handleChange },
      )
    }

    handleChange(current, pageSize) {
      const { onChange } = this.props.pagination
      this.setState({ current, pageSize })
      if (onChange) onChange(current, pageSize)
    }

    render() {
      const { pagination, data, ...props } = this.props
      const pager = this.getPager(data, pagination)

      return [
        <Component key="origin" data={getData(data, pager)} {...props} />,
        <Pagination key="pager" {...pager} />,
      ]
    }
  }
}
