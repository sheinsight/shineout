import { mount } from 'enzyme'
import { CardGroup } from 'shineout'
import React from 'react'
import { baseTest } from '../../utils'

/* global SO_PREFIX */

describe('CardGroup[cardWidth]', () => {
  test('should card have minWidth', () => {
    const cardWidth = 200
    const wrapper = mount(
      <CardGroup cardWidth={cardWidth}>
        <CardGroup.Item>
          <div>Item</div>
        </CardGroup.Item>
      </CardGroup>
    )

    expect(wrapper.find(`.${SO_PREFIX}-card-group-grid`).getDOMNode().style.gridTemplateColumns).toBe(
      `repeat(auto-fill, minmax(${cardWidth}px, 1fr))`
    )
  })
})

describe('CardGroup[baseTest]', () => {
  test('should have custom class name and style', () => {
    baseTest(CardGroup, `.${SO_PREFIX}-card-group`)
  })
})

describe('CardGroup[columns]', () => {
  test('should set columns', () => {
    const columns = 5
    const wrapper = mount(
      <CardGroup columns={columns}>
        <CardGroup.Item>
          <div>Item</div>
        </CardGroup.Item>
      </CardGroup>
    )

    expect(wrapper.find(`.${SO_PREFIX}-card-group-grid`).getDOMNode().style.gridTemplateColumns).toBe(
      `repeat(${columns}, 1fr)`
    )
  })
})

describe('CardGroup[gridStyle]', () => {
  test('should custom grid style', () => {
    const gridStyle = { background: 'red' }
    const wrapper = mount(
      <CardGroup gridStyle={gridStyle}>
        <CardGroup.Item>
          <div>Item</div>
        </CardGroup.Item>
      </CardGroup>
    )
    const contains = (a, b) => Object.entries(b).every(([k, v]) => a[k] === v)
    expect(contains(wrapper.find(`.${SO_PREFIX}-card-group-grid`).getDOMNode().style, gridStyle)).toBeTruthy()
  })
})

describe('CardGroup[gutter]', () => {
  test('should custom gutter', () => {
    const gutter = 34
    const wrapper = mount(
      <CardGroup gutter={gutter}>
        <CardGroup.Item>
          <div>Item</div>
        </CardGroup.Item>
      </CardGroup>
    )
    const girdNode = wrapper.find(`.${SO_PREFIX}-card-group-grid`).getDOMNode()

    expect(girdNode.style.gridRowGap).toBe(`${gutter}px`)
    expect(girdNode.style.gridColumnGap).toBe(`${gutter}px`)
  })
})

describe('CardGroup[height]', () => {
  test('should set height', () => {
    const height = 500
    const wrapper = mount(
      <CardGroup height={height}>
        <CardGroup.Item>
          <div>Item</div>
        </CardGroup.Item>
      </CardGroup>
    )

    expect(wrapper.find(`.${SO_PREFIX}-card-group`).getDOMNode().style.height).toBe(`${height}px`)
  })
})

describe('CardGroupItem[checked]', () => {
  const wrapper = mount(
    <CardGroup>
      <CardGroup.Item checked>
        <div>Item</div>
      </CardGroup.Item>
    </CardGroup>
  )
  expect(wrapper.find(`.${SO_PREFIX}-checkinput-checked`).length).toBe(1)
})

describe('CardGroupItem[baseTest]', () => {
  test('should custom grid style', () => {
    baseTest(CardGroup.Item, `.${SO_PREFIX}-card-group-item`)
  })
})

// this attribute will be tested by e2e
// describe('CardGroupItem[disabled]', () => {})

describe('CardGroupItem[onChange value]', () => {
  const onChange = jest.fn()
  const wrapper = mount(
    <CardGroup>
      <CardGroup.Item checked={false} value="value" onChange={onChange}>
        <div>Item</div>
      </CardGroup.Item>
    </CardGroup>
  )
  wrapper.find(`label.${SO_PREFIX}-checkinput input`).simulate('change', {
    target: {
      checked: true,
    },
  })
  expect(onChange).toBeCalledTimes(1)
  expect(onChange.mock.calls[0][0]).toBe(true)
  expect(onChange.mock.calls[0][1]).toBe('value')
})

// this attribute will be tested by e2e
// describe('CardGroupItem[placeholder]', () => {})
