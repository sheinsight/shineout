/**
 * cn - 分页
 *    -- 前端分页的情况下, 设置 pagination 显示分页，没有设置 onChange 处理数据的情况下，会自动对数据进行分页
 *    -- pagination 的参数和 Pagination 组件一致
 * en - Pagination
 *   -- Set the pagination property to show the pagination and if not set onChange property, the data is automatically paged.
 *    -- The parameters of pagination are consistent with the Pagination component.
 */
import React from 'react'
import { List, Image } from 'shineout'
import { fetch } from 'doc/data/user'

const { BaseItem } = List

const image = '../../../images/list.png'

class Index extends React.Component {
  constructor() {
    super()
    this.state = {
      loading: false,
      current: 1,
    }

    this.renderItem = this.renderItem.bind(this)
    this.fetchData = this.fetchData.bind(this)
    this.handlePageChange = this.handlePageChange.bind(this)

    this.data = []
  }

  componentDidMount() {
    this.fetchData(1)
  }

  handlePageChange(index) {
    if (index > 10) return
    this.fetchData(index)
  }

  fetchData(current) {
    this.setState({ loading: true })
    fetch.get('List', { current, pageSize: 10 }).then(data => {
      this.data = [...this.data, ...data.data]
      this.setState({
        loading: false,
        current,
      })
    })
  }

  // eslint-disable-next-line class-methods-use-this
  renderItem(rowData) {
    return (
      <BaseItem
        avatar={<Image src={image} />}
        title={rowData.country}
        desc={`From ${rowData.country}. Position in ${rowData.position}. Start datetime ${rowData.start}.`}
        content={`Name: ${rowData.firstName}-${rowData.lastName}. Office in ${rowData.office}`}
      />
    )
  }

  render() {
    const { loading } = this.state
    return (
      <List
        loading={loading}
        keygen="id"
        data={this.data}
        renderItem={this.renderItem}
        format="id"
        pagination={{
          current: this.state.current,
          align: 'right',
          onChange: this.handlePageChange,
          total: 100,
          pageSize: 10,
        }}
      />
    )
  }
}

export default Index
