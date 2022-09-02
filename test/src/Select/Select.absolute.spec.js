import { mount } from 'enzyme/build'
import React from 'react'
import { Select } from 'shineout'
import { vAbsolute } from './v_other'

describe('Select[Absolute]', () => {
  test('should render in document', () => {
    const data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']
    const wrapper = mount(<Select className="absolute-single" absolute data={data} keygen />)
    vAbsolute({ wrapper, data })
  })
})

