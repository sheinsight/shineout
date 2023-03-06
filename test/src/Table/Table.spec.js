import React from 'react'
import { mount, shallow } from 'enzyme'
import { Table, Button } from 'shineout'
import Render from 'react-test-renderer'
import { baseTest } from '../../utils'
import TableBase from '../../../site/pages/components/Table/example-01-base'
import SortRenderTable from '../../../site/pages/components/Table/example-10-sort-render'
import ControlTable from '../../../site/pages/components/Table/test-002-value'
/* global SO_PREFIX */

const columns = [{ title: 'id', render: 'id', width: 50 }, { title: 'Name', render: 'name', width: 50 }]
const treeColumns = [
  { title: 'id', render: 'id', width: 50, treeColumnsName: 'children' },
  { title: 'Name', render: 'name' },
]
const data = [
  {
    id: 1,
    name: '1',
  },
  {
    id: 2,
    name: '2',
  },
  {
    id: 3,
    name: '3',
  },
  {
    id: 4,
    name: '4',
  },
]
const treeData = [
  {
    id: 1,
    name: '1',
    children: [
      {
        id: 11,
        name: '1-1',
      },
      {
        id: 12,
        name: '1-2',
      },
    ],
  },
  {
    id: 2,
    name: '2',
    children: [
      {
        id: 21,
        name: '2-1',
      },
      {
        id: 22,
        name: '2-2',
        children: [
          {
            id: 222,
            name: '2-1',
          },
        ],
      },
    ],
  },
  {
    id: 3,
    name: '3',
  },
]

describe('Table[Base]', () => {
  let wrapper
  beforeAll(() => {
    wrapper = mount(<TableBase />)
  })
  test('should render correct dom structure', () => {
    expect(wrapper.find(`table colgroup`).length).toBe(2)
    expect(wrapper.find(`table thead`).length).toBe(1)
    expect(wrapper.find(`table tbody`).length).toBe(1)
  })
  test('should render correct columns and data', () => {
    const innerColumns = wrapper.find('ShineoutTable').prop('columns')
    const innerData = wrapper.find('ShineoutTable').prop('data')
    expect(wrapper.find('table thead th').length).toBe(innerColumns.length)
    expect(wrapper.find('table tbody tr').length).toBe(innerData.length)
  })
  test('should update columns when receiving props', () => {
    const innerColumns = [{ title: 'id', render: 'id' }]
    const w = shallow(<Table columns={innerColumns} keygen="id" />)
    const newColumns = [{ title: 'id', render: 'id' }, { title: 'Name', render: 'name' }]
    w.setProps({
      columns: newColumns,
    })
    expect(w.instance().props.columns).toBe(newColumns)
  })
})

describe('Table[Border&striped]', () => {
  test('should render border & striped', () => {
    const wrapper = Render.create(<Table keygen="id" striped bordered columns={columns} data={data} />).toJSON()
    expect(wrapper).toMatchSnapshot()
  })
})

describe('Table[small]', () => {
  test('should render compact table', () => {
    const wrapper = Render.create(<Table keygen="id" size="small" columns={columns} data={data} />).toJSON()
    expect(wrapper).toMatchSnapshot()
  })
})

// describe('Table[cellSelectable]', () => {
//   test('should set cellSelectable', () => {
//     const wrapper = Render.create(<Table keygen="id" size="small" columns={columns} data={data} />).toJSON()
//     expect(wrapper).toMatchSnapshot()
//   })
// })

// describe('Table[changedByExpand]', () => {
//   test('should set changedByExpand', () => {
//     const wrapper = mount(<Table data={treeData} keygen="id" />)
//   })
// })

describe('Table[base]', () => {
  test('should custom style and className', () => {
    baseTest(Table, `.${SO_PREFIX}-table`)
  })
})

describe('Table[dataChangeResize]', () => {
  test('should dataChangeResize', () => {
    const changeValue = 'Hello'
    const App = () => {
      const [tableData, setData] = React.useState(data)

      const handleClick = () => {
        data[0].name = changeValue
        setData([...data])
      }
      return (
        <div>
          <Button onClick={handleClick}>ChangeData</Button>
          <Table dataChangeResize keygen="id" columns={columns} data={tableData} />
        </div>
      )
    }

    const wrapper = mount(<App />)
    expect(wrapper.find(Button).length).toBe(1)
    expect(wrapper.find('SimpleTable').length).toBe(1)
    // test component
    expect(wrapper.find('SimpleTable').instance().state.resize).toBe(false)
    wrapper.find(Button).simulate('click')
    expect(wrapper.find('SimpleTable').instance().state.resize).toBe(true)
    // test view
    wrapper.update()
    expect(
      wrapper
        .find(`.${SO_PREFIX}-table-normal`)
        .at(0)
        .children()
        .at(1)
        .text()
    ).toBe(changeValue)
  })
})

describe('Table[defaultTreeExpandKeys]', () => {
  test('should set defaultTreeExpandKeys', () => {
    const defaultTreeExpandKeys = 2
    const wrapper = mount(
      <Table defaultTreeExpandKeys={[defaultTreeExpandKeys]} keygen="id" columns={treeColumns} data={treeData} />
    )
    wrapper.update()

    const getExpandKeys = (tree, defaultExpand, result = []) => {
      tree.forEach(i => {
        result.push(i.id)
        if (i.id === defaultExpand) {
          getExpandKeys(i.children, defaultExpand, result)
        }
      })
      return result
    }

    const result = getExpandKeys(treeData, defaultTreeExpandKeys)
    const expands = wrapper.find('ShineoutTr').map(i => i.props().rowKey)

    expect(wrapper.find('ShineoutTr').length).toBe(5)
    expect(expands.toString()).toBe(result.toString())
  })
})

