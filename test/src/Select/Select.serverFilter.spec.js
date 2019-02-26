import { mount } from 'enzyme/build'
import React from 'react'
import { appendToDOM } from '../../utils'
import * as vFilter from './v_filter'
import SelectServerFilter from '../../../site/pages/components/Select/example-09-filter'
import SelectServerFilterM from '../../../site/pages/components/Select/example-10-filter'

describe('Select[ServerFilter]', () => {
  test('should enter loading', () => {
    const wrapper = mount(<SelectServerFilter />)
    appendToDOM(wrapper.html())
    vFilter.vLoading({ wrapper })
  })
  test('should enter loading on multiple', () => {
    const wrapper = mount(<SelectServerFilterM />)
    appendToDOM(wrapper.html())
    vFilter.vLoading({ wrapper })
  })
})
