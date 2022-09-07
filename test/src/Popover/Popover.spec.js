import React from 'react'
import { mount } from 'enzyme'
import { Popover, Button } from 'shineout'
import { delay } from '../../utils'
import { dispatchEvent } from '../../../src/utils/dom/element'
import TContent from '../../../site/pages/components/Popover/test-001-content'

class P extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      v: true,
    }
  }

  render() {
    const { v } = this.state
    return (
      <Button>
        <Popover
          visible={v}
          onVisibleChange={c => {
            this.setState({ v: c })
          }}
        >
          popover
        </Popover>
        Hover
      </Button>
    )
  }
}

/* global SO_PREFIX */
describe('Popover[Base]', () => {
  test('should hover/click to render default', () => {
    jest.useFakeTimers()
    const modalText = 'Some Test Text'
    const expectModalText = `<span class="so-popover-text">${modalText}</span>`
    const wrapperHover = mount(
      <Button>
        <Popover>{modalText}</Popover>
        Hover
      </Button>
    )
    expect(document.querySelectorAll(`.${SO_PREFIX}-popover`).length).toBe(0)
    dispatchEvent(wrapperHover.find('button').instance(), 'mouseenter')
    jest.runAllTimers()
    expect(document.querySelector(`.${SO_PREFIX}-popover .${SO_PREFIX}-popover-content`).innerHTML).toBe(
      expectModalText
    )

    document.querySelectorAll(`.${SO_PREFIX}-popover`).forEach(item => {
      item.remove()
    })
    const wrapperClick = mount(
      <Button>
        <Popover trigger="click">{modalText}</Popover>
        Click
      </Button>
    )
    expect(document.querySelectorAll(`.${SO_PREFIX}-popover`).length).toBe(0)
    dispatchEvent(wrapperClick.find('button').instance(), 'click')
    jest.runAllTimers()
    expect(document.querySelector(`.${SO_PREFIX}-popover .${SO_PREFIX}-popover-content`).innerHTML).toBe(
      expectModalText
    )

    // render correctly
    expect(document.querySelector(`.${SO_PREFIX}-popover`).innerHTML).toMatchSnapshot()
  })

  test('render not compute position', () => {
    jest.useFakeTimers()
    const modalText = 'Some Test Text'
    const wrapper = mount(
      <Button>
        <Popover>{modalText}</Popover>
        Hover
      </Button>
    )
    const spy = jest.spyOn(wrapper.find('Panel').instance(), 'getPositionStr')

    expect(spy).not.toBeCalled()
    wrapper
      .find('Panel')
      .instance()
      .forceUpdate()
    expect(spy).not.toBeCalled()
  })

  test('should popover width control', () => {
    jest.useFakeTimers()
    document.querySelectorAll(`.${SO_PREFIX}-popover`).forEach(item => {
      item.remove()
    })
    mount(<P />)
    expect(document.querySelectorAll(`.${SO_PREFIX}-popover`).length).toBe(1)
  })
})

describe('Popover[clickToCancelDelay]', () => {
  test('should set clickToCancelDelay', async () => {
    document.querySelectorAll(`.${SO_PREFIX}-popover`).forEach(item => {
      item.remove()
    })
    jest.useRealTimers()
    const mouseEnterDelay = 100
    const wrapper = mount(
      <Button>
        <Popover clickToCancelDelay mouseEnterDelay={mouseEnterDelay}>
          popover
        </Popover>
        Hover
      </Button>
    )
    expect(wrapper.find(Button).length).toBe(1)
    dispatchEvent(wrapper.find('button').instance(), 'mouseenter')
    await delay(mouseEnterDelay / 2)
    dispatchEvent(wrapper.find('button').instance(), 'click')
    await delay(mouseEnterDelay / 2)
    expect(document.getElementsByClassName(`${SO_PREFIX}-popover`).length).toBe(0)
    // expect(document.getElementsByClassName(`${SO_PREFIX}-popover`)[0].style.display).toBe('block')
  })
})

// this attribute will be test by e2e
// describe('Popover[getPopupContainer]', () => {
//   test('should custom container', () => {})
// })

describe('Popover[mouseLeaveDelay]', () => {
  test('should set mouseLeaveDelay', async () => {
    document.querySelectorAll(`.${SO_PREFIX}-popover`).forEach(item => {
      item.remove()
    })
    jest.useRealTimers()
    const mouseLeaveDelay = 100
    const wrapper = mount(
      <Button>
        <Popover mouseLeaveDelay={mouseLeaveDelay}>popover</Popover>
        Hover
      </Button>
    )
    expect(wrapper.find(Button).length).toBe(1)
    dispatchEvent(wrapper.find('button').instance(), 'mouseenter')
    await delay(300)
    dispatchEvent(wrapper.find('button').instance(), 'mouseleave')
    await delay(mouseLeaveDelay / 2)
    expect(document.getElementsByClassName(`${SO_PREFIX}-popover`).length).toBe(1)
    await delay(mouseLeaveDelay / 2)
    expect(document.getElementsByClassName(`${SO_PREFIX}-popover`)[0].style.display).toBe('none')
  })
})

