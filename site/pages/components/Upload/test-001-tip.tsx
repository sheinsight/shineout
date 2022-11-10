/**
 * cn - Tip不恢复问题
 *    -- 修复删除错误后Tip不恢复的问题
 */
import React from 'react'
import { Upload, Button, Form } from 'shineout'
import FontAwesome from '../Icon/FontAwesome'

let index = 0
export default () => (
  <Form>
    <Form.Item tip="hello world">
      <Upload
        rules={[{ required: true, message: '想啥呢，你没传文件！' }]}
        action="/upload-test"
        accept="image/*"
        name="file"
        validator={{
          customValidator: () => {
            index += 1
            if (index % 2 !== 0) return new Error('错误')
            return undefined
          },
        }}
        onSuccess={(_res, file) => file.name}
        onChange={v => {
          console.log(v)
        }}
        style={{ width: 300 }}
      >
        <Button>
          <FontAwesome name="upload" style={{ marginInlineEnd: 4 }} />
          Upload file
        </Button>
      </Upload>
    </Form.Item>
    <Form.Item>
      <Form.Submit>Submit</Form.Submit>
      <Form.Reset>Reset</Form.Reset>
    </Form.Item>
  </Form>
)
