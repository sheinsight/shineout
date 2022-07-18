/**
 * cn - 删除确认
 *    -- 设置 removeConfirm 属性来开启删除前确认
 * en - Remove Confirm
 *    -- Set the removeConfirm property to enable confirmation before deleting
 */
import React from 'react'
import { Upload } from 'shineout'

const App: React.FC = () => (
  <Upload.Image
    defaultValue={[{ data: '/images/1_b.jpg' }]}
    action="//jsonplaceholder.typicode.com/posts"
    renderResult={d => d.data}
    onSuccess={(_res, _file, data) => ({ data })}
    removeConfirm="Are you sure to delete it ?"
  />
)

export default App
