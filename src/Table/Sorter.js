import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { tableClass } from '../styles'

class Sorter extends PureComponent {
  constructor(props) {
    super(props)
    this.handleAsc = this.handleAsc.bind(this)
    this.handleDesc = this.handleDesc.bind(this)
  }

  handleChange(order) {
    const { sorter, index, onChange } = this.props

    onChange(order, sorter, index)
  }

  handleAsc() {
    this.handleChange('asc')
  }

  handleDesc() {
    this.handleChange('desc')
  }

  render() {
    const { current, index } = this.props
    const active = current.index === index

    return [
      <a
        key="asc"
        href="javascript:;"
        className={
          tableClass(
            active && current.order === 'asc' && 'sorter-active',
            'sorter-asc',
          )
        }
        onClick={this.handleAsc}
      >
        &nbsp;
      </a>,
      <a
        key="desc"
        href="javascript:;"
        className={
          tableClass(
            active && current.order === 'desc' && 'sorter-active',
            'sorter-desc',
          )
        }
        onClick={this.handleDesc}
      >
        &nbsp;
      </a>,
    ]
  }
}

Sorter.propTypes = {
  current: PropTypes.object,
  index: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  sorter: PropTypes.func.isRequired,
}

Sorter.defaultProps = {
  current: {},
}

export default Sorter
