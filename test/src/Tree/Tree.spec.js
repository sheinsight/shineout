import React from 'react'
import { Tree } from 'shineout'
import { mount, shallow } from 'enzyme'
import Render from 'react-test-renderer'
import FontAwesome from '../../../site/pages/components/Icon/FontAwesome'

const data = [
  {
    id: '0',
    text: '0',
    children: [
      {
        id: '0-0',
        text: '0-0',
      },
      {
        id: '0-1',
        text: '0-1',
      },
    ],
  },
  {
    id: '1',
    text: '1',
    children: [
      {
        id: '1-1',
        text: '1-1',
        children: [
          {
            id: '1-1-1',
            text: '1-1-1',
          },
        ],
      },
    ],
  },
]

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

/* global SO_PREFIX */
describe('Tree[Base]', () => {
  const keys = ['0', '0-0', '0-1', '1', '1-1', '1-1-1']
  test('should render correctly', () => {
    const wrapper = Render.create(<Tree expanded={keys} data={data} keygen="id" renderItem="text" />).toJSON()
    expect(wrapper).toMatchSnapshot()
  })

  test('should expand while click', () => {
    const wrapper = mount(<Tree data={data} keygen="id" renderItem="text" />)
    const firstNode = wrapper.find('Node').first()
    expect(firstNode.find('List').prop('expanded')).toBeFalsy()
    // expand tree
    wrapper
      .find(`a.${SO_PREFIX}-tree-icon-plus`)
      .first()
      .prop('onClick')()
    wrapper.update()
    expect(
      wrapper
        .find('List')
        .first()
        .prop('expanded')
    ).toBeTruthy()
  })

  test('should render className', () => {
    const className = 'test'
    const wrapper = shallow(<Tree className={className} data={data} keygen="id" renderItem="text" />)
    expect(wrapper.find('Root').hasClass(className)).toBeTruthy()
  })
})

describe('Tree[Icon]', () => {
  function renderItem(node, isExpanded) {
    let icon
    if (!node.children || node.children.length === 0) {
      icon = <FontAwesome name="file-text-o" />
    } else if (isExpanded) {
      icon = <FontAwesome name="folder-open" style={{ color: '#ffd666' }} />
    } else {
      icon = <FontAwesome name="folder" style={{ color: '#ffd666' }} />
    }

    return (
      <span>
        {icon} {node.text}
      </span>
    )
  }
  test('should render correctly', () => {
    const wrapper = Render.create(<Tree data={data} keygen="id" renderItem={renderItem} />).toJSON()
    expect(wrapper).toMatchSnapshot()
  })
})

describe('Tree[onClick]', () => {
  test('should call onClick', () => {
    const clickFn = jest.fn()
    const wrapper = mount(<Tree onClick={clickFn} data={data} keygen="id" renderItem="text" />)
    const firstNode = wrapper.find('Node').first()
    expect(firstNode.find('List').prop('expanded')).toBeFalsy()
    // expand tree
    wrapper
      .find(`div.${SO_PREFIX}-tree-text`)
      .first()
      .prop('onClick')()
    expect(clickFn.mock.calls[0][0].id).toBe('0')
  })
})

describe('Tree[no-line]', () => {
  test('should render without line', () => {
    const wrapper = mount(<Tree line={false} data={data} keygen="id" renderItem="text" />)
    expect(wrapper.find(`.${SO_PREFIX}-tree-no-line`).length > 0).toBeTruthy()
  })
})

describe('Tree[expanded]', () => {
  test('should expanded in controller', () => {
    const wrapper = mount(<Tree data={data} keygen="id" line={false} expanded={[]} renderItem="id" />)
    const propData = wrapper.find('ShineoutTree').prop('data')
    propData.forEach(v => {
      const { id } = v
      wrapper.setProps({
        expanded: [id],
      })
      wrapper.update()
      expect(
        wrapper
          .find(`Node[id="${id}"]`)
          .at(0)
          .find('Content')
          .first()
          .prop('expanded')
      ).toBeTruthy()
    })
  })
})

