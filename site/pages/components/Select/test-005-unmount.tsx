/**
 * cn - 组件挂载时检查容器是否存在
 *    -- 检查容器存活，如果不存在容器，则重新创建容器
 * en -
 *    --
 */
import React, { useEffect, useState } from 'react'
import { Select, Button } from 'shineout'

const data: string[] = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']

const App: React.FC = () => {
  const [show, setSpen] = useState(true)
  useEffect(() => {
    const container = document.getElementsByClassName('so-list-root')
    document.body.removeChild(container[0])
  }, [])
  return (
    <div>
      <Button id="mount" onClick={() => setSpen(!show)}>
        show/Close
      </Button>
      {show && <Select absolute keygen style={{ width: 240 }} data={data} defaultValue="" />}
    </div>
  )
}

export default App
