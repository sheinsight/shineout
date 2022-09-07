/**
* cn - 包裹容器
     -- 直接把内容内嵌到 Spin 中，将现有容器变为加载状态。
* en - Container
     -- children in Spin
*/
import React, { useState } from 'react'
import { Spin, Alert, Switch, TYPE } from 'shineout'

type SpinProps = TYPE.Spin.Props
type SpinLoading = SpinProps['loading']

type SwitchProps = TYPE.Switch.Props
type SwitchOnChange = SwitchProps['onChange']

const App: React.FC = () => {
  const [loading, setLoading] = useState<SpinLoading>(false)

  const handleChange: SwitchOnChange = v => setLoading(v)

  return (
    <div>
      <Switch value={loading} onChange={handleChange} style={{ marginBottom: 20 }} />
      <Spin loading={loading} size={20}>
        <Alert style={{ marginBottom: 0 }}>
          <h3>This is Title</h3>
          Some Content Here...
        </Alert>
      </Spin>
    </div>
  )
}

export default App
