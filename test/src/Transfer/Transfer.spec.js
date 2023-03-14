import { mount } from 'enzyme'
import React from 'react'
import { Transfer } from 'shineout'
import { baseTest } from '../../utils'

const data = [
  {
    id: 0,
    content: 'content 0',
  },
  {
    id: 1,
    content: 'content 1',
  },
  {
    id: 2,
    content: 'content 2',
  },
]

/* global SO_PREFIX */

describe('Transfer[base]', () => {
  test('should custom style and className', () => {
    baseTest(Transfer, `.${SO_PREFIX}-transfer`)
  })
})

describe('Transfer[defaultSelectedKeys]', () => {
  test('should set defaultSelectedKeys', () => {
    const wrapper = mount(
      <Transfer
        data={data}
        format="id"
        keygen="id"
        renderItem="content"
        titles={['Source', 'Target']}
        defaultSelectedKeys={[0, 1, 2]}
      />
    )
    wrapper.find(`.${SO_PREFIX}-transfer-body-container label.${SO_PREFIX}-checkinput`).forEach(checkbox => {
      expect(checkbox.hasClass(`${SO_PREFIX}-checkinput-checked`)).toBe(true)
    })
  })
})

describe('Transfer[disabled]', () => {
  test('should set disabled when typeof disabled is Boolean', () => {
    const wrapper = mount(
      <Transfer
        disabled
        data={data}
        format="id"
        keygen="id"
        renderItem="content"
        titles={['Source', 'Target']}
        defaultSelectedKeys={[0, 1, 2]}
      />
    )
    wrapper.find(`label.${SO_PREFIX}-checkinput`).forEach(checkbox => {
      expect(checkbox.hasClass(`${SO_PREFIX}-checkinput-disabled`)).toBe(true)
    })
  })

  test('should set disabled when typeof disabled is Function', () => {
    const wrapper = mount(
      <Transfer
        disabled={d => d.id === 0}
        data={data}
        format="id"
        keygen="id"
        renderItem="content"
        titles={['Source', 'Target']}
        defaultSelectedKeys={[0, 1, 2]}
      />
    )
    expect(wrapper.find(`.${SO_PREFIX}-checkinput-disabled`).length).toBe(1)
    expect(wrapper.find(`.${SO_PREFIX}-checkinput-disabled .${SO_PREFIX}-checkinput-desc`).text()).toBe('content 0')
  })
})

describe('Transfer[empty]', () => {
  test('should set empty', () => {
    const empty = 'Hello'
    const wrapper = mount(
      <Transfer format="id" keygen="id" empty={empty} renderItem="content" titles={['Source', 'Target']} />
    )
    wrapper.find(`.${SO_PREFIX}-transfer-empty`).forEach(i => {
      expect(i.text()).toBe(empty)
    })
  })
})

describe('Transfer[footers]', () => {
  test('should set footers', () => {
    const wrapper = mount(
      <Transfer
        footers={[<div>Hello</div>, <div>Shineout</div>]}
        format="id"
        keygen="id"
        renderItem="content"
        titles={['Source', 'Target']}
      />
    )
    expect(
      wrapper
        .find(`.${SO_PREFIX}-card-footer`)
        .first()
        .text()
    ).toBe('Hello')

    expect(
      wrapper
        .find(`.${SO_PREFIX}-card-footer`)
        .last()
        .text()
    ).toBe('Shineout')
  })
})

// describe('Transfer[lineHeight]', () => {
//   test('should set lineHeight', () => {})
// })

describe('Transfer[listClassName]', () => {
  test('should set listClassName', () => {
    const wrapper = mount(
      <Transfer listClassName="hello" format="id" keygen="id" renderItem="content" titles={['Source', 'Target']} />
    )
    expect(
      wrapper
        .find(`.${SO_PREFIX}-card-body`)
        .first()
        .hasClass('hello')
    ).toBe(true)
  })
})

describe('Transfer[listStyle]', () => {
  test('should set listStyle', () => {
    const wrapper = mount(
      <Transfer
        format="id"
        keygen="id"
        renderItem="content"
        listStyle={{ color: 'red' }}
        titles={['Source', 'Target']}
      />
    )
    expect(
      wrapper
        .find(`.${SO_PREFIX}-card-body`)
        .first()
        .getDOMNode().style.color
    ).toBe('red')
  })
})