describe('Table[disabled]', () => {
  test('should set disabled', () => {
    const handelRowSelect = jest.fn()
    const wrapper = mount(<Table disabled data={data} keygen="id" columns={columns} onRowSelect={handelRowSelect} />)
    wrapper.find('CheckItem').forEach(i => {
      expect(i.find('label').hasClass(`${SO_PREFIX}-checkinput-disabled`)).toBe(true)
    })
  })
})

describe('Table[empty]', () => {
  test('should set empty', () => {
    const empty = 'Hello'
    const wrapper = mount(<Table data={[]} keygen="id" columns={columns} empty={empty} />)
    expect(wrapper.find(`.${SO_PREFIX}-table-empty`).length).toBe(1)
    expect(wrapper.find(`.${SO_PREFIX}-table-empty`).text()).toBe(empty)
  })
})

// this attribute will be test by e2e
// describe('Table[expandKeys]', () => {
//   test('should set expandKeys', () => {})
// })

describe('Table[fixed]', () => {
  test('should set fixed', () => {
    jest.useFakeTimers()
    const fixed = ['x', 'y', 'both', 'auto']
    fixed.forEach(i => {
      const wrapper = mount(
        <Table fixed={i} keygen="id" height={74} width={100} columns={columns} data={data} rowsInView={1} />
      )
      jest.runAllTimers()
      if (i === 'both') {
        expect(wrapper.find(`.${SO_PREFIX}-scroll-bar`).length).toBe(2)
        expect(wrapper.find(`.${SO_PREFIX}-scroll-y`).length).toBe(1)
        expect(wrapper.find(`.${SO_PREFIX}-scroll-x`).length).toBe(1)

        wrapper.find('SeperateTable').instance().realTbody = { clientHeight: 148 }

        wrapper.find(`.${SO_PREFIX}-scroll-inner`).getDOMNode().scrollTop = 74
        wrapper.find(`.${SO_PREFIX}-scroll-inner`).getDOMNode().scrollLeft = 50
        const innerScroll = new UIEvent('scroll')
        innerScroll.initUIEvent('scroll')
        wrapper
          .find(`.${SO_PREFIX}-scroll-inner`)
          .getDOMNode()
          .dispatchEvent(innerScroll)
      } else if (i === 'x' || i === 'y') {
        expect(wrapper.find(`.${SO_PREFIX}-scroll-bar`).length).toBe(1)
        expect(wrapper.find(`.${SO_PREFIX}-scroll-${i}`).length).toBe(1)
      } else if (i === 'auto') {
        expect(wrapper.find(`.${SO_PREFIX}-scroll-bar`).length).toBe(2)
        expect(wrapper.find(`.${SO_PREFIX}-scroll-y`).length).toBe(1)
        expect(wrapper.find(`.${SO_PREFIX}-scroll-x`).length).toBe(1)
      }
    })
  })
})

describe('Table[format]', () => {
  test('should set format', () => {
    const handelRowSelect = jest.fn()
    const result = []
    const format = d => `${d.id} ${d.name}`
    const wrapper = mount(
      <Table
        keygen="id"
        data={data}
        fixed="both"
        columns={columns}
        style={{ height: 300 }}
        onRowSelect={handelRowSelect}
        format={format}
      />
    )
    wrapper.find('CheckItem').forEach((i, index) => {
      // the first item is checkAll
      if (index !== 0) {
        i.find('input').simulate('change', { target: { checked: true } })
        result.push(format(data[index - 1]))
        expect(handelRowSelect.mock.calls[index - 1][0].toString()).toBe(result.toString())
      }
    })
    expect(handelRowSelect).toBeCalledTimes(data.length)
  })
})

describe('Table[height]', () => {
  test('should set height', () => {
    const height = 500
    const wrapper = mount(<Table height={height} keygen="id" data={data} columns={columns} />)
    expect(wrapper.find(`.${SO_PREFIX}-table`).getDOMNode().style.height).toBe(`${height}px`)
  })
})

describe('Table[hideHeader]', () => {
  test('should set hideHeader', () => {
    const wrapper = mount(<Table hideHeader keygen="id" data={data} columns={columns} />)
    expect(wrapper.find(`.${SO_PREFIX}-table-head`).length).toBe(0)
  })
})

// this attribute will be test by e2e
// describe('Table[hover]', () => {
//   test('should set hover', () => {})
// })

