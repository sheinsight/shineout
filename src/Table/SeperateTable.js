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
    this.state = {
      scrollWidth: 0,
    }

    this.bindTbody = this.bindTbody.bind(this)
    this.bindInnerBody = this.bindInnerBody.bind(this)
    this.handleColgroup = this.handleColgroup.bind(this)
    this.handleScroll = this.handleScroll.bind(this)
  }

  componentDidMount() {
    const tbody = this.tbody.getBoundingClientRect()
    const inner = this.innerBody.getBoundingClientRect()
    this.setState({ scrollWidth: tbody.width - inner.width })
  }

  bindTbody(el) {
    this.tbody = el
  }

  bindInnerBody(el) {
    this.innerBody = el
  }

  handleScroll(e) {
    this.props.onScrollX(e.target.scrollLeft)
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
    const { columns, data, width } = this.props
    const { colgroup } = this.state
    if (typeof data === 'string') return <div>{data}</div>

    if (!Array.isArray(data)) return <div>error</div>

    if (data.length === 0) return <div>no data</div>

    return (
      <table style={{ width }}>
        <Colgroup colgroup={colgroup} columns={columns} />
        <Tbody onBodyRender={this.handleColgroup} columns={columns} data={data} />
      </table>
    )
  }

  render() {
    const { columns, scrollX } = this.props
    const { colgroup, scrollWidth } = this.state

    return [
      <div key="head" style={{ paddingRight: scrollWidth }} className={tableClass('head')}>
        <table style={{ marginLeft: 0 - scrollX }}>
          <Colgroup colgroup={colgroup} columns={columns} />
          <Thead columns={columns} />
        </table>
      </div>,
      <div key="body" onScroll={this.handleScroll} ref={this.bindTbody} className={tableClass('body')}>
        {this.renderBody()}
        <div ref={this.bindInnerBody} />
      </div>,
    ]
  }
}

SeperateTable.propTypes = {
  ...getProps('size', 'type', 'kengen'),
  columns: PropTypes.array.isRequired,
  data: PropTypes.array,
  onScrollX: PropTypes.func.isRequired,
  scrollX: PropTypes.number,
  width: PropTypes.number,
}

SeperateTable.defaultProps = {
  data: undefined,
  width: undefined,
}

export default SeperateTable
