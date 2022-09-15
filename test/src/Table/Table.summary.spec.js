import React from 'react'
import { mount } from 'enzyme'
import TFooterSimple from '../../../site/pages/components/Table/example-34-summary-01'
import TFooterFixed from '../../../site/pages/components/Table/example-34-summary-02-fixed'

describe('Table[foots]', () => {
  it('should simpletable render foots', () => {
    const wrapper = mount(<TFooterSimple />)
    expect(wrapper.find('.so-table-foot').length).toBe(1)
    expect(wrapper.find('.so-table-foot table tr').length).toBe(2)
  })
  it('should seprate render foots', () => {
    const wrapper = mount(<TFooterFixed />)
    expect(wrapper.find('.so-table-foot').length).toBe(1)
    expect(wrapper.find('.so-table-foot table tr').length).toBe(1)
    expect(
      wrapper
        .find('.so-table-foot table tr td')
        .at(0)
        .hasClass('so-table-fixed-left')
    ).toBeTruthy()
    expect(
      wrapper
        .find('.so-table-foot table tr td')
        .at(0)
        .hasClass('so-table-fixed-last')
    ).toBeTruthy()
    expect(
      wrapper
        .find('.so-table-foot table tr td')
        .at(2)
        .hasClass('so-table-fixed-right')
    ).toBeTruthy()
    expect(
      wrapper
        .find('.so-table-foot table tr td')
        .at(2)
        .hasClass('so-table-fixed-first')
    ).toBeTruthy()
  })
})
