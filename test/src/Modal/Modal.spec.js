import { Modal, Button } from 'shineout'
import { mount } from 'enzyme'
import React from 'react'
import BaseModal from '../../../site/pages/components/Modal/example-1-base'
import SpecialModal from '../../../site/pages/components/Modal/example-2-special'
/* global SO_PREFIX */
describe('Modal', () => {
  test('should render correctly', () => {
    const wrapper = mount(
      <Modal visible title="Modal Title">
        Modal Content
      </Modal>
    )
    expect(document.querySelector(`.${SO_PREFIX}-modal`).innerHTML.replace(/id=".*"/g, 'id="a')).toMatchSnapshot()
    wrapper.unmount()
  })
})

describe('Modal[bodyStyle]', () => {
  test('should set body style', () => {
    const color = 'red'
    const wrapper = mount(
      <Modal width={400} visible title="Modal Title" bodyStyle={{ color }}>
        Hello
      </Modal>
    )
    expect(document.getElementsByClassName(`${SO_PREFIX}-modal-mask`).length).toBe(1)
    expect(document.getElementsByClassName(`${SO_PREFIX}-card-body`)[0].style.color).toBe(color)
    wrapper.unmount()
  })
})

describe('Modal[container]', () => {
  test('should render in custom container', () => {
    const App = () => {
      const [wrapper, setWrapper] = React.useState()
      const [visible, setVisible] = React.useState(false)
      const bindElement = ref => {
        setWrapper(ref)
      }

      React.useEffect(() => {
        setVisible(true)
      }, [])

      return (
        <div id="container" ref={bindElement}>
          <Modal container={wrapper} visible={visible} title="Modal Title">
            Modal mount after Button
          </Modal>
        </div>
      )
    }
    const wrapper = mount(<App />)
    expect(
      wrapper
        .find('#container')
        .html()
        .indexOf(`${SO_PREFIX}-modal`) > -1
    ).toBe(true)
    wrapper.unmount()
  })
})

describe('Modal[destroy]', () => {
  test('should destory when hidden', async () => {
    jest.useRealTimers()
    class Component extends React.Component {
      constructor(props) {
        super(props)
        this.state = {
          visible: false,
        }
      }

      render() {
        return <Modal visible={this.state.visible} destroy />
      }
    }
    const wrapper = mount(<Component />)
    expect(document.getElementsByClassName(`${SO_PREFIX}-modal`).length).toBe(0)
    wrapper.setState({ visible: true })
    expect(document.getElementsByClassName(`${SO_PREFIX}-modal`).length).toBe(1)
    wrapper.setState({ visible: false })
    // Modal have 300ms delay when visible change
    await new Promise(r => {
      setTimeout(() => {
        r(true)
      }, 300)
    })
    expect(document.getElementsByClassName(`${SO_PREFIX}-modal`).length).toBe(0)
    wrapper.unmount()
  })
})

describe('Modal[esc]', () => {
  test('should close by ESC', async () => {
    jest.useRealTimers()
    const wrapper = mount(<Modal visible destroy />)
    const event = new KeyboardEvent('keydown', { keyCode: 27, key: 'Escape' })
    expect(document.getElementsByClassName(`${SO_PREFIX}-modal`).length).toBe(1)
    document.dispatchEvent(event)
    await new Promise(r => {
      setTimeout(() => {
        r(true)
      }, 300)
    })
    expect(document.getElementsByClassName(`${SO_PREFIX}-modal`).length).toBe(0)
    wrapper.unmount()
  })
})

// describe('Modal[events]', () => {
//   test('', () => {})
// })

describe('Modal[footer]', () => {
  test('should set footer', () => {
    const wrapper = mount(
      <Modal width={400} visible title="Modal Title" footer={[<div key={1}>Hello</div>, <div key={2}>Shineout</div>]} />
    )
    expect(wrapper.find(`.${SO_PREFIX}-card-footer`).length).toBe(1)
    expect(
      wrapper
        .find(`.${SO_PREFIX}-card-footer`)
        .children()
        .first()
        .text()
    ).toBe('Hello')
    expect(
      wrapper
        .find(`.${SO_PREFIX}-card-footer`)
        .children()
        .last()
        .text()
    ).toBe('Shineout')
    wrapper.unmount()
  })
})

