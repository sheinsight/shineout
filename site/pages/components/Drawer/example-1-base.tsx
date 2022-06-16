/**
 * cn - 基本用法
 *    -- 最基本的组件用法。
 *    -- Drawer 会在 document.body 中创建一个新的层显示弹出内容。
 *    -- 关闭 Drawer 时默认没有对组件进行销毁, 只是隐藏, 组件的状态会被保留。 如果不需要保留组件之前的状态, 可以设置 destroy 属性。
 * en - Base
 *    -- The basic usage for component.
 */
import React from 'react'
import { Drawer, Button } from 'shineout'

const App: React.FC = () => (
  <div>
    <Button onClick={this.show}>click me</Button>
    <Drawer
      width={400}
      visible={this.state.visible}
      title="Drawer Title"
      onClose={this.handleCancel}
      footer={[
        <Button key="cancel" onClick={this.handleCancel}>
          Cancel
        </Button>,
        <Button key="ok" type="primary" onClick={this.handleOk}>
          Ok
        </Button>,
      ]}
    >
      {`you are visited ${this.state.content}`}
    </Drawer>
  </div>
)

export default App
