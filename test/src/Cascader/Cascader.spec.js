import { mount, shallow } from 'enzyme'
import React from 'react'
import Cascader from 'shineout/Cascader'
import Tree from 'shineout/Datum/Tree'
import { cascader as data } from 'doc/data/tree'
import CascaderLazyload from '../../../site/pages/components/Cascader/example-05-lazyload'

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
})

describe('Cascader[multiple]', () => {
  test('should have checkbox', () => {
    const wrapper = mount(<Cascader data={userData} keygen="id" mode={0} renderItem={n => `${n.text}`} />)
    wrapper.find(`.${SO_PREFIX}-cascader`).simulate('click')
    expect(wrapper.find('input[type="checkbox"]').length).toBe(2)
  })
  test('should return correct value while use diff mode', () => {
    const modes = [0, 1, 2, 3]
    const expectsChose = [['0', '0-0', '0-1'], ['0', '0-0', '0-1'], ['0-0', '0-1'], ['0']]
    modes.forEach((mode, index) => {
      const wrapper = mount(<Cascader data={userData} keygen="id" mode={mode} renderItem={n => `${n.text}`} />)
      const datum = wrapper.find('Result').prop('datum')
      datum.set('0', 1)
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
