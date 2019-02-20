import React from 'react'
import { mount } from 'enzyme'
import { Select } from 'shineout'
import { fetchSync as fetchCity } from 'doc/data/city'
import { vMultiple, vSingle } from './v_format'
import * as vFilter from './v_filter'
import { vAbsolute } from './v_other'
import SelectServerFilter from '../../../site/pages/components/Select/example-09-filter'
import SelectServerFilterM from '../../../site/pages/components/Select/example-10-filter'
import SelectColumns from '../../../site/pages/components/Select/example-14-columns'
import SelectBase from '../../../site/pages/components/Select/example-01-base'

/* global SO_PREFIX */

describe('Select[Base]', () => {
  let wrapper
  const data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']
  const placeholder = 'select_test'
  beforeAll(() => {
    wrapper = mount(<Select keygen data={data} placeholder={placeholder} />)
  })
  test('should render result label', () => {
    expect(wrapper.find(`.${SO_PREFIX}-select .${SO_PREFIX}-select-inner .${SO_PREFIX}-select-result`).length).toBe(1)
  })
  test('should show options while click', () => {
    document.write(wrapper.html())
    // show options
    wrapper.find(`.${SO_PREFIX}-select-inner`).simulate('click')
    const options = wrapper.find(`.${SO_PREFIX}-select-option`)
    expect(options.length).toBe(data.length)
    options.forEach((option, index) => {
      expect(option.text()).toBe(data[index])
    })
  })
  test('should render placeholder', () => {
    expect(
      wrapper
        .find(`.${SO_PREFIX}-input-placeholder`)
        .text()
        .trim()
    ).toBe(placeholder)
  })
  test('should highlight default value', () => {
    const wrapper2 = mount(<Select keygen data={data} defaultValue="red" />)
    document.write(wrapper2.html())
    // show options
    wrapper2.find(`.${SO_PREFIX}-select-inner`).simulate('click')
    const options = wrapper2.find(`.${SO_PREFIX}-select-option`)
    expect(options.find(`.${SO_PREFIX}-select-active`).text()).toBe('red')
  })
  test('should call onChange', () => {
    const changeFn = jest.fn()
    const wrapper2 = mount(<Select onChange={changeFn} keygen data={data} />)
    document.write(wrapper2.html())
    // show options
    wrapper2.find(`.${SO_PREFIX}-select-inner`).simulate('click')
    const options = wrapper2.find(`.${SO_PREFIX}-select-option`)
    options.forEach(option => {
      option.simulate('click')
    })
    data.forEach((color, index) => {
      expect(color).toBe(changeFn.mock.calls[index][0])
    })
  })
})

describe('Select[Format]', () => {
  const citys = fetchCity(100)
  test('should set format key and renderItem on single select', () => {
    const format = 'id'
    const renderItem = 'city'
    const changeFn = jest.fn()
    const wrapper = mount(
      <Select
        data={citys}
        onChange={changeFn}
        format={format}
        keygen="id"
        prediction={(v, d) => v === d.id}
        renderItem={renderItem}
      />
    )
    document.write(wrapper.html())
    vSingle({ changeFn, format, citys, wrapper, renderItem })
  })

  test('should set format key and renderItem on multiple select', () => {
    const format = 'id'
    const renderItem = 'city'
    const changeFn = jest.fn()
    const wrapper = mount(
      <Select
        multiple
        data={citys}
        onChange={changeFn}
        format={format}
        keygen="id"
        prediction={(v, d) => v === d.id}
        renderItem={renderItem}
      />
    )
    document.write(wrapper.html())
    vMultiple({ wrapper, format, changeFn, citys })
  })
})

