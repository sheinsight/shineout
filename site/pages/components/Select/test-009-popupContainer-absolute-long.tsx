/**
 * cn - 指定无定位属性容器后，超长下拉菜单是否正常定位
 *    --
 * en -
 *    --  options auto adapt width
 */
import React, { useEffect, useState } from 'react'
import { Select, setConfig } from 'shineout'

type SelectItem = string

const data: SelectItem[] = [
  'red',
  'orange',
  'this option is so long long long long long this option is so long long long long long this option is so long long long long long',
  'green',
  'cyan',
  'blue',
  'violet',
]

const container: React.CSSProperties = {
  padding: 10,
  height: 100,
  width: 300,
  background: '#ebebeb',
  overflow: 'auto',
}

const App: React.FC = () => {
  const [mount, setMount] = useState(false)

  useEffect(() => {
    setConfig({
      popupContainer: document.getElementById('app-root-container') || document.body,
    })

    setMount(true)
  }, [])

  // return <Select keygen absolute autoAdapt style={{ width: 240 }} data={data} defaultValue="" />
  return (
    <>
      <div style={{ width: 200, height: 1000 }} />
      <div style={container} id="app-out-container">
        <section id="relative-app">
          <div style={{ height: 200, width: 500 }} />
          {mount && (
            <Select
              className="select"
              keygen
              absolute
              autoAdapt
              style={{ width: 240, marginLeft: 100 }}
              data={data}
              defaultValue=""
            />
          )}
          <br />
          <div style={{ height: 500 }} />
        </section>

        <div id="app-root-container" />
      </div>
    </>
  )
}

export default App
