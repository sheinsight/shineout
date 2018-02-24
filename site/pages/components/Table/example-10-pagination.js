/**
 * cn - 分页 \n 这个示例展示了如何封装一个带分页的Table
 * en - Fixed column
 */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Table, Pagination } from 'shineout'
import { fetch } from 'doc/data/table'

class TableWithPage extends PureComponent {
  static propTypes = {
    current: PropTypes.number,
    fetchData: PropTypes.func.isRequired,
    pageSize: PropTypes.number,
    total: PropTypes.number,
  }

  static defaultProps = {
    current: 1,
    pageSize: 10,
    total: 0,
  }

  constructor(props) {
    super(props)
    this.state = {
      current: props.current,
      pageSize: props.pageSize,
      total: props.total,
      loading: false,
    }
  }

  componentDidMount() {
    this.fetchData()
  }

  handlePageChange = (current, pageSize) => {
    this.setState({ current, pageSize }, this.fetchData)
  }

  fetchData = () => {
    this.setState({ loading: true })
    this.props.fetchData(this.state).then((res) => {
      this.setState({ data: res.data, loading: false, total: res.total })
    })
  }

  render() {
    const {
      data, current, pageSize, total, loading,
    } = this.state

    return (
      <div>
        <Table {...this.props} style={{ minHeight: 200 }} loading={loading} data={data} />
        <Pagination
          align="center"
          current={current}
          disabled={loading}
          layout={['links', 'list']}
          onChange={this.handlePageChange}
          pageSize={pageSize}
          pageSizeList={[10, 15, 20]}
          total={total}
        />
      </div>
    )
  }
}

const columns = [
  { title: 'id', render: 'id', width: 70 },
  {
    title: 'First Name', group: 'Name', render: 'firstName', width: 100,
  },
  {
    title: 'Last Name', fixed: 'left', group: 'Name', render: 'lastName', width: 100,
  },
  { title: 'Country', render: 'country' },
  { title: 'Position', render: 'position' },
  { title: 'Office', render: 'office' },
  { title: 'Start Date', render: 'start' },
  {
    title: 'Salary',
    fixed: 'right',
    width: 100,
    render: d => `$${d.salary.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}`,
  },
]

export default function () {
  const fetchData = ({ current, pageSize }) => fetch.get('table', { current, pageSize })

  return (
    <TableWithPage
      bordered
      fetchData={fetchData}
      fixed="x"
      keygen="id"
      width={1500}
      columns={columns}
    />
  )
}
