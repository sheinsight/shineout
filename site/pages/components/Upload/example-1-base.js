/**
 * cn - 基本用法
 * en - Base
 */
import React, { Fragment } from 'react'
import { Upload, Button } from 'shineout'

const defaultValue = [{ name: 'xxx.jpg' }]

export default function () {
  return (
    <Fragment>
      <Upload
        name="file"
        action="/upload/"
        onUpload={(v) => {
          const json = JSON.parse(v)
          return json.model
        }}
        defaultValue={defaultValue}
        renderResult={v => v.name}
      >
        <Button>Upload file</Button>
      </Upload>
    </Fragment>
  )
}