describe('Table[innerScrollAttr]', () => {
  test('should set innerScrollAttr', () => {
    const innerScrollAttr = ['class']
    const wrapper = mount(
      <Table fixed="both" innerScrollAttr={innerScrollAttr} keygen="id" data={data} columns={columns} />
    )
    expect(wrapper.find('Scroll').length).toBe(1)
    const boundleScroll = jest.fn()
    const stopPropagation = jest.fn()
    wrapper.find('Scroll').instance().boundleScroll = boundleScroll
    const handleWheel = jest.fn(() =>
      wrapper
        .find('Scroll')
        .instance()
        .handleWheel({
          target: wrapper.find('Scroll').getDOMNode(),
          stopPropagation,
        })
    )
    wrapper.find('Scroll').instance().handleWheel = handleWheel()
    const event = new UIEvent('wheel')
    event.initUIEvent('wheel')
    wrapper
      .find('Scroll')
      .getDOMNode()
      .dispatchEvent(event)

    expect(
      innerScrollAttr.find(attr =>
        wrapper
          .find('Scroll')
          .getDOMNode()
          .hasAttribute(attr)
      ) !== undefined
    ).toBe(true)

    expect(handleWheel).toBeCalled()
    expect(stopPropagation).toBeCalled()
    expect(boundleScroll).not.toBeCalled()
  })
})

describe('Table[keygen]', () => {
  test('should set keygen when typeof keygen is String', () => {
    const wrapper = mount(<Table keygen="id" data={data} columns={columns} />)
    expect(wrapper.find('ShineoutTr').length).toBe(data.length)
    wrapper.find('ShineoutTr').forEach((i, index) => {
      expect(i.props().originKey).toBe(data[index].id)
    })
  })

  test('should set keygen when typeof keygen is Function', () => {
    const keygen = d => `Hello${d.id}`
    const wrapper = mount(<Table keygen={keygen} data={data} columns={columns} />)
    expect(wrapper.find('ShineoutTr').length).toBe(data.length)
    wrapper.find('ShineoutTr').forEach((i, index) => {
      expect(i.props().originKey).toBe(keygen(data[index]))
    })
  })
})

describe('Table[onColumnResize]', () => {
  test('should set onColumnResize', () => {
    const onColumnResize = jest.fn()
    const wrapper = mount(
      <Table keygen="id" columnResizable onColumnResize={onColumnResize} data={data} columns={columns} />
    )
    expect(wrapper.find(`.${SO_PREFIX}-table-resize-spanner`).length).toBe(2)
    const colgroup = columns.map(i => i.width)
    wrapper.find('SimpleTable').setState({ colgroup })

    wrapper.find(`.${SO_PREFIX}-table-resize-spanner`).forEach((i, index) => {
      i.simulate('mousedown')

      const eventMouseMove = new UIEvent('mousemove')
      eventMouseMove.initUIEvent('mousemove')
      document.dispatchEvent(eventMouseMove)
      wrapper.find('Thead').instance().resizingCol = {
        style: {
          width: `${columns[index].width}px`,
        },
      }
      const eventMouseUp = new UIEvent('mouseup')
      eventMouseUp.initUIEvent('mouseup')
      document.dispatchEvent(eventMouseUp)
    })
    expect(onColumnResize).toBeCalledTimes(2)
  })
})

describe('Table[onRowClick]', () => {
  test('should set onRowClick', () => {
    const onRowClick = jest.fn()
    const wrapper = mount(<Table keygen="id" onRowClick={onRowClick} data={data} columns={columns} />)
    wrapper.find('ShineoutTr').forEach(i => {
      i.simulate('click')
    })
    expect(onRowClick).toBeCalledTimes(data.length)
    onRowClick.mock.calls.forEach((i, index) => {
      expect(i[0]).toBe(data[index])
      expect(i[1]).toBe(index)
    })
  })
})

describe('Table[onRowSelect]', () => {
  test('should set onRowSelect', () => {
    const handelRowSelect = jest.fn()
    const wrapper = mount(<Table data={data} keygen="id" columns={columns} onRowSelect={handelRowSelect} />)
    wrapper.find('input').forEach(i => {
      // this first checkbox is checkAll
      if (i === 0) return
      i.simulate('change', {
        target: {
          checked: true,
        },
      })
    })
    expect(handelRowSelect).toBeCalled()
    wrapper.unmount()
  })
})

describe('Table[onScroll]', () => {
  test('should set onScroll', () => {
    const onScroll = jest.fn()
    const wrapper = mount(<Table fixed="both" onScroll={onScroll} keygen="id" data={data} columns={columns} />)
    expect(wrapper.find('Scroll').length).toBe(1)
    const X = wrapper.find('ScrollBar').last()
    // replace dom to virtual data
    wrapper.find('SeperateTable').instance().realTbody = { clientHeight: 100 }

    X.find(`.${SO_PREFIX}-scroll-handle`).simulate('mousedown', { clientX: 0, clientY: 0 })
    const eventMouseMove = new UIEvent('mousemove')
    eventMouseMove.clientX = 10
    eventMouseMove.clientY = 0
    eventMouseMove.initUIEvent('mousemove')
    document.dispatchEvent(eventMouseMove)

    expect(onScroll).toBeCalled()
  })
})

describe('Table[onSortCancel]', () => {
  test('should set onSortCancel', () => {
    const columnsSorter = [
      { title: 'id', render: 'id', width: 50, sorter: 'id' },
      { title: 'Name', render: 'name', width: 50 },
    ]
    const handleSort = jest.fn()
    const onSortCancel = jest.fn()
    const wrapper = mount(
      <Table
        keygen="id"
        fixed="both"
        sorter={handleSort}
        onSortCancel={onSortCancel}
        data={data}
        columns={columnsSorter}
      />
    )
    expect(wrapper.find(`.${SO_PREFIX}-table-sorter-asc`).length).toBe(1)
    wrapper.find(`.${SO_PREFIX}-table-sorter-asc`).simulate('click')
    wrapper.find(`.${SO_PREFIX}-table-sorter-asc`).simulate('click')
    expect(onSortCancel).toBeCalledTimes(1)
  })
})

