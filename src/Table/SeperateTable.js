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
    this.bindThead = this.bindThead.bind(this)
    this.handleColgroup = this.handleColgroup.bind(this)
    this.handleScroll = this.handleScroll.bind(this)
  }

  componentDidMount() {
    const body = this.tbody
    this.setState({ scrollWidth: body.offsetWidth - body.clientWidth })

    this.handleScroll()

    /*
    const right = 0 - (body.scrollWidth - body.scrollLeft - body.clientWidth)
    body.querySelectorAll(`.${CLASS_FIXED_RIGHT}`)
      .forEach((td) => { td.style.transform = `translateX(${right}px)` })

    this.props.onScrollLeft(0, right)
    */
  }

  bindTbody(el) {
    this.tbody = el
  }

  bindThead(el) {
    this.thead = el
  }

  handleScroll() {
    const body = this.tbody

    const left = body.scrollLeft
    if (left === this.scrollLeft) return

    this.scrollLeft = left
    this.thead.scrollLeft = left

    const right = 0 - (body.scrollWidth - body.scrollLeft - body.clientWidth)
    window.requestAnimationFrame(() => {
      this.props.onScrollLeft(left, right)
    })
  }

  handleColgroup(tds) {
    const colgroup = []
    for (let i = 0, count = tds.length; i < count; i++) {
      console.log(tds[i].offsetWidth, tds[i].clientWidth, tds[i].getBoundingClientRect().width)
      const width = tds[i].offsetWidth
      colgroup.push(width)
    }
    this.setState({ colgroup })
  }

  renderBody() {
    const {
      columns, data, width,
    } = this.props
    const { colgroup } = this.state
    if (typeof data === 'string') return <div>{data}</div>

    if (!Array.isArray(data)) return <div>error</div>

    if (data.length === 0) return <div>no data</div>

    return (
      <table style={{ width }}>
        <Colgroup colgroup={colgroup} columns={columns} />
        <Tbody
          onBodyRender={this.handleColgroup}
          columns={columns}
          data={data}
        />
      </table>
    )
  }

  render() {
    const { columns } = this.props
    const { colgroup, scrollWidth } = this.state

    return [
      <div
        key="head"
        ref={this.bindThead}
        style={{ paddingRight: scrollWidth }}
        className={tableClass('head')}
      >
        <table>
          <Colgroup colgroup={colgroup} columns={columns} />
          <Thead columns={columns} />
        </table>
      </div>,
      <div
        key="body"
        onScroll={this.handleScroll}
        ref={this.bindTbody}
        style={{ overflowY: scrollWidth > 0 ? 'auto' : 'scroll' }}
        className={tableClass('body')}
      >
        {this.renderBody()}
      </div>,
    ]
  }
}

SeperateTable.propTypes = {
  ...getProps('size', 'type', 'kengen'),
  columns: PropTypes.array.isRequired,
  data: PropTypes.array,
  onScrollLeft: PropTypes.func.isRequired,
  scrollLeft: PropTypes.number,
  width: PropTypes.number,
}

SeperateTable.defaultProps = {
  data: undefined,
  width: undefined,
  scrollLeft: undefined,
}

export default SeperateTable
