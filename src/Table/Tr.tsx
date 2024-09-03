import React, { Component, ReactNode } from 'react'
import classnames from 'classnames'
import { tableClass } from './styles'
import { inputClass } from '../Input/styles'
import { checkinputClass } from '../Checkbox/styles'
import Td from './Td'
import Expand from './Expand'
import { TrProps } from './Props'
import { isFunc } from '../utils/is'
import getZoomBoundingClientRect from '../utils/dom/getZoomBoundingRect'

export const ROW_HEIGHT_UPDATE_EVENT = 'ROW_HEIGHT_UPDATE_EVENT_NAME'

const preventClasses = [
  inputClass('_'),
  checkinputClass('_'),
  tableClass('icon-tree-plus'),
  tableClass('icon-tree-sub'),
]
const isExpandableElement = (el: HTMLElement): boolean => {
  const { tagName } = el
  if (tagName === 'TD' || tagName === 'TR') return true
  if (tagName === 'A' || tagName === 'BUTTON' || tagName === 'INPUT') return false
  if (preventClasses.find(c => el.classList.contains(c))) return false
  if (!el.parentElement) return false
  return isExpandableElement(el.parentElement)
}
const DefaultProps = {
  rowClickAttr: ['*'],
  lazy: true,
}
class Tr<DataItem, Value> extends Component<TrProps<DataItem, Value>> {
  static displayName = 'ShineoutTr'

  static defaultProps = DefaultProps

  manualExpand: boolean

  expandHeight: number

  element: HTMLElement

  lastRowHeight: number

  lastExpandHeight: number

  lastIndex: number

  lastExpandRender: TrProps<DataItem, Value>['expandRender']

  cachedExpand: ReactNode

  constructor(props: TrProps<DataItem, Value>) {
    super(props)
    this.manualExpand = false
    this.bindElement = this.bindElement.bind(this)
    this.handleRowClick = this.handleRowClick.bind(this)
    this.setRowHeight = this.setRowHeight.bind(this)
    this.setExpandHeight = this.setExpandHeight.bind(this)
    this.expandHeight = 0
  }

  componentDidMount() {
    this.manualExpand = true
    this.setRowHeight()
  }

  componentDidUpdate(prevProps: TrProps<DataItem, Value>) {
    const { hasNotRenderRows, dataUpdated, columnResizable, resize } = this.props
    if (hasNotRenderRows || dataUpdated || prevProps.resize !== resize) {
      const exec = columnResizable ? setTimeout : (func: Function) => func()
      exec(() => {
        this.setRowHeight()
      })
    }
  }

  setRowHeight(expand?: boolean) {
    const { setRowHeight, dataUpdated, datum, lazy } = this.props
    if (!lazy || !setRowHeight || !this.element) return
    let { height } = getZoomBoundingClientRect(this.element)
    if (Number.isNaN(height)) height = this.lastRowHeight || 0
    datum.unsubscribe(ROW_HEIGHT_UPDATE_EVENT, this.setRowHeight)
    if (height === 0) {
      datum.subscribe(ROW_HEIGHT_UPDATE_EVENT, this.setRowHeight)
      return
    }
    if (
      height === this.lastRowHeight &&
      this.expandHeight === this.lastExpandHeight &&
      !dataUpdated &&
      this.lastIndex === this.props.index
    )
      return
    this.lastRowHeight = height
    this.lastIndex = this.props.index
    this.lastExpandHeight = this.expandHeight
    setRowHeight(height + this.expandHeight, this.props.index, !!expand)
  }

  setExpandHeight(height: number) {
    this.expandHeight = height
    this.setRowHeight(this.manualExpand)
  }

  getRowClickAttr() {
    const { rowClickAttr } = this.props
    const res = Array.isArray(rowClickAttr) ? rowClickAttr : []
    if (typeof rowClickAttr === 'string') {
      res.push(rowClickAttr)
    }
    return res.map(v => (v === '*' ? '' : v))
  }

  bindElement(el: HTMLTableRowElement) {
    this.element = el
  }

