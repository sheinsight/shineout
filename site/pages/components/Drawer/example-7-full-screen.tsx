/**
 * cn - 全屏
 *    -- 使用 fullScreen 属性来使抽屉全屏展示
 * en - Full Screen
 *    -- Use the fullScreen property to display the Drawer in full screen
 */
import React, { useState, useCallback } from 'react'
import { Drawer, Button, TYPE } from 'shineout'
import Content from '../Form/example-01-base'

type DrawerProps = TYPE.Drawer.Props
type DrawerFooter = DrawerProps['footer']
type DrawerOnClose = DrawerProps['onClose']

const App: React.FC = () => {
  const [visible, setVisible] = useState(false)

  const cancel: DrawerOnClose = useCallback(() => {
    setVisible(false)
  }, [])

  const renderFooter = (): DrawerFooter => (
    <Button type="primary" onClick={cancel}>
      OK
    </Button>
  )

  return (
    <div>
      <Drawer title="Profile" fullScreen visible={visible} onClose={cancel} footer={renderFooter()}>
        <Content />
      </Drawer>

      <Button onClick={() => setVisible(true)}>Full Screen</Button>
    </div>
  )
}

export default App
