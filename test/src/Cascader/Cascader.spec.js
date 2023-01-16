import { mount } from 'enzyme'
import React from 'react'
import { Cascader } from 'shineout'
import Tree from 'shineout/Datum/Tree'
import { cascader as data } from 'doc/data/tree'
import CascaderLazyload from '../../../site/pages/components/Cascader/example-05-lazyload'
import CascaderOpen from '../../../site/pages/components/Cascader/test-003-open'

/* global SO_PREFIX */
const userData = [
  {
    id: '0',
    text: '0',
    children: [
      {
        id: '0-0',
        text: '0-0',
      },
      {
        id: '0-1',
        text: '0-1',
      },
    ],
  },
  {
    id: '1',
    text: '1',
    children: [
      {
        id: '1-0',
        text: '1-0',
        children: [
          {
            id: '1-0-0',
            text: '1-0-0',
            children: [],
          },
        ],
      },
    ],
  },
]

const cityData = [
  {
    value: '江苏',
    children: [
      {
        value: '南京',
        children: [
          {
            value: '江宁',
            children: [
              {
                value: '东山',
              },
            ],
          },
          {
            value: '鼓楼',
          },
        ],
      },
      {
        value: '镇江',
        children: [
          {
            value: '丹阳',
          },
          {
            value: '句容',
          },
        ],
      },
    ],
  },
  {
    value: '安徽',
    children: [
      {
        value: '合肥',
        children: [
          {
            value: '肥东',
          },
        ],
      },
    ],
  },
]

describe('Cascader[Base]', () => {
  test('should show/hide list while click the Cascader/document', () => {
    const wrapper = mount(<Cascader data={data} keygen="id" renderItem={n => `node ${n.text}`} />)
    expect(wrapper.find(`.${SO_PREFIX}-select-options`).length).toBe(0)
    // simulate click
    wrapper.find(`.${SO_PREFIX}-cascader`).simulate('click')
    expect(wrapper.render().find(`.${SO_PREFIX}-select-options`).length).toBe(1)
    // click the document to dismiss
    HTMLDocument.prototype.getAttribute = () => 'test'
    const click = new UIEvent('click')
    document.dispatchEvent(click)
    expect(wrapper.find(`.${SO_PREFIX}-cascader`).hasClass(`${SO_PREFIX}-cascader-focus`)).toBeTruthy()
  })
  test('should render correct dom structure while selected', () => {
    jest.useFakeTimers()
    const datum = new Tree({
      data,
    })
    const wrapper = mount(<Cascader data={data} keygen="id" renderItem={n => `node ${n.text}`} />)
    // show options
    wrapper.find(`.${SO_PREFIX}-cascader`).simulate('click')
    let lastNodeData
    while (true) {
      jest.runAllTimers()
      wrapper.update()
      const lastList = wrapper.find('List').at(wrapper.find('List').length - 1)

      if (lastNodeData) {
        expect(lastList.find('Node').length).toBe(lastNodeData.children.length)
      }

      const node = lastList.find('Node').at(0)
      // eslint-disable-next-line
      const nodeData = datum.getDataById(node.prop('id'))
      lastNodeData = nodeData
      if (nodeData && nodeData.children && nodeData.children.length > 0) {
        node.find(`.${SO_PREFIX}-cascader-node`).simulate('click')
      } else {
        break
      }
    }
  })

  test('classname style', () => {
    const wrapper = mount(
      <Cascader
        className="test-class"
        style={{ color: 'red' }}
        data={data}
        keygen="id"
        renderItem={n => `node ${n.text}`}
      />
    ).find(`.${SO_PREFIX}-input.${SO_PREFIX}-select`)
    expect(wrapper.hasClass('test-class')).toBeTruthy()
    expect(wrapper.getDOMNode().style.color).toBe('red')
  })
})

describe('Cascader[multiple]', () => {
  test('should have checkbox', () => {
    const wrapper = mount(<Cascader data={userData} keygen="id" mode={0} renderItem={n => `${n.text}`} />)
    wrapper.find(`.${SO_PREFIX}-cascader`).simulate('click')
    expect(wrapper.find('input[type="checkbox"]').length).toBe(2)
  })
  test('should return correct value while use diff mode', () => {
    jest.useRealTimers()
    const modes = [0, 1, 2, 3]
    const expectsChose = [['0-0', '0-1', '0'], ['0-0', '0-1', '0'], ['0-0', '0-1'], ['0']]
    modes.forEach((mode, index) => {
      const wrapper = mount(<Cascader data={userData} keygen="id" mode={mode} renderItem={n => `${n.text}`} />)
      const datum = wrapper.find('Result').prop('datum')
      datum.set('0', 1)
      expect(datum.getValue()).toEqual(expectsChose[index])
    })
    modes.forEach((mode, index) => {
      const wrapper = mount(<Cascader data={userData} keygen="id" mode={mode} renderItem={n => `${n.text}`} />)
      wrapper.find(`.${SO_PREFIX}-cascader`).simulate('click')
      wrapper
        .find(`input[type="checkbox"]`)
        .at(0)
        .simulate('change', { target: { checked: true } })
      wrapper.update()
      const datum = wrapper.find('Result').prop('datum')
      expect(datum.getValue()).toEqual(expectsChose[index])
    })
  })
})

