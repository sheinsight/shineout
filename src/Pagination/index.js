import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Pagination from './Pagination'

export default class extends PureComponent {
  static displayName = 'ShineoutPagination'

  static propTypes = {
    current: PropTypes.number,
    defaultCurrent: PropTypes.number,
    onChange: PropTypes.func,
    pageSize: PropTypes.number,
    total: PropTypes.number,
  }

  static defaultProps = {
    defaultCurrent: 1,
    pageSize: 10,
    total: 0,
  }

  constructor(props) {
    super(props)
    this.state = {
      current: props.current || props.defaultCurrent,
      pageSize: props.pageSize,
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(current, pageSize = this.state.pageSize) {
    this.setState({ current, pageSize })
    if (this.props.onChange) {
      this.props.onChange(current, pageSize)
    }
  }

  render() {
    const current = this.props.current || this.state.current
    if (this.props.total < 0) return null

    return (
      <Pagination
        {...this.props}
        current={current}
        pageSize={this.state.pageSize}
        onChange={this.handleChange}
      />
    )
  }
}
