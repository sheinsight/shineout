import React from 'react'
import { PureComponent } from '../component'
import Pagination from '../Pagination'
import { PaginationProps } from '../Pagination/Props'
import { GetPagableProps } from './Props'

interface PagableProps {
  data?: any
  loading?: any
}

interface PagableState {
  current: number
  pageSize: number
}

function getData(data: unknown, pager: { pageSize: number; current: number; [name: string]: any }) {
  if (!Array.isArray(data)) return data
  if (data.length <= pager.pageSize) return data

  const start = (pager.current - 1) * pager.pageSize
  return data.slice(start, start + pager.pageSize)
}

export default function<U extends PagableProps>(Component: React.ComponentType<U>) {
  return class extends PureComponent<GetPagableProps<U>, PagableState> {
    constructor(props: GetPagableProps<U>) {
      super(props)

      const pp = props.pagination! || {}
      this.state = {
        current: pp.current || pp.defaultCurrent || 1,
        pageSize: pp.pageSize || 10,
      }

      this.handleChange = this.handleChange.bind(this)
    }

    getProp(key: 'current' | 'pageSize') {
      return this.props.pagination![key] || this.state[key]
    }

    getPager(
      data: any,
      pagination: PaginationProps
    ): PaginationProps & Required<Pick<PaginationProps, 'current' | 'pageSize' | 'total'>> {
      const { loading } = this.props
      const total = Array.isArray(data) ? data.length : 0
      return Object.assign(
        {
          current: this.getProp('current'),
          pageSize: this.getProp('pageSize'),
          total,
          disabled: !!loading,
        },
        pagination,
        { onChange: this.handleChange }
      )
    }

    handleChange(current: number, pageSize: number) {
      const { onChange } = this.props.pagination!
      this.setState({ current, pageSize })
      if (onChange) onChange(current, pageSize)
    }

    render() {
      const { pagination, data, ...props } = this.props
      const pager = this.getPager(data, pagination!)

      return [
        <Component key="origin" data={getData(data, pager)} {...props as U} />,
        <Pagination key="pager" {...pager} />,
      ]
    }
  }
}
