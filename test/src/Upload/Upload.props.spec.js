import React from 'react'
import { mount } from 'enzyme'
import { Upload } from 'shineout'
import { delay } from '../../utils'
import { dispatchEvent } from '../../../src/utils/dom/element'

import { uploadFile, mockXhr } from './util'

describe('Upload[forceAccept, forceAcceptErrorMsg]', () => {
  it('should forceAccept', async () => {
    jest.useRealTimers()
    const wrapper = mount(<Upload action="//jsonplaceholder.typicode.com/posts" forceAccept="image/*" name="file" />)
    uploadFile(wrapper, { name: 'fool.txt' })
    await delay(200)
    wrapper.update()
    expect(wrapper.find('.so-upload-error').length).toBe(1)
    expect(wrapper.find('.so-upload-error').text()).toBe(' fool.txt (Invalid file format) ')
  })
  it('should forceAcceptErrorMsg', async () => {
    jest.useRealTimers()
    const wrapper = mount(
      <Upload
        action="//jsonplaceholder.typicode.com/posts"
        forceAccept="image/*"
        name="file"
        forceAcceptErrorMsg="error file"
      />
    )
    uploadFile(wrapper, { name: 'fool.txt' })
    await delay(200)
    wrapper.update()
    expect(wrapper.find('.so-upload-error').length).toBe(1)
    expect(wrapper.find('.so-upload-error').text()).toBe(' fool.txt (error file) ')
  })
})

describe('Upload[beforeCancel]', () => {
  it('should call beforeCancel when cancel file', async () => {
    jest.useRealTimers()
    const beforeCancel = jest.fn()
    const wrapper = mount(
      <Upload
        beforeCancel={beforeCancel}
        action="//jsonplaceholder.typicode.com/posts"
        forceAccept="image/*"
        name="file"
      />
    )
    uploadFile(wrapper, { name: 'fool.txt' })
    await delay(200)
    wrapper.update()
    expect(wrapper.find('.so-upload-delete').length).toBe(1)
    wrapper.find('.so-upload-delete').simulate('click')
    wrapper.update()
    expect(beforeCancel.mock.calls.length).toBe(1)
    expect(wrapper.find('.so-upload-delete').length).toBe(0)
  })
})

describe('Upload[beforeRemove, onChange]', () => {
  it('should call beforeRemove  when remove value', async () => {
    jest.useRealTimers()
    let time = 0
    const beforeRemove = jest.fn(() => {
      if (time === 0) {
        time = 1
        return Promise.reject()
      }
      return Promise.resolve()
    })
    const onChange = jest.fn()
    const wrapper = mount(
      <Upload
        beforeRemove={beforeRemove}
        onChange={onChange}
        action="//jsonplaceholder.typicode.com/posts"
        defaultValue={['aaa.png']}
        forceAccept="image/*"
        name="file"
      />
    )

    expect(wrapper.find('.so-upload-delete').length).toBe(1)
    // 第一次点删除 reject
    wrapper.find('.so-upload-delete').simulate('click')
    await delay(200)
    expect(beforeRemove.mock.calls.length).toBe(1)
    expect(onChange.mock.calls.length).toBe(0)

    // 第二次删除resolve
    wrapper.find('.so-upload-delete').simulate('click')
    await delay(200)

    expect(beforeRemove.mock.calls.length).toBe(2)
    expect(onChange.mock.calls.length).toBe(1)

    wrapper.update()
    expect(wrapper.find('.so-upload-delete').length).toBe(0)
  })
})

