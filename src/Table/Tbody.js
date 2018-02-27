import React, { Component } from 'react'
import PropTypes from 'prop-types'
import deepEqual from 'fast-deep-equal'
import { getProps } from '../utils/proptypes'
import formatRows from './formatRows'
import Tr from './Tr'

class Tbody extends Component {
  constructor(props) {
    super(props)

    this.bindBody = this.bindBody.bind(this)
    this.renderTr = this.renderTr.bind(this)
  }

  componentDidMount() {
    const { onBodyRender } = this.props
    if (onBodyRender) {
      const tds = this.body.querySelector('tr').querySelectorAll('td')
      onBodyRender(tds)
    }
  }

  shouldComponentUpdate(nextProps) {
    const { loading } = nextProps
    if (loading) return false

    return !(
      deepEqual(this.props.data, nextProps.data)
      && deepEqual(this.props.columns, nextProps.columns)
    )
  }

  bindBody(el) {
    this.body = el
  }

  renderTr(row, index) {
    const {
      columns, keygen, offsetLeft, offsetRight, data, sorter,
    } = this.props

    let key = index
    if (keygen) {
      key = typeof keygen === 'string'
        ? data[index][keygen]
        : keygen(data[index], row.index)
    }
    if (sorter && sorter.order) {
      key = `${key}-${sorter.index}-${sorter.order}`
    }

    return (
      <Tr
        key={key}
        data={row}
        columns={columns}
        offsetLeft={offsetLeft}
        offsetRight={offsetRight}
      />
    )
  }

  render() {
    const { index, data, columns } = this.props
    const rows = formatRows(index, data, columns)

    return (
      <tbody ref={this.bindBody}>
        {rows.map(this.renderTr)}
      </tbody>
    )
  }
}

Tbody.propTypes = {
  ...getProps('keygen'),
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  index: PropTypes.number.isRequired,
  offsetLeft: PropTypes.number,
  offsetRight: PropTypes.number,
  onBodyRender: PropTypes.func,
}

Tbody.defaultProps = {
  onBodyRender: undefined,
}

export default Tbody
