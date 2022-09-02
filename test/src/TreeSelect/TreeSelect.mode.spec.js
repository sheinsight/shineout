/* eslint-disable guard-for-in */
/* eslint-disable no-unused-expressions */
import { mount } from 'enzyme/build'
import { TreeSelect } from 'shineout'
import React from 'react'
import { appendToDOM, baseTest } from '../../utils'

const modeData = [
  // 0
  {
    id: '0',
    text: '0',
    children: [
      // 1
      {
        id: '0-0',
        text: '0-0',
      },
      // 2
      {
        id: '0-1',
        text: '0-1',
      },
    ],
  },
  // 3
  {
    id: '1',
    text: '1',
  },
  // 4
  {
    id: '2',
    text: '2',
  },
]

function ClickLabel(node, wrapper) {
  node.find(`label.${SO_PREFIX}-checkinput input`).simulate('change', {
    target: {
      checked: true,
    },
  })
  wrapper.update()
}

/* global SO_PREFIX */
describe('TreeSelect[Mode]', () => {
  const dataHasStringKey = [
    { id: '0', title: '0', children: [{ id: '0-1', title: '0-1' }] },
    {
      id: '1',
      title: '1',
      children: [
        { id: '1-1', title: '1-1', children: [{ id: '1-1-1', title: '1-1-1' }, { id: '1-1-2', title: '1-1-2' }] },
        { id: '1-2', title: '1-2' },
      ],
    },
    { id: '2', title: '2', children: [{ id: '2-1', title: '2-1' }, { id: '2-2', title: '2-2' }] },
    { id: '3', title: '3', children: [{ id: '3-1', title: '3-1' }] },
  ]
  const dataHasNumberKey = [
    { id: 0, title: '0', children: [{ id: 0.1, title: '0-1' }] },
    {
      id: 1,
      title: '1',
      children: [
        { id: 11, title: '1-1', children: [{ id: 111, title: '1-1-1' }, { id: 112, title: '1-1-2' }] },
        { id: 12, title: '1-2' },
      ],
    },
    { id: 2, title: '2', children: [{ id: 21, title: '2-1' }, { id: 22, title: '2-2' }] },
    { id: 3, title: '3', children: [{ id: 31, title: 32 }] },
  ]

  test('should set mode 0 by string key', () => {
    const wrapper = mount(
      <TreeSelect multiple mode={0} data={dataHasStringKey} keygen="id" renderItem={node => `node ${node.title}`} />
    )
    appendToDOM(wrapper.html())
    wrapper.find(`.${SO_PREFIX}-treeSelect-inner`).simulate('click')
    const options = wrapper.find(`.${SO_PREFIX}-tree-node`)
    expect(options.length).toBe(4)
    options.forEach(node => {
      // click label
      ClickLabel(node, wrapper)
    })
    const tags = wrapper.find(`.${SO_PREFIX}-treeSelect-item`)
    expect(tags.length).toBe(12)
  })
  test('should set mode 0 by number key', () => {
    const wrapper = mount(
      <TreeSelect multiple mode={0} data={dataHasNumberKey} keygen="id" renderItem={node => `node ${node.title}`} />
    )
    appendToDOM(wrapper.html())
    wrapper.find(`.${SO_PREFIX}-treeSelect-inner`).simulate('click')
    const options = wrapper.find(`.${SO_PREFIX}-tree-node`)
    expect(options.length).toBe(4)
    options.forEach(node => {
      // click label
      ClickLabel(node, wrapper)
    })
    const tags = wrapper.find(`.${SO_PREFIX}-treeSelect-item`)
    expect(tags.length).toBe(12)
  })

  test('should set mode 1 by string key', () => {
    const wrapper = mount(
      <TreeSelect
        multiple
        mode={1}
        data={dataHasStringKey}
        keygen="id"
        renderItem={node => `node ${node.title}`}
        defaultExpanded={['1']}
      />
    )
    appendToDOM(wrapper.html())
    wrapper.find(`.${SO_PREFIX}-treeSelect-inner`).simulate('click')
    const options = wrapper.find(`.${SO_PREFIX}-tree-node`)
    expect(options.length).toBe(6)
    options.forEach((node, index) => {
      index === 3 && ClickLabel(node, wrapper)
    })
    const tags = wrapper.find(`.${SO_PREFIX}-treeSelect-item`)
    expect(tags.length).toBe(2)
  })
  test('should set mode 1 by number key', () => {
    const wrapper = mount(
      <TreeSelect
        multiple
        mode={1}
        data={dataHasNumberKey}
        keygen="id"
        renderItem={node => `node ${node.title}`}
        defaultExpanded={[1]}
      />
    )
    appendToDOM(wrapper.html())
    wrapper.find(`.${SO_PREFIX}-treeSelect-inner`).simulate('click')
    const options = wrapper.find(`.${SO_PREFIX}-tree-node`)
    expect(options.length).toBe(6)
    options.forEach((node, index) => {
      index === 3 && ClickLabel(node, wrapper)
    })
    const tags = wrapper.find(`.${SO_PREFIX}-treeSelect-item`)
    expect(tags.length).toBe(2)
  })

  test('should set mode 2 by string key', () => {
    const wrapper = mount(
      <TreeSelect multiple mode={2} data={dataHasStringKey} keygen="id" renderItem={node => `node ${node.title}`} />
    )
    appendToDOM(wrapper.html())
    wrapper.find(`.${SO_PREFIX}-treeSelect-inner`).simulate('click')
    const options = wrapper.find(`.${SO_PREFIX}-tree-node`)
    expect(options.length).toBe(4)
    options.forEach(node => {
      ClickLabel(node, wrapper)
    })
    const tags = wrapper.find(`.${SO_PREFIX}-treeSelect-item`)
    expect(tags.length).toBe(7)
  })
  test('should set mode 2 by number key', () => {
    const wrapper = mount(
      <TreeSelect multiple mode={2} data={dataHasNumberKey} keygen="id" renderItem={node => `node ${node.title}`} />
    )
    appendToDOM(wrapper.html())
    wrapper.find(`.${SO_PREFIX}-treeSelect-inner`).simulate('click')
    const options = wrapper.find(`.${SO_PREFIX}-tree-node`)
    expect(options.length).toBe(4)
    options.forEach(node => {
      ClickLabel(node, wrapper)
    })
    const tags = wrapper.find(`.${SO_PREFIX}-treeSelect-item`)
    expect(tags.length).toBe(7)
  })

  test('should set mode 3 by string key', () => {
    const wrapper = mount(
      <TreeSelect
        multiple
        mode={3}
        data={dataHasStringKey}
        keygen="id"
        renderItem={node => `node ${node.title}`}
        defaultExpanded={['0', '1', '2', '3']}
      />
    )
    appendToDOM(wrapper.html())
    wrapper.find(`.${SO_PREFIX}-treeSelect-inner`).simulate('click')
    const options = wrapper.find(`.${SO_PREFIX}-tree-node`)
    expect(options.length).toBe(10)
    options.forEach((node, index) => {
      index === 1 && ClickLabel(node, wrapper)
      index === 3 && ClickLabel(node, wrapper)
      index === 4 && ClickLabel(node, wrapper)
    })
    const tags = wrapper.find(`.${SO_PREFIX}-treeSelect-item`)
    expect(tags.length).toBe(2)
  })
  test('should set mode 3 by number key', () => {
    const wrapper = mount(
      <TreeSelect
        multiple
        mode={3}
        data={dataHasNumberKey}
        keygen="id"
        renderItem={node => `node ${node.title}`}
        defaultExpanded={[0, 1, 2, 3]}
      />
    )
    appendToDOM(wrapper.html())
    wrapper.find(`.${SO_PREFIX}-treeSelect-inner`).simulate('click')
    const options = wrapper.find(`.${SO_PREFIX}-tree-node`)
    expect(options.length).toBe(10)
    options.forEach((node, index) => {
      index === 1 && ClickLabel(node, wrapper)
      index === 3 && ClickLabel(node, wrapper)
      index === 4 && ClickLabel(node, wrapper)
    })
    const tags = wrapper.find(`.${SO_PREFIX}-treeSelect-item`)
    expect(tags.length).toBe(2)
  })
})

