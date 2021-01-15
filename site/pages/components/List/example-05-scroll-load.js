/**
 * cn - 滚动加载
 *    -- 设置 scrollLoading 属性，当滚动到底部时，会自动调用该属性
 * en - scroll loading
 *    -- Set the scrollLoad property, when the scroll to the bottom, it will automatically call to change the property.
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
    this.scrollLoading = this.scrollLoading.bind(this)

    this.data = []
  }

  componentDidMount() {
    this.fetchData(1)
  }

  scrollLoading() {
    const { current } = this.state
    if (current >= 10) return
    this.fetchData(current + 1)
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
        style={{ maxHeight: 300, overflowY: 'scroll' }}
        scrollLoading={this.scrollLoading}
      />
    )
  }
}

export default Index
