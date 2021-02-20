/**
 * cn - 点击空白关闭
 *    -- 默认点击对话框外部空白页面会关闭对话框。
 *    -- 设置 maskCloseAble 属性为 false，禁用点击空白关闭，同时右上角的关闭图标也会隐藏。
 *    -- 设置 maskCloseAble 属性为 null，禁用点击空白关闭，右上角的关闭图标会保留。
 * en - Close
 *    -- By default, clicking on the blank page outside the Modal box will closes the Modal box.
 *    -- Set maskCloseAble to false to disable the function that click mask to close and the close icon in the upper right corner will be hidden at the same time.
 *    -- Set maskCloseAbel to null to disable the function that click mask to close and the close icon in the upper right corner will be preserved.
 */
import React from 'react'
import { Modal, Button, Select } from 'shineout'

const list = [
  {
    title: 'false',
    value: false,
  },
  {
    title: 'true',
    value: true,
  },
  {
    title: 'null',
    value: null,
  },
]
export default () => {
  const [visible, setVisible] = React.useState(false)
  const [selected, setSelected] = React.useState(list[0])
  return (
    <div>
      <Select
        data={list}
        keygen="title"
        renderItem="title"
        prediction={(v, d) => v.title === d.title}
        value={selected}
        onChange={c => {
          setSelected(c)
        }}
        style={{ width: 200, marginRight: 20 }}
      />
      <Button onClick={() => setVisible(true)}>Open</Button>
      <Modal
        visible={visible}
        maskCloseAble={selected.value}
        width={400}
        title="Modal Title"
        onClose={() => setVisible(false)}
        footer={<Button onClick={() => setVisible(false)}>Close</Button>}
      >
        The prop maskCloseAble is &nbsp;
        {selected.title}
        .
        <br />
        You must click the button to close the Modal.
      </Modal>
    </div>
  )
}
