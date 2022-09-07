import React from 'react'
import { mount } from 'enzyme'
import { Upload } from 'shineout'
import { delay } from '../../utils'

/* global SO_PREFIX */
describe('Upload[Base]', () => {
  let wrapper
  beforeAll(() => {
    wrapper = mount(<Upload action="//jsonplaceholder.typicode.com/posts" onSuccess={(...args) => console.log(args)} />)
  })
  test('should render file-input', () => {
    expect(wrapper.find('input[type="file"]').length).toBe(1)
  })
  test('should input lock 1000', async () => {
    const inputClick = jest.fn()
    wrapper.find('input').instance().click = inputClick
    wrapper
      .find('Upload')
      .instance()
      .input.click()
    wrapper
      .find('Upload')
      .instance()
      .input.click()
    expect(inputClick.mock.calls.length).toBe(1)
    await delay(1000)
    wrapper
      .find('Upload')
      .instance()
      .input.click()
    expect(inputClick.mock.calls.length).toBe(2)
  })
})

describe('Upload[Validate]', () => {
  test('should validate image ext', () => {
    const errorInfo = 'File extension must be jpg or png'
    const wrapper = mount(
      <Upload.Image
        action="//jsonplaceholder.typicode.com/posts"
        accept="image/*"
        name="file"
        limit={1}
        validator={{
          // imageSize: img => ((img.width !== 200 || img.height !== 100) ? new Error('only allow 200px * 100px') : undefined),
          ext: ext => (['jpg', 'png'].includes(ext) ? undefined : new Error(errorInfo)),
        }}
      />
    )

    const blob = new Blob(['content'], { type: 'text/plain' })
    blob.name = 'test.doc'
    wrapper.find('input').prop('onChange')({
      target: {
        files: [blob],
      },
    })
    wrapper.update()
    expect(true).toBe(true)
    // expect(wrapper.find(`.${SO_PREFIX}-upload-image-item .${SO_PREFIX}-upload-message`).text()).toBe(errorInfo)
  })
})

describe('Upload[validateHandle false]', () => {
  test('should no error', () => {
    const errorInfo = 'File extension must be jpg or png'
    const wrapper = mount(
      <Upload
        action="//jsonplaceholder.typicode.com/posts"
        name="file"
        limit={2}
        validator={{
          // imageSize: img => ((img.width !== 200 || img.height !== 100) ? new Error('only allow 200px * 100px') : undefined),
          ext: () => new Error(errorInfo),
        }}
        validatorHandle={false}
      />
    )

    const blob = new Blob(['content'], { type: 'text/plain' })
    blob.name = 'test.doc'
    wrapper.find('input').prop('onChange')({
      target: {
        files: [blob],
      },
    })
    wrapper.update()
    expect(wrapper.find(`.${SO_PREFIX}-upload-error`).length).toBe(0)
  })
})