describe('TreeSelect[absolute]', () => {
  test('shoulde set absolute', () => {
    const wrapper = mount(<TreeSelect absolute data={modeData} keygen="id" renderItem={node => `node ${node.title}`} />)

    expect(wrapper.find(`.${SO_PREFIX}-list-absolute-wrapper`).length).toBe(0)
    expect(document.getElementsByClassName(`${SO_PREFIX}-list-absolute-wrapper`).length).toBe(1)
    wrapper.mount()
  })
})

describe('TreeSelect[childrenKey]', () => {
  test('should set childrenKey', () => {
    const dataChildrenKey = [
      // 0
      {
        id: '0',
        text: '0',
        child: [
          // 1
          {
            id: '0-0',
            text: '0-0',
          },
          // 2
          {
            id: '0-1',
            text: '0-1',
          },
        ],
      },
      // 3
      {
        id: '1',
        text: '1',
      },
      // 4
      {
        id: '2',
        text: '2',
      },
    ]
    const wrapper = mount(
      <TreeSelect
        keygen="id"
        defaultExpandAll
        childrenKey="child"
        data={dataChildrenKey}
        renderItem={node => `node ${node.title}`}
      />
    )

    expect(wrapper.find('Node').length).toBe(5)
  })
})

describe('TreeSelect[compressed]', () => {
  test('should set compressed', () => {
    const wrapper = mount(
      <TreeSelect
        multiple
        width={200}
        keygen="id"
        compressed
        defaultExpandAll
        data={modeData}
        renderItem={node => `node ${node.title}`}
        defaultValue={['0', '0-0', '0-1', '1', '2']}
      />
    )
    appendToDOM(wrapper.html())
    // wrapper.find(`.${SO_PREFIX}-treeSelect-inner`).simulate('click')
    wrapper.update()
    expect(wrapper.find(`.${SO_PREFIX}-treeSelect-item-compressed`).length > 0).toBe(true)
  })
})

