/**
 * cn -
 *    -- 此事例演示通过自定义函数压缩文件后上传
 * en -
 *    -- Zip file and upload.
 */
import React from 'react'
import { Upload, Button } from 'shineout'
import FontAwesome from '../Icon/FontAwesome'

const request = options => {
  const { file, onLoad, onError, onProgress } = options

  const xhr = new XMLHttpRequest()
  xhr.open('post', '//jsonplaceholder.typicode.com/posts')

  const zip = new window.JSZip()
  zip.file(file.name, file)
  zip
    .generateInternalStream({ type: 'blob' })
    .accumulate(e => {
      onProgress(e, 'zipping...')
    })
    .then(content => {
      const zipFile = new File([content], `${file.name}.zip`)
      const data = new FormData()
      data.append('file', zipFile)
      xhr.upload.onprogress = m => onProgress(m, 'sending...')
      xhr.onload = () => onLoad(xhr)
      xhr.onerror = () => onError({ statusText: 'error message' })
      xhr.send(data)
    })

  return xhr
}

export default function() {
  return (
    <Upload
      onSuccess={(res, file) => ({ name: `upload ${file.name}` })}
      limit={3}
      style={{ width: 300 }}
      request={request}
      renderResult={d => d.name}
    >
      <Button>
        <FontAwesome name="upload" /> Upload file
      </Button>
    </Upload>
  )
}
