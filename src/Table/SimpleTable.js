import React from 'react'
import PropTypes from 'prop-types'
import { PureComponent } from '../component'
import { tableClass } from './styles'
import { range, split } from '../utils/numbers'
import Colgroup from './Colgroup'
import Tbody from './Tbody'
import Thead from './Thead'
import { compareColumns } from '../utils/shallowEqual'
import Sticky from '../Sticky'
import { addResizeObserver } from '../utils/dom/element'

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
    this.resetColGroup = this.resetColGroup.bind(this)
  }

  componentDidMount() {
    this.scrollCheck()
  }

  componentDidUpdate(prevProps) {
    this.scrollCheck()
    const resize = prevProps.data.length === 0 && this.props.data.length
    // when resize
    if (resize && this.body) this.handleScroll({ currentTarget: this.body })
    const shouldResetColgroup = this.props.dataChangeResize && this.props.data !== prevProps.data
    if (resize || shouldResetColgroup || !compareColumns(prevProps.columns, this.props.columns)) {
      this.setState({ colgroup: undefined, resize: true })
    }
  }

  componentWillUnmount() {
    if (this.body) this.body.removeEventListener('wheel', this.handleScroll)
    if (this.removeReiszeObserver) this.removeReiszeObserver()
  }

  bindElement(key, el) {
    this[key] = el
    // this.body will be undefined on componentDidMount when columns length is 0
    if (key === 'body' && el) {
      el.addEventListener('wheel', this.handleScroll, { passive: false })
      this.removeReiszeObserver = addResizeObserver(el, this.resetColGroup, { direction: 'x' })
    }
  }

  resetColGroup() {
    this.lastColGroup = this.state.colgroup || this.lastColGroup
    this.setState({ colgroup: undefined, resize: true })
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
      const { width } = tds[i].getBoundingClientRect()
      const colSpan = parseInt(tds[i].getAttribute('colspan'), 10)
      if (colSpan > 1) {
        split(width, range(colSpan).map(j => columns[i + j].width)).forEach(w => colgroup.push(w))
      } else {
        colgroup.push(width)
      }
    }
    this.setState({ colgroup, resize: false })
  }

  handleScroll({ currentTarget }) {
    const { scrollLeft } = currentTarget
    setScrollLeft(this.header, scrollLeft)
    setScrollLeft(this.body, scrollLeft)
  }

  renderHeader() {
    const { columns, width, data, onResize, columnResizable, sticky, bordered } = this.props
    const { colgroup, scrollAble } = this.state
    const inner = (
      <table style={{ width }} className={tableClass(bordered && 'table-bordered')}>
        {/* keep thead colgroup stable */}
        <Colgroup colgroup={colgroup || this.lastColGroup} columns={columns} resizable={columnResizable} />
        <Thead {...this.props} colgroup={colgroup} onSortChange={this.handleSortChange} onColChange={onResize} />
      </table>
    )
    const empty = data.length === 0
    const headerStyle = {}
    if (!empty) headerStyle.overflowY = scrollAble ? 'scroll' : 'hidden'

    const header = (
      <div
        key="head"
        style={headerStyle}
        className={tableClass('head', 'simple-head', empty && 'empty-head')}
        ref={this.bindHeader}
      >
        {inner}
      </div>
    )
    if (sticky) {
      const stickyProps = Object.assign({ top: 0 }, sticky)
      return (
        <Sticky {...stickyProps} key="head">
          {header}
        </Sticky>
      )
    }
    return header
  }

  renderBody() {
    const { columns, width, fixed, columnResizable, bordered, ...others } = this.props
    const { colgroup, resize } = this.state
    const minWidthSup = columns.find(d => d.minWidth)
    return (
      <div key="body" className={tableClass('simple-body')} ref={this.bindBody} onScroll={this.handleScroll}>
        <table
          style={{ width }}
          className={tableClass(!colgroup && minWidthSup && 'init', bordered && 'table-bordered')}
        >
          <Colgroup colgroup={colgroup} columns={columns} resizable={columnResizable} />
          <Tbody
            colgroup={colgroup}
            lazy={false}
            index={0}
            columns={columns}
            onBodyRender={this.handleColgroup}
            resize={resize}
            bordered={bordered}
            {...others}
          />
        </table>
      </div>
    )
  }

  render() {
    const { columns, width, children, hideHeader, bordered } = this.props
    if (!columns || columns.length === 0)
      return (
        <table style={{ width }} className={tableClass(bordered && 'table-bordered')}>
          {children}
        </table>
      )
    return [hideHeader ? null : this.renderHeader(), this.renderBody(), children]
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
  columnResizable: PropTypes.bool,
  sticky: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  hideHeader: PropTypes.bool,
  bordered: PropTypes.bool,
}

SimpleTable.defaultProps = {
  data: undefined,
  width: undefined,
}

export default SimpleTable