describe('TreeSelect[defaultExpandAll]', () => {
  test('should set defaultExpandAll', () => {
    const wrapper = mount(
      <TreeSelect
        multiple
        width={200}
        keygen="id"
        compressed
        defaultExpandAll
        data={modeData}
        renderItem={node => `node ${node.title}`}
      />
    )
    appendToDOM(wrapper.html())
    wrapper.find(`.${SO_PREFIX}-treeSelect-inner`).simulate('click')
    expect(wrapper.find('Node').length).toBe(5)
  })
})

describe('TreeSelect[defaultExpanded]', () => {
  test('should set defaultExpanded', () => {
    const wrapper = mount(
      <TreeSelect
        multiple
        width={200}
        keygen="id"
        compressed
        defaultExpanded={['0']}
        data={modeData}
        renderItem={node => `node ${node.title}`}
      />
    )
    appendToDOM(wrapper.html())
    wrapper.find(`.${SO_PREFIX}-treeSelect-inner`).simulate('click')
    expect(wrapper.find('Node').length).toBe(5)
  })
})

describe('TreeSelect[defaultValue]', () => {
  test('should set defaultValue', () => {
    const wrapper = mount(
      <TreeSelect width={200} keygen="id" defaultValue="1" data={modeData} renderItem={node => `node ${node.text}`} />
    )
    appendToDOM(wrapper.html())
    expect(wrapper.find(`.so-treeSelect-ellipsis`).text()).toBe('node 1')
  })
})