describe('Tree[disabled]', () => {
  test('should set disabled when typeof disabled is Boolean', () => {
    const wrapper = mount(
      <Tree
        data={data}
        defaultExpandAll
        disabled
        keygen="id"
        renderItem={node => `node ${node.id}`}
        onChange={v => {
          console.log(v)
        }}
      />
    )
    wrapper.find('CheckItem').forEach(checkbox => {
      expect(checkbox.props().disabled).toBe(true)
    })
    wrapper.unmount()
  })
  test('should set disabled when typeof disabled is Function', () => {
    const handleDisabled = d => d.id.indexOf('0') >= 0
    const wrapper = mount(
      <Tree
        data={data}
        defaultExpandAll
        disabled={handleDisabled}
        keygen="id"
        renderItem={node => `node ${node.id}`}
        onChange={v => {
          console.log(v)
        }}
      />
    )
    wrapper.find('Node').forEach(node => {
      node.find('CheckItem').forEach(item => {
        expect(item.props().disabled).toBe(handleDisabled(node.props().data))
      })
    })
    wrapper.unmount()
  })
})

describe('Tree[childrenKey]', () => {
  test('should set childrenKey', () => {
    const dataChild = [
      {
        id: '0',
        text: '0',
        child: [
          {
            id: '0-0',
            text: '0-0',
          },
          {
            id: '0-1',
            text: '0-1',
          },
        ],
      },
      {
        id: '1',
        text: '1',
        child: [
          {
            id: '1-1',
            text: '1-1',
            child: [
              {
                id: '1-1-1',
                text: '1-1-1',
              },
            ],
          },
        ],
      },
    ]
    const wrapper = mount(
      <Tree data={dataChild} defaultExpandAll childrenKey="child" keygen="id" renderItem={node => `node ${node.id}`} />
    )
    expect(wrapper.find('Node').length).toBe(6)
    wrapper.unmount()
  })
})

describe('Tree[defaultExpandAll]', () => {
  test('should set defaultExpandAll', () => {
    const num = []
    const getChildren = d => {
      d.forEach(i => {
        if (i.children && i.children.length > 0) {
          num.push(i)
          getChildren(i.children)
        }
      })
    }
    getChildren(data)
    const wrapper = mount(<Tree data={data} defaultExpandAll keygen="id" renderItem={node => `node ${node.id}`} />)
    expect(wrapper.find(`.${SO_PREFIX}-tree-icon-sub`).length).toBe(num.length)
    wrapper.unmount()
  })
})

describe('Tree[defaultExpanded]', () => {
  test('should set defaultExpanded', () => {
    const defaultExpanded = ['0']
    const wrapper = mount(
      <Tree data={data} defaultExpanded={defaultExpanded} keygen="id" renderItem={node => `node ${node.id}`} />
    )
    expect(wrapper.find(`.${SO_PREFIX}-tree-icon-sub`).length).toBe(1)
    const expectResult = []
    wrapper.find('Content').forEach(content => {
      if (content.props().expanded) {
        expectResult.push(content.props().id)
      }
    })
    expect(defaultExpanded.toString()).toBe(expectResult.toString())
    wrapper.unmount()
  })
})

describe('Tree[defaultValue]', () => {
  test('should set defaultValue', () => {
    const defaultValue = ['0']
    const wrapper = mount(
      <Tree
        data={data}
        keygen="id"
        defaultExpandAll
        defaultValue={defaultValue}
        renderItem={node => `node ${node.id}`}
        onChange={v => {
          console.log(v)
        }}
      />
    )
    expect(wrapper.find(`.${SO_PREFIX}-checkinput-checked`).length).toBe(3)
    wrapper.unmount()
  })
})

describe('Tree[doubleClickExpand]', () => {
  test('should set doubleClickExpand', () => {
    const wrapper = mount(
      <Tree
        data={data}
        keygen="id"
        doubleClickExpand
        renderItem={node => `node ${node.id}`}
        onChange={v => {
          console.log(v)
        }}
      />
    )

    wrapper
      .find(`.${SO_PREFIX}-tree-text`)
      .first()
      .simulate('doubleClick')

    expect(wrapper.find(`.${SO_PREFIX}-tree-icon-sub`).length).toBe(1)
    wrapper.unmount()
  })
})

describe('Tree[dragHoverExpand]', () => {
  test('should set dragHoverExpand', () => {
    const handleDrop = jest.fn()
    const setData = jest.fn()
    const setDragImage = jest.fn()
    const handleToggle = jest.fn()
    const wrapper = mount(
      <Tree
        data={data}
        keygen="id"
        dragHoverExpand
        renderItem={node => `node ${node.id}`}
        onDrop={handleDrop}
        onChange={v => {
          console.log(v)
        }}
      />
    )
    wrapper
      .find('Node')
      .first()
      .instance().element.getBoundingClientRect = () => ({ top: 0, bottom: 20 })

    wrapper
      .find('Node')
      .first()
      .instance().handleToggle = handleToggle

    wrapper
      .find('Content')
      .first()
      .simulate('dragStart', {
        dataTransfer: {
          effectAllowed: 'copyMove',
          setData,
          setDragImage,
        },
      })

    wrapper
      .find('Content')
      .first()
      .simulate('dragOver', {
        clientY: 20,
        target: {
          getBoundingClientRect: () => ({
            height: 20,
          }),
        },
      })

    wrapper
      .find('Content')
      .first()
      .simulate('dragEnd')

    expect(handleToggle).toBeCalled()
    wrapper.unmount()
  })
})