describe('Modal[forceMask]', () => {
  test('should set forceMask', () => {
    const wrapper = mount(
      <Modal width={400} visible forceMask maskOpacity={0.5}>
        1
        <Modal width={400} visible forceMask maskOpacity={0.5}>
          2
          <Modal width={400} visible forceMask maskOpacity={0.5}>
            3
          </Modal>
        </Modal>
      </Modal>
    )
    expect(document.getElementsByClassName(`${SO_PREFIX}-modal`).length).toBe(3)
    Array.from(document.getElementsByClassName(`${SO_PREFIX}-modal`)).forEach(i => {
      expect(i.style.background).toBe('rgba(0, 0, 0, 0.5)')
    })
    wrapper.unmount()
  })
})

describe('Modal[fullScreen]', () => {
  test('should set fullScreen', () => {
    const wrapper = mount(<Modal visible fullScreen />)
    expect(document.getElementsByClassName(`${SO_PREFIX}-modal`).length).toBe(1)
    expect(
      document.getElementsByClassName(`${SO_PREFIX}-modal`)[0].className.includes(`${SO_PREFIX}-modal-full-screen`)
    ).toBe(true)
    wrapper.unmount()
  })
})

describe('Modal[hideClose]', () => {
  test('should set hideClose', () => {
    const wrapper = mount(<Modal visible hideClose />)
    expect(document.getElementsByClassName(`${SO_PREFIX}-modal-close`).length).toBe(0)
    wrapper.unmount()
  })
})

describe('Modal[maskBackground]', () => {
  test('should set maskBackground', () => {
    const maskBackground = 'red'
    const wrapper = mount(<Modal visible maskBackground={maskBackground} />)
    Array.from(document.getElementsByClassName(`${SO_PREFIX}-modal`)).forEach(i => {
      expect(i.style.background).toBe(maskBackground)
    })
    wrapper.unmount()
  })
})

describe('Modal[maskCloseAble]', () => {
  test('should close by click mask', async () => {
    jest.useRealTimers()
    const wrapper = mount(<BaseModal />)
    wrapper.find(Button).simulate('click')
    await new Promise(r => {
      setTimeout(() => {
        r(true)
      }, 300)
    })
    expect(document.getElementsByClassName(`${SO_PREFIX}-modal`).length).toBe(1)
    wrapper.find(`.${SO_PREFIX}-modal-mask`).simulate('click')
    await new Promise(r => {
      setTimeout(() => {
        r(true)
      }, 300)
    })
    // expect(document.getElementsByClassName(`${SO_PREFIX}-modal`).length).toBe(0)
    expect(document.getElementsByClassName(`${SO_PREFIX}-modal`)[0].style.display).toBe('none')
    wrapper.unmount()
  })
})

describe('Modal[maskOpacity]', () => {
  test('should set maskOpacity', () => {
    const maskOpacity = 0.5
    const wrapper = mount(
      <Modal width={400} visible maskOpacity={maskOpacity}>
        1
        <Modal width={400} visible maskOpacity={maskOpacity}>
          2
          <Modal width={400} visible maskOpacity={maskOpacity}>
            3
          </Modal>
        </Modal>
      </Modal>
    )
    expect(document.getElementsByClassName(`${SO_PREFIX}-modal`).length).toBe(3)
    Array.from(document.getElementsByClassName(`${SO_PREFIX}-modal`)).forEach((i, index) => {
      if (index === 0) {
        expect(i.style.background).toBe(`rgba(0, 0, 0, ${maskOpacity})`)
      } else {
        expect(i.style.background).toBe('rgba(0, 0, 0, 0.01)')
      }
    })
    wrapper.unmount()
  })
})

describe('Modal[moveable]', () => {
  test('should set moveable', () => {
    const wrapper = mount(<Modal visible moveable />)
    expect(document.getElementsByClassName(`${SO_PREFIX}-card`)[0].className.includes(`${SO_PREFIX}-moveable`)).toBe(
      true
    )
    wrapper.unmount()
  })
})

// describe('Modal[noPadding]', () => {
//   test('', () => {})
// })

describe('Modal[onClose]', () => {
  test('should trigger onClose', () => {
    const onClose = jest.fn()
    const wrapper = mount(<Modal visible onClose={onClose} />)
    expect(document.getElementsByClassName(`${SO_PREFIX}-modal`).length).toBe(1)
    wrapper.find(`.${SO_PREFIX}-modal-mask`).simulate('click')
    expect(onClose).toBeCalled()
    wrapper.unmount()
  })
})

