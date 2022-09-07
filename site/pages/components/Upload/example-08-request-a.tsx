/**
 * cn - 自定义上传
 *    -- 通过 request 函数，替代默认上传方法
 * en - Custom Request
 *    -- Set request property to use your own XMLHttpRequest.
 */
import React from 'react'
import { Upload, Button, TYPE } from 'shineout'
import FontAwesome from '../Icon/FontAwesome'

type ValueItem = { name: string }
type UploadProps = TYPE.Upload.Props<ValueItem>

const request: UploadProps['request'] = options => {
  const { file, onLoad, onError, onProgress } = options
  const xhr = new XMLHttpRequest()
  xhr.open('post', '//jsonplaceholder.typicode.com/posts')

  const data = new FormData()
  data.append('test', file)
  xhr.upload.onprogress = onProgress
  xhr.onload = () => onLoad(xhr)
  xhr.onerror = () => onError({ statusText: 'error message' })
  xhr.send(data)

  return xhr
}

const App: React.FC = () => (
  <Upload
    accept="image/*"
    onSuccess={(_res, file) => ({ name: `upload ${file.name}` })}
    limit={3}
    style={{ width: 300 }}
    request={request}
    renderResult={d => d.name}
  >
    <Button>
      <FontAwesome name="upload" />
      &nbsp;Upload file
    </Button>
  </Upload>
)

export default App