describe('Upload[canDelete]', () => {
  it('should judge canDelete when is function', () => {
    const wrapper = mount(
      <Upload
        action="//jsonplaceholder.typicode.com/posts"
        accept="image/*"
        name="file"
        canDelete={value => value === '1.png'}
        defaultValue={['1.png', '2.png']}
      />
    )

    expect(wrapper.find('.so-upload-view-value').length).toBe(2)
    expect(wrapper.find('.so-upload-delete').length).toBe(1)
    expect(
      wrapper
        .find('.so-upload-view-value')
        .at(0)
        .find('.so-upload-delete').length
    ).toBe(1)
    expect(
      wrapper
        .find('.so-upload-view-value')
        .at(1)
        .find('.so-upload-delete').length
    ).toBe(0)
  })

  it('should not delete when is false', () => {
    const wrapper = mount(
      <Upload
        action="//jsonplaceholder.typicode.com/posts"
        accept="image/*"
        name="file"
        canDelete={false}
        defaultValue={['1.png', '2.png']}
      />
    )

    expect(wrapper.find('.so-upload-view-value').length).toBe(2)
    expect(wrapper.find('.so-upload-delete').length).toBe(0)
  })
})

describe('Upload[children, className,  style, multiple, webkitdirectory]', () => {
  const wrapper = mount(
    <Upload
      action="//jsonplaceholder.typicode.com/posts"
      accept="image/*"
      name="file"
      className="test"
      style={{ color: 'red' }}
    >
      <span>上传文件不</span>
    </Upload>
  )
  it('should render className, multiple', () => {
    expect(wrapper.find('.so-upload').hasClass('test')).toBeTruthy()
  })
  it('should render style', () => {
    expect(wrapper.find('.so-upload').getDOMNode().style.color).toBe('red')
  })
  it('should render children', () => {
    expect(wrapper.find('.so-upload-handle').text()).toBe('上传文件不')
  })
  it('should render multiple', () => {
    expect(
      wrapper
        .find('input')
        .getDOMNode()
        .getAttribute('multiple')
    ).toBe(null)
    wrapper.setProps({ multiple: true })
    wrapper.update()
    expect(
      wrapper
        .find('input')
        .getDOMNode()
        .getAttribute('multiple')
    ).toBe('')
  })
})

describe('Upload[disabled]', () => {
  const mockClickHandler = jest.fn()
  it('should disabled', () => {
    const wrapper = mount(
      <Upload action="//jsonplaceholder.typicode.com/posts" accept="image/*" name="file" disabled>
        <span>上传文件</span>
      </Upload>
    )
    const upload = wrapper.find('Upload').instance()
    upload.input.click = mockClickHandler
    expect(wrapper.find('.so-upload-handle').hasClass('so-upload-disabled')).toBeTruthy()
    wrapper.find('.so-upload-handle').simulate('click')
    expect(mockClickHandler.mock.calls.length).toBe(0)
  })
  it('should not disabled', () => {
    const wrapper = mount(
      <Upload action="//jsonplaceholder.typicode.com/posts" accept="image/*" name="file" disabled={false}>
        <span>上传文件</span>
      </Upload>
    )
    const upload = wrapper.find('Upload').instance()
    upload.input.click = mockClickHandler
    expect(wrapper.find('.so-upload-handle').hasClass('so-upload-disabled')).toBeFalsy()
    wrapper.find('.so-upload-handle').simulate('click')
    expect(mockClickHandler.mock.calls.length).toBe(1)
  })
})

describe('Upload[drop onStart]', () => {
  const onStart = jest.fn()
  const wrapper = mount(
    <Upload action="//jsonplaceholder.typicode.com/posts" name="file" onStart={onStart} drop>
      <div>drop here</div>
    </Upload>
  )
  it('should render drop class', () => {
    wrapper
      .find('.so-upload span')
      .at(0)
      .simulate('dragover', {
        type: 'dragover',
      })
    expect(wrapper.find('.so-upload .so-upload-drop').length).toBe(1)
  })

  it('should upload file', async () => {
    const file = new File(['content'], 'test.txt')
    wrapper
      .find('.so-upload span')
      .at(0)
      .simulate('drop', {
        type: 'drop',
        dataTransfer: { files: [file] },
      })
    await delay(200)
    expect(onStart.mock.calls.length).toBe(1)
  })
})

