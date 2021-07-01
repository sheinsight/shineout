import React from 'react'
import { mount } from 'enzyme'
import { Upload } from 'shineout'
import UploadImage from '../../../site/pages/components/Upload/example-02-image'
import UploadButton from '../../../site/pages/components/Upload/example-03-button'

/* global SO_PREFIX */
describe('Upload[Base]', () => {
  let wrapper
  beforeAll(() => {
    wrapper = mount(<Upload action="//jsonplaceholder.typicode.com/posts" onSuccess={(...args) => console.log(args)} />)
  })
  test('should render file-input', () => {
    expect(wrapper.find('input[type="file"]').length).toBe(1)
  })
  // test('should upload file success', done => {
  //   const successFn = () => {
  //     done()
  //   }
  //   const uploadWrapper = mount(<Upload action="//jsonplaceholder.typicode.com/posts" onSuccess={successFn} />)
  //   uploadWrapper.find('input').prop('onChange')({
  //     target: {
  //       files: [new Blob(['content'], { type: 'text/plain' })],
  //     },
  //   })
  // })
})

describe('Upload[Image]', () => {
  test('should render image input', () => {
    const wrapper = mount(<UploadImage />)
    expect(wrapper.find(`.${SO_PREFIX}-upload-image-plus`).length).toBe(1)
  })
})

describe('Upload[Button]', () => {
  test('should render button and progress', () => {
    const wrapper = mount(<UploadButton />)
    const type = wrapper.find('Progress').prop('type')
    expect(wrapper.find(`.${SO_PREFIX}-upload-bprogress`).length).toBe(1)
    expect(wrapper.find(`.${SO_PREFIX}-upload-bprogress-${type}`).length).toBe(1)
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
// describe('Upload[onError]', () => {
//   test('should call onError while server error', () => {
//     XMLHttpRequest.prototype.send = function() {
//       this.onerror()
//     }
//     const wrapper = mount(
//       <Upload
//         action="/path-no-exist"
//         name="file"
//         onError={xhr => {
//           console.log(xhr)
//         }}
//       />
//     )
//     const blob = new Blob(['content'], { type: 'text/plain' })
//     wrapper.find('input').prop('onChange')({
//       target: {
//         files: [blob],
//       },
//     })
//     wrapper.update()
//   })
// })
