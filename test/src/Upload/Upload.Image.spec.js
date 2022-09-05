import { mount } from 'enzyme'
import React from 'react'
import { Upload } from 'shineout'
import { delay } from '../../utils'
import { uploadFile, mockXhr } from './util'
import { dispatchEvent } from '../../../src/utils/dom/element'

describe('Upload[Image]', () => {
  test('should render image input', async () => {
    const wrapper = mount(<Upload.Image action="//404" />)
    expect(wrapper.find(`.so-upload-image-plus`).length).toBe(1)
  })
  test('upload image', async () => {
    const xhr = mockXhr()
    const img = { width: 200, height: 200 }
    const onChange = jest.fn()
    window.Image = jest.fn().mockImplementation(() => img)
    const wrapper = mount(<Upload.Image action="//404" onChange={onChange} />)
    expect(wrapper.find(`.so-upload-image-plus`).length).toBe(1)
    uploadFile(wrapper, { name: 'test.png' })
    await delay(50)
    img.onload()
    await delay(50)
    xhr.onload({ currentTarget: { response: 'aaa.png', status: 200 } })
    wrapper.update()
    expect(wrapper.find('.so-gap-item').length).toBe(2)
    expect(onChange.mock.calls.length).toBe(1)
    expect(onChange.mock.calls[0][0][0]).toBe('aaa.png')
  })
  it('should validate size', async () => {
    const img = {}
    const onChange = jest.fn()
    window.Image = jest.fn().mockImplementation(() => img)
    const wrapper = mount(
      <Upload.Image
        action="//404"
        onChange={onChange}
        validator={{
          imageSize: i => (i.width !== 200 || i.height !== 100 ? new Error('only allow 200px * 100px') : undefined),
        }}
      />
    )
    expect(wrapper.find(`.so-upload-image-plus`).length).toBe(1)
    uploadFile(wrapper, { name: 'test.png' })
    await delay(50)
    img.onload()
    await delay(50)
    wrapper.update()
    expect(wrapper.find('.so-gap-item').length).toBe(2)
    expect(wrapper.find('.so-upload-error').length).toBe(1)
    expect(wrapper.find('.so-upload-error .so-upload-message').text()).toBe('only allow 200px * 100px')
  })

  it('should render invalid type', async () => {
    const img = {}
    const onChange = jest.fn()
    window.Image = jest.fn().mockImplementation(() => img)
    const wrapper = mount(<Upload.Image action="//404" onChange={onChange} />)
    expect(wrapper.find(`.so-upload-image-plus`).length).toBe(1)
    uploadFile(wrapper, { name: 'test.png' })
    await delay(50)
    img.onerror()
    await delay(50)
    wrapper.update()
    expect(wrapper.find('.so-gap-item').length).toBe(1)
    expect(wrapper.find('.so-upload-url-invalid-indicator').length).toBe(1)
  })

  it('should remove image and recover', async () => {
    const onChange = jest.fn()
    const wrapper = mount(<Upload.Image action="//404" onChange={onChange} defaultValue={['aa.png']} recoverAble />)
    wrapper.find('.so-upload-options-remove').simulate('click')
    await delay(50)
    expect(onChange.mock.calls.length).toBe(1)
    expect(onChange.mock.calls[0][0].length).toBe(0)
    wrapper.update()
    wrapper.find('.so-upload-recover').simulate('click')
    expect(onChange.mock.calls.length).toBe(2)
    expect(onChange.mock.calls[1][0].length).toBe(1)
  })

  it('should image removeConfirm', async () => {
    const onChange = jest.fn()
    const wrapper = mount(
      <Upload.Image action="//404" defaultValue={['b.jpg']} removeConfirm="are you sure" onChange={onChange} />
    )
    jest.useFakeTimers()
    dispatchEvent(wrapper.find('.so-upload-options-remove').instance(), 'click')
    jest.runAllTimers()
    wrapper.update()
    expect(wrapper.find('ShineoutPopoverConfirm').props().visible).toBeTruthy()
    wrapper
      .find('RemoveConfirm')
      .instance()
      .handleRemoveLater()
    jest.runAllTimers()
    jest.useRealTimers()
    await delay(0)
    wrapper.update()
    expect(wrapper.find('.so-upload-delete').length).toBe(0)
    expect(onChange.mock.calls[0][0]).toStrictEqual([])
  })

  it('should default preview', () => {
    jest.useFakeTimers()
    const wrapper = mount(<Upload.Image action="//404" defaultValue={['aa.png']} recoverAble />)
    const preview = jest.fn(wrapper.find('ShineoutImage').instance().preview)
    wrapper.find('ShineoutImage').instance().preview = preview
    wrapper
      .find('.so-upload-options-item')
      .at(0)
      .simulate('click')
    jest.runAllTimers()
    expect(preview.mock.calls.length).toBe(1)
  })

  it('should onPreview', () => {
    const onPreview = jest.fn()
    const wrapper = mount(<Upload.Image action="//404" defaultValue={['aa.png']} recoverAble onPreview={onPreview} />)
    const preview = jest.fn(wrapper.find('ShineoutImage').instance().preview)
    wrapper.find('ShineoutImage').instance().preview = preview
    wrapper
      .find('.so-upload-options-item')
      .at(0)
      .simulate('click')
    expect(onPreview.mock.calls.length).toBe(1)
    expect(onPreview.mock.calls[0].length).toBe(5)
    expect(onPreview.mock.calls[0][0]).toBe('aa.png')
    expect(onPreview.mock.calls[0][1]).toBe('aa.png')
    expect(onPreview.mock.calls[0][2]).toBe(0)
    expect(onPreview.mock.calls[0][3]).toStrictEqual(['aa.png'])
    onPreview.mock.calls[0][4].preview()
    expect(onPreview.mock.calls[0][3]).toStrictEqual(['aa.png'])
    expect(preview.mock.calls.length).toBe(1)
  })
})