describe('filesFilter', () => {
  it('should filter files', async () => {
    const filesFilter = jest.fn(files => files.filter(file => file.name.endsWith('png')))
    const onStart = jest.fn()
    const wrapper = mount(
      <Upload action="//jsonplaceholder.typicode.com/posts" name="file" filesFilter={filesFilter} onStart={onStart}>
        <div>upload</div>
      </Upload>
    )
    const files = [new File(['content'], '1.png'), new File(['content'], '2.png'), new File(['content'], '3.txt')]
    wrapper.find('input').simulate('change', {
      target: {
        files,
      },
    })
    await delay(200)
    expect(filesFilter.mock.calls.length).toBe(1)
    expect(filesFilter.mock.calls[0][0]).toStrictEqual(files)
    expect(onStart.mock.calls.length).toBe(2)
  })
})

describe('upload[headers htmlName, params, responseType, withCredentials]', () => {
  it('should setHeader  ', async () => {
    const xhr = mockXhr()
    const wrapper = mount(
      <Upload
        headers={{ 'Content-Type': 'application/json' }}
        htmlName="fill"
        action="//404"
        params={{ from: 'test' }}
        responseType="json"
        withCredentials
      />
    )
    const files = [new File(['content'], '1.png')]
    wrapper.find('input').simulate('change', {
      target: {
        files,
      },
    })
    await delay(200)
    expect(xhr.setRequestHeader.mock.calls.length).toBe(1)
    expect(xhr.setRequestHeader.mock.calls[0][0]).toBe('Content-Type')
    expect(xhr.setRequestHeader.mock.calls[0][1]).toBe('application/json')

    expect(xhr.send.mock.calls.length).toBe(1)
    expect(xhr.send.mock.calls[0][0].get('from')).toBe('test')
    expect(xhr.send.mock.calls[0][0].get('fill')).toBeTruthy()

    expect(xhr.withCredentials).toBe(true)
    expect(xhr.responseType).toBe('json')
  })
})

describe('Upload[limit]', () => {
  it('should limit upload number', () => {
    const wrapper = mount(
      <Upload
        action="//jsonplaceholder.typicode.com/posts"
        value={['aaa.png']}
        onChange={() => {}}
        forceAccept="image/*"
        name="file"
        limit={2}
      >
        <span>上传</span>
      </Upload>
    )
    expect(wrapper.find('.so-upload-handle').length).toBe(1)
    wrapper.setProps({ value: ['aaa.png', 'bbb.png'] })
    wrapper.update()
    expect(wrapper.find('.so-upload-handle').length).toBe(0)
  })
})

describe('Upload[onHttpError, onErrorRemove, onSuccess]', () => {
  const onError = jest.fn(x => {
    if (!x.statusText) return 'error1'
    return ''
  })
  const onErrorRemove = jest.fn()
  const wrapper = mount(<Upload action="//404" onHttpError={onError} onErrorRemove={onErrorRemove} />)

  it('should  onHttpError', async () => {
    const xhr = mockXhr()
    uploadFile(wrapper, { name: 'test.doc' })
    await delay(50)
    xhr.onerror({ statusText: 'test error' })
    wrapper.update()
    expect(onError.mock.calls.length).toBe(1)
    expect(onError.mock.calls[0][0].statusText).toBe('test error')
    expect(wrapper.find('.so-upload-error .so-upload-text').text()).toBe(' test.doc (test error) ')
  })
  it('should remove error', () => {
    // 依赖上一步
    wrapper.find('.so-upload-error .so-upload-delete').simulate('click')
    expect(onErrorRemove.mock.calls.length).toBe(1)
    wrapper.update()
    expect(wrapper.find('.so-upload-error').length).toBe(0)
  })
  it('should show error1', async () => {
    const xhr = mockXhr()
    uploadFile(wrapper, { name: 'test.doc' })
    await delay(100)
    xhr.onerror({ statusText: '' })
    wrapper.update()
    expect(wrapper.find('.so-upload-error .so-upload-text').text()).toBe(' test.doc (error1) ')
  })
})

