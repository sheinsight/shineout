import React from 'react'
import { Tree } from 'shineout'
import { mount, shallow } from 'enzyme'
import Render from 'react-test-renderer'
import FontAwesome from '../../../site/pages/components/Icon/FontAwesome'
import TreeDisabled from '../../../site/pages/components/Tree/example-07-disabled.tsx'

const data = [
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
        id: '1-1',
        text: '1-1',
        children: [
          {
            id: '1-1-1',
            text: '1-1-1',
          },
        ],
      },
    ],
  },
]

/* global SO_PREFIX */
describe('Tree[Base]', () => {
  const keys = ['0', '0-0', '0-1', '1', '1-1', '1-1-1']
  test('should render correctly', () => {
    const wrapper = Render.create(<Tree expanded={keys} data={data} keygen="id" renderItem="text" />).toJSON()
    expect(wrapper).toMatchSnapshot()
  })

  test('should expand while click', () => {
    const wrapper = mount(<Tree data={data} keygen="id" renderItem="text" />)
    const firstNode = wrapper.find('Node').first()
    expect(firstNode.find('List').prop('expanded')).toBeFalsy()
    // expand tree
    wrapper
      .find(`a.${SO_PREFIX}-tree-icon-plus`)
      .first()
      .prop('onClick')()
    wrapper.update()
    expect(
      wrapper
        .find('List')
        .first()
        .prop('expanded')
    ).toBeTruthy()
  })

  test('should render className', () => {
    const className = 'test'
    const wrapper = shallow(<Tree className={className} data={data} keygen="id" renderItem="text" />)
    expect(wrapper.find('Root').hasClass(className)).toBeTruthy()
  })
})

describe('Tree[Icon]', () => {
  function renderItem(node, isExpanded) {
    let icon
    if (!node.children || node.children.length === 0) {
      icon = <FontAwesome name="file-text-o" />
    } else if (isExpanded) {
      icon = <FontAwesome name="folder-open" style={{ color: '#ffd666' }} />
    } else {
      icon = <FontAwesome name="folder" style={{ color: '#ffd666' }} />
    }

    return (
      <span>
        {icon} {node.text}
      </span>
    )
  }
  test('should render correctly', () => {
    const wrapper = Render.create(<Tree data={data} keygen="id" renderItem={renderItem} />).toJSON()
    expect(wrapper).toMatchSnapshot()
  })
})

describe('Tree[onClick]', () => {
  test('should call onClick', () => {
    const clickFn = jest.fn()
    const wrapper = mount(<Tree onClick={clickFn} data={data} keygen="id" renderItem="text" />)
    const firstNode = wrapper.find('Node').first()
    expect(firstNode.find('List').prop('expanded')).toBeFalsy()
    // expand tree
    wrapper
      .find(`div.${SO_PREFIX}-tree-text`)
      .first()
      .prop('onClick')()
    expect(clickFn.mock.calls[0][0].id).toBe('0')
  })
})

describe('Tree[no-line]', () => {
  test('should render without line', () => {
    const wrapper = mount(<Tree line={false} data={data} keygen="id" renderItem="text" />)
    expect(wrapper.find(`.${SO_PREFIX}-tree-no-line`).length > 0).toBeTruthy()
  })
})

describe('Tree[expanded]', () => {
  test('should expanded in controller', () => {
    const wrapper = mount(<Tree data={data} keygen="id" line={false} expanded={[]} renderItem="id" />)
    const propData = wrapper.find('ShineoutTree').prop('data')
    propData.forEach(v => {
      const { id } = v
      wrapper.setProps({
        expanded: [id],
      })
      wrapper.update()
      expect(
        wrapper
          .find(`Node[id="${id}"]`)
          .at(0)
          .find('Content')
          .first()
          .prop('expanded')
      ).toBeTruthy()
    })
  })
})

describe('Tree[Disabled]', () => {
  test('should render disabled', () => {
    const wrapper = mount(<TreeDisabled />)
    const disabled = wrapper.find('ShineoutTree').prop('disabled')
    wrapper.find('Node').forEach(node => {
      expect(
        node
          .find(`.${SO_PREFIX}-checkinput`)
          .first()
          .hasClass(`${SO_PREFIX}-checkinput-disabled`)
      ).toBe(disabled(node.prop('data')))
    })
  })
})
