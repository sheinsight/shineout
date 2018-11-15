import React from 'react'
import PropTypes from 'prop-types'
import PureComponent from '../PureComponent'
import { getProps } from '../utils/proptypes'
import { setTranslate } from '../utils/dom/translate'
import { range, split } from '../utils/numbers'
import { getParent } from '../utils/dom/element'
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
      currentIndex: 0,
      scrollLeft: 0,
      scrollTop: 0,
    }

    this.bindTbody = this.bindElement.bind(this, 'tbody')
    this.bindRealTbody = this.bindElement.bind(this, 'realTbody')
    this.bindThead = this.bindElement.bind(this, 'thead')
    this.setRowHeight = this.setRowHeight.bind(this)
    this.handleColgroup = this.handleColgroup.bind(this)
    this.handleScroll = this.handleScroll.bind(this)
    this.handleSortChange = this.handleSortChange.bind(this)

    this.cachedRowHeight = []
    this.lastScrollTop = 0

    if (props.tableRef) props.tableRef(this)
  }

  // reset scrollTop when data changed
  componentDidUpdate(prevProps) {
    if (!this.tbody) return
    if (this.props.data !== prevProps.data) this.resetHeight()
  }

  componentWillUnmount() {
    this.$willUnmount = true
  }

  getIndex(scrollTop = this.state.scrollTop) {
    const { data, rowsInView } = this.props
    const max = data.length
    const mcf = scrollTop > 0.5 ? Math.ceil : Math.floor
    let index = mcf((scrollTop * max) - (rowsInView * scrollTop))
    if (index > max - rowsInView) index = max - rowsInView
    if (index < 0) index = 0
    return index
  }

  getContentHeight() {
    if (!this.props.data) return 0
    return this.getSumHeight(0, this.props.data.length)
  }

  getContentWidth() {
    if (this.props.width) return this.props.width
    if (this.tbody) return this.tbody.offsetWidth
    return 0
  }

  getSumHeight(start, end) {
    const { rowHeight } = this.props
    let height = 0
    for (let i = start; i < end; i++) {
      height += this.cachedRowHeight[i] || rowHeight
    }
    return height
  }

  getLastRowHeight(index) {
    const { rowHeight, data, rowsInView } = this.props

    if (index + rowsInView >= data.length) return 0

    let lastRowHeight = 0
    if (index >= 1 && index < data.length / 2) {
      lastRowHeight = this.cachedRowHeight[index - 1] || rowHeight
    }
    return lastRowHeight
  }

  setRowHeight(height, index) {
    const oldHeight = this.cachedRowHeight[index]
    this.cachedRowHeight[index] = height

    if (!this.tbody) return

    const { offsetLeft, currentIndex } = this.state
    if (currentIndex === index && !oldHeight) {
      this.lastScrollTop += height - this.props.rowHeight
      setTranslate(this.tbody, `-${offsetLeft}px`, `-${this.lastScrollTop}px`)
    }

    if (oldHeight && height !== oldHeight) {
      this.setState({ scrollTop: this.lastScrollTop / this.getContentHeight() })
    }
  }

  resetHeight() {
    const { scrollTop, offsetLeft } = this.state
    const fullHeight = this.getContentHeight()
    const height = fullHeight * scrollTop

    if (this.lastScrollTop - height >= 1) {
      this.lastScrollTop = height
      const index = this.getIndex(scrollTop)
      setTimeout(() => {
        this.setState({ currentIndex: index })
      })

      if (index === 0) {
        this.tbody.style.marginTop = '0px'
        setTranslate(this.tbody, `-${offsetLeft}px`, '0px')
      } else {
        setTranslate(this.tbody, `-${offsetLeft}px`, `-${this.lastScrollTop}px`)
      }
    } else if (this.lastScrollTop - height < 1) {
      setTimeout(() => {
        this.setState({ scrollTop: this.lastScrollTop / fullHeight })
      })
    }
  }

  resetWidth(left, right) {
    setTranslate(this.tbody, `-${left}px`, `-${this.lastScrollTop}px`)
    setTranslate(this.thead, `-${left}px`, '0');

    [this.thead, this.tbody].forEach((el) => {
      [].forEach.call(
        el.parentNode.querySelectorAll(`.${tableClass(CLASS_FIXED_LEFT)}`),
        (td) => { setTranslate(td, `${left}px`, '0') },
      )
    });

    [this.thead, this.tbody].forEach((el) => {
      [].forEach.call(
        el.parentNode.querySelectorAll(`.${tableClass(CLASS_FIXED_RIGHT)}`),
        (td) => { setTranslate(td, `-${right}px`, '0') },
      )
    })
  }

  bindElement(key, el) {
    this[key] = el
  }

  scrollToIndex(index, callback) {
    if (this.$willUnmount) return
    if (index > 1) index -= 1
    if (index < 0) index = 0
    const contentHeight = this.getContentHeight()
    const outerHeight = getParent(this.realTbody, `.${tableClass('body')}`).clientHeight - 12
    const sumHeight = this.getSumHeight(0, index)
    let scrollTop = sumHeight / contentHeight
    let marginTop = scrollTop * outerHeight
    let offsetScrollTop = sumHeight + marginTop

    if (offsetScrollTop > contentHeight) {
      offsetScrollTop = contentHeight
      index = this.props.data.length - this.props.rowsInView
      scrollTop = 1
      marginTop = outerHeight
    }

    this.setState({ currentIndex: index, scrollTop }, callback)
    this.lastScrollTop = offsetScrollTop

    this.tbody.style.marginTop = `${marginTop}px`

    setTranslate(this.tbody, `-${this.state.offsetLeft}px`, `-${offsetScrollTop}px`)
  }

  handleScroll(x, y, max, bar, v, h, pixelX, pixelY) {
    if (!this.tbody) return

    const { data, rowHeight, rowsInView } = this.props
    const contentWidth = this.getContentWidth()
    const contentHeight = this.getContentHeight()
    let left = x * (contentWidth - v)
    let scrollTop = h > contentHeight ? 0 : y
    let right = max - left
    if (right < 0) right = 0

    /* set x */
    if (left < 0) left = 0
    this.resetWidth(left, right)
    /* set x end */

    /* set y */
    this.tbody.style.marginTop = `${scrollTop * h}px`

    if (pixelY === undefined) {
      // drag scroll bar

      const index = this.getIndex(scrollTop)
      const lastRowHeight = this.getLastRowHeight(index)
      const offsetScrollTop = this.getSumHeight(0, index)
      + (scrollTop * this.realTbody.clientHeight)

      this.setState({ currentIndex: index })
      this.lastScrollTop = offsetScrollTop
      setTranslate(this.tbody, `-${left}px`, `-${offsetScrollTop + lastRowHeight}px`)
    } else if (pixelY === 0) {
      // whell x
      setTranslate(this.tbody, `-${left}px`, `-${this.lastScrollTop}px`)
    } else if (contentHeight < h) {
      this.lastScrollTop = 0
      scrollTop = 0
      setTranslate(this.tbody, `-${left}px`, '0px')
      this.setState({ currentIndex: 0 })
    } else {
      // wheel scroll

      this.lastScrollTop += pixelY
      if (this.lastScrollTop < 0) this.lastScrollTop = 0


      // scroll over bottom
      if (this.lastScrollTop > contentHeight) this.lastScrollTop = contentHeight

      let temp = this.lastScrollTop - (scrollTop * h)
      let index = 0
      while (temp > 0) {
        temp -= this.cachedRowHeight[index] || rowHeight
        index += 1
      }

      // offset last row
      index -= 1

      if (data.length - rowsInView < index) index = data.length - rowsInView
      if (index < 0) index = 0

      this.setState({ currentIndex: index })

      scrollTop = this.lastScrollTop / contentHeight
      setTranslate(this.tbody, `-${left}px`, `-${this.lastScrollTop}px`)
    }
    /* set y end */

    this.setState({
      scrollLeft: x,
      scrollTop,
      offsetLeft: left,
      offsetRight: right,
    })

    if (this.props.onScroll) this.props.onScroll(x, y)
  }

  handleSortChange(...args) {
    this.scrollToIndex(0)
    this.props.onSortChange(...args)
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
      data, rowsInView, columns, width, fixed, rowHeight, ...others
    } = this.props
    const {
      colgroup, scrollTop, offsetLeft, offsetRight, currentIndex,
    } = this.state
    const contentWidth = this.getContentWidth()

    if (!data || data.length === 0) {
      return <div key="body" />
    }

    const prevHeight = this.getSumHeight(0, currentIndex)

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
        <div ref={this.bindTbody} className={tableClass('scroll-inner')} style={{ width }}>
          <div style={{ height: prevHeight }} />
          <table style={{ width }} ref={this.bindRealTbody}>
            <Colgroup colgroup={colgroup} columns={columns} />
            <Tbody
              {...others}
              columns={columns}
              onBodyRender={this.handleColgroup}
              index={currentIndex}
              offsetLeft={offsetLeft}
              offsetRight={offsetRight}
              data={data.slice(currentIndex, currentIndex + rowsInView)}
              setRowHeight={this.setRowHeight}
            />
          </table>
        </div>
      </Scroll>
    )
  }

  render() {
    const { columns, fixed, width } = this.props
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
      <div key="head" className={tableClass('head', ...floatClass)}>
        <table style={{ width }} ref={this.bindThead}>
          <Colgroup colgroup={colgroup} columns={columns} />
          <Thead {...this.props} onSortChange={this.handleSortChange} />
        </table>
      </div>,
      this.renderBody(floatClass),
    ]
  }
}

SeperateTable.propTypes = {
  ...getProps(PropTypes, 'size', 'type', 'kengen'),
  columns: PropTypes.array.isRequired,
  data: PropTypes.array,
  fixed: PropTypes.string.isRequired,
  onScroll: PropTypes.func,
  rowHeight: PropTypes.number,
  rowsInView: PropTypes.number.isRequired,
  tableRef: PropTypes.func,
  width: PropTypes.number,
}

SeperateTable.defaultProps = {
  data: undefined,
  rowHeight: 40,
  width: undefined,
}

export default SeperateTable
