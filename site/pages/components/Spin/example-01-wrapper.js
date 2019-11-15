/**
* cn - 包裹容器
     -- 直接把内容内嵌到 Spin 中，将现有容器变为加载状态。
* en - Container
     -- children in Spin
*/
import React from 'react'
import { Spin, Alert, Switch } from 'shineout'

export default class extends React.Component {
  state = {
    loading: true,
  }

  handleChange = v => {
    this.setState({
      loading: v,
    })
  }

  render() {
    const { loading } = this.state
    return (
      <div>
        <Switch value={loading} onChange={this.handleChange} style={{ marginBottom: 20 }} />
        <Spin loading={loading} size={20}>
          <Alert style={{ marginBottom: 0 }}>
            <h3>This is Title</h3>
            Some Content Here...
          </Alert>
        </Spin>
      </div>
    )
  }
}