describe('Tree[dragImageStyle]', () => {
  test('should set dragImageStyle', () => {
    const handleDrop = jest.fn()
    const setData = jest.fn()
    const setDragImage = jest.fn()
    const handleToggle = jest.fn()
    const wrapper = mount(
      <Tree
        data={data}
        keygen="id"
        dragImageStyle={{ color: 'red' }}
        dragImageSelector={d => `#node-id-${d.id}`}
        dragHoverExpand
        renderItem={node => <div id={`node-id-${node.id}`}>{`node ${node.id}`}</div>}
        onDrop={handleDrop}
        onChange={v => {
          console.log(v)
        }}
      />
    )
    wrapper
      .find('Node')
      .first()
      .instance().element.getBoundingClientRect = () => ({ top: 0, bottom: 20 })

    wrapper
      .find('Node')
      .first()
      .instance().handleToggle = handleToggle

    wrapper
      .find('Content')
      .first()
      .simulate('dragStart', {
        dataTransfer: {
          effectAllowed: 'copyMove',
          setData,
          setDragImage,
        },
      })
    expect(
      wrapper
        .find('Node')
        .first()
        .instance().dragImage.style.color
    ).toBe('red')
    wrapper.unmount()
  })
})

// describe('Tree[dragSibling]', () => {
//   test('should set dragSibling', () => {})
// })

// describe('Tree[expanded]', () => {
//   test('should set expanded', () => {})
// })

describe('Tree[expandIcons]', () => {
  test('should set expandIcons', () => {})
})

describe('Tree[iconClass]', () => {
  test('should set iconClass', () => {
    const wrapper = mount(
      <Tree
        data={data}
        expandIcons={[<div className="close">1</div>, <div className="open">2</div>]}
        keygen="id"
        defaultExpanded={['1']}
        renderItem={node => <div>{`node ${node.id}`}</div>}
      />
    )
    expect(wrapper.exists('.close')).toBe(true)
    expect(wrapper.exists('.open')).toBe(true)
  })
})

describe('Tree[leafClass]', () => {
  test('should set leafClass when typeof leafClass is Function', () => {
    const wrapper = mount(
      <Tree
        data={data}
        keygen="id"
        leafClass={() => 'hello'}
        defaultExpanded={['0']}
        renderItem={node => <div>{`node ${node.id}`}</div>}
      />
    )
    expect(wrapper.find(`.${SO_PREFIX}-tree-node.hello`).length).toBe(2)
    wrapper.unmount()
  })

  test('should set leafClass when typeof leafClass is String', () => {
    const wrapper = mount(
      <Tree
        data={data}
        keygen="id"
        leafClass="hello"
        defaultExpanded={['0']}
        renderItem={node => <div>{`node ${node.id}`}</div>}
      />
    )
    expect(wrapper.find(`.${SO_PREFIX}-tree-node.hello`).length).toBe(2)
    wrapper.unmount()
  })
})

describe('Tree[line]', () => {
  test('should set line', () => {
    const wrapper = mount(
      <Tree
        data={data}
        line={false}
        keygen="id"
        leafClass={() => 'hello'}
        defaultExpanded={['0']}
        renderItem={node => <div>{`node ${node.id}`}</div>}
      />
    )
    expect(wrapper.html().indexOf(`${SO_PREFIX}-tree-no-line`) > -1).toBe(true)
    wrapper.unmount()
  })
})

describe('Tree[loader]', () => {
  test('should set loader', () => {
    jest.useFakeTimers()
    const loader = jest.fn()
    const loaderData = [
      {
        id: '0',
        text: '0',
      },
      {
        id: '1',
        text: '1',
      },
    ]
    const wrapper = mount(
      <Tree data={loaderData} keygen="id" loader={loader} renderItem={node => <div>{`node ${node.id}`}</div>} />
    )
    jest.runAllTimers()
    console.log(wrapper.find(`.${SO_PREFIX}-tree-icon-plus`).length)
    wrapper
      .find(`.${SO_PREFIX}-tree-icon-plus`)
      .last()
      .simulate('click')

    expect(loader).toBeCalled()
    wrapper.unmount()
  })
})

