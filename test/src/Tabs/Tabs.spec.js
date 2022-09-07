import React from 'react'
import { Tabs } from 'shineout'
import { mount } from 'enzyme'
import { Link, BrowserRouter } from 'react-router-dom'
import { baseTest, delay } from '../../utils'
import TabsActive from '../../../site/pages/components/Tabs/example-05-active'
import TabsShapeLine from '../../../site/pages/components/Tabs/example-06-shape-line'
import TabsShapeButton from '../../../site/pages/components/Tabs/example-07-shape-button'
import TabsCollapsible from '../../../site/pages/components/Tabs/example-11-collapsible'

/* global SO_PREFIX */
describe('Tabs[Active]', () => {
  test('should active controlled', () => {
    const wrapper = mount(<TabsActive />)
    wrapper.find(`.${SO_PREFIX}-checkinput`).forEach(radio => {
      const text = radio
        .find(`.${SO_PREFIX}-checkinput-desc`)
        .first()
        .text()

      // simulate change
      radio
        .find(`input[type="radio"]`)
        .first()
        .simulate('change', () => ({
          target: {
            checked: true,
          },
        }))

      wrapper.update()

      const tabText = wrapper
        .find(`.${SO_PREFIX}-tabs-active`)
        .first()
        .text()

      expect(text[0].toUpperCase() + text.substring(1) === tabText).toBe(true)
    })
  })
})

describe('Tabs[Shape-Line]', () => {
  test('should render line class', () => {
    const lineWrapper = mount(<TabsShapeLine />)
    expect(lineWrapper.find(`.${SO_PREFIX}-tabs-line`)).toHaveLength(1)
    const buttonWrapper = mount(<TabsShapeButton />)
    expect(buttonWrapper.find(`.${SO_PREFIX}-tabs-button`)).toHaveLength(1)
  })
})

describe('Tabs[align]', () => {
  test('should render align class', () => {
    ;['left', 'right', 'vertical-left', 'vertical-right'].forEach(align => {
      const wrapper = mount(
        <Tabs defaultActive={1} align={align}>
          <Tabs.Panel tab="Home">Test</Tabs.Panel>
        </Tabs>
      )
      expect(wrapper.find(`.${SO_PREFIX}-tabs-align-${align}`)).toHaveLength(1)
    })
  })
})

describe('Tabs[collapsible]', () => {
  test('should render expand button', () => {
    const wrapper = mount(<TabsCollapsible />)
    document.body.innerHTML += wrapper.html()
    expect(wrapper.find(`.${SO_PREFIX}-tabs-header span.${SO_PREFIX}-tabs-indicator`)).toHaveLength(1)

    // default expand
    expect(wrapper.find(`div.${SO_PREFIX}-hidable-collapse`).hasClass(`${SO_PREFIX}-hidable-show`)).toBeTruthy()
    wrapper.find(`.${SO_PREFIX}-tabs-header span.${SO_PREFIX}-tabs-indicator`).simulate('click')
    expect(wrapper.find(`div.${SO_PREFIX}-hidable-collapse`).hasClass(`${SO_PREFIX}-hidable-show`)).toBeFalsy()
  })

  test('should set collapsible', async () => {
    jest.useRealTimers()
    const wrapper = mount(
      <Tabs defaultActive={1} collapsible>
        <Tabs.Panel tab="A">Test</Tabs.Panel>
        <Tabs.Panel tab="B">Test</Tabs.Panel>
      </Tabs>
    )
    const handleCollapse = jest.fn()
    wrapper.instance().handleCollapse = handleCollapse
    wrapper.find(`.${SO_PREFIX}-tabs-tab`).forEach(i => {
      i.simulate('click')
    })
    await delay(200)
    expect(handleCollapse).toBeCalledTimes(2)
  })
})

describe('Tabs[extra]', () => {
  test('should render a extra button', () => {
    const wrapper = mount(
      <Tabs defaultActive={1}>
        <Tabs.Panel tab="Home">Test</Tabs.Panel>
      </Tabs>
    )
    expect(wrapper.find(`.${SO_PREFIX}-tabs-extra`)).toHaveLength(0)

    const wrapper1 = mount(
      <Tabs defaultActive={1} tabBarExtraContent="niconiconi">
        <Tabs.Panel tab="Home">Test</Tabs.Panel>
      </Tabs>
    )
    expect(wrapper1.find(`.${SO_PREFIX}-tabs-extra`)).toHaveLength(1)
  })
})