describe('Cascader[Hover]', () => {
  test('should expand while hover', () => {
    jest.useFakeTimers()
    const wrapper = mount(
      <Cascader data={userData} keygen="id" expandTrigger="hover-only" renderItem={n => `node ${n.text}`} />
    )
    // show options
    wrapper.find(`.${SO_PREFIX}-cascader`).simulate('click')
    expect(wrapper.find('List').length).toBe(1)
    wrapper
      .find(`.${SO_PREFIX}-cascader-node`)
      .first()
      .simulate('mouseEnter')
    jest.runAllTimers()
    wrapper.update()
    expect(wrapper.find('List').length).toBe(2)
  })
})

describe('Cascader[Disabled]', () => {
  test('should have disabled class', () => {
    const isDisabled = d => d.id === '0'
    const wrapper = mount(
      <Cascader data={userData} keygen="id" disabled={isDisabled} mode={2} renderItem={n => `node ${n.text}`} />
    )
    wrapper.find(`.${SO_PREFIX}-cascader`).simulate('click')
    expect(
      wrapper
        .find('Node')
        .first()
        .find(`.${SO_PREFIX}-cascader-disabled`).length
    ).toBe(1)
  })
})

describe('Cascader[Lazyload]', () => {
  test('default arrow is grow', () => {
    // jest.runAllTimers()
    const wrapper = mount(<CascaderLazyload />)
    wrapper.find(`.${SO_PREFIX}-cascader`).simulate('click')

    // console.log(wrapper.html())
    wrapper.update()
    wrapper.find('Node').forEach(node => {
      expect(node.find(`.${SO_PREFIX}-cascader-may-be-children`).length).toBe(1)
      // click to loading
      node.find(`.${SO_PREFIX}-cascader-node`).simulate('click')
      wrapper.update()
      expect(node.html().indexOf(`${SO_PREFIX}-spin-ring`) > 0).toBeTruthy()
    })
  })
})

describe('Cascader[childrenKey]', () => {
  it('should render children correctly', () => {
    const cData = [
      {
        value: 'jiangsu',
        city: [
          {
            value: 'nanjing',
            city: [
              {
                value: 'jiangning',
              },
            ],
          },
        ],
      },
      {
        value: 'anhui',
        city: [
          {
            value: 'hefei',
            city: [
              {
                value: 'feidong',
              },
            ],
          },
        ],
      },
    ]
    const wrapper = mount(<Cascader data={cData} keygen="value" renderItem="value" childrenKey="city" />)
    wrapper.find(`.${SO_PREFIX}-cascader`).simulate('click')
    expect(wrapper.find('.so-cascader-list').length).toBe(1)
    jest.useFakeTimers()
    wrapper
      .find('.so-cascader-node')
      .at(0)
      .simulate('click')
    jest.runAllTimers()
    wrapper.update()
    expect(wrapper.find('.so-cascader-list').length).toBe(2)
  })
})

describe('Cascader[onCollapse]', () => {
  const func = jest.fn()
  const wrapper = mount(<Cascader data={userData} keygen="id" renderItem={n => `node ${n.text}`} onCollapse={func} />)
  it('onCollpase should called when show or hide List', () => {
    expect(wrapper.find(`.${SO_PREFIX}-select-options`).length).toBe(0)
    // simulate click
    wrapper.find(`.${SO_PREFIX}-cascader`).simulate('click')
    expect(wrapper.render().find(`.${SO_PREFIX}-select-options`).length).toBe(1)
    expect(func.mock.calls[0][0]).toBe(true)
    // click the document to dismiss
    jest.useFakeTimers()
    wrapper
      .find(`Cascader`)
      .instance()
      .handleClickAway({ target: document.body })
    jest.runAllTimers()
    wrapper.update()
    expect(func.mock.calls[1][0]).toBe(false)
  })
})

