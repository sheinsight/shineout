import { shallow, mount } from 'enzyme'
import React from 'react'
import { Image } from 'shineout'
import { baseTest } from '../../utils'
import ImageBase from '../../../site/pages/components/Image/example-01-base'
import ImageShape from '../../../site/pages/components/Image/example-02-shape'
import ImageFit from '../../../site/pages/components/Image/example-03-fit'
import ImageAlt from '../../../site/pages/components/Image/example-04-alt'
import ImageError from '../../../site/pages/components/Image/example-05-error'
import ImageTarget from '../../../site/pages/components/Image/example-06-target'
import ImageGroup from '../../../site/pages/components/Image/example-07-group'
import ImagePile from '../../../site/pages/components/Image/example-08-group'
import ImageLazy from '../../../site/pages/components/Image/example-09-lazy'

/* global SO_PREFIX */

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

describe('Image[Base]', () => {
  test('should custom style and className', () => {
    baseTest(Image, `.${SO_PREFIX}-image`)
  })
})

describe('Image[container]', () => {
  test('should set container', () => {
    const src = '../../../images/1_b.jpg'
    const wrapper = mount(
      <div id="container">
        <Image lazy src={src} container="#container" />
      </div>
    )
    expect(wrapper.find(`.${SO_PREFIX}-image-inner`).length).toBe(1)
  })
})

describe('Image[href]', () => {
  test('should set href', () => {
    const fakeHref = '/href/fake'
    const wrapper = mount(<Image href={fakeHref} />)
    wrapper.update()
    expect(wrapper.find('a').length).toBe(1)
  })
})

describe('Image[onClick]', () => {
  test('should be click', () => {
    const onClick = jest.fn()
    const fakeHref = '/href/fake'
    const wrapper = mount(<Image onClick={onClick} href={fakeHref} />)
    wrapper.find(`.${SO_PREFIX}-image`).simulate('click')
    expect(onClick).toBeCalled()
  })

  test('gallery should be open by click', () => {
    const fakeHref = '/href/fake'
    const wrapper = mount(<Image href={fakeHref} target="_modal" alt={fakeHref} />)
    wrapper.find(`.${SO_PREFIX}-image`).simulate('click')
    expect(document.getElementsByClassName(`${SO_PREFIX}-image-gallery`).length).toBe(1)
  })

  test('should be click when in group', () => {
    const wrapper = mount(
      <Image.Group>
        {[1].map(i => (
          <Image
            key={i}
            fit="fill"
            width={80}
            height={80}
            shape="thumbnail"
            src={`../../../images/${i}_s.jpg`}
            href={`../../../images/${i}_b.jpg`}
          />
        ))}
      </Image.Group>
    )
    wrapper.find(`.${SO_PREFIX}-image`).forEach(i => {
      i.simulate('click')
    })
    wrapper.update()
    expect(document.getElementsByClassName(`${SO_PREFIX}-image-gallery`).length).toBe(1)
  })
})

describe('Image[onError]', () => {
  test('onError should be called ', () => {
    jest.useFakeTimers()
    const onError = jest.fn()
    const fakeSrc = 'href/fake'
    const wrapper = mount(<Image onError={onError} src={fakeSrc} />)
    const instance = wrapper.instance()
    instance.handleError()
    expect(onError).toBeCalled()
  })
})

describe('Image[placeholder]', () => {
  test('should set placeholder', () => {
    const placeholder = <div>Hello</div>
    const wrapper = mount(<Image lazy placeholder={placeholder} src="/" />)
    expect(
      wrapper
        .find(`.${SO_PREFIX}-image-inner`)
        .children()
        .html()
    ).toBe('<div>Hello</div>')
  })
})

describe('Image[src]', () => {
  test('should set src', () => {
    const fakeSrc = 'href/fake'
    const wrapper = mount(<Image src={fakeSrc} />)
    wrapper.update()
    expect(wrapper.find(Image).props().src).toBe(fakeSrc)
  })
})

describe('Image[title]', () => {
  test('should set title', () => {
    const title = 'Hello'
    const wrapper = mount(<Image title={title} src="../../../images/1_b.jpg" />)
    expect(wrapper.find(Image).props().title).toBe(title)
  })
})

// this event should be trigger manually
describe('Image[preview]', () => {
  test('should trigger preview', () => {
    const wrapper = mount(<Image src="../../../images/1_b.jpg" />)
    wrapper
      .find(Image)
      .instance()
      .preview()
    expect(document.getElementsByClassName(`${SO_PREFIX}-image-gallery`).length).toBe(1)
  })
})

describe('Image[unmount]', () => {
  test('should unmount', () => {
    const wrapper = mount(<Image />)
    expect(wrapper.find(`.${SO_PREFIX}-image`).length).toBe(1)
    wrapper.unmount()
    expect(wrapper.find(`.${SO_PREFIX}-image`).length).toBe(0)
  })
})