describe('Tabs[autoFill]', () => {
  test('should set autoFill', () => {
    const wrapper = mount(
      <div style={{ height: 500 }}>
        <Tabs defaultActive={1} autoFill>
          <Tabs.Panel tab="Home">Test</Tabs.Panel>
        </Tabs>
      </div>
    )

    expect(wrapper.find(`.${SO_PREFIX}-tabs`).hasClass(`${SO_PREFIX}-tabs-auto-fill`)).toBe(true)
  })
})

describe('Tabs[background]', () => {
  test('should set background', () => {
    const background = 'blue'
    const wrapper = mount(
      <Tabs defaultActive={1} background={background}>
        <Tabs.Panel tab="A">Test</Tabs.Panel>
        <Tabs.Panel tab="B">Test</Tabs.Panel>
        <Tabs.Panel tab="C">Test</Tabs.Panel>
      </Tabs>
    )

    expect(wrapper.find(`.${SO_PREFIX}-tabs-active`).getDOMNode().style.background).toBe(background)
  })
})

describe('Tabs[border]', () => {
  test('should set border (this attribute will change border-color)', () => {
    const border = 'blue'
    const wrapper = mount(
      <Tabs defaultActive={1} border={border}>
        <Tabs.Panel tab="A">Test</Tabs.Panel>
        <Tabs.Panel tab="B">Test</Tabs.Panel>
        <Tabs.Panel tab="C">Test</Tabs.Panel>
      </Tabs>
    )
    expect(wrapper.find(`.${SO_PREFIX}-tabs-hr`).getDOMNode().style.borderColor).toBe(border)
  })
})

describe('Tabs[base]', () => {
  test('should custom style and className', () => {
    baseTest(Tabs, `.${SO_PREFIX}-tabs`)
  })
})

describe('Tabs[color]', () => {
  test('should set color when shape is card', () => {
    const color = 'red'
    const wrapper = mount(
      <Tabs shape="card" defaultActive={1} color={color}>
        <Tabs.Panel tab="A">Test</Tabs.Panel>
        <Tabs.Panel tab="B">Test</Tabs.Panel>
        <Tabs.Panel tab="C">Test</Tabs.Panel>
      </Tabs>
    )
    expect(wrapper.find(`.${SO_PREFIX}-tabs-active`).getDOMNode().style.color).toBe(color)
  })
})

describe('Tabs[defaultActive]', () => {
  test('should set defaultActive', () => {
    const defaultActive = 2
    const wrapper = mount(
      <Tabs defaultActive={defaultActive}>
        <Tabs.Panel tab="A">Test</Tabs.Panel>
        <Tabs.Panel tab="B">Test</Tabs.Panel>
        <Tabs.Panel tab="C">Test</Tabs.Panel>
      </Tabs>
    )
    expect(
      wrapper
        .find(`.${SO_PREFIX}-tabs-tab`)
        .last()
        .hasClass(`${SO_PREFIX}-tabs-active`)
    ).toBe(true)
  })
})

describe('Tabs[defaultCollapsed]', () => {
  test('should set defaultCollapsed', () => {
    jest.useRealTimers()
    const wrapper = mount(
      <Tabs defaultActive={1} collapsible defaultCollapsed>
        <Tabs.Panel tab="A">Test</Tabs.Panel>
        <Tabs.Panel tab="B">Test</Tabs.Panel>
        <Tabs.Panel tab="C">Test</Tabs.Panel>
      </Tabs>
    )
    expect(wrapper.find(`.${SO_PREFIX}-list.${SO_PREFIX}-hidable-collapse`).length).toBe(1)
  })
})

describe('Tabs[hideSplit]', () => {
  test('should set hideSplit', () => {
    const wrapper = mount(
      <Tabs defaultActive={1} hideSplit>
        <Tabs.Panel tab="A">Test</Tabs.Panel>
        <Tabs.Panel tab="B">Test</Tabs.Panel>
        <Tabs.Panel tab="C">Test</Tabs.Panel>
      </Tabs>
    )
    expect(wrapper.find(`.${SO_PREFIX}-tabs-hr`).length).toBe(0)
  })
})

