/**
 * cn - 链接
 *    -- 使用链接作为标签
 * en - Link
 *    -- Use link as every tab.
 */
import React from 'react'
import { Tabs } from 'shineout'
import { Link, BrowserRouter } from 'react-router-dom'

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      active: 0,
    }
  }

  handleChange = v => {
    this.setState({ active: v })
  }

  render() {
    return (
      <BrowserRouter>
        <Tabs active={this.state.active} onChange={this.handleChange} shape="line">
          <Tabs.Link href="#tab-href">Href</Tabs.Link>
          <Tabs.Link href="#tab-href" target="_blank">
            Blank
          </Tabs.Link>
          <Tabs.Link>
            <Link to="#tab-link">Link</Link>
          </Tabs.Link>
        </Tabs>
      </BrowserRouter>
    )
  }
}