describe('Table[onTreeExpand]', () => {
  test('should set onTreeExpand', () => {
    const onTreeExpand = jest.fn()
    const expendColumns = [
      { title: 'id', width: 50, render: d => d.id, treeColumnsName: 'children' },
      { title: 'Name', render: d => d.name, width: 50 },
    ]

    const wrapper = mount(
      <Table keygen="id" treeExpandKeys={[]} onTreeExpand={onTreeExpand} data={treeData} columns={expendColumns} />
    )
    wrapper
      .find(`.${SO_PREFIX}-table-icon-tree-expand`)
      .first()
      .simulate('click')
    expect(onTreeExpand).toBeCalled()
  })
})

// describe('Table[prediction]', () => {
//   test('should set prediction', () => {})
// })

describe('Table[radio]', () => {
  test('should set radio', () => {
    const handelRowSelect = jest.fn()
    const wrapper = mount(<Table radio onRowSelect={handelRowSelect} keygen="id" data={data} columns={columns} />)
    expect(wrapper.exists(`.${SO_PREFIX}-checkinput-radio`)).toBe(true)
    wrapper
      .find('input[type="radio"]')
      .first()
      .simulate('change', () => ({
        target: {
          checked: true,
        },
      }))
    expect(handelRowSelect).toBeCalled()
  })
})

describe('Table[renderSorter]', () => {
  test('should set renderSorter', () => {
    const wrapper = mount(<SortRenderTable />)
    expect(wrapper.exists(`.${SO_PREFIX}-table-sorter-container`)).toBe(true)
    // should custom style and dom
    expect(
      wrapper
        .find(`.${SO_PREFIX}-table-sorter-container`)
        .first()
        .children()
        .first()
        .getDOMNode().style.transform
    ).toBe('rotate(-90deg) scale(0.8, 1.2)')

    expect(
      wrapper
        .find(`.${SO_PREFIX}-table-sorter-container`)
        .first()
        .children()
        .last()
        .getDOMNode().style.transform
    ).toBe('rotate(-90deg) scale(0.8, 1.2)')
  })
})

describe('Table[rowClassName]', () => {
  test('should set rowClassName', () => {
    const className = 'hello'
    const rowClassName = jest.fn(() => className)
    const wrapper = mount(<Table radio rowClassName={rowClassName} keygen="id" data={data} columns={columns} />)
    expect(rowClassName).toBeCalled()
    wrapper.find(`.${SO_PREFIX}-table-normal`).forEach(i => {
      expect(i.hasClass(className)).toBe(true)
    })
  })
})

describe('Table[rowClickAttr]', () => {
  test('should set rowClickAttr', () => {
    const rowClickAttr = ['data-hello']
    const columnsAttr = [
      { title: 'id', render: 'id', width: 50, sorter: 'id' },
      {
        title: 'Name',
        width: 50,
        render: () => (
          <div>
            <Button data-hello className="hello">
              hello
            </Button>
            <Button data-shineout className="shineout">
              shineout
            </Button>
          </div>
        ),
      },
    ]
    const onRowClick = jest.fn()
    const wrapper = mount(
      <Table radio rowClickAttr={rowClickAttr} onRowClick={onRowClick} keygen="id" data={data} columns={columnsAttr} />
    )
    wrapper
      .find('.hello')
      .first()
      .simulate('click')

    expect(onRowClick).toBeCalled()

    wrapper
      .find('.shineout')
      .first()
      .simulate('click')

    expect(onRowClick).toBeCalledTimes(1)
  })
})

describe('Table[rowEvents]', () => {
  test('should set rowEvents', () => {
    const onMouseEnter = jest.fn()
    const rowEvents = {
      onMouseEnter,
    }
    const wrapper = mount(<Table rowEvents={rowEvents} keygen="id" data={data} columns={columns} />)
    wrapper.find(`.${SO_PREFIX}-table-normal`).forEach(i => {
      i.simulate('mouseenter')
    })
    expect(onMouseEnter).toBeCalled()
  })
})

// describe('Table[rowHeight]', () => {
//   test('should set rowHeight', () => {})
// })

describe('Table[rowsInView]', () => {
  test('should set rowsInView', () => {
    const wrapper = mount(<Table fixed="both" keygen="id" data={data} columns={columns} rowsInView={1} />)
    expect(wrapper.find(`.${SO_PREFIX}-table-normal`).length).toBe(1)
  })
})

describe('Table[showSelectAll]', () => {
  test('should set showSelectAll', () => {
    const handelRowSelect = jest.fn()
    const wrapper = mount(
      <Table showSelectAll={false} data={data} keygen="id" columns={columns} onRowSelect={handelRowSelect} />
    )
    const thead = wrapper.find('thead')
    expect(thead.exists('input[type="checkbox"]')).toBe(false)
    wrapper.unmount()
  })
})

// describe('Table[sticky]', () => {
//   test('should set sticky', () => {})
// })

