/**
 * cn - 全屏
 *    -- 使用 fullScreen 属性来使抽屉全屏展示
 * en - Full Screen
 *    -- Use the fullScreen property to display the Drawer in full screen
 */
import React from 'react'
import { Drawer, Button } from 'shineout'
import Content from '../Form/example-01-base'

export default () => {
  const [visible, setVisible] = React.useState(false)
  const cancel = React.useCallback(() => {
    setVisible(false)
  })
  return (
    <div>
      <Drawer
        title="Profile"
        fullScreen
        visible={visible}
        onClose={cancel}
        footer={
          <Button type="primary" onClick={cancel}>
            OK
          </Button>
        }
      >
        <Content />
      </Drawer>
      <Button onClick={() => setVisible(true)}>Full Screen</Button>
    </div>
  )
}