describe('Tree[mode]', () => {
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
  test('should set mode', () => {
    const modes = [0, 1, 2, 3, 4]
    modes.forEach(mode => {
      // eslint-disable-next-line guard-for-in
      for (const item in categories) {
        const handleChange = jest.fn()
        const wrapper = mount(
          <Tree
            mode={mode}
            keygen="id"
            data={modeData}
            defaultExpandAll
            onChange={handleChange}
            renderItem={node => <div>{`node ${node.id}`}</div>}
          />
        )
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

describe('Tree[nodeClass]', () => {
  test('should set nodeClass', () => {
    const wrapper = mount(
      <Tree data={data} nodeClass="hello" keygen="id" renderItem={node => <div>{`node ${node.id}`}</div>} />
    )
    wrapper.find(`.${SO_PREFIX}-tree-node`).forEach(node => {
      expect(node.hasClass('hello')).toBe(true)
    })
    wrapper.unmount()
  })
})

describe('Tree[onDrop]', () => {
  test('should set onDrop', () => {
    const handleDrop = jest.fn()
    const setData = jest.fn()
    const setDragImage = jest.fn()
    const handleToggle = jest.fn()
    const wrapper = mount(
      <Tree
        data={data}
        keygen="id"
        dragHoverExpand
        renderItem={node => `node ${node.id}`}
        onDrop={handleDrop}
        onChange={v => {
          console.log(v)
        }}
      />
    )
    wrapper
      .find('Node')
      .first()
      .instance().element.getBoundingClientRect = () => ({ top: 0, bottom: 20 })

    wrapper
      .find('Node')
      .first()
      .instance().handleToggle = handleToggle

    wrapper
      .find('Content')
      .first()
      .simulate('dragStart', {
        dataTransfer: {
          effectAllowed: 'copyMove',
          setData,
          setDragImage,
        },
      })

    wrapper
      .find('Content')
      .first()
      .simulate('dragOver', {
        clientY: 20,
        target: {
          getBoundingClientRect: () => ({
            height: 20,
          }),
        },
      })
    document.body.removeChild = jest.fn()
    wrapper
      .find('Content')
      .first()
      .simulate('dragEnd')

    expect(handleDrop).toBeCalled()
    wrapper.unmount()
  })
})

describe('Tree[onExpand]', () => {
  test('should set onExpand', () => {
    const handleExpand = jest.fn()
    const wrapper = mount(
      <Tree data={data} keygen="id" onExpand={handleExpand} renderItem={node => <div>{`node ${node.id}`}</div>} />
    )
    wrapper
      .find(`a.${SO_PREFIX}-tree-icon-plus`)
      .first()
      .simulate('click')

    expect(handleExpand).toBeCalled()
  })

  test('should set onExpand when control', () => {
    const handleExpand = jest.fn()
    const App = () => {
      const [value] = React.useState([])
      return (
        <Tree
          data={data}
          keygen="id"
          expanded={value}
          onExpand={handleExpand}
          renderItem={node => <div>{`node ${node.id}`}</div>}
        />
      )
    }
    const wrapper = mount(<App />)
    wrapper
      .find(`a.${SO_PREFIX}-tree-icon-plus`)
      .first()
      .simulate('click')

    expect(handleExpand).toBeCalled()
  })
})

describe('Tree[parentClickExpand]', () => {
  test('should set parentClickExpand', () => {
    const handleExpand = jest.fn()
    const wrapper = mount(
      <Tree
        data={data}
        keygen="id"
        parentClickExpand
        onExpand={handleExpand}
        renderItem={node => <div>{`node ${node.id}`}</div>}
      />
    )
    wrapper
      .find(`.${SO_PREFIX}-tree-text`)
      .first()
      .simulate('click')

    expect(handleExpand).toBeCalled()
  })
})

describe('Tree[value]', () => {
  test('should set value', () => {
    const handleChange = jest.fn((v, set) => {
      set(v)
    })
    const App = () => {
      const [value, setValue] = React.useState([])
      return (
        <Tree
          data={data}
          keygen="id"
          value={value}
          onChange={v => handleChange(v, setValue)}
          renderItem={node => <div>{`node ${node.id}`}</div>}
        />
      )
    }

    const wrapper = mount(<App />)

    wrapper
      .find(`label.${SO_PREFIX}-checkinput input`)
      .first()
      .simulate('change', {
        target: {
          checked: true,
        },
      })

    expect(handleChange).toBeCalled()
  })
})