describe('Table[treeCheckAll]', () => {
  test('should set treeCheckAll', () => {
    const handelRowSelect = jest.fn()
    const wrapper = mount(
      <Table
        keygen="id"
        format="id"
        treeCheckAll
        data={treeData}
        showSelectAll={false}
        columns={treeColumns}
        onRowSelect={handelRowSelect}
      />
    )
    wrapper
      .find('input[type="checkbox"]')
      .first()
      .simulate('change', { target: { checked: true } })
    expect(handelRowSelect).toBeCalled()
    expect(handelRowSelect.mock.calls[0][0].toString()).toBe('1,11,12')
    wrapper.unmount()
  })
})

describe('Table[treeEmptyExpand]', () => {
  test('should set treeEmptyExpand', () => {
    const wrapper = mount(<Table keygen="id" treeEmptyExpand expandKeys={[]} data={treeData} columns={treeColumns} />)
    expect(wrapper.find(`.${SO_PREFIX}-table-icon-tree-plus`).length).toBe(2)
  })
})

describe('Table[treeExpandKeys]', () => {
  test('should set treeExpandKeys', () => {
    const treeExpandKeys = [1]
    const wrapper = mount(
      <Table
        keygen="id"
        treeEmptyExpand
        expandKeys={[]}
        data={treeData}
        columns={treeColumns}
        treeExpandKeys={treeExpandKeys}
      />
    )
    expect(wrapper.find(`.${SO_PREFIX}-table-icon-tree-sub`).length).toBe(1)
    expect(
      wrapper
        .find(`.${SO_PREFIX}-table-normal`)
        .first()
        .exists(`.${SO_PREFIX}-table-icon-tree-sub`)
    ).toBe(true)
  })
})

describe('Table[value]', () => {
  test('should set value', () => {
    const wrapper = mount(<ControlTable />)
    wrapper.find('input[type="checkbox"]').forEach(i => {
      i.simulate('change', { target: { checked: true } })
    })
    expect(wrapper.find('#result').text()).toBe('1234')
    wrapper.unmount()
  })
})

describe('Table[verticalAlign]', () => {
  test('should set verticalAlign', () => {
    const verticalAlign = ['middle', 'top']
    verticalAlign.forEach(i => {
      const wrapper = mount(<Table verticalAlign={i} data={data} keygen="id" columns={columns} />)
      expect(wrapper.find(`.${SO_PREFIX}-table`).hasClass(`${SO_PREFIX}-table-vertical-${i}`))
    })
  })
})

describe('Table[width]', () => {
  test('should set width', () => {
    const width = 1500
    const wrapper = mount(<Table width={width} data={data} keygen="id" columns={columns} />)
    wrapper.find('table').forEach(table => {
      expect(table.getDOMNode().style.width).toBe(`${width}px`)
    })
  })
})

describe('Table.Column[align]', () => {
  test('should set Table.Column align', () => {
    const align = ['center', 'right']
    align.forEach(i => {
      const columnsAlign = [
        { title: 'id', render: 'id', width: 50, sorter: 'id', align: i },
        { title: 'Name', render: 'name', width: 50, align: i },
      ]
      const wrapper = mount(<Table data={data} keygen="id" columns={columnsAlign} />)
      wrapper.find('th').forEach(th => {
        expect(th.hasClass(`${SO_PREFIX}-table-align-${i}`)).toBe(true)
      })
      wrapper.find('td').forEach(td => {
        expect(td.hasClass(`${SO_PREFIX}-table-align-${i}`)).toBe(true)
      })
    })
  })
})

describe('Table.Column[className]', () => {
  test('should set Table.Column className', () => {
    const className = 'hello'
    const columnClassName = [
      { title: 'id', render: 'id', width: 50, sorter: 'id', className },
      { title: 'Name', render: 'name', width: 50, className },
    ]
    const wrapper = mount(<Table data={data} keygen="id" columns={columnClassName} />)
    wrapper.find('th').forEach(th => {
      expect(th.hasClass(className)).toBe(true)
    })
    wrapper.find('td').forEach(td => {
      expect(td.hasClass(className)).toBe(true)
    })
  })
})