describe('Cascader[onFilter]', () => {
  it('single  filter', () => {
    const wrapper = mount(
      <Cascader
        onFilter={text => d => d.text.indexOf(text) >= 0}
        data={userData}
        keygen="id"
        renderItem={n => `node ${n.text}`}
      />
    )
    jest.useFakeTimers()
    // 点击展开
    wrapper.find(`.so-cascader`).simulate('click')
    // 聚焦输入框
    wrapper.find(`.so-cascader-input`).simulate('focus')
    wrapper.find('.so-cascader-input').simulate('input', { target: { innerText: '0' } })
    jest.runAllTimers()
    wrapper.update()
    expect(wrapper.find('.so-cascader-filter-list').length).toBe(1)
    expect(wrapper.find('.so-cascader-filter-list .so-cascader-node').length).toBe(3)
    const right = wrapper
      .find('.so-cascader-node')
      .reduce((result, item) => result && item.text().indexOf('0') > -1, true)
    expect(right).toBe(true)
    wrapper
      .find('.so-cascader-filter-list .so-cascader-node')
      .at(0)
      .simulate('click', { stopPropagation: () => {} })
    expect(wrapper.find('.so-cascader-result .so-cascader-item').length).toBe(2)
  })
  it('multiple filter', () => {
    const wrapper = mount(
      <Cascader
        mode={0}
        onFilter={text => d => d.text.indexOf(text) >= 0}
        data={userData}
        keygen="id"
        renderItem={n => `node ${n.text}`}
      />
    )
    jest.useFakeTimers()
    // 点击展开
    wrapper.find(`.so-cascader`).simulate('click')
    // 聚焦输入框
    wrapper.find(`.so-cascader-input`).simulate('focus')
    wrapper.find('.so-cascader-input').simulate('input', { target: { innerText: '1-0-0' } })
    jest.runAllTimers()
    wrapper.update()
    const right = wrapper
      .find('.so-cascader-list .so-cascader-node')
      .reduce((result, item) => result && item.text().indexOf('1') > -1, true)
    expect(right).toBe(true)
  })
  it('wideMatch', () => {
    const wrapper = mount(
      <Cascader
        wideMatch
        onFilter={text => d => d.value.indexOf(text) >= 0}
        data={cityData}
        keygen="id"
        renderItem={n => `${n.value}`}
      />
    )
    jest.useFakeTimers()
    // 点击展开
    wrapper.find(`.so-cascader`).simulate('click')
    // 聚焦输入框
    wrapper.find(`.so-cascader-input`).simulate('focus')
    wrapper.find('.so-cascader-input').simulate('input', { target: { innerText: '江' } })
    jest.runAllTimers()
    wrapper.update()
    expect(wrapper.find('.so-cascader-filter-list').length).toBe(1)
    expect(wrapper.find('.so-cascader-filter-list .so-cascader-node').length).toBe(8)
    const right = wrapper
      .find('.so-cascader-list .so-cascader-node')
      .reduce((result, item) => result && item.text().indexOf('江') > -1, true)
    expect(right).toBe(true)
  })
})

describe('Cascader[renderItem, renderResult]', () => {
  const wrapper = mount(
    <Cascader data={userData} keygen="id" renderItem={d => `item-${d.id}`} renderResult={d => `result-${d.id}`} />
  )
  it('should renderItem', () => {
    wrapper.find(`.so-cascader`).simulate('click')
    const should = wrapper
      .find('.so-cascader-node')
      .reduce((result, item) => result && item.text().indexOf('item-') === 0, true)
    expect(should).toBeTruthy()
  })
  it('should renderResult', () => {
    jest.useFakeTimers()
    wrapper
      .find('.so-cascader-node')
      .at(0)
      .simulate('click')
    jest.runAllTimers()
    wrapper.update()
    const should = wrapper
      .find('.so-cascader-result .so-cascader-item')
      .reduce((result, item) => result && item.text().indexOf('result-') === 0, true)
    expect(should).toBeTruthy()
  })
})

describe('Cascader[singleRemove]', () => {
  it('should render remove and can click', () => {
    const wrapper = mount(
      <Cascader
        data={userData}
        keygen="id"
        singleRemove
        renderItem="id"
        defaultValue={['0', '0-0', '0-1', '1', '1-0', '1-0-0']}
      />
    )
    const items = wrapper.find('.so-cascader-result .so-cascader-item')
    items.forEach(item => {
      if (item.text() === '0' || item.text() === '1') {
        expect(item.find('.so-cascader-single-remove').length).toBe(1)
        item.find('.so-cascader-single-remove').simulate('click')
      }
    })
    wrapper.update()
    expect(wrapper.find('.so-cascader-result .so-cascader-item').length).toBe(0)
  })
})