describe('TreeSelect[disabled]', () => {
  test('should set disabled when typeof disabled is Boolean', () => {
    const wrapper = mount(
      <TreeSelect disabled keygen="id" defaultValue="1" data={modeData} renderItem={node => `node ${node.text}`} />
    )
    appendToDOM(wrapper.html())
    expect(wrapper.find(`.${SO_PREFIX}-treeSelect`).hasClass(`${SO_PREFIX}-input-disabled`)).toBe(true)
  })

  test('should set disabled when typeof disabled is Function and multiple is True', () => {
    const disabled = jest.fn(d => d.id === '2')
    const wrapper = mount(
      <TreeSelect
        multiple
        keygen="id"
        data={modeData}
        defaultValue="1"
        defaultExpandAll
        disabled={disabled}
        renderItem={node => `node ${node.text}`}
      />
    )
    appendToDOM(wrapper.html())
    wrapper.find(`.${SO_PREFIX}-treeSelect-inner`).simulate('click')
    const total = wrapper.find(`label.${SO_PREFIX}-checkinput`).length
    wrapper.find(`label.${SO_PREFIX}-checkinput`).forEach((i, index) => {
      expect(i.hasClass(`${SO_PREFIX}-checkinput-disabled`)).toBe(index === total - 1)
    })
  })

  test('should set disabled when typeof disabled is Function and multiple is False', () => {
    const disabled = jest.fn(d => d.id === '2')
    const wrapper = mount(
      <TreeSelect
        keygen="id"
        data={modeData}
        defaultValue="1"
        defaultExpandAll
        disabled={disabled}
        renderItem={node => `node ${node.text}`}
      />
    )
    appendToDOM(wrapper.html())
    wrapper.find(`.${SO_PREFIX}-treeSelect-inner`).simulate('click')
    const total = wrapper.find(`.${SO_PREFIX}-treeSelect-content-wrapper`).length
    wrapper.find(`.${SO_PREFIX}-treeSelect-content-wrapper`).forEach((i, index) => {
      expect(i.hasClass(`${SO_PREFIX}-treeSelect-disabled`)).toBe(index === total - 1)
    })
  })
})

describe('TreeSelect[expanded]', () => {
  test('shoulde set expanded', () => {
    const wrapper = mount(
      <TreeSelect keygen="id" expanded={['0']} data={modeData} renderItem={node => `node ${node.text}`} />
    )
    appendToDOM(wrapper.html())
    wrapper.find(`.${SO_PREFIX}-treeSelect-inner`).simulate('click')
    expect(wrapper.find('Node').length).toBe(5)
  })
})

describe('TreeSelect[filterDelay / onFilter]', () => {
  test('should set filterDelay and onFilter', () => {
    jest.useFakeTimers()
    const filterDelay = 1000
    const handleFilter = jest.fn()
    const wrapper = mount(
      <TreeSelect
        keygen="id"
        data={modeData}
        filterDelay={filterDelay}
        onFilter={handleFilter}
        renderItem={node => `node ${node.text}`}
      />
    )
    appendToDOM(wrapper.html())
    wrapper.find(`.${SO_PREFIX}-treeSelect-inner`).simulate('click')
    wrapper.find(`.${SO_PREFIX}-treeSelect-input`).simulate('input', { target: { innerText: 'hello' } })
    expect(handleFilter).not.toBeCalled()
    jest.advanceTimersByTime(filterDelay)
    expect(handleFilter).toBeCalled()
    jest.clearAllTimers()
  })
})

describe('TreeSelect[filterSameChange]', () => {
  test('should set filterSameChange', () => {
    const filterDelay = 200
    const handleFilter = jest.fn()
    const handleChange = jest.fn()

    const wrapper = mount(
      <TreeSelect
        keygen="id"
        data={modeData}
        onFilter={handleFilter}
        onChange={handleChange}
        filterSameChange
        filterDelay={filterDelay}
        renderItem={node => `node ${node.text}`}
      />
    )
    appendToDOM(wrapper.html())
    wrapper.find(`.${SO_PREFIX}-treeSelect-inner`).simulate('click')
    wrapper
      .find(`.${SO_PREFIX}-tree-text`)
      .first()
      .simulate('click')
    expect(handleChange).toBeCalledTimes(1)

    wrapper.find(`.${SO_PREFIX}-treeSelect-inner`).simulate('click')
    wrapper
      .find(`.${SO_PREFIX}-tree-text`)
      .first()
      .simulate('click')
    expect(handleChange).toBeCalledTimes(1)
  })
})

