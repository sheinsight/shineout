/**
 * cn - 组合
 *    -- 一组 Button 可以用 Button.Group 容器中，按钮样式通过 Button.Gorup 的 size, type, outline 属性设置
 * en - Group
 *    -- A series of buttons can group by Button.Group, set styles by Button.Group's size, type, and outline property.
 */
import React from 'react'
import { Button, config } from 'shineout'
import FontAwesome from '../Icon/FontAwesome'

const isRtl = config.direction === 'rtl'

const App: React.FC = () => (
  <div>
    <Button.Group>
      <Button>Start</Button>
      <Button>Center</Button>
      <Button>End</Button>
    </Button.Group>

    <br />

    <Button.Group outline type="primary">
      <Button>Start</Button>
      <Button>Center</Button>
      <Button>End</Button>
    </Button.Group>

    <br />
    <Button.Group outline type="primary">
      <Button disabled>Start</Button>
      <Button disabled>Center</Button>
      <Button>End</Button>
    </Button.Group>

    <br />

    <Button.Group type="primary">
      <Button>
        <FontAwesome name={isRtl ? 'angle-right' : '"angle-left"'} style={{ marginInlineEnd: 4 }} />
        Start
      </Button>
      <Button>Center</Button>
      <Button>
        End
        <FontAwesome name={isRtl ? 'angle-left' : '"angle-right"'} style={{ marginInlineStart: 4 }} />
      </Button>
    </Button.Group>

    <br />

    <Button.Group size="large">
      <Button>Start</Button>
      <Button>Center</Button>
      <Button>End</Button>
    </Button.Group>
  </div>
)

export default App
