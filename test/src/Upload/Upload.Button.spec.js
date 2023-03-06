import { mount } from 'enzyme'
import React from 'react'
import { Upload } from 'shineout'
import { delay } from '../../utils'
import { uploadFile, mockXhr } from './util'
import UploadButton from '../../../site/pages/components/Upload/example-03-button'

describe('Upload[Button]', () => {
  test('should render button and progress', () => {
    const wrapper = mount(<UploadButton />)
    const type = wrapper.find('Progress').prop('type')
    expect(wrapper.find('ShineoutButton').length).toBe(1)
    expect(wrapper.find(`.so-button-${type}`).length).toBe(1)
  })

  it('should renderProgress when upload', async () => {
    const wrapper = mount(<UploadButton />)
    const xhr = mockXhr()
    uploadFile(wrapper, { name: 'test.doc' })
    await delay(100)
    wrapper.update()
    xhr.upload.progress({ percent: 50 })
    expect(wrapper.find('.so-upload-bg').getDOMNode().style.right).toBe('50%')
    // for cover
    wrapper.find('button').simulate('click')
  })

  it('should onError', async () => {
    const onHttpError = jest.fn()
    const wrapper = mount(<Upload.Button action="//404" onHttpError={onHttpError} />)
    const xhr = mockXhr()
    uploadFile(wrapper, { name: 'test.doc' })
    await delay(100)
    wrapper.update()
    xhr.onerror({ statusText: '上传失败' })
    expect(onHttpError.mock.calls.length).toBe(1)
  })

  it('onsucccess', async () => {
    const onSuccess = jest.fn(res => {
      if (res === 'error') return new Error('error from success')
      return 'success'
    })
    const wrapper = mount(
      <Upload.Button action="//404" params={{ from: 'test' }} withCredentials onSuccess={onSuccess} />
    )
    const xhr = mockXhr()
    uploadFile(wrapper, { name: 'test.doc' })
    await delay(50)
    xhr.onload({ currentTarget: { response: 'error', status: 200 } })
    wrapper.update()
    expect(onSuccess.mock.calls.length).toBe(1)
    expect(onSuccess.mock.calls[0].length).toBe(4)
    uploadFile(wrapper, { name: 'test.doc' })
    await delay(50)
    xhr.onload({ currentTarget: { response: 'aaa', status: 200 } })
    wrapper.update()
    expect(onSuccess.mock.calls.length).toBe(2)
  })
})
