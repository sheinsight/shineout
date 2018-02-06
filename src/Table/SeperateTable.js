import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { getProps } from '../utils/proptypes'
import { tableClass } from '../styles'
import Colgroup from './Colgroup'
import Thead from './Thead'
import Tbody from './Tbody'

class SeperateTable extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
    this.handleColgroup = this.handleColgroup.bind(this)
  }

  handleColgroup(tds) {
    const colgroup = []
    for (let i = 0, count = tds.length; i < count; i++) {
      const width = tds[i].offsetWidth
      colgroup.push(width)
    }
    this.setState({ colgroup })
  }

  renderBody() {
    const { columns, data } = this.props
    const { colgroup } = this.state
    if (typeof data === 'string') return <div>{data}</div>

    if (!Array.isArray(data)) return <div>error</div>

    if (data.length === 0) return <div>no data</div>

    return (
      <table>
        <Colgroup colgroup={colgroup} columns={columns} />
        <Tbody onBodyRender={this.handleColgroup} columns={columns} data={data} />
      </table>
    )
  }

  render() {
    const { columns } = this.props
    const { colgroup } = this.state

    return [
      <div key="head" className={tableClass('head')}>
        <table>
          <Colgroup colgroup={colgroup} columns={columns} />
          <Thead columns={columns} />
        </table>
      </div>,
      <div key="body" className={tableClass('body')}>
        {this.renderBody()}
      </div>,
    ]
  }
}

SeperateTable.propTypes = {
  ...getProps('size', 'type', 'kengen'),
  columns: PropTypes.array.isRequired,
  data: PropTypes.array,
  width: PropTypes.number,
}

SeperateTable.defaultProps = {
  data: undefined,
  width: undefined,
}

export default SeperateTable
