/**
 * cn - Meta布局
 *    -- 使用 List.Meta 组件，可快速布局
 * en - Meta layout
 *    -- Use List.Meta component to quickly layout
 */
import React from 'react'
import { List } from 'shineout'
import { fetch } from 'doc/data/user'

const { Meta } = List

const image = '../../../images/shein-logo.png'

class Index extends React.Component {
  constructor() {
    super()
    this.state = {
      loading: false,
      // eslint-disable-next-line react/no-unused-state
      current: 1,
    }

    this.fetchData = this.fetchData.bind(this)

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
  renderItem(index, rowData, rowIndex) {
    if (index === 0)
      return (
        <Meta
          avatar={image}
          content={`${rowData.firstName}-${rowData.lastName}: position: ${rowData.position}, country: ${
            rowData.country
          }, office: ${rowData.office}`}
        />
      )
    return (
      <Meta
        avatar={image}
        title={rowData.country}
        desc={`${rowData.firstName}-${rowData.lastName}  rowIndex: ${rowIndex}`}
        content={`${rowData.firstName}-${rowData.lastName}: position: ${rowData.position}, country: ${
          rowData.country
        }, office: ${rowData.office}`}
      />
    )
  }

  render() {
    const { loading } = this.state
    return (
      <div>
        <h2>Base</h2>
        <List key="1" keygen="id" data={this.data} loading={loading} renderItem={this.renderItem.bind(this, 0)} />
        <h2>Layout</h2>
        <List key="2" keygen="id" data={this.data} loading={loading} renderItem={this.renderItem.bind(this, 1)} />
      </div>
    )
  }
}

export default Index