describe('Select[Datum]', () => {
  const citys = fetchCity(100)
  test('should set format key and renderItem on single select', () => {
    const renderItem = 'city'
    const changeFn = jest.fn()
    const datum = { format: 'id' }
    const wrapper = mount(
      <Select
        data={citys}
        onChange={changeFn}
        datum={datum}
        keygen="id"
        prediction={(v, d) => v === d.id}
        renderItem={renderItem}
      />
    )
    document.write(wrapper.html())
    vSingle({ wrapper, citys, format: datum.format, changeFn, renderItem })
  })

  test('should set format key and renderItem on multiple select', () => {
    const renderItem = 'city'
    const changeFn = jest.fn()
    const datum = { format: 'id' }
    const wrapper = mount(
      <Select
        multiple
        data={citys}
        onChange={changeFn}
        datum={datum}
        keygen="id"
        prediction={(v, d) => v === d.id}
        renderItem={renderItem}
      />
    )
    document.write(wrapper.html())
    vMultiple({ wrapper, format: datum.format, changeFn, citys })
  })
})

describe('Select[Clearable]', () => {
  const data = ['red', 'blue', 'yellow']
  test('should have clear button & clear value', () => {
    const wrapper = mount(<Select defaultValue="red" data={data} keygen clearable />)
    expect(wrapper.find(`.${SO_PREFIX}-select-close`).length).toBe(1)
    // clear value
    wrapper.find(`.${SO_PREFIX}-select-close`).simulate('click')
    expect(wrapper.find('Select').prop('value')).toBeUndefined()
  })
  test('should have clear button & clear value on multiple select', () => {
    const wrapper = mount(<Select multiple defaultValue={['red', 'blue']} data={data} keygen clearable />)
    const closeBtn = wrapper.find(`.${SO_PREFIX}-select-result > .${SO_PREFIX}-select-close`)
    expect(closeBtn.length).toBe(1)
    // clear value
    closeBtn.simulate('click')
    expect(wrapper.find('Select').prop('value').length).toBe(0)
  })
})

describe('Select[Size]', () => {
  test('should render correct size', () => {
    const sizes = ['small', 'default', 'large']
    sizes.forEach(size => {
      const wrapper = mount(<Select size={size} data={sizes} keygen />)
      if (size !== 'default') {
        expect(wrapper.find(`.${SO_PREFIX}-select-${size}`).length).toBe(1)
      }
    })
  })
})

describe('Select[Multiple]', () => {
  test('should set array value', () => {
    const cities = fetchCity(10)
    const wrapper = mount(<Select multiple data={cities} keygen="id" format="city" renderItem="city" />)
    document.write(wrapper.html())
    // show options
    wrapper.find(`.${SO_PREFIX}-select-inner`).simulate('click')
    const options = wrapper.find(`.${SO_PREFIX}-select-option`)
    // select all of options
    options.forEach(option => {
      option.simulate('click')
    })
    expect(wrapper.find('Select').prop('value')).toEqual(cities.map(v => v.city))
  })
})

describe('Select[Disabled]', () => {
  test('should set disabled class', () => {
    const wrapper = mount(<Select data={['re']} keygen disabled />)
    expect(wrapper.find(`.${SO_PREFIX}-input-disabled`).length).toBe(1)
  })
  test('should disabled option', () => {
    const data = ['red', 'yello', 'blue']
    const disabled = v => v === 'red'
    const wrapper = mount(<Select data={data} keygen disabled={disabled} />)
    document.write(wrapper.html())
    // show options
    wrapper.find(`.${SO_PREFIX}-select-inner`).simulate('click')
    const options = wrapper.find(`.${SO_PREFIX}-select-option`)
    options.forEach(option => {
      expect(option.find('a').hasClass(`${SO_PREFIX}-select-disabled`)).toBe(
        disabled(
          option
            .find('a')
            .text()
            .trim()
        )
      )
    })
  })
})

describe('Select[Filter]', () => {
  test('should filter options', () => {
    jest.useFakeTimers()
    const data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']
    const wrapper = mount(<Select data={data} keygen onFilter={text => d => d.indexOf(text) >= 0} />)
    document.write(wrapper.html())
    vFilter.v({ wrapper, data })
  })
  test('should filter options on multiple select', () => {
    jest.useFakeTimers()
    const data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']
    const wrapper = mount(<Select multiple data={data} keygen onFilter={text => d => d.indexOf(text) >= 0} />)
    document.write(wrapper.html())
    vFilter.v({ wrapper, data })
  })
})

