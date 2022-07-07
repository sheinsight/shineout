import { mount } from 'enzyme'
import React from 'react'
import { Cascader } from 'shineout'
/* global SO_PREFIX */

describe('修复 Cascader unmatch = false, compressed = true, value 传入不配的值后，高度塌陷问题', () => {
  it('有placeholder 就不会有高度塌陷', () => {
    const wrapper = mount(
      <Cascader
        compressed
        data={[]}
        defaultValue={['aaa']}
        placeholder
        absolute
        keygen="value"
        renderItem={n => `${n.value}`}
      />
    )
    expect(wrapper.find(`.${SO_PREFIX}-input-placeholder`).length).toBe(1)
  })
})
