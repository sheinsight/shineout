/**
 * cn - 加载中
 *    -- 表示还在执行中
 * en - loading
 *    -- still in progress
 */
import React from 'react'
import { Switch } from 'shineout'

const App: React.FC = () => (
  <>
    <div>
      <Switch size="small" loading />
      <Switch style={{ marginLeft: 6 }} size="small" loading defaultValue />

      <br />

      <Switch loading />
      <Switch style={{ marginLeft: 6 }} loading defaultValue />

      <br />

      <Switch size="large" loading />
      <Switch style={{ marginLeft: 6 }} size="large" loading defaultValue />
    </div>
  </>
)

export default App