describe('Popover[onOpen/onClose/onVisibleChange]', () => {
  test('should be called when open or close', async () => {
    document.querySelectorAll(`.${SO_PREFIX}-popover`).forEach(item => {
      item.remove()
    })
    jest.useRealTimers()
    const onOpen = jest.fn()
    const onClose = jest.fn()
    const onVisibleChange = jest.fn()
    const mouseLeaveDelay = 100
    const wrapper = mount(
      <Button>
        <Popover mouseLeaveDelay={mouseLeaveDelay} onOpen={onOpen} onClose={onClose} onVisibleChange={onVisibleChange}>
          popover
        </Popover>
        Hover
      </Button>
    )
    expect(wrapper.find(Button).length).toBe(1)
    dispatchEvent(wrapper.find('button').instance(), 'mouseenter')
    await delay(300)
    dispatchEvent(wrapper.find('button').instance(), 'mouseleave')
    await delay(mouseLeaveDelay / 2)
    expect(document.getElementsByClassName(`${SO_PREFIX}-popover`).length).toBe(1)
    await delay(mouseLeaveDelay / 2)
    expect(document.getElementsByClassName(`${SO_PREFIX}-popover`)[0].style.display).toBe('none')

    expect(onOpen).toBeCalled()
    expect(onClose).toBeCalled()
    expect(onVisibleChange).toBeCalled()
    expect(onVisibleChange).toBeCalledTimes(2)
  })
})

describe('Popover[content]', () => {
  test('should set content', () => {
    jest.useFakeTimers()
    document.querySelectorAll(`.${SO_PREFIX}-popover`).forEach(item => {
      item.remove()
    })

    const wrapper = mount(
      <Popover trigger="click" content={<div>233</div>}>
        <Button>Hover</Button>
      </Popover>
    )
    jest.runAllTimers()
    expect(wrapper.find(Button).length).toBe(1)
    dispatchEvent(wrapper.find('button').instance(), 'click')
    expect(document.getElementsByClassName(`${SO_PREFIX}-popover-content`).length).toBe(1)
    wrapper.unmount()
  })

  test('should set content click', () => {
    jest.useFakeTimers()
    document.querySelectorAll(`.${SO_PREFIX}-popover`).forEach(item => {
      item.remove()
    })
    const content = <div>Some text</div>
    const wrapper = mount(
      <Popover trigger="click" content={content}>
        <Button>Hover</Button>
      </Popover>
    )
    jest.runAllTimers()
    expect(wrapper.find(Button).length).toBe(1)
    wrapper.find(Button).simulate('click')
    expect(document.getElementsByClassName(`${SO_PREFIX}-popover-content`).length).toBe(1)
    wrapper.unmount()
  })

  test('should set content hover', async () => {
    jest.useFakeTimers()
    document.querySelectorAll(`.${SO_PREFIX}-popover`).forEach(item => {
      item.remove()
    })
    const wrapper = mount(<TContent />)
    expect(wrapper.find(Button).length).toBe(1)
    wrapper.find(Button).simulate('mouseenter')
    const content = document.getElementsByClassName(`${SO_PREFIX}-popover-content`)
    expect(content.length).toBe(1)
    wrapper.find(Button).simulate('mouseleave')
    expect(content[0].parentNode.style.display).toBe('none')
    wrapper.unmount()
  })
})

describe('Popover[priorityDirection]', () => {
  test('should set priorityDirection', () => {
    jest.useFakeTimers()
    document.querySelectorAll(`.${SO_PREFIX}-popover`).forEach(item => {
      item.remove()
    })

    const priorityDirection = [
      { name: 'vertical', className: `${SO_PREFIX}-popover-bottom-left` },
      { name: 'horizontal', className: `${SO_PREFIX}-popover-right-top` },
      { name: 'auto', className: `${SO_PREFIX}-popover` },
    ]
    priorityDirection.forEach(async i => {
      const mouseLeaveDelay = 100
      const wrapper = mount(
        <Button>
          <Popover mouseLeaveDelay={mouseLeaveDelay} priorityDirection={i.name}>
            popover
          </Popover>
          Hover
        </Button>
      )
      expect(wrapper.find(Button).length).toBe(1)
      dispatchEvent(wrapper.find('button').instance(), 'mouseenter')
      await delay(300)
      expect(document.getElementsByClassName(i.className).length).toBe(1)
      wrapper.unmount()
    })
  })
})

