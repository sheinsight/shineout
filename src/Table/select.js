import React from 'react'
import PropTypes from 'prop-types'
import { addEventListener } from '../utils/dom/document'
import { getParent } from '../utils/dom/element'
import { isMacOS, isFirefox } from '../utils/is'
import ready from '../utils/dom/ready'

import { tableClass } from '../styles'

const selectClass = tableClass('select')
const trClass = tableClass('normal')
const noSelection = tableClass('no-selection')

// event combination
function isEventCombination(event) {
  const ismo = isMacOS()
  return (ismo && event.metaKey) || (!ismo && event.ctrlKey)
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
      txt += `${formatTableText(value)}\n`
    }
  })
  return txt
}

// 生成 textarea，并且执行 copy
function execCopyCommand(text) {
  // if none, return;
  if (!text) return
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
function bulkAddSelectionClass(td, cache) {
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

function handleKeyDown(event) {
  if (!isEventCombination(event) || event.keyCode !== 67) return

  const texts = formatTableText(mergeDomsText(document.querySelectorAll(`.${selectClass}`)))
  execCopyCommand(texts)
}

// ctrl + c
ready(() => {
  addEventListener(document, 'keydown', handleKeyDown)
})

export default Table =>
  class extends React.Component {
    static propTypes = {
      selection: PropTypes.bool,
      cellSelectable: PropTypes.bool,
    }

    constructor(props) {
      super(props)

      this.doc = null

      this.isFirefox = isFirefox()

      this.events = {}

      this.move = false
      this.cache = {}
      this.prevDom = null

      this.handleMouseDown = this.handleMouseDown.bind(this)
      this.handleMouseUp = this.handleMouseUp.bind(this)
      this.handleMouseMove = this.handleMouseMove.bind(this)

      if (!this.isFirefox && this.selection) {
        this.events.onMouseDown = this.handleMouseDown
        this.events.onMouseUp = this.handleMouseUp
        this.events.onMouseMove = this.handleMouseMove
      }
    }

    componentDidMount() {
      if (!this.isFirefox && this.selection) {
        this.doc = addEventListener(document, 'click', docClick)
      }
    }

    componentWillUnmount() {
      if (this.doc) {
        this.doc.remove()
      }
    }

    get selection() {
      const { selection, cellSelectable } = this.props
      return selection || cellSelectable
    }

    isEventCombination(event) {
      return this.selection && isEventCombination(event)
    }

    handleMouseDown(event) {
      if (!this.isEventCombination(event)) return
      toggleNoSelection(true)

      // toggle move
      this.move = true

      const td = getParent(event.target, 'td')
      const tr = getParent(td, `tr.${trClass}`)
      this.prevDom = td
      if (!tr) return
      const xIndex = Array.prototype.indexOf.call(tr.childNodes, td)
      const yIndex = Array.prototype.indexOf.call(tr.parentNode.childNodes, tr)
      this.cache.xIndex = xIndex
      this.cache.yIndex = yIndex
      this.cache.dom = td
    }

    handleMouseUp(event) {
      if (!this.isEventCombination(event)) return

      const td = getParent(event.target, 'td')
      if (td === this.cache.dom) {
        this.cache = {}
        this.move = false
        if (td.classList.contains(selectClass)) {
          removeSelectClass(td)
          return
        }
        addSelectionClass(td)
        return
      }
      this.prevDom = null

      bulkAddSelectionClass(td, this.cache)

      // reset
      this.cache = {}
      this.move = false
    }

    handleMouseMove(event) {
      if (!this.move) return

      const td = getParent(event.target, 'td')
      if (this.prevDom === td) return
      this.prevDom = td

      // clear class name
      removeSelectClass()

      bulkAddSelectionClass(td, this.cache)
    }

    render() {
      const { selection, cellSelectable, ...otherProps } = this.props
      return <Table {...otherProps} events={this.events} />
    }
  }
