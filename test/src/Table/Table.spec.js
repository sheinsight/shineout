import React from 'react'
import { mount, render, shallow } from 'enzyme'
import { Table } from 'shineout'
import Render from 'react-test-renderer'
import TableBase from '../../../site/pages/components/Table/example-01-base'

const columns = [{ title: 'id', render: 'id', width: 50 }, { title: 'Name', render: 'name' }]
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

describe('Table[cellSelectable]', () => {
  test('should set cellSelectable', () => {
    const wrapper = Render.create(<Table keygen="id" size="small" columns={columns} data={data} />).toJSON()
    expect(wrapper).toMatchSnapshot()
  })
})

describe('Table[changedByExpand]', () => {
  test('should set changedByExpand', () => {
    const wrapper = mount(<Table data={treeData} keygen="id" />)
  })
})

describe('Table[base]', () => {
  test('should custom style and className', () => {})
})

describe('Table[dataChangeResize]', () => {
  test('should dataChangeResize', () => {})
})

describe('Table[defaultTreeExpandKeys]', () => {
  test('should set defaultTreeExpandKeys', () => {})
})

describe('Table[disabled]', () => {
  test('should set disabled', () => {})
})

describe('Table[empty]', () => {
  test('should set empty', () => {})
})

describe('Table[expandKeys]', () => {
  test('should set expandKeys', () => {})
})

describe('Table[fixed]', () => {
  test('should set fixed', () => {})
})

describe('Table[format]', () => {
  test('should set format', () => {})
})

describe('Table[height]', () => {
  test('should set height', () => {})
})

describe('Table[hideHeader]', () => {
  test('should set hideHeader', () => {})
})

describe('Table[hover]', () => {
  test('should set hover', () => {})
})

describe('Table[innerScrollAttr]', () => {
  test('should set innerScrollAttr', () => {})
})

describe('Table[keygen]', () => {
  test('should set keygen', () => {})
})

describe('Table[onColumnResize]', () => {
  test('should set onColumnResize', () => {})
})

describe('Table[onRowClick]', () => {
  test('should set onRowClick', () => {})
})

describe('Table[onRowSelect]', () => {
  test('should set onRowSelect', () => {})
})

describe('Table[onScroll]', () => {
  test('should set onScroll', () => {})
})

describe('Table[onSortCancel]', () => {
  test('should set onSortCancel', () => {})
})

describe('Table[onTreeExpand]', () => {
  test('should set onTreeExpand', () => {})
})

describe('Table[prediction]', () => {
  test('should set prediction', () => {})
})

describe('Table[radio]', () => {
  test('should set radio', () => {})
})

describe('Table[renderSorter]', () => {
  test('should set renderSorter', () => {})
})

describe('Table[rowClassName]', () => {
  test('should set rowClassName', () => {})
})

describe('Table[rowClickAttr]', () => {
  test('should set rowClickAttr', () => {})
})

describe('Table[rowEvents]', () => {
  test('should set rowEvents', () => {})
})

describe('Table[rowHeight]', () => {
  test('should set rowHeight', () => {})
})

describe('Table[rowsInView]', () => {
  test('should set rowsInView', () => {})
})

describe('Table[showSelectAll]', () => {
  test('should set showSelectAll', () => {})
})

describe('Table[sticky]', () => {
  test('should set sticky', () => {})
})

describe('Table[treeCheckAll]', () => {
  test('should set treeCheckAll', () => {})
})

describe('Table[treeEmptyExpand]', () => {
  test('should set treeEmptyExpand', () => {})
})

describe('Table[treeExpandKeys]', () => {
  test('should set treeExpandKeys', () => {})
})

describe('Table[value]', () => {
  test('should set value', () => {})
})

describe('Table[verticalAlign]', () => {
  test('should set verticalAlign', () => {})
})

describe('Table[width]', () => {
  test('should set width', () => {})
})

describe('Table.Column[align]', () => {
  test('should set Table.Column align', () => {})
})

describe('Table.Column[className]', () => {
  test('should set Table.Column className', () => {})
})

describe('Table.Column[colSpan]', () => {
  test('should set Table.Column colSpan', () => {})
})

describe('Table.Column[defaultOrder]', () => {
  test('should set Table.Column defaultOrder', () => {})
})

describe('Table.Column[filterAll]', () => {
  test('should set Table.Column filterAll', () => {})
})

describe('Table.Column[fixed]', () => {
  test('should set Table.Column fixed', () => {})
})

describe('Table.Column[group]', () => {
  test('should set Table.Column group', () => {})
})

describe('Table.Column[hide]', () => {
  test('should set Table.Column hide', () => {})
})

describe('Table.Column[key]', () => {
  test('should set Table.Column key', () => {})
})

describe('Table.Column[maxWidth]', () => {
  test('should set Table.Column maxWidth', () => {})
})

describe('Table.Column[minWidth]', () => {
  test('should set Table.Column minWidth', () => {})
})

describe('Table.Column[render]', () => {
  test('should set Table.Column render', () => {})
})

describe('Table.Column[rowSpan]', () => {
  test('should set Table.Column rowSpan', () => {})
})

describe('Table.Column[sorter]', () => {
  test('should set Table.Column sorter', () => {})
})

describe('Table.Column[title]', () => {
  test('should set Table.Column title', () => {})
})

describe('Table.Column[treeColumnsName]', () => {
  test('should set Table.Column treeColumnsName', () => {})
})

describe('Table.Column[treeIndent]', () => {
  test('should set Table.Column treeIndent', () => {})
})

describe('Table.Column[type]', () => {
  test('should set Table.Column type', () => {})
})

describe('Table.Column[width]', () => {
  test('should set Table.Column width', () => {})
})
