import React, { Component } from 'react'
import PropTypes from 'prop-types'
import deepEqual from 'deep-eql'
import shallowEqual from '../utils/shallowEqual'
import { setTranslate } from '../utils/dom/translate'
import { tableClass } from '../styles'
import Td, { CLASS_FIXED_LEFT, CLASS_FIXED_RIGHT } from './Td'

class Tr extends Component {
  constructor(props) {
    super(props)

    this.bindElement = this.bindElement.bind(this)
  }

  componentDidMount() {
    const { offsetLeft, offsetRight, setRowHeight } = this.props
    if (offsetLeft) {
      this.element.querySelectorAll(`.${tableClass(CLASS_FIXED_LEFT)}`)
        .forEach((td) => { setTranslate(td, `${offsetLeft}px`, '0') })
    }
    if (offsetRight) {
      this.element.querySelectorAll(`.${tableClass(CLASS_FIXED_RIGHT)}`)
        .forEach((td) => { setTranslate(td, `-${offsetRight}px`, '0') })
    }

    if (setRowHeight) setRowHeight(this.element.clientHeight, this.props.index)
  }

  shouldComponentUpdate(nextProps) {
    const isEqual = deepEqual(this.props.columns, nextProps.columns)
      && shallowEqual(this.props.data, nextProps.data)
    return !isEqual
  }

  bindElement(el) {
    this.element = el
  }

  render() {
    const {
      columns, data, striped, index, ...other
    } = this.props
    const tds = []
    let skip = 0
    for (let i = 0, c = columns.length; i < c; i++) {
      if (skip > 0) {
        skip -= 1
      } else if (data[i]) {
        const {
          className, style, key, fixed, lastFixed, firstFixed, type,
        } = columns[i]
        const td = (
          <Td
            {...other}
            key={key}
            type={type}
            className={className}
            style={style}
            fixed={fixed}
            firstFixed={firstFixed}
            lastFixed={lastFixed}
            {...data[i]}
          />
        )
        tds.push(td)

        if (data[i].colSpan) skip = data[i].colSpan - 1
      }
    }

    const className = striped && index % 2 === 1 ? tableClass('even') : ''

    return <tr className={className} ref={this.bindElement}>{tds}</tr>
  }
}

Tr.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  index: PropTypes.number,
  offsetLeft: PropTypes.number,
  offsetRight: PropTypes.number,
  striped: PropTypes.bool,
  setRowHeight: PropTypes.func,
}

export default Tr
