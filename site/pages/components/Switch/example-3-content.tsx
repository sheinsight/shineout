/**
 * cn - 内容
 *    -- 为每个状态添加描述
 * en - Base
 *    -- Description for every status.
 */
import React from 'react'
import { Switch } from 'shineout'
import FontAwesome from '../Icon/FontAwesome'

const App: React.FC = () => (
  <div>
    <Switch defaultValue content={['开', '关']} />

    <br />

    <Switch content={[<FontAwesome name="btc" />, <FontAwesome name="yen" />]} />
  </div>
)

export default App