describe('Transfer[loading]', () => {
  test('should set loading', () => {
    const wrapper = mount(
      <Transfer loading format="id" keygen="id" renderItem="content" titles={['Source', 'Target']} />
    )
    expect(wrapper.find(`.${SO_PREFIX}-spin-loading`).length).toBe(2)
  })
})

describe('Transfer[onFilter]', () => {
  test('should set onFilter', () => {
    jest.useFakeTimers()
    const handleFilter = jest.fn()
    const wrapper = mount(
      <Transfer
        onFilter={handleFilter}
        data={data}
        format="id"
        keygen="id"
        renderItem="content"
        titles={['Source', 'Target']}
      />
    )
    wrapper
      .find('.so-input')
      .first()
      .find('input')
      .simulate('change', { target: { value: 'hello' } })
    jest.runAllTimers()
    expect(handleFilter).toBeCalled()
  })
})

describe('Transfer[onSearch]', () => {
  test('should set onSearch when input is Source', () => {
    jest.useFakeTimers()
    const handleSearch = jest.fn()
    const handleFilter = jest.fn()
    const wrapper = mount(
      <Transfer
        data={data}
        format="id"
        keygen="id"
        renderItem="content"
        onSearch={handleSearch}
        onFilter={handleFilter}
        titles={['Source', 'Target']}
      />
    )
    wrapper
      .find('.so-input')
      .first()
      .find('input')
      .simulate('change', { target: { value: 'hello' } })
    jest.runAllTimers()
    expect(handleSearch).toBeCalled()
    expect(handleSearch.mock.calls[0][0]).toBe('hello')
    expect(handleSearch.mock.calls[0][1]).toBe(true)
  })

  test('should set onSearch when input is Target', () => {
    jest.useFakeTimers()
    const handleSearch = jest.fn()
    const handleFilter = jest.fn()
    const wrapper = mount(
      <Transfer
        data={data}
        format="id"
        keygen="id"
        renderItem="content"
        onSearch={handleSearch}
        onFilter={handleFilter}
        titles={['Source', 'Target']}
      />
    )
    wrapper
      .find('.so-input')
      .last()
      .find('input')
      .simulate('change', { target: { value: 'hello' } })
    jest.runAllTimers()
    expect(handleSearch).toBeCalled()
    expect(handleSearch.mock.calls[0][0]).toBe('hello')
    expect(handleSearch.mock.calls[0][1]).toBe(false)
  })
})

describe('Transfer[onSelectChange]', () => {
  test('should set onSelectChange', () => {
    const handleChange = jest.fn()
    const wrapper = mount(
      <Transfer
        data={data}
        format="id"
        keygen="id"
        renderItem="content"
        onSelectChange={handleChange}
        titles={['Source', 'Target']}
      />
    )
    const source = wrapper.find(`.${SO_PREFIX}-transfer-card-body`).first()
    source
      .find(`label.${SO_PREFIX}-checkinput input`)
      .at(0)
      .simulate('change', { target: { checked: true } })
    expect(handleChange).toBeCalled()
    expect(handleChange.mock.calls[0][0][0]).toBe(0)
  })
})

describe('Transfer[operationIcon]', () => {
  test('should set operationIcon', () => {
    const wrapper = mount(
      <Transfer
        data={data}
        format="id"
        keygen="id"
        renderItem="content"
        operationIcon={false}
        titles={['Source', 'Target']}
      />
    )
    expect(wrapper.find(`.${SO_PREFIX}-transfer-btns svg`).length).toBe(0)
  })
})

describe('Transfer[operations]', () => {
  test('should set operations', () => {
    const wrapper = mount(
      <Transfer
        data={data}
        format="id"
        keygen="id"
        renderItem="content"
        operationIcon={false}
        titles={['Source', 'Target']}
        operations={[<div className="to">1</div>, <div className="from">2</div>]}
      />
    )
    expect(wrapper.find(`.${SO_PREFIX}-transfer-btns .to`).length).toBe(1)
    expect(wrapper.find(`.${SO_PREFIX}-transfer-btns .from`).length).toBe(1)

    expect(wrapper.find(`.${SO_PREFIX}-transfer-btns .to`).text()).toBe('1')
    expect(wrapper.find(`.${SO_PREFIX}-transfer-btns .from`).text()).toBe('2')
  })
})

