import React, { PureComponent } from 'react'
import Pagination from './Pagination'
import { PaginationProps } from './Props'

const DefaultValue = { defaultCurrent: 1, pageSize: 10, total: 0 }

interface State {
  current: number
  pageSize: number
  total: number
}

export default class extends PureComponent<PaginationProps, State> {
  static displayName = 'ShineoutPagination'

  static defaultProps = DefaultValue

  constructor(props: PaginationProps) {
    super(props)
    // @ts-ignore
    this.state = { current: props.current || props.defaultCurrent, pageSize: props.pageSize }

    this.handleChange = this.handleChange.bind(this)
  }

  componentDidUpdate(prevProps: PaginationProps) {
    if (prevProps.current !== this.props.current || prevProps.pageSize !== this.props.pageSize) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ current: this.props.current!, pageSize: this.props.pageSize! })
    }
  }

  handleChange(current: number, pageSize = this.state.pageSize) {
    const sizeChange = pageSize !== this.state.pageSize
    this.setState({ current, pageSize })
    if (this.props.onChange) {
      this.props.onChange(current, pageSize, sizeChange)
    }
  }

  render() {
    const current = this.props.current || this.state.current
    if (this.props.total! < 0) return null

    return <Pagination {...this.props} current={current} pageSize={this.state.pageSize} onChange={this.handleChange} />
  }
}