describe('Upload, success', () => {
  const onSuccess = jest.fn(res => {
    if (res === 'error') return new Error('error from success')
    return 'success'
  })
  const wrapper = mount(<Upload action="//404" params={{ from: 'test' }} withCredentials onSuccess={onSuccess} />)

  it('should return error', async () => {
    const xhr = mockXhr()
    uploadFile(wrapper, { name: 'test.doc' })
    await delay(50)
    xhr.onload({ currentTarget: { response: 'error', status: 200 } })
    wrapper.update()
    expect(onSuccess.mock.calls.length).toBe(1)
    expect(onSuccess.mock.calls[0].length).toBe(4)
    expect(wrapper.find('.so-upload-error').length).toBe(1)
    expect(wrapper.find('.so-upload-error .so-upload-text').text()).toBe(' test.doc (error from success) ')
  })

  it('should return success', async () => {
    const xhr = mockXhr()
    uploadFile(wrapper, { name: 'test.doc' })
    await delay(50)
    xhr.onload({ currentTarget: { response: 'aaa', status: 200 } })
    wrapper.update()
    expect(wrapper.find('.so-upload-view-value').length).toBe(1)
    expect(wrapper.find('.so-upload-view-value .so-upload-text').text()).toBe('success')
  })
})
describe('Upload[recoverAble, removeConfirm]', () => {
  const onChange = jest.fn()
  const wrapper = mount(
    <Upload action="//404" defaultValue={['b.jpg']} recoverAble removeConfirm="are you sure" onChange={onChange}>
      <span>上传</span>
    </Upload>
  )
  it('should confirm', async () => {
    jest.useFakeTimers()
    dispatchEvent(wrapper.find('.so-upload-delete').instance(), 'click')
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

    // recoverAble
    expect(wrapper.find('.so-upload-recover').length).toBe(1)
    wrapper.find('.so-upload-recover').simulate('click')
    expect(onChange.mock.calls[1][0]).toStrictEqual(['b.jpg'])
  })
})
describe('Upload[renderResult]', () => {
  it('should  renderContent', () => {
    const wrapper = mount(
      <Upload action="//404" defaultValue={[{ name: 'a.png' }]} renderResult={i => <span>{i.name}</span>} />
    )
    expect(wrapper.find('.so-upload-view-value .so-upload-text').text()).toBe('a.png')
  })
})
describe('Upload[renderContent]', () => {
  // 这个属性是Image的
  it('should render image content', () => {
    const wrapper = mount(
      <Upload.Image
        action="//404"
        defaultValue={[{ name: 'a.png' }]}
        renderResult={item => item.name}
        renderContent={res => <span className="custom-content">{res}</span>}
      />
    )
    expect(wrapper.find('.custom-content').text()).toBe('a.png')
  })
})
describe('Upload[showUploadList]', () => {
  it('should not show uploadList', async () => {
    const wrapper = mount(<Upload action="//404" defaultValue={['a.png']} showUploadList={false} />)
    expect(wrapper.find('.so-upload-view-value').length).toBe(0)
  })
})
describe('Upload[request]', () => {
  it('should use custom request', async () => {
    const request = jest.fn(options => {
      const { file, onLoad } = options
      onLoad({ status: 200, response: file.name })
    })
    const wrapper = mount(
      <Upload
        accept="image/*"
        onSuccess={(dataURL, file) => ({ name: file.name, src: dataURL })}
        request={request}
        renderResult={d => d.src}
      />
    )
    uploadFile(wrapper, { name: 'test.doc' })
    await delay(0)
    expect(request.mock.calls.length).toBe(1)
  })
})
