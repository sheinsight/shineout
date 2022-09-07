/**
 * cn - 链接
 *    -- 使用链接作为标签
 * en - Link
 *    -- Use link as every tab.
 */
import React, { useState } from 'react'
import { Tabs, TYPE } from 'shineout'
import { Link, BrowserRouter } from 'react-router-dom'

type TabsProps = TYPE.Tabs.Props
type TabsOnChange = TabsProps['onChange']

const App: React.FC = () => {
  const [active, setActive] = useState(0)

  const handleChange: TabsOnChange = v => setActive(v)

  return (
    <BrowserRouter>
      <Tabs active={active} onChange={handleChange} shape="line">
        <Tabs.Link href="#tab-href">Href</Tabs.Link>

        <Tabs.Link href="#tab-href" target="_blank">
          Blank
        </Tabs.Link>

        <Tabs.Link>
          <Link to="#tab-link">Link</Link>
        </Tabs.Link>
      </Tabs>
    </BrowserRouter>
  )
}

export default App