describe('Select[ServerFilter]', () => {
  test('should enter loading', () => {
    const wrapper = mount(<SelectServerFilter />)
    document.write(wrapper.html())
    vFilter.vLoading({ wrapper })
  })
  test('should enter loading on multiple', () => {
    const wrapper = mount(<SelectServerFilterM />)
    document.write(wrapper.html())
    vFilter.vLoading({ wrapper })
  })
})

describe('Select[Create]', () => {
  test('should render value while create', () => {
    jest.useFakeTimers()
    const data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']
    const finalValue = 'test'
    const wrapper = mount(<Select data={data} keygen onCreate />)
    document.write(wrapper.html())
    vFilter.vCreate({ wrapper, finalValue })
  })
  test('should render value while create on multiple', () => {
    jest.useFakeTimers()
    const data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']
    const finalValue = 'test'
    const wrapper = mount(<Select multiple data={data} keygen onCreate />)
    document.write(wrapper.html())
    vFilter.vCreate({ wrapper, finalValue, multiple: true })
  })
})

describe('Select[Absolute]', () => {
  test('should render in document', () => {
    const data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']
    const wrapper = mount(<Select className="absolute-single" absolute data={data} keygen />)
    vAbsolute({ wrapper, data })
  })
  test('should render in document on multiple select', () => {
    const data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']
    const wrapper = mount(<Select multiple className="absolute-single" absolute data={data} keygen />)
    vAbsolute({ wrapper, data })
  })
})

describe('Select[Single/Multiple dismiss]', () => {
  test('should select to dismiss on single', () => {
    jest.useFakeTimers()
    const wrapper = mount(<SelectBase />)
    document.write(wrapper.html())
    wrapper.find(`.${SO_PREFIX}-select-inner`).simulate('click')
    jest.runAllTimers()
    wrapper.update()
    expect(wrapper.find(`div.${SO_PREFIX}-hidable-show`).length).toBe(1)
    // select first option
    wrapper
      .find(`div.${SO_PREFIX}-scroll-inner a.${SO_PREFIX}-select-option`)
      .first()
      .simulate('click')
    jest.runAllTimers()
    wrapper.update()
    expect(wrapper.find(`div.${SO_PREFIX}-hidable-show`).length).toBe(0)
  })
  test('should not dismiss while select on single', () => {
    const data = ['red', 'blue']
    jest.useFakeTimers()
    const wrapper = mount(<Select data={data} multiple keygen />)
    document.write(wrapper.html())
    wrapper.find(`.${SO_PREFIX}-select-inner`).simulate('click')
    jest.runAllTimers()
    wrapper.update()
    expect(wrapper.find(`div.${SO_PREFIX}-hidable-show`).length).toBe(1)
    // select first option
    wrapper
      .find(`div.${SO_PREFIX}-scroll-inner a.${SO_PREFIX}-select-option`)
      .first()
      .simulate('click')
    jest.runAllTimers()
    wrapper.update()
    expect(wrapper.find(`div.${SO_PREFIX}-hidable-show`).length).toBe(1)
  })
})

describe('Select[Columns]', () => {
  test('should render columns', () => {
    const wrapper = mount(<SelectColumns />)
    document.write(wrapper.html())
    const singleSelect = wrapper.find('ShineoutSelect').first()
    const multipleSelect = wrapper.find('ShineoutSelect').last()
    singleSelect.find(`.${SO_PREFIX}-select-inner`).simulate('click')
    expect(singleSelect.find(`.${SO_PREFIX}-select-box-options`).length).toBe(1)
    multipleSelect.find(`.${SO_PREFIX}-select-inner`).simulate('click')
    expect(multipleSelect.find(`.${SO_PREFIX}-select-box-options`).length).toBe(1)
  })
})