// describe('TreeSelect[getComponentRef]', () => {})

describe('TreeSelect[innerTitle]', () => {
  test('should set innerTitle', () => {
    const innerTitle = 'hello'
    const wrapper = mount(
      <TreeSelect
        innerTitle={innerTitle}
        keygen="id"
        data={modeData}
        filterSameChange
        renderItem={node => `node ${node.text}`}
      />
    )
    appendToDOM(wrapper.html())
    expect(
      wrapper
        .find(`.${SO_PREFIX}-input-title-box-title`)
        .first()
        .text()
    ).toBe(innerTitle)
  })
})

describe('TreeSelect[loader]', () => {
  test('should set loader', () => {
    const loader = jest.fn()
    const wrapper = mount(
      <TreeSelect
        keygen="id"
        loader={loader}
        data={modeData}
        filterSameChange
        renderItem={node => `node ${node.text}`}
      />
    )
    appendToDOM(wrapper.html())
    wrapper.find(`.${SO_PREFIX}-treeSelect-inner`).simulate('click')
    wrapper
      .find(`.${SO_PREFIX}-tree-icon-plus`)
      .last()
      .simulate('click')
    expect(loader).toBeCalled()
  })
})

describe('TreeSelect[mode]', () => {
  test('should set mode', () => {
    const categories = {
      single: {
        options: [4],
        expects: {
          0: ['2'],
          1: ['2'],
          2: ['2'],
          3: ['2'],
          4: ['2'],
        },
      },
      singleWidthChildren: {
        options: [0],
        expects: {
          0: ['0-0', '0-1', '0'],
          1: ['0-0', '0-1', '0'],
          2: ['0-0', '0-1'],
          3: ['0'],
          4: ['0'],
        },
      },
      childrenSingle: {
        options: [1],
        expects: {
          0: ['0-0'],
          1: ['0-0', '0'],
          2: ['0-0'],
          3: ['0-0'],
          4: ['0-0'],
        },
      },
      multiple: {
        options: [3, 4],
        expects: {
          0: ['1', '2'],
          1: ['1', '2'],
          2: ['1', '2'],
          3: ['1', '2'],
          4: ['1', '2'],
        },
      },
      multipleWidthSingle: {
        options: [0, 3],
        expects: {
          0: ['0-0', '0-1', '0', '1'],
          1: ['0-0', '0-1', '0', '1'],
          2: ['0-0', '0-1', '1'],
          3: ['0', '1'],
          4: ['0', '1'],
        },
      },
      multipleWidthSingleWidthChindren: {
        options: [1, 3],
        expects: {
          0: ['0-0', '1'],
          1: ['0-0', '0', '1'],
          2: ['0-0', '1'],
          3: ['0-0', '1'],
          4: ['0-0', '1'],
        },
      },
      multipleWidthChildrenAll: {
        options: [1, 2],
        expects: {
          0: ['0-0', '0-1', '0'],
          1: ['0-0', '0-1', '0'],
          2: ['0-0', '0-1'],
          3: ['0'],
          4: ['0-0', '0-1'],
        },
      },
      multipleWidthChildrenAllWidthSingle: {
        options: [1, 2, 3],
        expects: {
          0: ['0-0', '0-1', '0', '1'],
          1: ['0-0', '0-1', '0', '1'],
          2: ['0-0', '0-1', '1'],
          3: ['0', '1'],
          4: ['0-0', '0-1', '1'],
        },
      },
    }
    const modes = [0, 1, 2, 3, 4]
    modes.forEach(mode => {
      for (const item in categories) {
        const handleChange = jest.fn()
        const wrapper = mount(
          <TreeSelect
            multiple
            mode={mode}
            keygen="id"
            compressed
            data={modeData}
            defaultExpandAll
            onChange={handleChange}
            renderItem={node => `node ${node.text}`}
          />
        )
        appendToDOM(wrapper.html())
        wrapper.find(`.${SO_PREFIX}-treeSelect-inner`).simulate('click')

        wrapper.update()

        categories[item].options.forEach(i => {
          wrapper
            .find(`label.${SO_PREFIX}-checkinput input`)
            .at(i)
            .simulate('change', {
              target: {
                checked: true,
              },
            })
        })

        expect(handleChange).toBeCalledTimes(categories[item].options.length)
        expect(handleChange.mock.calls[categories[item].options.length - 1][0].toString()).toBe(
          categories[item].expects[mode].toString()
        )

        wrapper.unmount()
      }
    })
  })
})