describe('Tabs[inactiveBackground]', () => {
  test('should set inactiveBackground', () => {
    const inactiveBackground = 'green'
    const wrapper = mount(
      <Tabs defaultActive={1} inactiveBackground={inactiveBackground}>
        <Tabs.Panel tab="A">Test</Tabs.Panel>
        <Tabs.Panel tab="B">Test</Tabs.Panel>
        <Tabs.Panel tab="C">Test</Tabs.Panel>
      </Tabs>
    )
    expect(wrapper.find(`.${SO_PREFIX}-tabs-tab:not(.${SO_PREFIX}-tabs-active)`).length).toBe(2)
    wrapper.find(`.${SO_PREFIX}-tabs-tab:not(.${SO_PREFIX}-tabs-active)`).forEach(i => {
      expect(i.getDOMNode().style.background).toBe(inactiveBackground)
    })
    expect(wrapper.find(`.${SO_PREFIX}-tabs-active`).getDOMNode().style.background).toBe('')
  })
})

describe('Tabs[lazy]', () => {
  test('should set lazy when lazy is True', () => {
    const wrapper = mount(
      <Tabs defaultActive={1} lazy>
        <Tabs.Panel tab="A">Test</Tabs.Panel>
        <Tabs.Panel tab="B">Test</Tabs.Panel>
        <Tabs.Panel tab="C">Test</Tabs.Panel>
      </Tabs>
    )
    expect(wrapper.find(`.${SO_PREFIX}-tabs-panel`).length).toBe(1)
    expect(wrapper.find(`.${SO_PREFIX}-tabs-tab`).length).toBe(3)
    wrapper.find(`.${SO_PREFIX}-tabs-tab`).forEach(i => {
      i.simulate('click')
    })
    expect(wrapper.find(`.${SO_PREFIX}-tabs-panel`).length).toBe(wrapper.find(`.${SO_PREFIX}-tabs-tab`).length)
  })

  test('should set lazy when lazy is False', () => {
    const wrapper = mount(
      <Tabs defaultActive={1} lazy={false}>
        <Tabs.Panel tab="A">Test</Tabs.Panel>
        <Tabs.Panel tab="B">Test</Tabs.Panel>
        <Tabs.Panel tab="C">Test</Tabs.Panel>
      </Tabs>
    )
    expect(wrapper.find(`.${SO_PREFIX}-tabs-panel`).length).toBe(wrapper.find(`.${SO_PREFIX}-tabs-tab`).length)
  })
})

describe('Tabs[onChange]', () => {
  test('should set onChange', () => {
    const handleChange = jest.fn()
    const wrapper = mount(
      <Tabs defaultActive={1} onChange={handleChange}>
        <Tabs.Panel tab="A">Test</Tabs.Panel>
        <Tabs.Panel tab="B">Test</Tabs.Panel>
        <Tabs.Panel tab="C">Test</Tabs.Panel>
      </Tabs>
    )
    wrapper.find(`.${SO_PREFIX}-tabs-tab`).forEach(i => {
      i.simulate('click')
    })
    expect(handleChange).toBeCalledTimes(wrapper.find(`.${SO_PREFIX}-tabs-tab`).length)
  })
})

describe('Tabs[shape]', () => {
  test('should set onChange', () => {
    const shape = ['card', 'line', 'button', 'bordered', 'dash']
    shape.forEach(i => {
      const wrapper = mount(
        <Tabs defaultActive={1} shape={i}>
          <Tabs.Panel tab="A">Test</Tabs.Panel>
          <Tabs.Panel tab="B">Test</Tabs.Panel>
          <Tabs.Panel tab="C">Test</Tabs.Panel>
        </Tabs>
      )
      expect(wrapper.find(`.${SO_PREFIX}-tabs`).hasClass(`${SO_PREFIX}-tabs-${i}`)).toBe(true)
    })
  })
})

// this attribute will be test by e2e
// describe('Tabs[sticky]', () => {
//   test('should set sticky', () => {})
// })

