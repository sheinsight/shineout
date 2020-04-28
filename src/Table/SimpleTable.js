import React from 'react'
import PropTypes from 'prop-types'
import { PureComponent } from '../component'
import { tableClass } from '../styles'
import { range, split } from '../utils/numbers'
import Colgroup from './Colgroup'
import Tbody from './Tbody'
import Thead from './Thead'
import { compareColumns } from '../utils/shallowEqual'

function setScrollLeft(target, scrollLeft) {
  if (target && target.scrollLeft !== scrollLeft) target.scrollLeft = scrollLeft
}

class SimpleTable extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      colgroup: undefined,
      scrollAble: false,
      resize: false,
    }
    this.handleSortChange = this.handleSortChange.bind(this)
    this.bindHeader = this.bindElement.bind(this, 'header')
    this.bindBody = this.bindElement.bind(this, 'body')
    this.handleScroll = this.handleScroll.bind(this)
    this.handleColgroup = this.handleColgroup.bind(this)
  }

  componentDidMount() {
    if (this.body) this.body.addEventListener('wheel', this.handleScroll, { passive: false })
    this.scrollCheck()
  }

  componentDidUpdate(prevProps) {
    this.scrollCheck()
    const resize = prevProps.data.length === 0 && this.props.data.length
    const resetColgroup = this.props.dataChangeResize && this.props.data !== prevProps.data
    if (resize || resetColgroup || !compareColumns(prevProps.columns, this.props.columns)) {
      this.setState({ colgroup: undefined, resize: true })
    }
  }

  componentWillUnmount() {
    if (this.body) this.body.removeEventListener('wheel', this.handleScroll)
  }

  bindElement(key, el) {
    this[key] = el
  }

  scrollCheck() {
    const { scrollAble } = this.state
    if (!this.body) return
    const overHeight = this.body.scrollHeight > this.body.clientHeight
    if (scrollAble !== overHeight) this.setState({ scrollAble: overHeight })
  }

  handleSortChange(...args) {
    if (this.body) this.body.scrollTop = 0
    this.props.onSortChange(...args)
  }

  handleColgroup(tds) {
    const { columns } = this.props
    const colgroup = []
    for (let i = 0, count = tds.length; i < count; i++) {
      const width = tds[i].offsetWidth
      const colSpan = parseInt(tds[i].getAttribute('colspan'), 10)
      if (colSpan > 1) {
        split(width, range(colSpan).map(j => columns[i + j].width)).forEach(w => colgroup.push(w))
      } else {
        colgroup.push(width)
      }
    }
    setTimeout(() => {
      this.setState({ colgroup, resize: false })
    })
  }

  handleScroll({ currentTarget }) {
    const { scrollLeft } = currentTarget
    setScrollLeft(this.header, scrollLeft)
    setScrollLeft(this.body, scrollLeft)
  }

  renderBody() {
    const { columns, width, fixed, ...others } = this.props
    const { colgroup, resize } = this.state
    return (
      <div key="body" className={tableClass('simple-body')} ref={this.bindBody} onScroll={this.handleScroll}>
        <table style={{ width }}>
          <Colgroup {...others} colgroup={colgroup} columns={columns} />
          <Tbody
            colgroup={colgroup}
            lazy={false}
            index={0}
            columns={columns}
            onBodyRender={this.handleColgroup}
            resize={resize}
            {...others}
          />
        </table>
      </div>
    )
  }

  render() {
    const { columns, width, data, onResize, children, ...other } = this.props
    const { colgroup, scrollAble } = this.state
    if (!columns || columns.length === 0) return <table style={{ width }}>{children}</table>
    const header = (
      <table style={{ width }}>
        <Colgroup {...other} colgroup={colgroup} columns={columns} />
        <Thead {...this.props} colgroup={colgroup} onSortChange={this.handleSortChange} onColChange={onResize} />
      </table>
    )
    const empty = data.length === 0
    const headerStyle = {}
    if (!empty) headerStyle.overflowY = scrollAble ? 'scroll' : 'hidden'
    return [
      <div
        key="head"
        style={headerStyle}
        className={tableClass('head', 'simple-head', empty && 'empty-head')}
        ref={this.bindHeader}
      >
        {header}
      </div>,
      this.renderBody(),
      children,
    ]
  }
}

SimpleTable.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
  fixed: PropTypes.string,
  width: PropTypes.number,
  onResize: PropTypes.func,
  onSortChange: PropTypes.func,
  children: PropTypes.any,
  dataChangeResize: PropTypes.bool,
}

SimpleTable.defaultProps = {
  data: undefined,
  width: undefined,
}

export default SimpleTable
