import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { setTranslate } from '../utils/dom/translate'
import { tableClass, inputClass } from '../styles'
import Td, { CLASS_FIXED_LEFT, CLASS_FIXED_RIGHT } from './Td'
import Expand from './Expand'

const isExpandableElement = (el) => {
  const { tagName } = el
  if (tagName === 'TD' || tagName === 'TR') return true
  if (tagName === 'A' || tagName === 'BUTTON' || tagName === 'INPUT') return false
  if (el.classList.contains(inputClass('_'))) return false
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
      [].forEach.call(
        this.element.querySelectorAll(`.${tableClass(CLASS_FIXED_LEFT)}`),
        (td) => { setTranslate(td, `${offsetLeft}px`, '0') },
      )
    }
    if (offsetRight) {
      [].forEach.call(
        this.element.querySelectorAll(`.${tableClass(CLASS_FIXED_RIGHT)}`),
        (td) => { setTranslate(td, `-${offsetRight}px`, '0') },
      )
    }

    this.setRowHeight()
  }

  componentDidUpdate(prevProps) {
    if (this.props.index !== prevProps.index) {
      this.setRowHeight()
    }
  }

  setRowHeight() {
    const { setRowHeight } = this.props
    if (!setRowHeight || !this.element) return
    setRowHeight(this.element.clientHeight + this.expandHeight, this.props.index)
  }

  setExpandHeight(height) {
    this.expandHeight = height
    this.setRowHeight()
  }

  bindElement(el) {
    this.element = el
  }

  handleRowClick(e) {
    const {
      columns, data, index, onRowClick,
    } = this.props

    if (isExpandableElement(e.target)) {
      const el = this.element.querySelector(`.${tableClass('expand-indicator')}`)
      if (el && columns.some(c => c.type === 'row-expand')) el.click()
      if (onRowClick && e.target !== el)onRowClick(data[0].data, index)
    }
  }

  render() {
    const {
      columns, data, striped, index, expandRender, offsetLeft, offsetRight, rowClassName, ...other
    } = this.props
    const tds = []
    let skip = 0
    for (let i = 0, c = columns.length; i < c; i++) {
      if (skip > 0) {
        skip -= 1
      } else if (data[i]) {
        const {
          className, style, key, fixed, lastFixed, firstFixed, type, render,
        } = columns[i]
        const td = (
          <Td
            {...other}
            expanded={typeof expandRender === 'function'}
            key={key}
            type={type}
            className={className}
            style={style}
            fixed={fixed}
            firstFixed={firstFixed}
            lastFixed={lastFixed}
            render={render}
            index={index}
            {...data[i]}
          />
        )
        tds.push(td)

        if (data[i].colSpan) skip = data[i].colSpan - 1
      }
    }

    let className
    if (rowClassName) {
      className = rowClassName(data[0].data, index)
    } else {
      className = tableClass(
        'normal',
        striped && index % 2 === 1 && 'even',
      )
    }
    const result = [<tr key="0" onClick={this.handleRowClick} className={className} ref={this.bindElement}>{tds}</tr>]
    if (expandRender) {
      result.push((
        <Expand key="1" setExpandHeight={this.setExpandHeight} colSpan={columns.length}>
          {expandRender()}
        </Expand>
      ))
    }

    return result
  }
}

Tr.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  expandRender: PropTypes.func,
  index: PropTypes.number,
  offsetLeft: PropTypes.number,
  offsetRight: PropTypes.number,
  onExpand: PropTypes.func,
  onRowClick: PropTypes.func,
  rowClassName: PropTypes.func,
  striped: PropTypes.bool,
  setRowHeight: PropTypes.func,
}

Tr.displayName = 'ShineoutTr'

export default Tr
