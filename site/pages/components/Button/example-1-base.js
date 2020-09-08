/**
 * cn - 基本用法
 *    -- Button 内置了几种常用的类型，分为默认(default), 主要(primary), 次要(secondary), 成功(success), 警告(warning), 危险(danger)和链接(link)
 * en - Base
 *    -- Button has several built-in type, default, primary, secondary, success, warning, dange, and link.
 */
import React from 'react'
import { Table, Button } from 'shineout'
// import { Modal } from 'antd'
import { Modal } from 'shineout'
import 'antd/dist/antd.css'

// class C extends React.Component {
//   componentDidMount() {
//     console.log(this.el.getBoundingClientRect().height)
//   }

//   render() {
//     return (
//       <div ref={r => (this.el = r)}>
//         hello
//         <br />
//         world
//       </div>
//     )
//   }
// }
const C = () => {
  const ref = React.createRef()
  React.useEffect(() => {
    console.log(ref.current.getBoundingClientRect().height)
  }, [])
  return (
    <div ref={r => (ref.current = r)}>
      hello
      <br />
      world
    </div>
  )
}
export default function App() {
  const [v, setV] = React.useState(false)
  const modalColumns = [
    {
      title: 'SKC',
      render: 'skc',
      width: 100,
    },
    {
      title: '商品数量',
      render: 'num',
      width: 80,
    },
  ]

  const data = [
    { skc: '21', num: 1 },
    { skc: '214', num: 4 },
    { skc: '21123344', num: 4 },
    { skc: '21123342', num: 4 },
    { skc: '21123341', num: 4 },
  ]
  return (
    <div className="App">
      <Button onClick={() => setV(true)}>Modal</Button>
      {/* <Table fixed="both" keygen="skc" bordered style={{ height: 300 }} columns={modalColumns} data={data} /> */}

      <Modal
        destroy
        destroyOnClose
        visible={v}
        zIndex={999}
        footer={null}
        width={400}
        onCancel={() => setV(false)}
        onClose={() => setV(false)}
      >
        {
          <div>
            <C />
            <Table fixed="both" keygen="skc" bordered style={{ height: 300 }} columns={modalColumns} data={data} />
          </div>
        }
      </Modal>
    </div>
  )
}
