/**
 * cn - 加载更多
 *    -- 通过使用 footer 属性，可实现加载更多功能
 * en - Load more
 *    -- Through use the footer attribute, you can load more functions.
 */
import React from 'react'
import { List, Button } from 'shineout'
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
    this.renderFooter = this.renderFooter.bind(this)
    this.onClick = this.onClick.bind(this)
    this.fetchData = this.fetchData.bind(this)

    this.data = []
  }

  componentDidMount() {
    this.fetchData(1)
  }

  onClick() {
    const { loading, current } = this.state
    if (loading) return
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
    return <BaseItem avatar={image} desc={`From ${rowData.country}. Name: ${rowData.firstName}-${rowData.lastName}`} />
  }

  renderFooter() {
    const { loading } = this.state
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 16,
          lineHeight: '22px',
        }}
      >
        <Button size="small" loading={loading} onClick={this.onClick}>
          load more
        </Button>
      </div>
    )
  }

  render() {
    return <List keygen="id" data={this.data} renderItem={this.renderItem} footer={this.renderFooter} />
  }
}

export default Index
