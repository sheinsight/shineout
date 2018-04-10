import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { getProps } from '../utils/proptypes'
import { setTranslate } from '../utils/dom/translate'
import { range, split } from '../utils/numbers'
import { tableClass } from '../styles'
import Scroll from '../Scroll'
import Colgroup from './Colgroup'
import Thead from './Thead'
import Tbody from './Tbody'
import { CLASS_FIXED_LEFT, CLASS_FIXED_RIGHT } from './Td'

class SeperateTable extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      scrollLeft: 0,
      scrollTop: 0,
    }

    this.bindTbody = this.bindTbody.bind(this)
    this.bindThead = this.bindThead.bind(this)
    this.handleColgroup = this.handleColgroup.bind(this)
    this.handleScroll = this.handleScroll.bind(this)
  }

  getIndex() {
    const { data, rowsInView } = this.props
    const { scrollTop } = this.state
    const max = data.length
    let index = Math.ceil((scrollTop * max) - (rowsInView * scrollTop))
    if (index > max - rowsInView) index = max - rowsInView
    if (index < 0) index = 0
    return index
  }

  getContentHeight() {
    if (!this.props.data) return 0
    return this.props.data.length * this.props.rowHeight
  }

  getContentWidth() {
    if (this.props.width) return this.props.width
    if (this.tbody) return this.tbody.offsetWidth
    return 0
  }

  bindTbody(el) {
    this.tbody = el
  }

  bindThead(el) {
    this.thead = el
  }

  handleScroll(x, y, max, bar, v, h) {
    if (!this.tbody) return

    const contentWidth = this.getContentWidth()
    const contentHeight = this.getContentHeight()
    const left = x * (contentWidth - v)
    const scrollTop = h > contentHeight ? 0 : y
    let right = max - left
    if (right < 0) right = 0

    const barStyle = bar.style
    barStyle.paddingTop = `${scrollTop * h}px`

    setTranslate(this.tbody, `-${left}px`, `-${scrollTop * 100}%`)
    setTranslate(this.thead, `-${left}px`, '0');

    [this.thead, this.tbody].forEach((el) => {
      el.parentNode.querySelectorAll(`.${tableClass(CLASS_FIXED_LEFT)}`)
        .forEach((td) => { setTranslate(td, `${left}px`, '0') })
    });

    [this.thead, this.tbody].forEach((el) => {
      el.parentNode.querySelectorAll(`.${tableClass(CLASS_FIXED_RIGHT)}`)
        .forEach((td) => { setTranslate(td, `-${right}px`, '0') })
    })

    this.setState({
      scrollLeft: x,
      scrollTop,
      offsetLeft: left,
      offsetRight: right,
    })
  }

  handleColgroup(tds) {
    const { columns } = this.props
    const colgroup = []
    for (let i = 0, count = tds.length; i < count; i++) {
      const width = tds[i].offsetWidth
      const colSpan = parseInt(tds[i].getAttribute('colspan'), 10)
      if (colSpan > 1) {
        split(width, range(colSpan).map(j => columns[i + j].width))
          .forEach(w => colgroup.push(w))
      } else {
        colgroup.push(width)
      }
    }
    this.setState({ colgroup })
  }

  renderBody(floatClass) {
    const {
      data, rowsInView, columns, width, fixed, ...others
    } = this.props
    const {
      colgroup, scrollTop, offsetLeft, offsetRight,
    } = this.state
    const contentWidth = this.getContentWidth()

    if (!data || data.length === 0) {
      return <div key="body" />
    }

    const index = this.getIndex()

    return (
      <Scroll
        key="body"
        scrollTop={scrollTop}
        scroll={fixed}
        scrollHeight={this.getContentHeight()}
        scrollWidth={contentWidth}
        onScroll={this.handleScroll}
        className={tableClass('body', ...floatClass)}
      >
        <table ref={this.bindTbody} style={{ width }}>
          <Colgroup colgroup={colgroup} columns={columns} />
          <Tbody
            {...others}
            columns={columns}
            onBodyRender={this.handleColgroup}
            index={index}
            offsetLeft={offsetLeft}
            offsetRight={offsetRight}
            data={data.slice(index, index + rowsInView)}
          />
        </table>
      </Scroll>
    )
  }

  render() {
    const { columns, fixed } = this.props
    const { colgroup, scrollLeft } = this.state

    const floatClass = []
    if (scrollLeft > 0) {
      floatClass.push('float-left')
    }
    if (scrollLeft !== 1) {
      floatClass.push('float-right')
    }
    if (fixed === 'y' || fixed === 'both') {
      floatClass.push('scroll-y')
    }

    return [
      <div
        key="head"
        className={tableClass('head', ...floatClass)}
      >
        <table ref={this.bindThead}>
          <Colgroup colgroup={colgroup} columns={columns} />
          <Thead {...this.props} />
        </table>
      </div>,
      this.renderBody(floatClass),
    ]
  }
}

SeperateTable.propTypes = {
  ...getProps('size', 'type', 'kengen'),
  columns: PropTypes.array.isRequired,
  data: PropTypes.array,
  fixed: PropTypes.string.isRequired,
  rowHeight: PropTypes.number,
  rowsInView: PropTypes.number.isRequired,
  width: PropTypes.number,
}

SeperateTable.defaultProps = {
  data: undefined,
  rowHeight: 60,
  width: undefined,
}

export default SeperateTable
