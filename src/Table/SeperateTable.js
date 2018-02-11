import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { getProps } from '../utils/proptypes'
import { setTranslate } from '../utils/dom/translate'
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
      scrollLeftMax: 0,
      scrollTop: 0,
    }

    this.bindTbody = this.bindTbody.bind(this)
    this.bindThead = this.bindThead.bind(this)
    this.handleColgroup = this.handleColgroup.bind(this)
    this.handleScroll = this.handleScroll.bind(this)
  }

  componentDidMount() {
    const body = this.tbody
    this.setState({
      contentWidth: body.offsetWidth,
    })
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
    return this.props.data.length * this.props.rowHeight
  }

  bindTbody(el) {
    this.tbody = el
  }

  bindThead(el) {
    this.thead = el
  }

  handleScroll(x, y, max, bar, v, h) {
    const { contentWidth } = this.state
    const contentHeight = this.getContentHeight()
    const left = x * (contentWidth - v)
    const right = max - left
    const scrollTop = h > contentHeight ? 0 : y

    bar.style.paddingTop = `${scrollTop * h}px`

    setTranslate(this.tbody, `-${left}px`, `-${scrollTop * 100}%`)
    setTranslate(this.thead, `-${left}px`, '0');

    [this.thead, this.tbody].forEach((el) => {
      el.parentNode.querySelectorAll(`.${CLASS_FIXED_LEFT}`)
        .forEach((td) => { setTranslate(td, `${left}px`, '0') })
    });

    [this.thead, this.tbody].forEach((el) => {
      el.parentNode.querySelectorAll(`.${CLASS_FIXED_RIGHT}`)
        .forEach((td) => { setTranslate(td, `-${right}px`, '0') })
    })

    this.setState({ scrollLeft: left, scrollLeftMax: max, scrollTop })
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
    const {
      data, rowsInView, columns, width,
    } = this.props
    const { colgroup } = this.state

    // loading text
    if (typeof data === 'string') return <div>{data}</div>
    if (!Array.isArray(data)) return <div>error</div>
    if (data.length === 0) return <div>no data</div>

    const index = this.getIndex()

    return (
      <table ref={this.bindTbody} style={{ width }}>
        <Colgroup colgroup={colgroup} columns={columns} />
        <Tbody
          onBodyRender={this.handleColgroup}
          columns={columns}
          index={index}
          data={data.slice(index, index + rowsInView)}
        />
      </table>
    )
  }

  render() {
    const { columns, scrollX, scrollY } = this.props
    const {
      colgroup, scrollLeft, scrollLeftMax, contentWidth, scrollTop,
    } = this.state

    const floatClass = []
    if (scrollLeft > 0) {
      floatClass.push('float-left')
    }
    if (scrollLeftMax !== scrollLeft) {
      floatClass.push('float-right')
    }

    return [
      <div
        key="head"
        className={tableClass('head', ...floatClass)}
      >
        <table ref={this.bindThead}>
          <Colgroup colgroup={colgroup} columns={columns} />
          <Thead columns={columns} />
        </table>
      </div>,
      <Scroll
        key="body"
        scrollTop={scrollTop}
        scrollX={scrollX}
        scrollY={scrollY}
        scrollHeight={this.getContentHeight()}
        scrollWidth={contentWidth}
        onScroll={this.handleScroll}
        className={tableClass('body', ...floatClass)}
      >
        {this.renderBody()}
      </Scroll>,
    ]
  }
}

SeperateTable.propTypes = {
  ...getProps('size', 'type', 'kengen'),
  columns: PropTypes.array.isRequired,
  data: PropTypes.array,
  rowHeight: PropTypes.number,
  rowsInView: PropTypes.number.isRequired,
  scrollX: PropTypes.bool,
  scrollY: PropTypes.bool,
  width: PropTypes.number,
}

SeperateTable.defaultProps = {
  data: undefined,
  rowHeight: 40,
  scrollX: true,
  scrollY: true,
  width: undefined,
}

export default SeperateTable