describe('Tabs[switchToTop]', () => {
  test('should set switchToTop when sticky is True', () => {
    const switchToTop = jest.fn()

    const wrapper = mount(
      <Tabs defaultActive={1} sticky switchToTop>
        <Tabs.Panel tab="A">Test</Tabs.Panel>
        <Tabs.Panel tab="B">Test</Tabs.Panel>
        <Tabs.Panel tab="C">Test</Tabs.Panel>
      </Tabs>
    )
    // set component state to simulate switchToTop
    wrapper.instance().container.scrollIntoView = switchToTop
    wrapper.instance().sticky = true
    wrapper
      .find(`.${SO_PREFIX}-tabs-tab`)
      .first()
      .simulate('click')
    expect(switchToTop).toBeCalled()
  })
})

describe('Tabs[tabBarExtraContent]', () => {
  test('should set tabBarExtraContent and typeof tabBarExtraContent is String', () => {
    const tabBarExtraContent = 'Hello'
    const wrapper = mount(
      <Tabs defaultActive={1} tabBarExtraContent={tabBarExtraContent}>
        <Tabs.Panel tab="A">Test</Tabs.Panel>
        <Tabs.Panel tab="B">Test</Tabs.Panel>
        <Tabs.Panel tab="C">Test</Tabs.Panel>
      </Tabs>
    )

    expect(wrapper.find(`.${SO_PREFIX}-tabs-extra`).length).toBe(1)
    expect(wrapper.find(`.${SO_PREFIX}-tabs-extra`).text()).toBe(tabBarExtraContent)
  })

  test('should set tabBarExtraContent and typeof tabBarExtraContent is ReactNode', () => {
    const tabBarExtraContent = <div className="hello">Hello</div>
    const wrapper = mount(
      <Tabs defaultActive={1} tabBarExtraContent={tabBarExtraContent}>
        <Tabs.Panel tab="A">Test</Tabs.Panel>
        <Tabs.Panel tab="B">Test</Tabs.Panel>
        <Tabs.Panel tab="C">Test</Tabs.Panel>
      </Tabs>
    )

    expect(wrapper.find(`.${SO_PREFIX}-tabs-extra`).length).toBe(1)
    expect(
      wrapper
        .find(`.${SO_PREFIX}-tabs-extra`)
        .children()
        .hasClass('hello')
    ).toBe(true)
  })
})

describe('Tabs[tabBarStyle]', () => {
  test('should set tabBarStyle', () => {
    const tabBarStyle = 'red'
    const wrapper = mount(
      <Tabs defaultActive={1} tabBarStyle={{ color: tabBarStyle }}>
        <Tabs.Panel tab="A">Test</Tabs.Panel>
        <Tabs.Panel tab="B">Test</Tabs.Panel>
        <Tabs.Panel tab="C">Test</Tabs.Panel>
      </Tabs>
    )
    expect(wrapper.find(`.${SO_PREFIX}-tabs-header`).getDOMNode().style.color).toBe(tabBarStyle)
  })
})

describe('Tabs.Panel[background]', () => {
  test('should set Tabs.Panel background', () => {
    const pannel = [
      {
        tab: 'A',
        background: 'red',
      },
      {
        tab: 'B',
        background: 'blue',
      },
      {
        tab: 'C',
        background: 'green',
      },
    ]
    const wrapper = mount(
      <Tabs defaultActive={1}>
        {pannel.map(i => (
          <Tabs.Panel key={i} tab={i.tab} background={i.background}>
            Test
          </Tabs.Panel>
        ))}
      </Tabs>
    )

    wrapper.find(`.${SO_PREFIX}-tabs-tab`).forEach((i, index) => {
      i.simulate('click')
      wrapper.update()
      expect(
        wrapper
          .find(`.${SO_PREFIX}-tabs-panel`)
          .at(index)
          .getDOMNode().style.background
      ).toBe(pannel[index].background)
    })
  })
})

describe('Tabs.Panel[border]', () => {
  test('should set Tabs.Panel border', () => {
    const pannel = [
      {
        tab: 'A',
        border: 'red',
      },
      {
        tab: 'B',
        border: 'blue',
      },
      {
        tab: 'C',
        border: 'green',
      },
    ]
    const wrapper = mount(
      <Tabs defaultActive={1}>
        {pannel.map(i => (
          <Tabs.Panel key={i} tab={i.tab} border={i.border}>
            Test
          </Tabs.Panel>
        ))}
      </Tabs>
    )

    wrapper.find(`.${SO_PREFIX}-tabs-tab`).forEach((i, index) => {
      i.simulate('click')
      wrapper.update()
      expect(
        wrapper
          .find(`.${SO_PREFIX}-tabs-tab`)
          .at(index)
          .getDOMNode().style.borderColor
      ).toBe(`${pannel[index].border} ${pannel[index].border} ${pannel[index].border} ${pannel[index].border}`)
    })
  })
})

