import React from 'react'
import { mount } from 'enzyme'
import { renderToString } from 'react-dom/server'
import { Watermark as PublicWatermark } from 'shineout'
import Watermark from '../../../src/Watermark'
import Modal from '../../../src/Modal'
import Drawer from '../../../src/Drawer'

/* global SO_PREFIX */

const canvasContext = {
  save: jest.fn(),
  translate: jest.fn(),
  rotate: jest.fn(),
  drawImage: jest.fn(),
  fillText: jest.fn(),
  measureText: jest.fn(text => ({
    width: text.length * 8,
    fontBoundingBoxAscent: 12,
    fontBoundingBoxDescent: 4,
  })),
  font: '',
  fillStyle: '',
  textAlign: 'center',
  textBaseline: 'top',
}

const mutationObservers = []

class MockMutationObserver {
  constructor(callback) {
    this.callback = callback
    this.active = false
    mutationObservers.push(this)
  }

  observe() {
    this.active = true
  }

  disconnect() {
    this.active = false
  }

  notify(mutations) {
    if (this.active) this.callback(mutations, this)
  }
}

describe('Watermark', () => {
  let getContextSpy
  let toDataURLSpy
  let NativeMutationObserver

  beforeAll(() => {
    NativeMutationObserver = global.MutationObserver
    global.MutationObserver = MockMutationObserver
    getContextSpy = jest.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(canvasContext)
    toDataURLSpy = jest.spyOn(HTMLCanvasElement.prototype, 'toDataURL').mockReturnValue('data:image/png;base64,test')
  })

  afterAll(() => {
    global.MutationObserver = NativeMutationObserver
    getContextSpy.mockRestore()
    toDataURLSpy.mockRestore()
  })

  beforeEach(() => {
    mutationObservers.length = 0
    jest.clearAllMocks()
  })

  test('should export Watermark from the package entry', () => {
    expect(PublicWatermark).toBe(Watermark)
  })

  test('should render children and append a non-interactive repeated watermark layer', () => {
    const wrapper = mount(
      <Watermark className="custom-watermark" style={{ height: 200 }} content="Shineout">
        <span className="content">Protected content</span>
      </Watermark>
    )
    const container = wrapper.getDOMNode()
    const watermark = container.lastElementChild

    expect(container.classList.contains(`${SO_PREFIX}-watermark`)).toBe(true)
    expect(container.classList.contains('custom-watermark')).toBe(true)
    expect(container.style.height).toBe('200px')
    expect(container.querySelector('.content').textContent).toBe('Protected content')
    expect(watermark.style.position).toBe('absolute')
    expect(watermark.style.pointerEvents).toBe('none')
    expect(watermark.style.backgroundRepeat).toBe('repeat')
    expect(watermark.style.backgroundImage).toContain('data:image/png;base64,test')

    wrapper.unmount()
  })

  test('should apply high-DPI rotated staggered geometry and custom offset', () => {
    const pixelRatio = window.devicePixelRatio
    Object.defineProperty(window, 'devicePixelRatio', { configurable: true, value: 2 })
    const wrapper = mount(
      <Watermark
        content={['Shineout', { text: 'Watermark', font: { fontSize: 20, fontWeight: 'bold' } }]}
        width={200}
        height={100}
        rotate={-30}
        gap={[20, 30]}
        offset={[60, 70]}
        zIndex={321}
      />
    )
    const container = wrapper.getDOMNode()
    const watermark = container.lastElementChild
    const watermarkStyle = watermark.getAttribute('style')

    expect(watermarkStyle).toContain('left: 50px')
    expect(watermarkStyle).toContain('top: 55px')
    expect(watermarkStyle).toContain('width: calc(100% - 50px)')
    expect(watermarkStyle).toContain('height: calc(100% - 55px)')
    expect(watermarkStyle).toContain('z-index: 321')
    expect(watermarkStyle).toContain('background-size: 486px')
    expect(canvasContext.fillText.mock.calls.map(call => call[0])).toEqual(['Shineout', 'Watermark'])

    wrapper.unmount()
    Object.defineProperty(window, 'devicePixelRatio', { configurable: true, value: pixelRatio })
  })

  test('should position the first mark half a gap inside the tile', () => {
    const pixelRatio = window.devicePixelRatio
    Object.defineProperty(window, 'devicePixelRatio', { configurable: true, value: 1 })
    const wrapper = mount(<Watermark content="Offset" width={40} height={20} rotate={0} gap={[20, 30]} />)
    const tileDraw = canvasContext.drawImage.mock.calls.find(call => call.length === 9)

    expect(tileDraw[5]).toBe(10)
    expect(tileDraw[6]).toBe(15)

    wrapper.unmount()
    Object.defineProperty(window, 'devicePixelRatio', { configurable: true, value: pixelRatio })
  })

  test('should measure text when width and height are not specified', () => {
    const wrapper = mount(<Watermark content="AB" rotate={0} gap={[0, 0]} />)
    const container = wrapper.getDOMNode()
    const watermark = container.lastElementChild

    expect(watermark.getAttribute('style')).toContain('background-size: 32px')

    wrapper.unmount()
  })

  test('should position text according to textAlign without clipping it', () => {
    const wrapper = mount(
      <Watermark content="Aligned" width={40} height={20} rotate={0} gap={[0, 0]} font={{ textAlign: 'left' }} />
    )

    expect(canvasContext.fillText.mock.calls[0][1]).toBe(0)

    wrapper.setProps({ font: { textAlign: 'right' } })
    wrapper.update()

    expect(canvasContext.fillText.mock.calls[1][1]).toBe(40)

    wrapper.unmount()
  })

  test('should allocate enough canvas space for rotated content', () => {
    const nativeCreateElement = document.createElement.bind(document)
    const canvases = []
    const createElementSpy = jest.spyOn(document, 'createElement').mockImplementation(tagName => {
      const element = nativeCreateElement(tagName)
      if (tagName === 'canvas') canvases.push(element)
      return element
    })

    const wrapper = mount(<Watermark content="Square" width={100} height={100} rotate={45} gap={[0, 0]} />)

    expect(canvases[2].width).toBe(142)
    expect(canvases[2].height).toBe(142)

    wrapper.unmount()
    createElementSpy.mockRestore()
  })

  test('should redraw the same layer after drawing props change', () => {
    const wrapper = mount(<Watermark content="A" rotate={0} gap={[0, 0]} />)
    const container = wrapper.getDOMNode()
    const watermark = container.lastElementChild

    expect(watermark.getAttribute('style')).toContain('background-size: 16px')

    wrapper.setProps({ content: 'ABCD' })
    wrapper.update()

    expect(container.lastElementChild).toBe(watermark)
    expect(watermark.getAttribute('style')).toContain('background-size: 64px')

    wrapper.unmount()
  })

  test('should draw a loaded image instead of fallback text', () => {
    const srcSpy = jest.spyOn(Image.prototype, 'src', 'set').mockImplementation(function loadImage() {
      this.onload()
    })
    const wrapper = mount(<Watermark image="watermark.png" content="Fallback" width={40} height={20} />)
    const imageDrawn = canvasContext.drawImage.mock.calls.some(call => call[0] instanceof HTMLImageElement)

    expect(imageDrawn).toBe(true)
    expect(canvasContext.fillText.mock.calls.some(call => call[0] === 'Fallback')).toBe(false)

    wrapper.unmount()
    srcSpy.mockRestore()
  })

  test('should fall back to content when the image fails to load', () => {
    const srcSpy = jest.spyOn(Image.prototype, 'src', 'set').mockImplementation(function failImage() {
      this.onerror()
    })
    const wrapper = mount(<Watermark image="invalid.png" content="Fallback" width={40} height={20} />)
    const container = wrapper.getDOMNode()
    const watermark = container.lastElementChild

    expect(canvasContext.fillText.mock.calls.some(call => call[0] === 'Fallback')).toBe(true)
    expect(watermark.style.backgroundImage).toContain('data:image/png;base64,test')

    wrapper.unmount()
    srcSpy.mockRestore()
  })

  test('should ignore a stale image callback after the image prop changes', () => {
    const pendingImages = []
    const srcSpy = jest.spyOn(Image.prototype, 'src', 'set').mockImplementation(function holdImage(value) {
      pendingImages.push({ image: this, onload: this.onload, src: value })
    })
    const wrapper = mount(<Watermark image="old.png" width={40} height={20} />)
    wrapper.setProps({ image: 'new.png' })
    wrapper.update()

    toDataURLSpy.mockReturnValueOnce('data:image/png;base64,new')
    pendingImages[1].onload()
    const container = wrapper.getDOMNode()
    const watermark = container.lastElementChild
    const renderCount = toDataURLSpy.mock.calls.length

    pendingImages[0].onload()

    expect(toDataURLSpy.mock.calls.length).toBe(renderCount)
    expect(watermark.getAttribute('style')).toContain('data:image/png;base64,new')

    wrapper.unmount()
    srcSpy.mockRestore()
  })

  test('should fall back to content when exporting an image canvas fails', () => {
    const srcSpy = jest.spyOn(Image.prototype, 'src', 'set').mockImplementation(function loadImage() {
      this.onload()
    })
    let exportCount = 0
    toDataURLSpy.mockImplementation(() => {
      exportCount += 1
      if (exportCount === 1) throw new Error('Tainted canvas')
      return 'data:image/png;base64,fallback'
    })

    const wrapper = mount(<Watermark image="cross-origin.png" content="Fallback" width={40} height={20} />)
    const container = wrapper.getDOMNode()
    const watermark = container.lastElementChild

    expect(toDataURLSpy).toHaveBeenCalledTimes(2)
    expect(canvasContext.fillText.mock.calls.some(call => call[0] === 'Fallback')).toBe(true)
    expect(watermark.getAttribute('style')).toContain('data:image/png;base64,fallback')

    wrapper.unmount()
    srcSpy.mockRestore()
  })

  test('should not draw zero-sized regions for empty content', () => {
    const wrapper = mount(<Watermark content="" rotate={0} gap={[0, 0]} />)

    expect(canvasContext.drawImage).not.toHaveBeenCalled()

    wrapper.unmount()
  })

  test('should restore a removed watermark layer and call onRemove once', () => {
    let restoredWhenCalled = false
    let container
    let watermark
    const onRemove = jest.fn(() => {
      restoredWhenCalled = container.lastElementChild === watermark
    })
    const wrapper = mount(<Watermark content="Protected" onRemove={onRemove} />)
    container = wrapper.getDOMNode()
    watermark = container.lastElementChild

    watermark.remove()
    expect(mutationObservers).toHaveLength(1)
    mutationObservers[0].notify([
      {
        type: 'childList',
        removedNodes: [watermark],
        target: container,
      },
    ])

    expect(container.lastElementChild).toBe(watermark)
    expect(onRemove).toHaveBeenCalledTimes(1)
    expect(restoredWhenCalled).toBe(true)

    wrapper.unmount()
  })

  test('should restore a removed watermark before an onRemove error escapes', () => {
    const onRemove = jest.fn(() => {
      throw new Error('consumer error')
    })
    const wrapper = mount(<Watermark content="Protected" onRemove={onRemove} />)
    const container = wrapper.getDOMNode()
    const watermark = container.lastElementChild

    watermark.remove()

    expect(() => {
      mutationObservers[0].notify([
        {
          type: 'childList',
          removedNodes: [watermark],
          target: container,
        },
      ])
    }).toThrow('consumer error')
    expect(container.lastElementChild).toBe(watermark)

    wrapper.unmount()
  })

  test('should restore critical attributes when the watermark layer is tampered with', () => {
    const onRemove = jest.fn()
    const wrapper = mount(<Watermark content="Protected" onRemove={onRemove} />)
    const container = wrapper.getDOMNode()
    const watermark = container.lastElementChild
    const watermarkStyle = watermark.getAttribute('style')

    watermark.setAttribute('style', '')
    watermark.className = 'hidden-watermark'
    watermark.hidden = true
    watermark.setAttribute('aria-hidden', 'false')
    mutationObservers[0].notify([
      {
        type: 'attributes',
        attributeName: 'style',
        removedNodes: [],
        target: watermark,
      },
    ])

    expect(watermark.getAttribute('style')).toBe(watermarkStyle)
    expect(watermark.hasAttribute('class')).toBe(false)
    expect(watermark.hidden).toBe(false)
    expect(watermark.getAttribute('aria-hidden')).toBe('true')
    expect(onRemove).not.toHaveBeenCalled()

    wrapper.unmount()
  })

  test('should remove content injected into the watermark layer', () => {
    const wrapper = mount(<Watermark content="Protected" />)
    const container = wrapper.getDOMNode()
    const watermark = container.lastElementChild
    const injected = document.createElement('span')

    watermark.appendChild(injected)
    mutationObservers[0].notify([
      {
        type: 'childList',
        addedNodes: [injected],
        removedNodes: [],
        target: watermark,
      },
    ])

    expect(watermark.childElementCount).toBe(0)

    wrapper.unmount()
  })

  test('should stop observing before unmount cleanup', () => {
    const onRemove = jest.fn()
    const wrapper = mount(<Watermark content="Protected" onRemove={onRemove} />)
    const observer = mutationObservers[0]

    wrapper.unmount()

    expect(observer.active).toBe(false)
    expect(onRemove).not.toHaveBeenCalled()
  })

  test.each([['Modal', Modal], ['Drawer', Drawer]])('should inherit the watermark into a portal %s', (name, Popup) => {
    const wrapper = mount(
      <Watermark content="Protected">
        <Popup visible>{`${name} content`}</Popup>
      </Watermark>
    )
    const modal = document.body.querySelector(`.${SO_PREFIX}-modal`)
    const modalWatermark = Array.from(modal.children).find(child => child.getAttribute('aria-hidden') === 'true')

    expect(modalWatermark).toBeTruthy()
    expect(modalWatermark.getAttribute('style')).toContain('background-image')

    wrapper.unmount()
  })

  test('should not inherit the watermark when inherit is false', () => {
    const wrapper = mount(
      <Watermark content="Protected" inherit={false}>
        <Modal visible>Modal content</Modal>
      </Watermark>
    )
    const modal = document.body.querySelector(`.${SO_PREFIX}-modal`)
    const modalWatermark = Array.from(modal.children).find(child => child.getAttribute('aria-hidden') === 'true')

    expect(modalWatermark).toBeUndefined()

    wrapper.unmount()
  })

  test('should preserve child state and update portal registration when inherit changes', () => {
    class StatefulChild extends React.Component {
      state = { label: 'Stateful child' }

      render() {
        return <span>{this.state.label}</span>
      }
    }

    const childRef = React.createRef()
    const wrapper = mount(
      <Watermark content="Protected">
        <StatefulChild ref={childRef} />
        <Modal visible>Modal content</Modal>
      </Watermark>
    )
    const childInstance = childRef.current
    const getModalWatermark = () => {
      const modal = document.body.querySelector(`.${SO_PREFIX}-modal`)
      return Array.from(modal.children).find(child => child.getAttribute('aria-hidden') === 'true')
    }

    expect(getModalWatermark()).toBeTruthy()

    wrapper.setProps({ inherit: false })
    wrapper.update()

    expect(childRef.current).toBe(childInstance)
    expect(getModalWatermark()).toBeUndefined()

    wrapper.setProps({ inherit: true })
    wrapper.update()

    expect(childRef.current).toBe(childInstance)
    expect(getModalWatermark()).toBeTruthy()

    wrapper.unmount()
  })

  test('should block an outer watermark context when nested inherit is false', () => {
    const wrapper = mount(
      <Watermark content="Outer">
        <Watermark content="Inner" inherit={false}>
          <Modal visible>Modal content</Modal>
        </Watermark>
      </Watermark>
    )
    const modal = document.body.querySelector(`.${SO_PREFIX}-modal`)
    const modalWatermark = Array.from(modal.children).find(child => child.getAttribute('aria-hidden') === 'true')

    expect(modalWatermark).toBeUndefined()

    wrapper.unmount()
  })

  test('should render on the server without accessing browser APIs', () => {
    expect(renderToString(<Watermark content="Protected">SSR content</Watermark>)).toContain('SSR content')
  })
})
