/**
 * cn - List.BaseItem 布局
 *    -- 使用 List.BaseItem 组件，可使用经典布局方式快速布局
 * en - List.BaseItem layout
 *    -- Use List.BaseItem component to quickly layout
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
      // eslint-disable-next-line react/no-unused-state
      current: 1,
    }

    this.fetchData = this.fetchData.bind(this)
    this.renderItem = this.renderItem.bind(this)

    this.data = []
  }

  componentDidMount() {
    this.fetchData(1)
  }

  fetchData(current) {
    this.setState({ loading: true })
    fetch.get('List', { current, pageSize: 10 }).then(data => {
      this.data = [...this.data, ...data.data]
      this.setState({
        loading: false,
        // eslint-disable-next-line react/no-unused-state
        current,
      })
    })
  }

  // eslint-disable-next-line class-methods-use-this
  renderItem(rowData) {
    return (
      <BaseItem
        avatar={image}
        content={`${rowData.firstName}-${rowData.lastName}: position: ${rowData.position}, country: ${
          rowData.country
        }, office: ${rowData.office}`}
        desc={`From ${rowData.country}. Position in ${rowData.position}. Start datetime ${rowData.start}.`}
        extra={[
          <Button type="primary" text>
            edit
          </Button>,
          <Button type="primary" text>
            more
          </Button>,
        ]}
      />
    )
  }

  render() {
    const { loading } = this.state
    return <List key="1" keygen="id" data={this.data} loading={loading} renderItem={this.renderItem} />
  }
}

export default Index