  isFireElement(el: HTMLElement) {
    const { rowClickAttr } = this.props
    if (rowClickAttr === true) return true
    return this.getRowClickAttr().find(v => el.hasAttribute(v))
  }

  handleRowClick(e: React.MouseEvent) {
    const {
      columns,
      rowData,
      index,
      onRowClick,
      externalExpandRender,
      externalExpandClick,
      onExpand,
      originKey,
      expandRender,
    } = this.props
    const target = e.target as HTMLElement
    // business needed #row click to modal drawer
    const fireAttr = this.isFireElement(target)
    if (fireAttr && onRowClick) {
      onRowClick(rowData, index, fireAttr)
      return
    }
    if (externalExpandRender) {
      const expanded = typeof expandRender === 'function'
      // @ts-ignore seems to be useless because expandKeys always undefined
      if (this.props.expandKeys) {
        if (externalExpandClick) externalExpandClick(rowData, !expanded)
      } else {
        onExpand(originKey, expanded ? undefined : externalExpandRender(rowData, index))
      }
    }

    if (isExpandableElement(target)) {
      const el = this.element.querySelector(`.${tableClass('expand-indicator')}`) as HTMLElement
      if (el && el !== target && columns.some(c => c.type === 'row-expand')) el.click()
      const matchBlank = this.getRowClickAttr().indexOf('') >= 0
      if (onRowClick && e.target !== el && matchBlank) onRowClick(rowData, index)
    }
  }

  renderExpand() {
    const { expandRender, rowData } = this.props
    if (!expandRender) return null
    if (this.lastExpandRender !== expandRender && isFunc(expandRender)) {
      this.lastExpandRender = expandRender
      this.cachedExpand = expandRender(rowData)
    }
    return this.cachedExpand
  }

  render() {
    const {
      columns,
      data,
      rowData,
      striped,
      index,
      expandRender,
      offsetLeft,
      offsetRight,
      hasNotRenderRows,
      rowClassName,
      treeExpandKeys,
      rowEvents,
      ...reset
    } = this.props
    const other = Object.keys(reset)
      .filter(key => !['format', 'prediction', 'onChange'].includes(key))
      .reduce((r, key: keyof typeof reset) => ({ ...r, [key]: reset[key] }), {}) as Omit<
      typeof reset,
      'format' | 'prediction' | 'onChange'
    >
    const tds = []
    let skip = 0
    for (let i = 0, c = columns.length; i < c; i++) {
      if (skip > 0) {
        skip -= 1
      } else if (data[i]) {
        const {
          className,
          style,
          key,
          fixed,
          lastFixed,
          firstFixed,
          type,
          render,
          onClick,
          align,
          treeColumnsName,
        } = columns[i]
        let treeExpand = false
        if (treeExpandKeys instanceof Map) {
          treeExpand = treeExpandKeys.has(other.originKey)
        }
        const td = (
          <Td
            {...other}
            expanded={typeof expandRender === 'function'}
            key={key}
            treeExpand={treeExpand}
            treeExpandShow={!!treeColumnsName}
            type={type}
            expandClick={onClick}
            className={className}
            style={style}
            fixed={fixed}
            firstFixed={firstFixed}
            lastFixed={lastFixed}
            align={align}
            render={render}
            // @ts-ignore  这儿重复了
            index={index}
            {...data[i]}
            offsetLeft={offsetLeft}
            offsetRight={offsetRight}
          />
        )
        tds.push(td)

        if (data[i].colSpan) skip = data[i].colSpan - 1
      }
    }

    let className = tableClass('normal', striped && (index % 2 === 1 ? 'even' : 'odd'))
    if (rowClassName) {
      className = classnames(className, rowClassName(rowData, index))
    }
    const mc = classnames(className, other.datum.check(rowData) && tableClass('selected'))
    const result = [
      <tr key="0" {...rowEvents} onClick={this.handleRowClick} className={mc} ref={this.bindElement}>
        {tds}
      </tr>,
    ]
    if (expandRender) {
      result.push(
        <Expand key="1" setExpandHeight={this.setExpandHeight} colSpan={columns.length}>
          {this.renderExpand()}
        </Expand>
      )
    }

    return result
  }
}
export default Tr