describe('Modal[padding]', () => {
  test('should set padding', () => {
    const padding = 20
    const wrapper = mount(<Modal visible padding={padding} />)
    expect(document.getElementsByClassName(`${SO_PREFIX}-modal`).length).toBe(1)
    expect(document.getElementsByClassName(`${SO_PREFIX}-card-body`)[0].style.padding).toBe(`${padding}px`)
    wrapper.unmount()
  })
})

describe('Modal[resizable]', () => {
  test('should resize', () => {
    const wrapper = mount(<Modal visible resizable />)
    expect(document.getElementsByClassName(`${SO_PREFIX}-card`)[0].className.includes(`${SO_PREFIX}-resizable`)).toBe(
      true
    )
    wrapper.unmount()
  })
})

describe('Modal[rootClassName]', () => {
  test('should set rootClassName', () => {
    const rootClassName = 'Shineout'
    const wrapper = mount(<Modal visible rootClassName={rootClassName} />)
    expect(document.getElementsByClassName(`${SO_PREFIX}-modal`)[0].className.includes(rootClassName)).toBe(true)
    wrapper.unmount()
  })
})

describe('Modal[title]', () => {
  test('should set title', () => {
    const title = 'Shineout'
    const wrapper = mount(<Modal visible title={title} />)
    expect(document.getElementsByClassName(`${SO_PREFIX}-modal-title`)[0].innerHTML).toBe(title)
    wrapper.unmount()
  })
})

describe('Modal[top]', () => {
  test('should set top when typeof top is Number', () => {
    const top = 100
    const wrapper = mount(<Modal visible top={top} />)
    expect(document.getElementsByClassName(`${SO_PREFIX}-modal-mask`)[0].style.paddingBottom).toBe(`${top}px`)
    wrapper.unmount()
  })

  test('should set top when typeof top is String', () => {
    const top = '30vh'
    const wrapper = mount(<Modal visible top={top} />)
    expect(document.getElementsByClassName(`${SO_PREFIX}-modal-mask`)[0].style.paddingBottom).toBe(top)
    wrapper.unmount()
  })
})

describe('Modal[usePortal]', () => {
  test('', () => {})
})

describe('Modal[visible]', () => {
  test('should set visible', () => {
    const wrapper = mount(<Modal visible />)
    expect(document.getElementsByClassName(`${SO_PREFIX}-modal`).length).toBe(1)
    wrapper.unmount()
  })
})

describe('Modal[width]', () => {
  test('should set width', () => {
    const width = 200
    const wrapper = mount(<Modal visible width={width} />)
    expect(document.getElementsByClassName(`${SO_PREFIX}-card`)[0].style.width).toBe(`${width}px`)
    wrapper.unmount()
  })
})

describe('Modal[zIndex]', () => {
  test('should set zIndex', () => {
    const zIndex = 3
    const wrapper = mount(<Modal visible zIndex={zIndex} />)
    expect(document.getElementsByClassName(`${SO_PREFIX}-modal`)[0].style.zIndex).toBe(String(zIndex))
    wrapper.unmount()
  })
})

describe('Modal[zoom]', () => {
  test('should set zoom animation', () => {
    const wrapper = mount(<Modal visible zoom />)
    expect(document.getElementsByClassName(`${SO_PREFIX}-card`)[0].className.includes(`${SO_PREFIX}-modal-zoom`)).toBe(
      true
    )
    wrapper.unmount()
  })
})

describe('Modal[zoom]', () => {
  test('should set zoom animation', () => {
    const wrapper = mount(<Modal visible zoom />)
    expect(document.getElementsByClassName(`${SO_PREFIX}-card`)[0].className.includes(`${SO_PREFIX}-modal-zoom`)).toBe(
      true
    )
    wrapper.unmount()
  })
})

describe('Modal[closeAll]', () => {
  test('should close all Modal', async () => {
    jest.useRealTimers()

    const wrapper = mount(
      <Modal width={400} visible destroy>
        1
        <Modal width={400} visible destroy>
          2
          <Modal width={400} visible destroy>
            3
          </Modal>
        </Modal>
      </Modal>
    )
    expect(document.getElementsByClassName(`${SO_PREFIX}-modal`).length).toBe(3)
    Modal.closeAll()
    await new Promise(r => {
      setTimeout(() => {
        r(true)
      }, 300)
    })
    expect(document.getElementsByClassName(`${SO_PREFIX}-modal`).length).toBe(0)
    wrapper.unmount()
  })
})
