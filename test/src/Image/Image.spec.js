import { shallow, mount } from 'enzyme'
import React from 'react'
import ImageBase from '../../../site/pages/components/Image/example-01-base'
import ImageShape from '../../../site/pages/components/Image/example-02-shape'
import ImageFit from '../../../site/pages/components/Image/example-03-fit'
import ImageAlt from '../../../site/pages/components/Image/example-04-alt'
import ImageError from '../../../site/pages/components/Image/example-05-error'
import ImageTarget from '../../../site/pages/components/Image/example-06-target'
import ImageGroup from '../../../site/pages/components/Image/example-07-group'
import ImagePile from '../../../site/pages/components/Image/example-08-group'
import ImageLazy from '../../../site/pages/components/Image/example-09-lazy'

describe('Image[Base]', () => {
  let imageWrapper
  beforeAll(() => {
    imageWrapper = mount(<ImageBase />)
  })
  test('should render correct dom structure', () => {
    expect(
      imageWrapper
        .find(`.${SO_PREFIX}-image`)
        .childAt(0)
        .hasClass(`${SO_PREFIX}-image-inner`)
    ).toBeTruthy()
  })
  test('should set width and height if through', () => {
    const imageInstanceWrapper = imageWrapper.find('ShineoutImage')
    const { width, height } = imageInstanceWrapper.props()
    const domStyle = imageInstanceWrapper.find(`.${SO_PREFIX}-image`).prop('style')
    expect(width).toBe(domStyle.width)
    expect(height).toBe(domStyle.paddingBottom)
  })
  test('should set src if through', () => {})
})

describe('Image[Shape]', () => {
  test('should render shape', () => {
    const imageShapeWrapper = shallow(<ImageShape />)
    imageShapeWrapper.find('ShineoutImage').forEach(imageWrapper => {
      const shape = imageWrapper.prop('shape')
      expect(imageWrapper.shallow().find(`.${SO_PREFIX}-image-${shape}`).length).toBe(1)
    })
  })
})

describe('Image[ImageFit]', () => {
  let images
  beforeAll(() => {
    images = shallow(<ImageFit />).find('ShineoutImage')
  })
  test('should render correct element while fit different', () => {
    images.forEach(image => {
      const fillProp = image.prop('fit')
      image = image.shallow()
      image.setState({
        status: 1,
      })
      if (fillProp.indexOf('fi') === 0) {
        // div
        expect(image.find(`.${SO_PREFIX}-image-inner`).children().length).toBe(0)
      } else {
        // img
        expect(image.find('img').length).toBe(1)
      }
    })
  })
  test('should set fit class', () => {
    images.forEach(image => {
      const fillProp = image.prop('fit')
      expect(image.shallow().find(`.${SO_PREFIX}-image-${fillProp}`).length).toBe(1)
    })
  })
})

describe('Image[Alt]', () => {
  test('should use alt when src invalid', () => {
    const image = shallow(<ImageAlt />).find('ShineoutImage')
    const alt = image.prop('alt')
    const imageShallow = image.shallow()
    imageShallow.setState({
      status: 2,
    })
    expect(imageShallow.find('img').prop('src')).toBe(alt)
  })
})

describe('Image[Error]', () => {
  test('should show title when src&alt invalid', () => {
    const image = shallow(<ImageError />).find('ShineoutImage')
    const title = image.prop('title')
    const imageShallow = image.shallow()
    imageShallow.setState({
      status: 3,
    })
    expect(
      imageShallow
        .find(`.${SO_PREFIX}-image-inner`)
        .childAt(0)
        .text()
    ).toBe(title)
  })
})

describe('Image[Target]', () => {
  test('should set target on a-tag while set target', () => {
    const images = shallow(<ImageTarget />).find('ShineoutImage')
    images.forEach(image => {
      let target = image.prop('target')
      const imageShallow = image.shallow()
      if (target === '_download') {
        target = '_self'
        expect(imageShallow.find(`a[download]`).length).toBe(1)
      }
      expect(imageShallow.find(`a[target="${target}"]`).length).toBe(1)
    })
  })
})

describe('Image[Group]', () => {
  test('should wrap image use group', () => {
    const group = shallow(<ImageGroup />).find('ShineoutImageGroup')
    expect(group.find('ShineoutImage').length).toBe(group.prop('children').length)
  })
})

describe('Image[Pile]', () => {
  test('should pile while has pile prop', () => {
    const group = shallow(<ImagePile />).find('ShineoutImageGroup')
    expect(group.shallow().find(`.${SO_PREFIX}-image-pile`).length).toBe(1)
  })
})

describe('Image[Lazyload]', () => {
  const mockFn = jest.fn()
  beforeAll(() => {
    Object.defineProperty(global.Image.prototype, 'src', {
      set: mockFn,
    })
    HTMLElement.prototype.getBoundingClientRect = () => ({
      bottom: -10,
    })
  })
  test('should lazy-load while has lazy prop', done => {
    mount(<ImageLazy />)
    expect(mockFn.mock.calls.length).toBe(0)
    HTMLElement.prototype.getBoundingClientRect = () => ({
      bottom: 10,
    })
    // simulate scroll event
    const event = new UIEvent('scroll')
    event.initUIEvent('scroll', false, true)
    document.dispatchEvent(event)
    // wait for render
    setTimeout(() => {
      expect(mockFn.mock.calls.length).toBe(4)
      done()
    }, 1000)
  })
})