describe('Cascader[size]', () => {
  const wrapper = mount(<Cascader data={userData} keygen="id" singleRemove renderItem="id" />)
  it.each(['small', 'large', 'default'], 'size: %s', size => {
    wrapper.setProps({ size })
    wrapper.update()
    expect(wrapper.find('.so-cascader').hasClass(`.so-cascader-${size}`)).toBeTruthy()
  })
})

describe('Cascader[defaultValue, clearable]', () => {
  const wrapper = mount(
    <Cascader
      data={userData}
      keygen="id"
      clearable
      renderItem="id"
      defaultValue={['0', '0-0', '0-1', '1', '1-0', '1-0-0']}
    />
  )
  it('should render defaultValue ', () => {
    expect(wrapper.find('.so-cascader-result .so-cascader-item').length).toBe(6)
  })

  it('should clear value when click clear', () => {
    expect(wrapper.find('.so-cascader-close').length).toBe(1)
    wrapper.find('.so-cascader-close').simulate('click')
    wrapper.update()
    expect(wrapper.find('.so-cascader-result .so-cascader-item').length).toBe(0)
  })
})

describe('Cascader[underline]', () => {
  const wrapper = mount(<Cascader data={userData} keygen="id" clearable renderItem="id" underline />)
  it('should render underline class', () => {
    expect(wrapper.find('.so-input').hasClass('so-input-underline')).toBeTruthy()
  })
})

describe('Cascader[showArrow]', () => {
  const wrapper = mount(<Cascader data={userData} keygen="id" clearable renderItem="id" showArrow={false} />)
  it('should render underline class', () => {
    expect(wrapper.find('.so-select-indicator.so-select-caret').length).toBe(0)
  })
})

describe('Cascader[unmatch]', () => {
  it('should render unmatch options', () => {
    const wrapper = mount(
      <Cascader
        data={userData}
        keygen="id"
        clearable
        renderItem={d => `id-${d.id}`}
        unmatch
        showArrow={false}
        defaultValue={['aaa', 'bbb']}
      />
    )
    expect(wrapper.find('.so-cascader .so-cascader-item').length).toBe(2)
  })
})

describe('Cascader[value onChange, filterSameChange]', () => {
  const onChangeHandler = jest.fn()
  const wrapper = mount(
    <Cascader data={userData} keygen="id" clearable renderItem="id" value={['0']} onChange={onChangeHandler} />
  )
  it('should value be 0', () => {
    expect(wrapper.find('.so-cascader-result .so-cascader-item').text()).toBe('0')
  })
  it('should trigger onChange', () => {
    wrapper.find(`.so-cascader`).simulate('click')
    wrapper
      .find(`.so-cascader-list .so-cascader-node`)
      .first()
      .simulate('click')
    expect(onChangeHandler.mock.calls.length).toBe(1)
    expect(onChangeHandler.mock.calls[0][0][0]).toBe('0')
  })

  it('should not trigger onChange', () => {
    wrapper.setProps({ filterSameChange: true })
    wrapper
      .find(`.so-cascader-list .so-cascader-node`)
      .first()
      .simulate('click')
    expect(onChangeHandler.mock.calls.length).toBe(1)
  })
})

describe('Cascader[onCollapse and open]', () => {
  it('onCollpase should called when show or hide List', async () => {
    const addListener = jest.fn(document.addEventListener)
    const rmListener = jest.fn(document.removeEventListener)
    document.addEventListener = addListener
    document.removeEventListener = rmListener

    const wrapper = mount(<CascaderOpen />)
    expect(wrapper.render().find(`.${SO_PREFIX}-select-options`).length).toBe(0)
    // 点击打开
    wrapper.find(`.${SO_PREFIX}-cascader`).simulate('click')
    expect(wrapper.render().find(`.${SO_PREFIX}-select-options`).length).toBe(1)
    expect(addListener.mock.calls.length).toBe(1)
    // 模拟点击关闭
    addListener.mock.calls[0][1]({ target: document.body })
    expect(wrapper.render().find(`.${SO_PREFIX}-select-options`).length).toBe(0)

    // 受控打开
    wrapper
      .find(`.${SO_PREFIX}-button`)
      .at(0)
      .simulate('click')
    expect(wrapper.render().find(`.${SO_PREFIX}-select-options`).length).toBe(1)
    expect(addListener.mock.calls.length).toBe(2)
    // 受控关闭
    wrapper
      .find(`.${SO_PREFIX}-button`)
      .at(1)
      .simulate('click')
    expect(wrapper.render().find(`.${SO_PREFIX}-select-options`).length).toBe(0)
    expect(rmListener.mock.calls.length).toBe(2)
  })
})
