/**
 * cn - 拖动行
 *    -- 通过 rowEvents 属性来自定义拖拽事件
 * en - drag row
 *    -- customize drag events through the rowEvents property
 */
import React from 'react'
import { Table } from 'shineout'
import './row-drag.css'

const data = [
  {
    id: 1,
    firstName: 'Ephraim',
    lastName: 'Wisozk',
    position: 'Marketing Designer',
    start: '2012-01-29',
    time: '01:42',
    salary: 115777,
    country: 'Reunion',
    office: 'Miami',
    office5: 'Istanbul',
    height: 113.74,
  },
  {
    id: 2,
    firstName: 'Osvaldo',
    lastName: 'Beer',
    position: 'Financial Controller',
    start: '2007-09-04',
    time: '03:26',
    salary: 396093,
    country: 'Syrian Arab Republic',
    office: 'San Paulo',
    office5: 'Shenzhen',
    height: 82.13,
  },
  {
    id: 3,
    firstName: 'Dylan',
    lastName: 'Ratke',
    position: 'Development Lead',
    start: '2009-10-16',
    time: '01:45',
    salary: 236064,
    country: 'Peru',
    office: 'Boston',
    office5: 'Delhi',
    height: 179.53,
  },
  {
    id: 4,
    firstName: 'Shaniya',
    lastName: 'Jacobs',
    position: 'Developer',
    start: '2014-06-30',
    time: '02:17',
    salary: 338985,
    country: 'Peru',
    office: 'Chengdu',
    office5: 'Dallas-Fort Worth',
    height: 190.11,
  },
]

const columns = [
  { title: 'id', render: 'id', width: 50 },
  { title: 'Name', render: d => `${d.firstName} ${d.lastName}` },
  { title: 'Country', render: 'country' },
  { title: 'Position', render: 'position' },
  { title: 'Office', render: 'office' },
  { title: 'Start Date', render: 'start' },
  {
    title: 'Salary',
    render: d => `$${d.salary.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}`,
  },
]

const findNearestDOM = (el, tagName) => {
  let node = el
  while (node.tagName !== tagName && node.tagName !== 'BODY') {
    node = node.parentNode
  }
  return node
}
const findIndex = el => {
  const tbody = findNearestDOM(el, 'TBODY')
  const nodes = Array.prototype.slice.call(tbody.children)

  return nodes.indexOf(el)
}

export default function() {
  const [d, setD] = React.useState(data)
  const [target, setTarget] = React.useState()
  const ref = React.useRef({ current: {} })
  const dragStartHandler = React.useCallback(e => {
    if (ref.current.dragging) return
    ref.current.dragging = true
    ref.current.startIndex = findIndex(e.target)
  }, [])

  const dragEnterHandler = React.useCallback(e => {
    e.preventDefault()
    const tr = findNearestDOM(e.target, 'TR')
    const index = findIndex(tr)
    setTarget(index)
  }, [])

  const dragOverHandler = React.useCallback(e => {
    e.preventDefault()
  }, [])
  const dragEndHandler = React.useCallback(e => {
    console.log('dragEnd', e.target)
    ref.current.dragging = false
    setTarget(null)
  }, [])
  const dropHandler = React.useCallback(
    e => {
      e.preventDefault()
      const tr = findNearestDOM(e.target, 'TR')
      const start = ref.current.startIndex
      const end = findIndex(tr)
      if (start === end) return
      const source = d[start]
      const r = [...d]
      console.log(start, end)
      r.splice(start, 1)
      r.splice(end, 0, source)
      setD(r)
    },
    [d]
  )
  console.log(target)
  return (
    <Table
      keygen="id"
      width="100%"
      columns={columns}
      data={d}
      cellSelectable
      rowClassName={(row, index) => (index === target ? 'example-drag-in' : '')}
      rowEvents={{
        draggable: true,
        onDragStart: dragStartHandler,
        onDragEnter: dragEnterHandler,
        onDragOver: dragOverHandler,
        onDragEnd: dragEndHandler,
        onDrop: dropHandler,
      }}
    />
  )
}