describe('TreeSelect[multiple]', () => {
  test('should set multiple', () => {
    const wrapper = mount(<TreeSelect multiple keygen="id" data={modeData} renderItem={node => `node ${node.text}`} />)
    expect(wrapper.find(`.${SO_PREFIX}-treeSelect-multiple`).hasClass(`${SO_PREFIX}-treeSelect-multiple`)).toBe(true)
  })
})

describe('TreeSelect[onAdvancedFilter]', () => {
  test('should set onAdvancedFilter', () => {
    jest.useFakeTimers()
    const onAdvancedFilter = jest.fn()
    const filterDelay = 500
    const wrapper = mount(
      <TreeSelect
        keygen="id"
        data={modeData}
        filterDelay={filterDelay}
        renderItem="value"
        onAdvancedFilter={onAdvancedFilter}
      />
    )
    appendToDOM(wrapper.html())
    wrapper.find(`.${SO_PREFIX}-treeSelect-inner`).simulate('click')
    wrapper.find(`.${SO_PREFIX}-treeSelect-input`).simulate('input', { target: { innerText: 'hello' } })
    jest.advanceTimersByTime(filterDelay)
    expect(onAdvancedFilter).toBeCalled()
    jest.clearAllTimers()
  })
})

describe('TreeSelect[onChange]', () => {
  test('should set onChange when multiple is True', () => {
    const handleChange = jest.fn()
    const wrapper = mount(
      <TreeSelect multiple onChange={handleChange} defaultExpandAll keygen="id" data={modeData} renderItem="value" />
    )
    appendToDOM(wrapper.html())
    wrapper.find(`.${SO_PREFIX}-treeSelect-inner`).simulate('click')
    wrapper
      .find(`label.${SO_PREFIX}-checkinput input`)
      .last()
      .simulate('change', {
        target: {
          checked: true,
        },
      })

    expect(handleChange).toBeCalled()
    expect(handleChange.mock.calls[0][0].toString()).toBe(['2'].toString())
  })

  test('should set onChange when multiple is False', () => {
    const handleChange = jest.fn()
    const wrapper = mount(
      <TreeSelect onChange={handleChange} defaultExpandAll keygen="id" data={modeData} renderItem="value" />
    )
    appendToDOM(wrapper.html())
    wrapper.find(`.${SO_PREFIX}-treeSelect-inner`).simulate('click')
    wrapper
      .find(`.${SO_PREFIX}-tree-text`)
      .last()
      .simulate('click')

    expect(handleChange).toBeCalled()
    expect(handleChange.mock.calls[0][0]).toBe('2')
  })
})

describe('TreeSelect[onChangeAddition]', () => {
  test('should set onChangeAddition when multiple is True', () => {
    const handleChange = jest.fn()
    const wrapper = mount(
      <TreeSelect
        multiple
        keygen="id"
        data={modeData}
        defaultExpandAll
        renderItem="value"
        onChangeAddition={handleChange}
      />
    )
    appendToDOM(wrapper.html())
    wrapper.find(`.${SO_PREFIX}-treeSelect-inner`).simulate('click')
    wrapper
      .find(`label.${SO_PREFIX}-checkinput input`)
      .last()
      .simulate('change', {
        target: {
          checked: true,
        },
      })

    expect(handleChange).toBeCalled()
    expect(handleChange.mock.calls[0][0].data[0]).toBe(modeData.at(-1))
    expect(handleChange.mock.calls[0][0].current).toBe(modeData.at(-1))
    expect(handleChange.mock.calls[0][0].checked).toBe(1)
  })

  test('should set onChangeAddition when multiple is False', () => {
    const handleChange = jest.fn()
    const wrapper = mount(
      <TreeSelect keygen="id" data={modeData} defaultExpandAll renderItem="value" onChangeAddition={handleChange} />
    )
    appendToDOM(wrapper.html())
    wrapper.find(`.${SO_PREFIX}-treeSelect-inner`).simulate('click')
    wrapper
      .find(`.${SO_PREFIX}-tree-text`)
      .last()
      .simulate('click')

    expect(handleChange).toBeCalled()
    expect(handleChange.mock.calls[0][0].data).toBe(modeData.at(-1))
    expect(handleChange.mock.calls[0][0].current).toBe(modeData.at(-1))
  })
})

