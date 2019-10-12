/**
 * cn - 在 Modal 中使用
 *    -- 注意在 Modal 使用 Pagination 的时候需要设置 sizeListProps={{ absoulate: false }} 或者 sizeListProps={{ zIndex: 1051 }}(或者更大的), 否则会出现下拉框被挡住的问题.
 * en - use in Modal
 *    -- Note that when Modal uses Pagination, you need to set sizeListProps={{ absoulate: false }} or sizeListProps={{ zIndex: 1051 }} (or larger), otherwise the drop-down box will be blocked.
 */
import React from 'react'
import { Pagination, Modal, Button } from 'shineout'

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
    }
  }

  render() {
    return (
      <div>
        <Button onClick={() => this.setState({ visible: true })} type="primary">
          modal show
        </Button>
        <Modal visible={this.state.visible} onClose={() => this.setState({ visible: false })}>
          <Pagination
            text={{
              prev: 'Previous',
              next: 'Next',
              page: '/ page',
            }}
            total={100}
            pageSize={50}
            layout={['links', 'list']}
            sizeListProps={{ absolute: false }}
          />
          <Pagination
            text={{
              prev: 'Previous',
              next: 'Next',
              page: '/ page',
            }}
            total={100}
            pageSize={50}
            layout={['links', 'list']}
            sizeListProps={{ zIndex: 1051 }}
          />
        </Modal>
      </div>
    )
  }
}
