import React from 'react'
import { mount } from 'enzyme'
import { List } from 'shineout'
import { baseTest } from '../../utils'

/* global SO_PREFIX */

const data = [
  {
    id: 1,
    firstName: 'A',
    lastName: 'a',
  },
  {
    id: 2,
    firstName: 'B',
    lastName: 'b',
  },
  {
    id: 3,
    firstName: 'C',
    lastName: 'c',
  },
]

describe('List[base]', () => {
  test('should custom style and className', () => {
    baseTest(List, `.${SO_PREFIX}-list-default`)
  })
})

describe('List[bordered]', () => {
  test('should set bordered', () => {
    const wrapper = mount(
      <List keygen="id" data={data} bordered renderItem={d => <div>{d.firstName + d.lastName}</div>} />
    )
    expect(wrapper.find(`.${SO_PREFIX}-list-container`).hasClass(`${SO_PREFIX}-list-bordered`)).toBe(true)
  })
})

describe('List[colNum]', () => {
  test('should set colNum', () => {
    const colNum = 2
    const wrapper = mount(
      <List colNum={colNum} keygen="id" data={data} bordered renderItem={d => <div>{d.firstName + d.lastName}</div>} />
    )
    expect(
      wrapper
        .find(`.${SO_PREFIX}-list-list>div`)
        .getDOMNode()
        .style['grid-template-columns'].split(' ').length
    ).toBe(colNum)
  })
})

describe('List[empty]', () => {
  test('should set empty', () => {
    const wrapper = mount(
      <List
        empty={<div>Hello</div>}
        keygen="id"
        data={[]}
        bordered
        renderItem={d => <div>{d.firstName + d.lastName}</div>}
      />
    )
    expect(wrapper.find(`.${SO_PREFIX}-list-list.${SO_PREFIX}-list-empty`).length).toBe(1)
    expect(wrapper.find(`.${SO_PREFIX}-list-list.${SO_PREFIX}-list-empty`).text()).toBe('Hello')
  })
})

describe('List[fixed]', () => {
  test('should set fixed', () => {
    const wrapper = mount(
      <List fixed keygen="id" data={data} renderItem={d => <div>{d.firstName + d.lastName}</div>} />
    )
    expect(wrapper.find(`.${SO_PREFIX}-list-container`).hasClass(`${SO_PREFIX}-list-fixed`)).toBe(true)
  })
})

describe('List[footer]', () => {
  test('should set footer', () => {
    const wrapper = mount(
      <List footer={<div>Hello</div>} keygen="id" data={data} renderItem={d => <div>{d.firstName + d.lastName}</div>} />
    )
    expect(wrapper.find(`.${SO_PREFIX}-list-footer`).length).toBe(1)
    expect(wrapper.find(`.${SO_PREFIX}-list-footer`).text()).toBe('Hello')
  })
})

describe('List[format]', () => {
  test('should set format', () => {
    const handleChange = jest.fn()
    const wrapper = mount(
      <List
        keygen="id"
        data={data}
        onChange={handleChange}
        format={d => `id ${d.id}`}
        renderItem={d => <div>{d.firstName + d.lastName}</div>}
      />
    )
    wrapper
      .find(`input`)
      .first()
      .simulate('change', { target: { checked: true } })
    expect(handleChange).toBeCalled()
    expect(handleChange.mock.calls[0][0].toString()).toBe('id 1')
  })
})

// describe('List[lineHeight]', () => {
//   test('should set lineHeight', () => {})
// })

describe('List[loading]', () => {
  test('should set loading', () => {
    const wrapper = mount(
      <List loading keygen="id" data={data} renderItem={d => <div>{d.firstName + d.lastName}</div>} />
    )
    expect(wrapper.find(`.${SO_PREFIX}-list-loading`).length).toBe(1)
  })
})

describe('List[onChange]', () => {
  test('should set onChange', () => {
    const handleChange = jest.fn()
    const wrapper = mount(
      <List keygen="id" data={data} onChange={handleChange} renderItem={d => <div>{d.firstName + d.lastName}</div>} />
    )
    wrapper
      .find(`input`)
      .first()
      .simulate('change', { target: { checked: true } })
    expect(handleChange).toBeCalled()
    expect(handleChange.mock.calls[0][0][0]).toBe(data[0])
  })

  test('onChange style', () => {
    const handleChange = jest.fn()
    const wrapper = mount(
      <List keygen="id" data={data} onChange={handleChange} renderItem={d => <div>{d.firstName + d.lastName}</div>} />
    )

    expect(wrapper.find(`.${SO_PREFIX}-list-item-meta`).length).toBe(3)
  })
})

describe('List[rowClassName]', () => {
  test('should set rowClassName', () => {
    const wrapper = mount(
      <List
        keygen="id"
        data={data}
        rowClassName={() => 'Shineout'}
        renderItem={d => <div>{d.firstName + d.lastName}</div>}
      />
    )
    wrapper.find(`.${SO_PREFIX}-list-item`).forEach(item => {
      expect(item.hasClass('Shineout')).toBe(true)
    })
  })
})