describe('TreeSelect[onCollapse]', () => {
  test('should set onCollapse', () => {
    const onCollapse = jest.fn()
    const wrapper = mount(
      <TreeSelect keygen="id" data={modeData} defaultExpandAll renderItem="value" onCollapse={onCollapse} />
    )
    appendToDOM(wrapper.html())
    wrapper.find(`.${SO_PREFIX}-treeSelect-inner`).simulate('click')
    expect(onCollapse).toBeCalled()
  })
})

describe('TreeSelect[onExpand]', () => {
  test('should set onExpand', () => {
    const onExpand = jest.fn()
    const wrapper = mount(<TreeSelect keygen="id" data={modeData} renderItem="value" onExpand={onExpand} />)
    appendToDOM(wrapper.html())
    wrapper.find(`.${SO_PREFIX}-treeSelect-inner`).simulate('click')

    wrapper
      .find(`a.${SO_PREFIX}-tree-icon-plus`)
      .first()
      .simulate('click')
    expect(onExpand).toBeCalled()
  })
})

describe('TreeSelect[renderItem]', () => {
  test('should set renderItem', () => {
    const renderItem = jest.fn(d => <div className="hello">{d.id}</div>)
    const wrapper = mount(<TreeSelect keygen="id" defaultExpandAll data={modeData} renderItem={renderItem} />)
    appendToDOM(wrapper.html())
    wrapper.find(`.${SO_PREFIX}-treeSelect-inner`).simulate('click')
    expect(wrapper.find('.hello').length).toBe(5)
    expect(renderItem).toBeCalledTimes(5)
  })
})

describe('TreeSelect[renderResult]', () => {
  test('should set renderResult', () => {
    const wrapper = mount(
      <TreeSelect
        keygen="id"
        defaultExpandAll
        data={modeData}
        renderItem={node => `node ${node.title}`}
        renderResult={d => <span className="hello">{`Hello ${d.id}`}</span>}
      />
    )
    appendToDOM(wrapper.html())
    wrapper.find(`.${SO_PREFIX}-treeSelect-inner`).simulate('click')
    wrapper
      .find(`.${SO_PREFIX}-tree-text`)
      .last()
      .simulate('click')

    expect(wrapper.find(`.${SO_PREFIX}-treeSelect-ellipsis`).text()).toBe(`Hello 2`)
  })
})

describe('TreeSelect[unmatch / renderUnmatched]', () => {
  test('should set unmatch and renderUnmatched', () => {
    const wrapper = mount(
      <TreeSelect
        unmatch
        multiple
        keygen="id"
        data={modeData}
        defaultValue={['3']}
        renderItem={node => `node ${node.title}`}
        renderUnmatched={node => `unmatched node ${node}`}
      />
    )
    appendToDOM(wrapper.html())
    wrapper.find(`.${SO_PREFIX}-treeSelect-inner`).simulate('click')
    expect(wrapper.find(`.${SO_PREFIX}-treeSelect-item`).length).toBe(1)
    expect(wrapper.find(`.${SO_PREFIX}-treeSelect-item`).text()).toBe(`unmatched node 3`)
  })
})

// describe('TreeSelect[showHitDescendants]', () => {
//   test('should set showHitDescendants', () => {
//   })
// })

