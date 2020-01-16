/**
 * cn - 在 Modal 中使用
 *    -- 在 Modal 中使用Select 的话, 不推荐使用 absolute, 如果需要使用 absolute, 则需要同时设置 zIndex=1051(或者更高)
 * en - use in Modal
 *    -- if use Selct in Modal, not recommended to use absolute. if need, please set zIndex=1051(or higner) too.
 */
import React from 'react'
import { Select, Button, Modal } from 'shineout'

const data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']

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
        <Button type="primary" onClick={() => this.setState({ visible: true })}>
          show modal
        </Button>
        <Modal visible={this.state.visible} onClose={() => this.setState({ visible: false })}>
          <Select
            absolute
            data={data}
            keygen
            style={{ width: 100, marginRight: 12 }}
            onFilter={text => d => d.indexOf(text) > -1}
            placeholder="default"
            zIndex={1051}
          />
        </Modal>
      </div>
    )
  }
}
