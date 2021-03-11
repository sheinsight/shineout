import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { setTranslate } from '../utils/dom/translate'
import { tableClass, inputClass, checkinputClass } from '../styles'
import Td, { CLASS_FIXED_LEFT, CLASS_FIXED_RIGHT } from './Td'
import Expand from './Expand'

export const ROW_HEIGHT_UPDATE_EVENT = 'ROW_HEIGHT_UPDATE_EVENT_NAME'

const preventClasses = [
  inputClass('_'),
  checkinputClass('_'),
  tableClass('icon-tree-plus'),
  tableClass('icon-tree-sub'),
]
const isExpandableElement = el => {
  const { tagName } = el
  if (tagName === 'TD' || tagName === 'TR') return true
  if (tagName === 'A' || tagName === 'BUTTON' || tagName === 'INPUT') return false
  if (preventClasses.find(c => el.classList.contains(c))) return false
  if (!el.parentElement) return false
  return isExpandableElement(el.parentElement)
}

class Tr extends Component {
  constructor(props) {
    super(props)

    this.bindElement = this.bindElement.bind(this)
    this.handleRowClick = this.handleRowClick.bind(this)
    this.setRowHeight = this.setRowHeight.bind(this)
    this.setExpandHeight = this.setExpandHeight.bind(this)
    this.expandHeight = 0
  }

  componentDidMount() {
    const { offsetLeft, offsetRight } = this.props
    if (offsetLeft) {
      ;[].forEach.call(this.element.querySelectorAll(`.${tableClass(CLASS_FIXED_LEFT)}`), td => {
        setTranslate(td, `${offsetLeft}px`, '0')
      })
    }
    if (offsetRight) {
      ;[].forEach.call(this.element.querySelectorAll(`.${tableClass(CLASS_FIXED_RIGHT)}`), td => {
        setTranslate(td, `-${offsetRight}px`, '0')
      })
    }

    this.setRowHeight()
  }

  componentDidUpdate(prevProps) {
    const { hasNotRenderRows, dataUpdated, columnResizable, resize } = this.props
    if (hasNotRenderRows || dataUpdated || prevProps.resize !== resize) {
      const exec = columnResizable ? setTimeout : func => func()
      exec(() => {
        this.setRowHeight()
      })
    }
  }

  setRowHeight(expand) {
    const { setRowHeight, dataUpdated, datum, lazy } = this.props
    if (!lazy || !setRowHeight || !this.element) return
    let { height } = this.element.getBoundingClientRect()
    if (Number.isNaN(height)) height = this.lastRowHeight || 0
    datum.unsubscribe(ROW_HEIGHT_UPDATE_EVENT, this.setRowHeight)
    if (height === 0) {
      datum.subscribe(ROW_HEIGHT_UPDATE_EVENT, this.setRowHeight)
      return
    }
    if (height === this.lastRowHeight && this.expandHeight === this.lastExpandHeight && !dataUpdated) return
    this.lastRowHeight = height
    this.lastExpandHeight = this.expandHeight
    setRowHeight(height + this.expandHeight, this.props.index, expand)
  }

  setExpandHeight(height) {
    this.expandHeight = height
    this.setRowHeight(true)
  }

  getRowClickAttr() {
    const { rowClickAttr } = this.props
    const res = Array.isArray(rowClickAttr) ? rowClickAttr : []
    if (typeof rowClickAttr === 'string') {
      res.push(rowClickAttr)
    }
    return res.map(v => (v === '*' ? '' : v))
  }

  bindElement(el) {
    this.element = el
  }

  isFireElement(el) {
    const { rowClickAttr } = this.props
    if (rowClickAttr === true) return true
    return this.getRowClickAttr().find(v => el.hasAttribute(v))
  }

  handleRowClick(e) {
    const {
      columns,
      rowData,
      index,
      onRowClick,
      externalExpandRender,
      externalExpandClick,
      expandKeys,
      onExpand,
      originKey,
      expandRender,
    } = this.props
    // business needed #row click to modal drawer
    const fireAttr = this.isFireElement(e.target)
    if (fireAttr) {
      onRowClick(rowData, index, fireAttr)
      return
    }
    if (externalExpandRender) {
      const expanded = typeof expandRender === 'function'
      if (expandKeys) {
        if (externalExpandClick) externalExpandClick(rowData, !expanded)
      } else {
        onExpand(originKey, expanded ? undefined : externalExpandRender(rowData, index))
      }
    }

    if (isExpandableElement(e.target)) {
      const el = this.element.querySelector(`.${tableClass('expand-indicator')}`)
      if (el && el !== e.target && columns.some(c => c.type === 'row-expand')) el.click()
      const matchBlank = this.getRowClickAttr().indexOf('') >= 0
      if (onRowClick && e.target !== el && matchBlank) onRowClick(rowData, index)
    }
  }

  renderExpand() {
    const { expandRender, rowData } = this.props
    if (this.lastExpandRender !== expandRender) {
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
      ...other
    } = this.props
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
            index={index}
            {...data[i]}
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

Tr.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  datum: PropTypes.object,
  expandRender: PropTypes.func,
  hasNotRenderRows: PropTypes.bool,
  index: PropTypes.number,
  offsetLeft: PropTypes.number,
  offsetRight: PropTypes.number,
  onExpand: PropTypes.func,
  onRowClick: PropTypes.func,
  rowClassName: PropTypes.func,
  rowData: PropTypes.object,
  striped: PropTypes.bool,
  setRowHeight: PropTypes.func,
  rowClickAttr: PropTypes.oneOfType([PropTypes.bool, PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  dataUpdated: PropTypes.bool,
  treeExpandKeys: PropTypes.object,
  columnResizable: PropTypes.bool,
  resize: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  rowEvents: PropTypes.object,
  lazy: PropTypes.bool,
  externalExpandRender: PropTypes.func,
  externalExpandClick: PropTypes.func,
  expandKeys: PropTypes.array,
  originKey: PropTypes.any,
}

Tr.defaultProps = {
  rowClickAttr: ['*'],
  lazy: true,
}
Tr.displayName = 'ShineoutTr'

export default Tr