describe('TreeSelect[underline]', () => {
  test('should set underline', () => {
    const wrapper = mount(
      <TreeSelect underline keygen="id" data={modeData} renderItem={node => `node ${node.title}`} />
    )
    appendToDOM(wrapper.html())
    expect(wrapper.find(`.${SO_PREFIX}-treeSelect`).hasClass(`${SO_PREFIX}-input-underline`)).toBe(true)
  })
})

describe('TreeSelect[base]', () => {
  test('should set style and className', () => {
    baseTest(TreeSelect, `.${SO_PREFIX}-treeSelect`)
  })
})

describe('TreeSelect[event]', () => {
  test('should focus', () => {
    const wrapper = mount(<TreeSelect keygen="id" data={modeData} renderItem={node => `node ${node.title}`} />)
    appendToDOM(wrapper.html())
    wrapper.find(`.${SO_PREFIX}-treeSelect-inner`).simulate('focus')
    expect(wrapper.find('TreeSelect').instance().state.focus).toBe(false)
    wrapper.find(`.${SO_PREFIX}-treeSelect-inner`).simulate('keydown', { keyCode: 13 })
    expect(wrapper.find('TreeSelect').instance().state.focus).toBe(true)
    wrapper.find(`.${SO_PREFIX}-treeSelect-inner`).simulate('keydown', { keyCode: 9 })
    expect(wrapper.find('TreeSelect').instance().state.focus).toBe(false)
  })

  test('should click close', () => {
    const wrapper = mount(<TreeSelect keygen="id" data={modeData} renderItem={node => `node ${node.title}`} />)
    appendToDOM(wrapper.html())

    wrapper.find(`.${SO_PREFIX}-treeSelect-inner`).simulate('click')
    expect(wrapper.find('TreeSelect').instance().state.focus).toBe(true)
    wrapper
      .find('TreeSelect')
      .instance()
      .handleClickAway({ target: document.body })
    expect(wrapper.find('TreeSelect').instance().state.focus).toBe(false)
  })
})

describe('TreeSelect[clearable]', () => {
  test('should set clearable', () => {
    const handleChange = jest.fn()
    const onChangeAddition = jest.fn()
    const wrapper = mount(
      <TreeSelect
        multiple
        clearable
        keygen="id"
        defaultValue={['2']}
        data={modeData}
        onChange={handleChange}
        onChangeAddition={onChangeAddition}
        renderItem={node => `node ${node.title}`}
      />
    )
    appendToDOM(wrapper.html())
    wrapper.find(`.${SO_PREFIX}-treeSelect-inner`).simulate('click')
    wrapper.find(`a.so-treeSelect-close`).simulate('click')
    expect(handleChange).toBeCalled()
    expect(onChangeAddition).toBeCalled()
  })
})

describe('TreeSelect[getComponentRef]', () => {
  test('should set getComponentRef when typeof getComponentRef is Function', () => {
    let ref
    const getComponentRef = jest.fn(r => {
      ref = r
    })
    const wrapper = mount(
      <TreeSelect
        multiple
        clearable
        getComponentRef={getComponentRef}
        keygen="id"
        defaultValue={['2']}
        data={modeData}
        renderItem={node => `node ${node.title}`}
      />
    )
    appendToDOM(wrapper.html())
    wrapper.find(`.${SO_PREFIX}-treeSelect-inner`).simulate('click')
    expect(ref.getDataByValues).toBe(wrapper.find('TreeSelect').instance().getDataByValues)
    expect(...ref.getDataByValues(['2'])).toBe(modeData[2])
  })
})

describe('TreeSelect[remove]', () => {
  test('should set remove', () => {
    const handleChange = jest.fn()
    const wrapper = mount(
      <TreeSelect
        multiple
        clearable
        keygen="id"
        defaultValue={['2']}
        onChange={handleChange}
        data={modeData}
        renderItem={node => `node ${node.title}`}
      />
    )
    appendToDOM(wrapper.html())
    wrapper
      .find(`.${SO_PREFIX}-treeSelect-close`)
      .first()
      .simulate('click')
    expect(handleChange).toBeCalled()
  })
})