describe('List[rowsInView]', () => {
  test('should set rowsInView', () => {
    const wrapper = mount(
      <List fixed keygen="id" data={data} rowsInView={1} renderItem={d => <div>{d.firstName + d.lastName}</div>} />
    )
    expect(wrapper.find(`.${SO_PREFIX}-list-item`).length).toBe(1)
  })
})

describe('List[scrollLoading]', () => {
  test('should set scrollLoading', () => {
    const scrollLoading = jest.fn()
    const wrapper = mount(
      <List
        style={{ maxHeight: 100, overflow: 'scroll' }}
        scrollLoading={scrollLoading}
        keygen="id"
        data={data}
        rowsInView={1}
        renderItem={d => <div>{d.firstName + d.lastName}</div>}
      />
    )
    const event = new UIEvent('scroll')
    event.initUIEvent('scroll')
    wrapper
      .find(`.${SO_PREFIX}-list-container`)
      .getDOMNode()
      .dispatchEvent(event)

    expect(scrollLoading).toBeCalled()
  })
})

describe('List[size]', () => {
  test('should set size small', () => {
    const wrapper = mount(
      <List size="small" keygen="id" data={data} renderItem={d => <div>{d.firstName + d.lastName}</div>} />
    )
    expect(wrapper.find(`.${SO_PREFIX}-list-container`).hasClass(`${SO_PREFIX}-list-small`)).toBe(true)
  })

  test('should set size large', () => {
    const wrapper = mount(
      <List size="large" keygen="id" data={data} renderItem={d => <div>{d.firstName + d.lastName}</div>} />
    )
    expect(wrapper.find(`.${SO_PREFIX}-list-container`).hasClass(`${SO_PREFIX}-list-large`)).toBe(true)
  })
})

describe('List[unmount]', () => {
  test('should unmount', () => {
    const wrapper = mount(<List keygen="id" data={data} renderItem={d => <div>{d.firstName + d.lastName}</div>} />)
    wrapper.unmount()
    expect(wrapper.find(`.${SO_PREFIX}-list-container`).length).toBe(0)
  })
})

describe('List[renderItem]', () => {
  test('should set renderItem when typeof renderItem is String', () => {
    const renderItem = 'firstName'
    const wrapper = mount(<List keygen="id" data={data} renderItem={renderItem} />)
    wrapper.find(`.${SO_PREFIX}-list-item`).forEach((item, index) => {
      expect(item.text()).toBe(data[index][renderItem])
    })
  })
})

describe('List.BaseItem[avatar]', () => {
  test('should set avatar when typeof avatar is ReactNode', () => {
    const Item = () => <List.BaseItem avatar={<div>Hello</div>} />
    const wrapper = mount(<List keygen="id" data={data} renderItem={d => Item(d)} />)
    wrapper.find(`.${SO_PREFIX}-list-meta-avatar`).forEach(avatar => {
      expect(avatar.text()).toBe('Hello')
    })
  })

  test('should set avatar when typeof avatar is String', () => {
    const Item = () => <List.BaseItem avatar="url" />
    const wrapper = mount(<List keygen="id" data={data} renderItem={d => Item(d)} />)
    wrapper.find(`.${SO_PREFIX}-list-meta-avatar`).forEach(avatar => {
      expect(avatar.text()).toBe('loading...')
    })
  })

  test('should set avatar when typeof avatar is Function', () => {
    const Item = () => <List.BaseItem avatar={() => <div>Hello</div>} />
    const wrapper = mount(<List keygen="id" data={data} renderItem={d => Item(d)} />)
    wrapper.find(`.${SO_PREFIX}-list-meta-avatar`).forEach(avatar => {
      expect(avatar.text()).toBe('Hello')
    })
  })
})

describe('List.BaseItem[content]', () => {
  test('should set content', () => {
    const Item = () => <List.BaseItem content={<div>Hello</div>} />
    const wrapper = mount(<List keygen="id" data={data} renderItem={d => Item(d)} />)
    wrapper.find(`.${SO_PREFIX}-list-meta-content`).forEach(content => {
      expect(content.text()).toBe('Hello')
    })
  })
})

describe('List.BaseItem[desc]', () => {
  test('should set desc', () => {
    const Item = () => <List.BaseItem desc="Hello" />
    const wrapper = mount(<List keygen="id" data={data} renderItem={d => Item(d)} />)
    wrapper.find(`.${SO_PREFIX}-list-meta-desc`).forEach(desc => {
      expect(desc.text()).toBe('Hello')
    })
  })
})

describe('List.BaseItem[extra]', () => {
  test('should set extra', () => {
    const Item = () => <List.BaseItem extra={['Hello', 'Shineout']} />
    const wrapper = mount(<List keygen="id" data={data} renderItem={d => Item(d)} />)
    wrapper.find(`.${SO_PREFIX}-list-meta-extra`).forEach(extra => {
      expect(extra.text()).toBe('HelloShineout')
    })
  })
})

describe('List.BaseItem[title]', () => {
  test('should set title', () => {
    const Item = () => <List.BaseItem title="Hello" />
    const wrapper = mount(<List keygen="id" data={data} renderItem={d => Item(d)} />)
    wrapper.find(`.${SO_PREFIX}-list-meta-title`).forEach(title => {
      expect(title.text()).toBe('Hello')
    })
  })
})
