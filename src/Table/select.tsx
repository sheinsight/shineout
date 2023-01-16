import React, { ComponentType } from 'react'
import PropTypes from 'prop-types'
import { addEventListener } from '../utils/dom/document'
import { getParent } from '../utils/dom/element'
import { isMacOS, isFirefox } from '../utils/is'
import ready from '../utils/dom/ready'
import { GetSelectProps, OriginTableProps } from './Props'

import { tableClass } from './styles'

const selectClass = tableClass('select')
const trClass = tableClass('normal')
const noSelection = tableClass('no-selection')

// event combination
function isEventCombination(event: KeyboardEvent | MouseEvent | React.MouseEvent) {
  const ismo = isMacOS()
  return (ismo && event.metaKey) || (!ismo && event.ctrlKey)
}

// 根据table tr层次   合并td
function mergeDomsText(nodes: NodeListOf<HTMLTableRowElement>) {
  if (!nodes || nodes.length <= 0) return []
  const trs: HTMLTableRowElement[] = []
  const res: string[][] = []
  nodes.forEach(node => {
    const tr = getParent(node, `tr.${trClass}`) as HTMLTableRowElement
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
type arrSource = Array<string | arrSource>
function formatTableText(arrs: arrSource) {
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
function execCopyCommand(text: string) {
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
  if (textarea && textarea.parentNode) textarea.parentNode.removeChild(textarea)
}

// remove all selectClass from dom
function removeSelectClass(dom?: HTMLTableCellElement, force = false) {
  if (dom) {
    dom.classList.remove(selectClass)
    return
  }
  if (force) return
  const nodes = document.querySelectorAll(`.${selectClass}`)
  if (nodes.length <= 0) return
  nodes.forEach((elem: HTMLTableCellElement) => {
    removeSelectClass(elem)
  })
  const node = document.querySelector(`.${noSelection}`)
  if (node) node.classList.remove(`.${noSelection}`)
}

// add selection class
function addSelectionClass(dom?: HTMLTableCellElement, className = selectClass) {
  if (!dom) return
  dom.classList.add(className)
}

function toggleNoSelection(flag?: boolean) {
  if (flag) {
    document.body.classList.add(noSelection)
    return
  }
  document.body.classList.remove(noSelection)
}

// handle document click
function docClick(event: MouseEvent) {
  const target = event.target as HTMLElement
  if (
    (getParent(target, `.${tableClass('simple-body')}`) || getParent(target, `.${tableClass('body')}`)) &&
    isEventCombination(event)
  )
    return
  removeSelectClass()
  toggleNoSelection()
}

// 批量操作
// bulk operation doms
function bulkOperation(doms: HTMLTableRowElement, start: number, end: number) {
  if (!doms || doms.childNodes.length <= 0 || start <= -1 || end <= -1) return
  const arr = Array.prototype.slice.call(doms.childNodes, start, end + 1)
  arr.forEach((dom: HTMLTableCellElement) => {
    addSelectionClass(dom)
  })
}

// 批量操作 -->  添加 selection classname
function bulkAddSelectionClass(td: HTMLTableCellElement, cache: CacheType) {
  const tr = getParent(td, `tr.${trClass}`) as HTMLTableRowElement

  if (!tr) return

  const trs = tr.parentNode!.childNodes
  const xIndex = Array.prototype.indexOf.call(tr.childNodes, td)

  let count = 0
  // xIndex - cache.xIndex
  while (count < trs.length) {
    if (cache.yIndex! <= count) {
      const Atr = trs[count] as HTMLTableRowElement
      bulkOperation(Atr, cache.xIndex!, xIndex)
    }
    if (trs[count] === tr) {
      break
    }
    count += 1
  }
}

function handleKeyDown(event: KeyboardEvent) {
  if (!isEventCombination(event) || event.keyCode !== 67) return

  const texts = formatTableText(mergeDomsText(document.querySelectorAll(`.${selectClass}`)))
  execCopyCommand(texts)
}

// ctrl + c
ready(() => {
  addEventListener(document, 'keydown', handleKeyDown)
})

interface CacheType {
  xIndex?: number
  yIndex?: number
  dom?: HTMLTableCellElement
}

export default <DataItem, Value, Props extends OriginTableProps<DataItem, Value>>(Table: ComponentType<Props>) =>
  class extends React.Component<GetSelectProps<Props>> {
    doc: null | { remove: () => void }

    isFirefox: boolean

    events: Props['events']

    move: boolean

    cache: CacheType

    prevDom: null | HTMLTableCellElement

    static propTypes = {
      selection: PropTypes.bool,
      cellSelectable: PropTypes.bool,
    }

    constructor(props: GetSelectProps<Props>) {
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

    isEventCombination(event: MouseEvent | React.MouseEvent) {
      return this.selection && isEventCombination(event)
    }

    handleMouseDown(event: React.MouseEvent) {
      if (!this.isEventCombination(event)) return
      toggleNoSelection(true)

      // toggle move
      this.move = true

      const td = getParent(event.target as HTMLElement, 'td') as HTMLTableCellElement
      const tr = getParent(td, `tr.${trClass}`) as HTMLTableRowElement
      this.prevDom = td
      if (!tr) return
      const xIndex = Array.prototype.indexOf.call(tr.childNodes, td)
      const yIndex = Array.prototype.indexOf.call(tr.parentNode!.childNodes, tr)
      this.cache.xIndex = xIndex
      this.cache.yIndex = yIndex
      this.cache.dom = td
    }

    handleMouseUp(event: React.MouseEvent<HTMLDivElement>) {
      if (!this.isEventCombination(event)) return
      const target = event.target as HTMLElement
      const td = getParent(target, 'td') as HTMLTableCellElement
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

    handleMouseMove(event: React.MouseEvent) {
      if (!this.move) return

      const td = getParent(event.target as HTMLElement, 'td') as HTMLTableCellElement
      if (this.prevDom === td) return
      this.prevDom = td

      // clear class name
      removeSelectClass()

      bulkAddSelectionClass(td, this.cache)
    }

    render() {
      const { selection, cellSelectable, ...otherProps } = this.props
      return <Table {...otherProps as Props} events={this.events} />
    }
  }
