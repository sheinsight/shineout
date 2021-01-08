import React from 'react'
import PropTypes from 'prop-types'

import { addEventListener } from '../utils/dom/document'
import { getParent } from '../utils/dom/element'
import { isMacOS, isFirefox } from '../utils/is'

import { tableClass } from '../styles'

const selectClass = tableClass('select')
const trClass = tableClass('normal')

// event combination
function isEventCombination(event) {
  const ismo = isMacOS()
  return (ismo && event.metaKey) || (!ismo && event.ctrlKey)
}

// remove all selectClass from dom
function removeSelectClass(dom) {
  if (dom) {
    dom.classList.remove(selectClass)
    return
  }
  const nodes = document.querySelectorAll(`.${selectClass}`)
  if (nodes.length <= 0) return
  nodes.forEach(elem => {
    removeSelectClass(elem)
  })
}

// handle document click
function docClick(event) {
  if (getParent(event.target, '.so-table-normal') && isEventCombination(event)) return
  // console.log(event.target)
  removeSelectClass()
}

// handle click
function handleClick(event) {
  const dom = getParent(event.target, 'td')
  if (isEventCombination(event) && dom) {
    if (dom.classList.contains(selectClass)) {
      dom.classList.remove(selectClass)
      return
    }
    dom.classList.add(selectClass)
  }
}

const cache = {}

// mouse down
function handleMouseDown(event) {
  event.persist()
  console.log('event: ', event)

  const td = getParent(event.target, 'td')
  const rect = td.getBoundingClientRect()
  const tr = getParent(td, `tr.${trClass}`)
  const xIndex = Array.prototype.indexOf.call(tr.childNodes, td)
  const yIndex = Array.prototype.indexOf.call(tr.parentNode.childNodes, tr)
  // cache = {
  //   rect,
  //   xIndex,
  //   yIndex,
  // }
  cache.rect = rect
  cache.xIndex = xIndex
  cache.yIndex = yIndex
}
// mouse up
function handleMouseUp(event) {
  event.persist()
  console.log('event up: ', event)
  console.log(event.target.getBoundingClientRect())

  const td = getParent(event.target, 'td')
  const tr = getParent(td, `tr.${trClass}`)

  const trs = tr.parentNode.childNodes
  const xIndex = Array.prototype.indexOf.call(tr.childNodes, td)

  let count = 0
  // xIndex - cache.xIndex
  while (count < trs.length) {
    if (trs[count] === tr) {
      break
    }
    count++
  }
}

export default Table =>
  class extends React.Component {
    constructor(props) {
      super(props)

      this.doc = null

      this.isFirefox = isFirefox()

      this.events = {}

      if (!this.isFirefox) {
        this.events.onClick = handleClick
        this.events.onMouseDown = handleMouseDown
        this.events.onMouseUp = handleMouseUp
      }
    }

    componentDidMount() {
      if (!this.isFirefox) {
        this.doc = addEventListener(document, 'click', docClick)
      }
    }

    componentWillUnmount() {
      if (this.doc) {
        this.doc.remove()
      }
    }

    render() {
      return <Table {...this.props} events={this.events} />
    }
  }
