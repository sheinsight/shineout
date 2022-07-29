import { mount } from 'enzyme'
import React from 'react'
import { Checkbox } from 'shineout'
import CheckboxStatus from '../../../site/pages/components/Checkbox/example-02-checked.tsx'
import CheckboxRawGroup from '../../../site/pages/components/Checkbox/example-04-rawgroup.tsx'
import CheckboxGroup from '../../../site/pages/components/Checkbox/example-05-group.tsx'
import CheckboxFormat from '../../../site/pages/components/Checkbox/example-06-format.tsx'
import CheckboxBlock from '../../../site/pages/components/Checkbox/example-08-block.tsx'
import CheckboxDisabled from '../../../site/pages/components/Checkbox/example-09-disabled.tsx'
import CheckboxDisabledFunc from '../../../site/pages/components/Checkbox/example-10-disabled.tsx'
import CheckboxInput from '../../../site/pages/components/Checkbox/example-11-input.tsx'

/* global SO_PREFIX */
describe('Checkbox[Base]', () => {
  test('should react while click', () => {
    const wrapper = mount(<Checkbox>Checkbox</Checkbox>)
    expect(wrapper.find(`.${SO_PREFIX}-checkinput`).hasClass(`${SO_PREFIX}-checkinput-checked`)).toBeFalsy()
    // click label
    wrapper.find(`label.${SO_PREFIX}-checkinput input`).simulate('change', {
      target: {
        checked: true,
      },
    })
    wrapper.update()
    expect(wrapper.find(`.${SO_PREFIX}-checkinput`).hasClass(`${SO_PREFIX}-checkinput-checked`)).toBeTruthy()
  })
  test('should call onChange prop', () => {
    const fn = jest.fn()
    const wrapper = mount(<Checkbox onChange={fn} />)
    wrapper.find(`label.${SO_PREFIX}-checkinput input`).simulate('change', {
      target: {
        checked: true,
      },
    })
    expect(fn.mock.calls[0][0]).toBeTruthy()
    expect(fn.mock.calls[0][1]).toBeTruthy()
  })
})

describe('Checkbox[checked Status]', () => {
  test('should set correct class', () => {
    const wrapper = mount(<CheckboxStatus />)
    const statusMap = {
      false: 'checkinput',
      true: 'checkinput-checked',
      indeterminate: 'checkinput-indeterminate',
    }
    wrapper.find(Checkbox).forEach(checkbox => {
      const className = `.${SO_PREFIX}-${statusMap[checkbox.prop('checked')]}`
      expect(checkbox.find(className).length).toBe(1)
    })
  })
})

describe('Checkbox[htmlValue]', () => {
  test('should return htmlValue', () => {
    const fn = jest.fn()
    const checkedText = 'ok'
    const wrapper = mount(<Checkbox htmlValue={checkedText} onChange={fn} />)
    wrapper.find('input').simulate('change', {
      target: {
        checked: true,
      },
    })
    expect(fn.mock.calls[0][0]).toBe(checkedText)
  })
})

describe('CheckboxGroup[RawGroup]', () => {
  test('should render checkbox while use raw checkbox', () => {
    const wrapper = mount(<CheckboxRawGroup />)
    expect(wrapper.find(Checkbox).length).toBe(7)
  })
})

describe('CheckboxGroup[Group-Datum]', () => {
  test('should render checkbox while have data prop', () => {
    const wrapper = mount(<CheckboxGroup />)
    expect(wrapper.find('CheckItem').length).toBe(wrapper.find(Checkbox.Group).prop('data').length)
  })
})

describe('CheckboxGroup[Format]', () => {
  test('should render format value', () => {
    const data = [
      { id: 1, color: 'red' },
      { id: 2, color: 'cyan' },
      { id: 3, color: 'blue' },
      { id: 4, color: 'green' },
      { id: 5, color: 'yellow' },
      { id: 6, color: 'orange' },
      { id: 7, color: 'violet' },
    ]
    const wrapper = mount(<CheckboxFormat />)
    const format = wrapper.find(Checkbox.Group).prop('format')
    wrapper.find('CheckItem').forEach((item, index) => {
      const innerText = item.find(`.${SO_PREFIX}-checkinput span span`).text()
      expect(innerText).toBe(data[index][format])
    })
  })
})

describe('CheckboxGroup[block]', () => {
  test('should have block class', () => {
    const wrapper = mount(<CheckboxBlock />)
    expect(wrapper.find(`.${SO_PREFIX}-checkinput-block`).length).toBe(1)
  })
})

describe('Checkbox[disabled]', () => {
  test('should have disabled class', () => {
    const wrapper = mount(<CheckboxDisabled />)
    wrapper.find('CheckItem').forEach(item => {
      expect(item.find(`.${SO_PREFIX}-checkinput-disabled`).length).toBe(1)
      expect(item.find('input').prop('disabled')).toBeTruthy()
    })
  })

  test('should set disabled while func return true', () => {
    const wrapper = mount(<CheckboxDisabledFunc />)
    const disabledFunc = wrapper.find('ShineoutCheckboxGroup').prop('disabled')
    wrapper.find('CheckItem').forEach(item => {
      const value = item.prop('children')
      expect(item.find(`.${SO_PREFIX}-checkinput-disabled`).length).toBe(disabledFunc(value) ? 1 : 0)
    })
  })
})

describe('Checkbox[inputable]', () => {
  test('should show input while selected', () => {
    const wrapper = mount(<CheckboxInput />)
    expect(wrapper.find(`.${SO_PREFIX}-input`).length).toBe(0)
    // simulate chose
    wrapper.find('input[type="checkbox"]').simulate('change', {
      target: {
        checked: true,
      },
    })
    expect(wrapper.find(`.${SO_PREFIX}-input`).length).toBe(1)
  })
})

describe('Checkbox[value]', () => {
  test('should checked same as value === htmlValue ', () => {
    const wrapper = mount(<Checkbox htmlValue="red" value="blue" onChange={() => {}} />)
    expect(
      wrapper
        .find('CheckItem')
        .instance()
        .getChecked()
    ).toBeFalsy()
    wrapper.setProps({ value: 'red' })
    expect(
      wrapper
        .find('CheckItem')
        .instance()
        .getChecked()
    ).toBeTruthy()
  })
})

describe('CheckboxGroup[prediction]', () => {
  test('should render true value', () => {
    const data = [{ value: 'red' }]
    const value = [{ value: 'red' }]
    const wrapper = mount(
      <Checkbox.Group
        format="value"
        keygen="value"
        renderItem="value"
        defaultValue={value}
        data={data}
        prediction={(v, d) => v && v.value === d.value}
      />
    )
    expect(wrapper.find('.so-checkinput').hasClass('so-checkinput-checked')).toBeTruthy()
  })
})
