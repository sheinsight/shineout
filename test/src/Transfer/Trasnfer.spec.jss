import { mount } from 'enzyme'
import React from 'react'
import { Transfer } from 'shineout'

const data = ['1', '2', '3']

describe('Transfer[base]', () => {
  test('should render Transfer', () => {
    const wrapper = mount(<Transfer keygen={k => k} data={data} />)
    const source = wrapper.find('ShineoutCard').at(0)
    const target = wrapper.find('ShineoutCard').at(1)

    ;[(1, 2)].forEach(v => {
      source
        .find('ShineoutCheckbox')
        .at(v)
        .find(`label.so-checkinput input`)
        .simulate('change', {
          target: {
            checked: true,
          },
        })
    })

    wrapper.update()

    wrapper
      .find('ShineoutButton')
      .at(0)
      .simulate('click')

    console.log(
      source
        .find('ShineoutCheckbox')
        .at(1)
        .debug()
    )

    wrapper.update()

    expect(target.find('.so-transfer-item').length).toBe(2)
  })
})
