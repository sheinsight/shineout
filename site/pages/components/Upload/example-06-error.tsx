/**
 * cn - 异常处理
 *    -- onHttpError 用来处理上传到服务器返回的异常
 * en - Error
 *    -- Set onHttpError to handle exceptions returned by uploading to the server.
 */
import React from 'react'
import { Upload, Button } from 'shineout'
import FontAwesome from '../Icon/FontAwesome'

const App: React.FC = () => (
  <div>
    <Upload
      action="/path-no-exist"
      accept="image/*"
      name="file"
      onSuccess={(_res, file) => file.name}
      onHttpError={xhr => {
        console.log(xhr)
        if (xhr.status === 404) return 'Url not found.'
        return 'Upload Fail.'
      }}
      limit={3}
      style={{ width: 300, marginBottom: 30 }}
    >
      <Button>
        <FontAwesome name="upload" />
        Upload file
      </Button>
    </Upload>

    <Upload.Image
      action="/path-no-exist"
      accept="image/*"
      name="file"
      onSuccess={(_res, _file, data) => ({ data })}
      onHttpError={xhr => {
        console.log(xhr)
        if (xhr.status === 404) return 'Url not found.'
        return 'Upload Fail.'
      }}
      renderResult={f => f.data}
    />
  </div>
)

export default App
