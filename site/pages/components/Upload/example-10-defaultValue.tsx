/**
 * cn - 默认值
 *    -- 默认值示例
 * en - defaultValue
 *    -- defaultValue example
 */
import React from 'react'
import { Upload, Button } from 'shineout'
import FontAwesome from '../Icon/FontAwesome'

const defaultValue = [
  {
    name: 'test file.png',
    url: require('../../../images/1_s.jpg'),
  },
]
const App: React.FC = () => (
  <div>
    <Upload
      action="//jsonplaceholder.typicode.com/posts"
      accept="image/*"
      multiple
      limit={2}
      name="file"
      onSuccess={(_res, file) => ({ name: file.name })}
      style={{ width: 300, marginBottom: 30 }}
      defaultValue={defaultValue}
      renderResult={f => f.name}
    >
      <Button>
        <FontAwesome name="upload" />
        Upload file
      </Button>
    </Upload>
    <br />
    <Upload.Image
      action="//jsonplaceholder.typicode.com/posts"
      accept="image/*"
      multiple
      name="file"
      canDelete={value => value.name !== defaultValue[0].name}
      recoverAble
      onSuccess={(_res, _file, data) => ({ url: data })}
      renderResult={f => f.url}
      defaultValue={defaultValue}
    />
  </div>
)

export default App