describe('Table.Column[colSpan]', () => {
  test('should set Table.Column colSpan', () => {
    const columnColSpan = [
      { title: 'id', render: 'id', width: 50, sorter: 'id', colSpan: a => (a.id === 1 ? 2 : 1) },
      { title: 'Name', render: 'name', width: 50 },
    ]
    const wrapper = mount(<Table data={data} keygen="id" columns={columnColSpan} />)
    expect(
      wrapper
        .find(`.${SO_PREFIX}-table-simple-body tr`)
        .first()
        .find('td').length
    ).toBe(1)

    expect(
      wrapper
        .find(`.${SO_PREFIX}-table-simple-body td`)
        .first()
        .props().colSpan
    ).toBe(2)
  })

  test('should set Table.Column rowSpan', () => {
    const columnColSpan = [
      { title: 'id', render: 'id', width: 50, sorter: 'id', rowSpan: a => a.id > 0 },
      { title: 'Name', render: 'name', width: 50 },
    ]
    const wrapper = mount(<Table data={data} keygen="id" columns={columnColSpan} />)
    const rowSpan = data.filter(i => i.id > 0).length
    expect(
      wrapper
        .find(`.${SO_PREFIX}-table-simple-body td`)
        .first()
        .props().rowSpan
    ).toBe(rowSpan)
  })

  test('should set Table.Column rowSpan & colSpan', () => {
    const columnColSpan = [
      {
        title: 'id',
        render: 'id',
        width: 50,
        sorter: 'id',
        rowSpan: a => a.id === 1,
        colSpan: a => (a.id <= 2 ? 2 : 1),
      },
      { title: 'Name', render: 'name', width: 50 },
    ]
    const wrapper = mount(<Table data={data} keygen="id" columns={columnColSpan} />)

    expect(
      wrapper
        .find(`.${SO_PREFIX}-table-simple-body td`)
        .first()
        .props().rowSpan
    ).toBe(2)

    expect(
      wrapper
        .find(`.${SO_PREFIX}-table-simple-body td`)
        .first()
        .props().colSpan
    ).toBe(2)
  })

  test('should set Table.Column rowSpan & colSpan should not render', () => {
    const columnColSpan = [
      {
        title: 'id',
        render: 'id',
        width: 50,
        sorter: 'id',
        rowSpan: a => a.id === 1,
        colSpan: a => (a.id === 1 ? 2 : 1),
      },
      { title: 'Name', render: 'name', width: 50 },
    ]
    const wrapper = mount(<Table data={data} keygen="id" columns={columnColSpan} />)

    expect(
      wrapper
        .find(`.${SO_PREFIX}-table-simple-body td`)
        .first()
        .props().rowSpan
    ).toBe(undefined)

    expect(
      wrapper
        .find(`.${SO_PREFIX}-table-simple-body td`)
        .first()
        .props().colSpan
    ).toBe(2)
  })
})

describe('Table.Column[defaultOrder]', () => {
  test('should set Table.Column defaultOrder Asc', () => {
    const columnsSortAsc = [
      { title: 'id', render: 'id', width: 50, sorter: 'id', defaultOrder: 'asc' },
      { title: 'Name', render: 'name', width: 50 },
    ]

    const wrapper = mount(<Table data={data} keygen="id" columns={columnsSortAsc} />)
    const result = []
    wrapper.find(`.${SO_PREFIX}-table-simple-body tr`).forEach(tr => {
      result.push(
        tr
          .find('td')
          .first()
          .text()
      )
    })
    const expectResult = data.map(i => i.id)
    expect(result.toString()).toBe(expectResult.toString())
  })

  test('should set Table.Column defaultOrder Desc', () => {
    const columnsSortDesc = [
      { title: 'id', render: 'id', width: 50, sorter: 'id', defaultOrder: 'desc' },
      { title: 'Name', render: 'name', width: 50 },
    ]
    const wrapper = mount(<Table data={data} keygen="id" columns={columnsSortDesc} />)
    const result = []
    wrapper.find(`.${SO_PREFIX}-table-simple-body tr`).forEach(tr => {
      result.push(
        tr
          .find('td')
          .first()
          .text()
      )
    })
    const expectResult = data.map(i => i.id)
    expect(result.toString()).toBe(expectResult.reverse().toString())
  })
})

describe('Table.Column[filterAll]', () => {
  test('should set Table.Column filterAll', () => {
    const filterAll = d => d.filter(i => i.id === 1)
    const onRowSelect = jest.fn()
    const columnsFilterAll = [
      { width: 50, filterAll, type: 'checkbox' },
      { title: 'id', render: 'id', width: 50 },
      { title: 'Name', render: 'name', width: 50 },
    ]
    const wrapper = mount(
      <Table data={data} keygen="id" value={[]} columns={columnsFilterAll} onRowSelect={onRowSelect} />
    )

    wrapper
      .find('input[type="checkbox"]')
      .first()
      .simulate('change', { target: { checked: true } })

    expect(onRowSelect).toBeCalled()
    expect(onRowSelect.mock.calls[0][0][0] === filterAll(data)[0]).toBe(true)
    wrapper.unmount()
  })
})

describe('Table.Column[fixed]', () => {
  test('should set Table.Column fixed', () => {
    const fixed = ['left', 'right']
    fixed.forEach(i => {
      const columnsFixed = [
        { title: 'id', render: 'id', width: 100, fixed: i },
        { title: 'Name', render: 'name', width: 100 },
      ]

      const wrapper = mount(
        <div style={{ width: 100 }}>
          <Table data={data} fixed="both" keygen="id" columns={columnsFixed} width={200} />
        </div>
      )
      wrapper.find('tbody tr').forEach(tr => {
        expect(
          tr
            .find('td')
            .first()
            .hasClass(`${SO_PREFIX}-table-fixed-${i}`)
        ).toBe(true)
      })
    })
  })
})

describe('Table.Column[group]', () => {
  test('should set Table.Column group', () => {
    const columnsGroup = [
      { title: 'id', render: 'id', width: 100, group: ['shineout'] },
      { title: 'Name', render: 'name', width: 100, group: ['shineout'] },
    ]
    const wrapper = mount(<Table data={data} fixed="both" keygen="id" columns={columnsGroup} />)
    expect(wrapper.find('thead tr').length).toBe(2)
  })
})

describe('Table.Column[hide]', () => {
  test('should set Table.Column hide', () => {
    const columnsHide = [
      { type: 'row-expand', render: () => <div>hello</div>, hide: true },
      { title: 'id', render: 'id' },
      { title: 'Name', render: 'name' },
    ]
    const wrapper = mount(<Table data={data} fixed="both" keygen="id" columns={columnsHide} />)
    expect(wrapper.find(`.${SO_PREFIX}-table-expand-indicator`).length).toBe(0)
  })
})