// describe('Transfer[prediction]', () => {
//   test('should set prediction', () => {})
// })

describe('Transfer[renderFilter]', () => {
  test('should set renderFilter', () => {
    const renderFilter = jest.fn(props => <div className="hello">{props.isSource ? 0 : 1}</div>)
    const handleFilter = jest.fn()
    const wrapper = mount(
      <Transfer
        data={data}
        format="id"
        keygen="id"
        renderItem="content"
        operationIcon={false}
        onFilter={handleFilter}
        titles={['Source', 'Target']}
        renderFilter={renderFilter}
      />
    )
    expect(renderFilter).toBeCalled()
    expect(wrapper.find(`.${SO_PREFIX}-transfer-filter .hello`).length).toBe(2)
    expect(
      wrapper
        .find(`.${SO_PREFIX}-transfer-filter .hello`)
        .at(0)
        .text()
    ).toBe('0')
    expect(
      wrapper
        .find(`.${SO_PREFIX}-transfer-filter .hello`)
        .at(1)
        .text()
    ).toBe('1')
  })
})

describe('Transfer[rowsInView]', () => {
  test('should set rowsInView', () => {
    const rowsInView = 1
    const wrapper = mount(
      <Transfer
        data={data}
        format="id"
        keygen="id"
        rowsInView={rowsInView}
        renderItem="content"
        titles={['Source', 'Target']}
      />
    )
    expect(wrapper.find(`.${SO_PREFIX}-transfer-item`).length).toBe(rowsInView)
  })
})

// describe('Transfer[selectedKeys]', () => {
//   test('should set selectedKeys', () => {})
// })

describe('Transfer[titles]', () => {
  test('should set titles', () => {
    const wrapper = mount(
      <Transfer data={data} format="id" keygen="id" renderItem="content" titles={['Source', 'Target']} />
    )
    expect(
      wrapper
        .find(`.${SO_PREFIX}-transfer-card-header-title`)
        .first()
        .text()
    ).toBe('Source')

    expect(
      wrapper
        .find(`.${SO_PREFIX}-transfer-card-header-title`)
        .last()
        .text()
    ).toBe('Target')
  })
})

describe('Transfer[change]', () => {
  test('should set source to target', () => {
    const wrapper = mount(
      <Transfer
        data={data}
        format="id"
        keygen="id"
        renderItem="content"
        operationIcon={false}
        disabled={d => d.id > 4}
        titles={['Source', 'Target']}
      />
    )

    const source = wrapper.find(`.${SO_PREFIX}-transfer-card-body`).first()
    const target = wrapper.find(`.${SO_PREFIX}-transfer-card-body`).last()

    const sourceButton = wrapper.find(`.${SO_PREFIX}-transfer-btns button`).first()

    // check all
    wrapper
      .find(`label.${SO_PREFIX}-checkinput input`)
      .first()
      .simulate('change', { target: { checked: true } })

    sourceButton.simulate('click')
    wrapper.update()
    expect(source.html().match(/class="so-transfer-item"/g)).toBe(null)
    expect(target.html().match(/class="so-transfer-item"/g).length).toBe(3)
  })
})

describe('Transfer[value]', () => {
  test('should set value', () => {
    const valueChange = jest.fn()
    const App = () => {
      const [value, setValue] = React.useState([])
      const [selectedKeys, setSelectedKeys] = React.useState([])

      const handleChange = v => {
        valueChange(v)
        setValue(v)
      }
      const selectChange = (sourceKeys, targetKeys) => {
        setSelectedKeys([...sourceKeys, ...targetKeys])
      }
      return (
        <Transfer
          data={data}
          format="id"
          keygen="id"
          value={value}
          renderItem="content"
          onChange={handleChange}
          selectedKeys={selectedKeys}
          onSelectChange={selectChange}
          titles={['Source', 'Target']}
        />
      )
    }
    const wrapper = mount(<App />)
    const source = wrapper.find(`.${SO_PREFIX}-transfer-card-body`).first()
    const sourceButton = wrapper.find(`.${SO_PREFIX}-transfer-btns button`).first()

    source
      .find(`label.${SO_PREFIX}-checkinput input`)
      .first()
      .simulate('change', { target: { checked: true } })

    sourceButton.simulate('click')

    expect(valueChange).toBeCalled()
    expect(valueChange.mock.calls[0][0].toString()).toBe('0')
  })
})