describe('Tabs.Panel[base]', () => {
  test('should set Tabs.Panel base', () => {
    baseTest(Tabs.Panel, `.${SO_PREFIX}-tabs-panel`)
  })
})

describe('Tabs.Panel[disabled]', () => {
  test('should set Tabs.Panel disabled', () => {
    const wrapper = mount(
      <Tabs defaultActive={1}>
        <Tabs.Panel tab="A">Test</Tabs.Panel>
        <Tabs.Panel tab="B">Test</Tabs.Panel>
        <Tabs.Panel tab="C" disabled>
          Test
        </Tabs.Panel>
      </Tabs>
    )
    expect(
      wrapper
        .find(`.${SO_PREFIX}-tabs-tab`)
        .last()
        .hasClass(`${SO_PREFIX}-tabs-disabled`)
    ).toBe(true)
    wrapper
      .find(`.${SO_PREFIX}-tabs-tab`)
      .last()
      .simulate('click')

    expect(
      wrapper
        .find(`.${SO_PREFIX}-tabs-tab`)
        .last()
        .hasClass(`${SO_PREFIX}-tabs-active`)
    ).toBe(false)
  })
})

describe('Tabs.Panel[id]', () => {
  test('should set Tabs.Panel id', () => {
    const pannel = [
      {
        id: 'A',
        tab: 'A',
      },
      {
        id: 'B',
        tab: 'B',
      },
      {
        id: 'C',
        tab: 'C',
      },
    ]

    const handleChange = jest.fn()
    const wrapper = mount(
      <Tabs defaultActive={1} onChange={handleChange}>
        {pannel.map(i => (
          <Tabs.Panel key={i} tab={i.tab} id={i.id}>
            Test
          </Tabs.Panel>
        ))}
      </Tabs>
    )
    wrapper.find(`.${SO_PREFIX}-tabs-tab`).forEach(i => {
      i.simulate('click')
    })

    expect(handleChange).toBeCalledTimes(pannel.length)
    handleChange.mock.calls.forEach((i, index) => {
      expect(i[0]).toBe(pannel[index].id)
    })
  })
})

describe('Tabs.Panel[tab]', () => {
  test('should set Tabs.Panel tab', () => {
    const pannel = [
      {
        id: 'A',
        tab: 'A',
      },
      {
        id: 'B',
        tab: 'B',
      },
      {
        id: 'C',
        tab: 'C',
      },
    ]
    const wrapper = mount(
      <Tabs defaultActive={1}>
        {pannel.map(i => (
          <Tabs.Panel key={i} tab={i.tab} id={i.id}>
            Test
          </Tabs.Panel>
        ))}
      </Tabs>
    )

    wrapper.find(`.${SO_PREFIX}-tabs-tab`).forEach((i, index) => {
      expect(i.text()).toBe(pannel[index].tab)
    })
  })
})

describe('Tabs.Link', () => {
  test('should set Tabs.Link and custom click', () => {
    const handleClick = jest.fn()
    const wrapper = mount(
      <BrowserRouter>
        <Tabs defaultActive={2} shape="line">
          <Tabs.Link>
            <Link to="#tab-link" onClick={handleClick}>
              Link
            </Link>
          </Tabs.Link>
          <Tabs.Link>Link</Tabs.Link>
        </Tabs>
      </BrowserRouter>
    )

    wrapper
      .find('a')
      .first()
      .simulate('click')
    expect(handleClick).toBeCalled()
  })
})

describe('Tabs[unmount]', () => {
  test('should unmount', () => {
    const wrapper = mount(
      <Tabs defaultActive={0}>
        <Tabs.Panel tab="A">Test</Tabs.Panel>
      </Tabs>
    )
    expect(wrapper.find(`.${SO_PREFIX}-tabs`).length).toBe(1)
    wrapper.unmount()
    expect(wrapper.find(`.${SO_PREFIX}-tabs`).length).toBe(0)
  })
})
