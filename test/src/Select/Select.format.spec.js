import { mount } from 'enzyme/build'
import React from 'react'
import { Select } from 'shineout'
import { appendToDOM } from '../../utils'
import { vMultiple, vSingle } from './v_format'
import { fetchSync as fetchCity } from 'doc/data/city'

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
    appendToDOM(wrapper.html())
    vSingle({ changeFn, format, citys, wrapper, renderItem })
  })

  test('should set format key and renderItem on multiple select', () => {
    const changeFn = jest.fn()
    class Demo extends React.Component {
      constructor(props) {
        super(props)
        this.state = { value: [] }
      }

      handleChange = v => {
        this.setState({ value: v })
        changeFn(v)
      }

      render() {
        return (
          <Select
            multiple
            value={this.state.value}
            data={citys}
            onChange={this.handleChange}
            format="id"
            keygen="id"
            prediction={(v, d) => v === d.id}
            renderItem="city"
          />
        )
      }
    }
    const wrapper = mount(<Demo />)
    appendToDOM(wrapper.html())
    vMultiple({ wrapper, format: 'id', changeFn, citys })
  })
})
