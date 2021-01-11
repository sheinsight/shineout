import React from 'react'
import PropTypes from 'prop-types'
import { addEventListener } from '../utils/dom/document'
import { getParent } from '../utils/dom/element'
import { isMacOS, isFirefox } from '../utils/is'

import { tableClass } from '../styles'

const selectClass = tableClass('select')
const trClass = tableClass('normal')
const noSelection = tableClass('no-selection')

let cache = {}
let move = false
let prevDom = null
let selection = false

// event combination
function isEventCombination(event) {
  const ismo = isMacOS()
  return selection && ((ismo && event.metaKey) || (!ismo && event.ctrlKey))
}

// 根据table tr层次   合并td
function mergeDomsText(nodes) {
  if (!nodes || nodes.length <= 0) return []
  const trs = []
  const res = []
  nodes.forEach(node => {
    const tr = getParent(node, `tr.${trClass}`)
    let index = trs.indexOf(tr)
    if (index === -1) {
      trs.push(tr)
      index = trs.length - 1
    }
    if (res[index]) {
      res[index].push(node.innerText)
    } else {
      res[index] = [node.innerText]
    }
  })
  return res
}

// format table text
// 组合 text
function formatTableText(arrs) {
  if (!arrs || arrs.length <= 0) return ''
  let txt = ''
  arrs.forEach(value => {
    if (typeof value === 'string') {
      txt += `${value}\t`
    } else {
      txt += `${formatTableText(value)} \n`
    }
  })
  return txt
}

// 生成 textarea，并且执行 copy
function execCopyCommand(text) {
  const textarea = document.createElement('textarea')
  textarea.setAttribute('readonly', 'readonly')
  textarea.value = text

  // out window
  textarea.style.position = 'fixed'
  textarea.style.top = '-9999px'
  textarea.style.left = '-9999px'

  document.body.append(textarea)
  textarea.select()
  if (document.execCommand('copy')) {
    document.execCommand('copy')
  }
  document.body.removeChild(textarea)
}

// remove all selectClass from dom
function removeSelectClass(dom, force = false) {
  if (dom) {
    dom.classList.remove(selectClass)
    return
  }
  if (force) return
  let nodes = document.querySelectorAll(`.${selectClass}`)
  if (nodes.length <= 0) return
  nodes.forEach(elem => {
    removeSelectClass(elem)
  })
  nodes = document.querySelector(`.${noSelection}`)
  if (nodes) nodes.classList.remove(`.${noSelection}`)
}

// add selection class
function addSelectionClass(dom, className = selectClass) {
  if (!dom) return
  dom.classList.add(className)
}

function toggleNoSelection(flag) {
  if (flag) {
    document.body.classList.add(noSelection)
    return
  }
  document.body.classList.remove(noSelection)
}

// handle document click
function docClick(event) {
  if (
    (getParent(event.target, `.${tableClass('simple-body')}`) || getParent(event.target, `.${tableClass('body')}`)) &&
    isEventCombination(event)
  )
    return
  removeSelectClass()
  toggleNoSelection()
}

// 批量操作
// bulk operation doms
function bulkOperation(doms, start, end) {
  if (!doms || doms.length <= 0 || start <= -1 || end <= -1) return
  const arr = Array.prototype.slice.call(doms.childNodes, start, end + 1)
  arr.forEach(dom => {
    addSelectionClass(dom)
  })
}

// 批量操作 -->  添加 selection classname
function bulkAddSelectionClass(td) {
  const tr = getParent(td, `tr.${trClass}`)

  if (!tr) return

  const trs = tr.parentNode.childNodes
  const xIndex = Array.prototype.indexOf.call(tr.childNodes, td)

  let count = 0
  // xIndex - cache.xIndex
  while (count < trs.length) {
    if (cache.yIndex <= count) {
      bulkOperation(trs[count], cache.xIndex, xIndex)
    }
    if (trs[count] === tr) {
      break
    }
    count += 1
  }
}

// mouse down
function handleMouseDown(event) {
  if (!isEventCombination(event)) return
  toggleNoSelection(true)

  // toggle move
  move = true

  const td = getParent(event.target, 'td')
  const tr = getParent(td, `tr.${trClass}`)
  if (!tr) return
  const xIndex = Array.prototype.indexOf.call(tr.childNodes, td)
  const yIndex = Array.prototype.indexOf.call(tr.parentNode.childNodes, tr)
  cache.xIndex = xIndex
  cache.yIndex = yIndex
}
// mouse up
function handleMouseUp(event) {
  if (!isEventCombination(event)) return

  const td = getParent(event.target, 'td')

  bulkAddSelectionClass(td)

  // reset
  cache = {}
  move = false
}

function handleMouseMove(event) {
  if (!move) return

  const td = getParent(event.target, 'td')
  if (prevDom === td) return
  prevDom = td

  // clear class name
  removeSelectClass()

  bulkAddSelectionClass(td)
}

function handleKeyDown(event) {
  if (!isEventCombination(event) || event.keyCode !== 67) return

  const texts = formatTableText(mergeDomsText(document.querySelectorAll(`.${selectClass}`)))
  execCopyCommand(texts)
}

// ctrl + c
addEventListener(document, 'keydown', handleKeyDown)

export default Table =>
  class extends React.Component {
    static propTypes = {
      selection: PropTypes.bool,
    }

    constructor(props) {
      super(props)

      this.doc = null

      // eslint-disable-next-line prefer-destructuring
      selection = props.selection

      this.isFirefox = isFirefox()

      this.events = {}

      if (!this.isFirefox && props.selection) {
        this.events.onMouseDown = handleMouseDown
        this.events.onMouseUp = handleMouseUp
        this.events.onMouseMove = handleMouseMove
      }
    }

    componentDidMount() {
      if (!this.isFirefox && this.props.selection) {
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