describe('Popover[scrollDismiss]', () => {
  test('should set scrollDismiss', async () => {
    jest.useRealTimers()
    document.querySelectorAll(`.${SO_PREFIX}-popover`).forEach(item => {
      item.remove()
    })
    const wrapper = mount(
      <Button>
        <Popover trigger="click" scrollDismiss>
          popover
        </Popover>
        Click
      </Button>
    )
    expect(wrapper.find(Button).length).toBe(1)
    dispatchEvent(wrapper.find('button').instance(), 'click')
    await delay(300)
    expect(document.getElementsByClassName(`${SO_PREFIX}-popover`).length).toBe(1)
    const event = new UIEvent('scroll')
    event.initUIEvent('scroll')
    document.dispatchEvent(event)
    await delay(300)
    expect(document.getElementsByClassName(`${SO_PREFIX}-popover`)[0].style.display).toBe('none')
  })
})

describe('Popover[showArrow]', () => {
  test('should set showArrow', async () => {
    jest.useRealTimers()
    document.querySelectorAll(`.${SO_PREFIX}-popover`).forEach(item => {
      item.remove()
    })
    const wrapper = mount(
      <Button>
        <Popover trigger="click" showArrow={false}>
          popover
        </Popover>
        Click
      </Button>
    )
    expect(wrapper.find(Button).length).toBe(1)
    dispatchEvent(wrapper.find('button').instance(), 'click')
    await delay(300)
    expect(document.getElementsByClassName(`${SO_PREFIX}-popover`).length).toBe(1)
    expect(
      document.getElementsByClassName(`${SO_PREFIX}-popover`)[0].innerHTML.indexOf(`${SO_PREFIX}-popover-arrow`) === -1
    ).toBe(true)
  })
})

describe('Popover[visible]', () => {
  test('should set visible', async () => {
    jest.useRealTimers()
    document.querySelectorAll(`.${SO_PREFIX}-popover`).forEach(item => {
      item.remove()
    })
    mount(
      <Button>
        <Popover trigger="click" visible>
          popover
        </Popover>
        Click
      </Button>
    )
    expect(document.getElementsByClassName(`${SO_PREFIX}-popover`).length).toBe(1)
    expect(document.getElementsByClassName(`${SO_PREFIX}-popover`)[0].style.display).toBe('block')
  })
})
describe('Popover[unmount]', () => {
  test('should set visible', async () => {
    jest.useRealTimers()
    document.querySelectorAll(`.${SO_PREFIX}-popover`).forEach(item => {
      item.remove()
    })
    const wrapper = mount(
      <Button>
        <Popover trigger="click" visible>
          popover
        </Popover>
        Click
      </Button>
    )
    expect(document.getElementsByClassName(`${SO_PREFIX}-popover`).length).toBe(1)
    expect(document.getElementsByClassName(`${SO_PREFIX}-popover`)[0].style.display).toBe('block')
    wrapper.unmount()
    expect(document.getElementsByClassName(`${SO_PREFIX}-popover`).length).toBe(0)
  })
})

describe('Popover.Confirm[icon]', () => {
  test('should set visible', async () => {
    jest.useRealTimers()
    document.querySelectorAll(`.${SO_PREFIX}-popover`).forEach(item => {
      item.remove()
    })
    mount(
      <Button>
        <Popover.Confirm trigger="click" visible>
          popover
        </Popover.Confirm>
        Click
      </Button>
    )
    expect(document.getElementsByClassName(`${SO_PREFIX}-popover-confirm`).length).toBe(1)
    expect(document.getElementsByClassName(`${SO_PREFIX}-popover`)[0].style.display).toBe('block')
  })
})

describe('Popover.Confirm[onOk/onCancel]', () => {
  test('should be called when confirm or cancel', async () => {
    jest.useRealTimers()
    document.querySelectorAll(`.${SO_PREFIX}-popover`).forEach(item => {
      item.remove()
    })
    const onOk = jest.fn(
      () =>
        new Promise(r => {
          r()
        })
    )
    const onCancel = jest.fn(
      () =>
        new Promise(r => {
          r()
        })
    )
    const wrapper = mount(
      <Button>
        <Popover.Confirm trigger="click" visible onOk={onOk} onCancel={onCancel}>
          popover
        </Popover.Confirm>
        Click
      </Button>
    )
    expect(document.getElementsByClassName(`${SO_PREFIX}-popover-confirm`).length).toBe(1)
    expect(document.getElementsByClassName(`${SO_PREFIX}-popover`)[0].style.display).toBe('block')
    wrapper
      .find('.so-popover-footer button')
      .first()
      .simulate('click')

    wrapper
      .find('.so-popover-footer button')
      .last()
      .simulate('click')

    expect(onOk).toBeCalled()
    expect(onCancel).toBeCalled()
  })
})

describe('Popover.Content[visible]', () => {
  test('should set visible', async () => {
    jest.useRealTimers()
    document.querySelectorAll(`.${SO_PREFIX}-popover`).forEach(item => {
      item.remove()
    })
    mount(
      <Button>
        <Popover.Content trigger="click" visible>
          popover
        </Popover.Content>
        Click
      </Button>
    )
    expect(document.getElementsByClassName(`${SO_PREFIX}-popover`)[0].style.display).toBe('block')
  })
})
