import { mount } from 'enzyme/build'
import React from 'react'
import { Select } from 'shineout'
import { fetchSync as fetchCity } from 'doc/data/city'
import { appendToDOM } from '../../utils'
import { vMultiple, vSingle } from './v_format'

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
    appendToDOM(wrapper.html())
    vSingle({ wrapper, citys, format: datum.format, changeFn, renderItem })
  })

  test('should set format key and renderItem on multiple select', () => {
    const renderItem = 'city'
    const changeFn = jest.fn()
    const datum = { format: 'id' }

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
            data={citys}
            onChange={this.handleChange}
            value={this.state.value}
            datum={datum}
            keygen="id"
            prediction={(v, d) => v === d.id}
            renderItem={renderItem}
          />
        )
      }
    }

    const wrapper = mount(<Demo />)
    appendToDOM(wrapper.html())
    vMultiple({ wrapper, format: datum.format, changeFn, citys })
  })
})
