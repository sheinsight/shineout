/**
 * cn - 受控组件
 *    -- 同时设置 current 和 onChange 属性，可以作为受控组件使用
 * en - Controlled
 *    -- Set both the current and onChange properties for being used as a controlled component.
 */
import React, { PureComponent } from 'react'
import { Pagination } from 'shineout'

const info = ({ current }) => `Current page ${current}`

export default class extends PureComponent {
  state = {
    current: 1,
    pageSize: 20,
  }

  handleChange = (current, pageSize) => {
    this.setState({ current, pageSize })
  }

  render() {
    const { current, pageSize } = this.state
    return (
      <div>
        <Pagination
          text={{
            prev: 'Previous',
            next: 'Next',
            page: '/ page',
          }}
          current={current}
          onChange={this.handleChange}
          pageSize={pageSize}
          total={1000}
          layout={['links', 'list']}
        />
        <br />
        <Pagination
          current={current}
          onChange={this.handleChange}
          pageSize={pageSize}
          total={1000}
          layout={['links', info]}
        />
      </div>
    )
  }
}