describe('Table.Column[key]', () => {
  test('should set Table.Column key', () => {
    const columnsKey = [{ title: 'id', render: 'id', key: 'hello' }, { title: 'Name', render: 'name', key: 'shineout' }]
    const wrapper = mount(<Table data={data} fixed="both" keygen="id" columns={columnsKey} />)
    wrapper.update()
    wrapper.find(`tbody tr`).forEach(tr => {
      expect(
        tr
          .children()
          .first()
          .key()
      ).toBe('hello')

      expect(
        tr
          .children()
          .last()
          .key()
      ).toBe('shineout')
    })
  })
})

describe('Table.Column[maxWidth]', () => {
  test('should set Table.Column maxWidth', () => {
    const maxWidth = 200
    const columnsMaxWidth = [{ title: 'id', render: 'id', width: 50, maxWidth }, { title: 'Name', render: 'name' }]
    const wrapper = mount(<Table keygen="id" columnResizable data={data} columns={columnsMaxWidth} />)

    expect(wrapper.find(`.${SO_PREFIX}-table-resize-spanner`).length).toBe(2)

    const colgroup = columns.map(i => i.width)
    wrapper.find('SimpleTable').setState({ colgroup })
    const x = wrapper.find(`.${SO_PREFIX}-table-resize-spanner`).first()

    x.simulate('mousedown')

    const mouseMoveStart = new UIEvent('mousemove')
    mouseMoveStart.initUIEvent('mousemove')
    mouseMoveStart.clientX = 0
    document.dispatchEvent(mouseMoveStart)

    // move to 201px
    const mouseMoveEnd = new UIEvent('mousemove')
    mouseMoveEnd.initUIEvent('mousemove')
    mouseMoveEnd.clientX = maxWidth + 1
    document.dispatchEvent(mouseMoveEnd)

    const eventMouseUp = new UIEvent('mouseup')
    eventMouseUp.initUIEvent('mouseup')

    document.dispatchEvent(eventMouseUp)
    wrapper.update()
    expect(
      wrapper
        .find('colgroup')
        .first()
        .children()
        .first()
        .getDOMNode().style.width
    ).toBe(`${maxWidth}px`)
  })
})

describe('Table.Column[minWidth]', () => {
  test('should set Table.Column minWidth', () => {
    const minWidth = 50
    const columnsMinWidth = [{ title: 'id', render: 'id', width: 50, minWidth }, { title: 'Name', render: 'name' }]
    const wrapper = mount(<Table keygen="id" columnResizable data={data} columns={columnsMinWidth} />)

    expect(wrapper.find(`.${SO_PREFIX}-table-resize-spanner`).length).toBe(2)

    const colgroup = columns.map(i => i.width)
    wrapper.find('SimpleTable').setState({ colgroup })
    const x = wrapper.find(`.${SO_PREFIX}-table-resize-spanner`).first()

    x.simulate('mousedown')

    const mouseMoveStart = new UIEvent('mousemove')
    mouseMoveStart.initUIEvent('mousemove')
    mouseMoveStart.clientX = 0
    document.dispatchEvent(mouseMoveStart)

    // move to 49px
    const mouseMoveEnd = new UIEvent('mousemove')
    mouseMoveEnd.initUIEvent('mousemove')
    mouseMoveEnd.clientX = -1
    document.dispatchEvent(mouseMoveEnd)

    const eventMouseUp = new UIEvent('mouseup')
    eventMouseUp.initUIEvent('mouseup')

    document.dispatchEvent(eventMouseUp)
    wrapper.update()
    expect(
      wrapper
        .find('colgroup')
        .first()
        .children()
        .first()
        .getDOMNode().style.width
    ).toBe(`${minWidth}px`)
  })
})

describe('Table.Column[render]', () => {
  test('should set Table.Column render', () => {
    const renderColumn = jest.fn(d => <div>{d.name}</div>)
    const columnsRender = [{ title: 'id', render: 'id', width: 50 }, { title: 'Name', render: renderColumn, width: 50 }]
    mount(<Table keygen="id" data={data} columns={columnsRender} />)
    expect(renderColumn).toBeCalledTimes(data.length)
  })
})

describe('Table.Column[sorter]', () => {
  test('should set Table.Column sorter ', () => {
    const columnsSortAsc = [
      { title: 'id', render: 'id', width: 50, sorter: 'id' },
      { title: 'Name', render: 'name', width: 50 },
    ]
    const asc = jest.fn((a, b) => a.id - b.id)
    const desc = jest.fn((a, b) => b.id - a.id)

    const handleSort = jest.fn((name, order) => {
      if (order === 'asc') {
        return asc
      }
      return desc
    })
    const wrapper = mount(<Table data={data} sorter={handleSort} keygen="id" columns={columnsSortAsc} />)
    wrapper.find(`.${SO_PREFIX}-table-sorter-asc`).simulate('click')
    expect(handleSort.mock.calls[0][0]).toBe('id')
    expect(handleSort.mock.calls[0][1]).toBe('asc')
    expect(asc).toBeCalled()

    const resultAsc = []
    wrapper.find(`.${SO_PREFIX}-table-simple-body tr`).forEach(tr => {
      resultAsc.push(
        tr
          .find('td')
          .first()
          .text()
      )
    })
    const expectAsc = data.map(i => i.id)
    expect(resultAsc.toString()).toBe(expectAsc.toString())

    wrapper.find(`.${SO_PREFIX}-table-sorter-desc`).simulate('click')
    expect(handleSort.mock.calls[1][0]).toBe('id')
    expect(handleSort.mock.calls[1][1]).toBe('desc')
    expect(desc).toBeCalled()

    const resultDesc = []
    wrapper.find(`.${SO_PREFIX}-table-simple-body tr`).forEach(tr => {
      resultDesc.push(
        tr
          .find('td')
          .first()
          .text()
      )
    })
    const expectDesc = data.map(i => i.id)
    expect(resultDesc.toString()).toBe(expectDesc.reverse().toString())
  })
})

