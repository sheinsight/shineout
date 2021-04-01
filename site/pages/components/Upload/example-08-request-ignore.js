/**
 * cn -
 *    -- 使用 request 略过上传过程
 * en -
 *    -- ignore request with request
 */
import React from 'react'
import { Upload } from 'shineout'

const request = options => {
  const { file, onLoad, onError } = options
  const reader = new FileReader()
  reader.addEventListener('load', () => {
    onLoad({ status: 200, response: reader.result })
  })
  reader.addEventListener('error', () => {
    onError({ statusText: 'Oops, something went wrong' })
  })
  reader.readAsDataURL(file)
}

export default function() {
  return (
    <Upload.Image
      accept="image/*"
      onSuccess={(dataURL, file) => ({ name: file.name, src: dataURL })}
      request={request}
      renderResult={d => d.src}
    />
  )
}