describe('Table.Column[treeIndent]', () => {
  test('should set Table.Column treeIndent', () => {
    const treeIndent = 50
    const treeColumnsIndent = [
      { title: 'id', render: 'id', width: 50, treeColumnsName: 'children', treeIndent: 50 },
      { title: 'Name', render: 'name' },
    ]
    const wrapper = mount(<Table keygen="id" data={treeData} columns={treeColumnsIndent} />)
    wrapper
      .find(`.${SO_PREFIX}-table-icon-tree-plus`)
      .first()
      .simulate('click')

    expect(
      wrapper
        .find(`.${SO_PREFIX}-table-normal`)
        .at(2)
        .find(`.${SO_PREFIX}-table-expand-wrapped`)
        .getDOMNode().style.marginLeft
    ).toBe(`${treeIndent}px`)
  })
})

describe('Table.Column[width]', () => {
  test('should set Table.Column width', () => {
    const wrapper = mount(<Table keygen="id" data={data} columns={columns} />)
    wrapper
      .find('colgroup')
      .first()
      .children()
      .forEach(col => {
        expect(col.getDOMNode().style.width).toBe('50px')
      })
  })
})

describe('Table.Column[type]', () => {
  test('should set Table.Column type expand', () => {
    const columnsExpand = [
      {
        type: 'row-expand',
        render: d => () => <div>{JSON.stringify(d)}</div>,
      },
      { title: 'id', render: 'id', width: 50 },
      { title: 'Name', render: 'name', width: 50 },
    ]
    const wrapper = mount(<Table fixed="both" height={100} keygen="id" data={data} columns={columnsExpand} />)
    wrapper.find('ShineoutTr').forEach(tr => {
      tr.instance().element.getBoundingClientRect = () => ({
        height: 37,
      })
    })
    wrapper
      .find(`.${SO_PREFIX}-table-icon-expand-plus`)
      .first()
      .simulate('click')

    expect(wrapper.find(`.${SO_PREFIX}-table-icon-expand-sub`).length).toBe(1)
  })
})

describe('Table[unmount]', () => {
  test('should unmount', () => {
    const wrapper = mount(<Table keygen="id" columns={columns} data={data} />)
    expect(wrapper.find(Table).length).toBe(1)
    wrapper.unmount()
    expect(wrapper.find(Table).length).toBe(0)
  })
})

// this attribute will be test by e2e
// describe('Table[ctrl/cmd+click]', () => {
//   test('should click when ctrl/cmd is simulated', () => {})
// })

describe('Table[cellSelectable]', () => {
  test('should set cellSelectable', () => {
    const wrapper = mount(<Table keygen="id" cellSelectable columns={columns} data={data} />)
    const ctrlDown = new UIEvent('keydown')
    ctrlDown.initUIEvent('keydown')
    ctrlDown.keyCode = 67
    ctrlDown.ctrlKey = 67
    document.dispatchEvent(ctrlDown)

    const firstItem = wrapper.find('tbody td').first()
    firstItem.simulate('mousedown', { ctrlKey: 67 })
    firstItem.simulate('mouseup', { ctrlKey: 67 })
    expect(document.body.className).toBe(`${SO_PREFIX}-table-no-selection`)
  })

  test('should set cellSelectable move', () => {
    const wrapper = mount(<Table keygen="id" cellSelectable columns={columns} data={data} />)
    const ctrlDown = new UIEvent('keydown')
    ctrlDown.initUIEvent('keydown')
    ctrlDown.keyCode = 67
    ctrlDown.ctrlKey = 67
    document.dispatchEvent(ctrlDown)

    // move to last
    const firstItem = wrapper.find('tbody td').first()
    const lastItem = wrapper.find('tbody td').last()

    firstItem.simulate('mousedown', { ctrlKey: 67, target: firstItem.getDOMNode() })

    firstItem.simulate('mousemove', { ctrlKey: 67, target: lastItem.getDOMNode() })

    firstItem.simulate('mouseup', { ctrlKey: 67, target: lastItem.getDOMNode() })

    expect(wrapper.html().match(/so-table-select/g).length).toBe(wrapper.find('tbody td').length)

    // cancel select
    firstItem.simulate('mousedown', { ctrlKey: 67, target: firstItem.getDOMNode() })
    firstItem.simulate('mouseup', { ctrlKey: 67, target: firstItem.getDOMNode() })
    expect(wrapper.html().match(/so-table-select/g).length).toBe(wrapper.find('tbody td').length - 1)
    document.body.click()
  })
})
