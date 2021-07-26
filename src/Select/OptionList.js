import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { getKey } from '../utils/uid'
import { setTranslate } from '../utils/dom/translate'
import List from '../AnimationList'
import Scroll from '../Scroll'
import Spin from '../Spin'
import { getLocale } from '../locale'
import { selectClass } from '../styles'
import Option from './Option'

const ScaleList = List(['fade', 'scale-y'], 'fast')

class OptionList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentIndex: 0,
      hoverIndex: props.hideCreateOption ? -1 : 0,
      scrollTop: 0,
    }

    this.hoverMove = this.hoverMove.bind(this)

    this.handleHover = this.handleHover.bind(this)
    this.handleScroll = this.handleScroll.bind(this)
    this.handleMouseMove = this.handleMouseMove.bind(this)
    this.renderList = this.renderList.bind(this)

    this.lastScrollTop = 0

    props.bindOptionFunc('handleHover', this.handleHover)
    props.bindOptionFunc('hoverMove', this.hoverMove)
    props.bindOptionFunc('getIndex', () => this.state.hoverIndex)
  }

  componentDidUpdate(prevProps) {
    const { data } = this.props

    if (data !== prevProps.data && data.length !== prevProps.data.length) {
      this.lastScrollTop = 0
      // eslint-disable-next-line
      this.setState({ currentIndex: 0, scrollTop: 0 }, () => {
        if (this.optionInner) {
          setTranslate(this.optionInner, '0px', '0px')
          this.optionInner.style.marginTop = '0px'
        }
      })
    }
  }

  getText(key) {
    return this.props.text[key] || getLocale(key)
  }

  hoverMove(step) {
    const max = this.props.data.length
    const { lineHeight, height, groupKey } = this.props
    let { hoverIndex, currentIndex } = this.state
    if (hoverIndex === undefined) hoverIndex = currentIndex
    else hoverIndex += step

    if (hoverIndex >= max) {
      hoverIndex = 0
      this.lastScrollTop = 0
    }

    // jump the group, the group would't be the last, so do't need to fixed the last
    const data = this.props.data[hoverIndex]
    if (data && data[groupKey]) {
      if (step > 0) hoverIndex += 1
      else hoverIndex -= 1
    }
    if (hoverIndex < 0) hoverIndex = max - 1

    const scrollTop = hoverIndex / max
    const offset = scrollTop * height
    const emptyHeight = hoverIndex * lineHeight + offset

    if (emptyHeight < this.lastScrollTop + offset) {
      // absolute at top

      this.optionInner.style.marginTop = `${offset}px`
      setTranslate(this.optionInner, '0px', `-${emptyHeight}px`)
      this.lastScrollTop = emptyHeight - offset

      currentIndex = hoverIndex - 1
      if (currentIndex < 0) currentIndex = max
      this.setState({ currentIndex, scrollTop: emptyHeight / (lineHeight * max) })
    } else if (emptyHeight + lineHeight > this.lastScrollTop + offset + height) {
      // absolute at bottom

      this.optionInner.style.marginTop = `${offset}px`
      const scrollHeight = emptyHeight + lineHeight - height
      setTranslate(this.optionInner, '0px', `-${scrollHeight}px`)
      this.lastScrollTop = scrollHeight - offset

      currentIndex = hoverIndex - Math.ceil(height / lineHeight)
      if (currentIndex < 0) currentIndex = 0
      this.setState({ currentIndex, scrollTop: scrollHeight / (lineHeight * max) })
    } else if (hoverIndex === 0 && emptyHeight === 0) {
      // reset to top

      this.optionInner.style.marginTop = '0px'
      setTranslate(this.optionInner, '0px', '0px')
      this.setState({ currentIndex: 0, scrollTop: 0 })
    }
    this.setState({ hoverIndex })
  }

  handleScroll(x, y, max, bar, v, h, pixelX, pixelY) {
    if (!this.optionInner) return
    const { data, itemsInView, lineHeight } = this.props
    const fullHeight = itemsInView * lineHeight
    const contentHeight = data.length * lineHeight - h
    let scrollTop = h > fullHeight ? 0 : y

    this.optionInner.style.marginTop = `${scrollTop * h}px`

    if (pixelY === undefined || pixelY === 0) {
      this.lastScrollTop = scrollTop * contentHeight
    } else {
      this.lastScrollTop += pixelY
      if (this.lastScrollTop < 0) this.lastScrollTop = 0

      // scroll over bottom
      if (this.lastScrollTop > contentHeight) this.lastScrollTop = contentHeight
      scrollTop = this.lastScrollTop / contentHeight
      this.optionInner.style.marginTop = `${scrollTop * h}px`
    }

    let index = Math.floor(this.lastScrollTop / lineHeight) - 1
    if (data.length - itemsInView < index) index = data.length - itemsInView
    if (index < 0) index = 0

    setTranslate(this.optionInner, '0px', `-${this.lastScrollTop + scrollTop * h}px`)

    this.setState({ scrollTop, currentIndex: index })
  }

  handleHover(index, force) {
    if ((this.props.control === 'mouse' || force) && this.state.hoverIndex !== index) {
      this.setState({ hoverIndex: index })
    }
  }

  handleMouseMove() {
    this.props.onControlChange('mouse')
  }

  renderList() {
    const {
      loading,
      data,
      renderPending,
      height,
      lineHeight,
      itemsInView,
      datum,
      keygen,
      multiple,
      onChange,
      renderItem,
      groupKey,
      filterText,
    } = this.props
    const { hoverIndex, currentIndex } = this.state
    let scroll = ''
    const scrollHeight = lineHeight * data.length
    if (height < scrollHeight) {
      scroll = 'y'
    }
    if (loading)
      return (
        <span className={selectClass('option')}>{typeof loading === 'boolean' ? <Spin size={20} /> : loading}</span>
      )
    if (data.length === 0 || renderPending)
      return <span className={selectClass('option')}>{this.getText('noData')}</span>
    return (
      <Scroll
        scroll={scroll}
        style={{ height: scroll ? height : undefined }}
        onScroll={this.handleScroll}
        scrollHeight={data.length * lineHeight}
        scrollTop={this.state.scrollTop}
      >
        <div
          ref={el => {
            this.optionInner = el
          }}
        >
          <div style={{ height: currentIndex * lineHeight }} />
          {data.slice(currentIndex, currentIndex + itemsInView).map((d, i) => (
            <Option
              isActive={datum.check(d)}
              disabled={datum.disabled(d)}
              isHover={hoverIndex === currentIndex + i}
              key={d && d[groupKey] ? `__${d[groupKey]}__` : getKey(d, keygen, i)}
              index={currentIndex + i}
              data={d}
              multiple={multiple}
              onClick={onChange}
              renderItem={renderItem}
              onHover={this.handleHover}
              groupKey={groupKey}
              filterText={filterText}
            />
          ))}
        </div>
      </Scroll>
    )
  }

  render() {
    const { control, focus, style, selectId, autoClass, getRef, customHeader } = this.props

    return (
      <ScaleList
        show={focus}
        onMouseMove={this.handleMouseMove}
        style={style}
        data-id={selectId}
        className={classnames(selectClass('options', `control-${control}`), autoClass)}
        getRef={getRef}
      >
        {customHeader}
        {this.renderList()}
      </ScaleList>
    )
  }
}

OptionList.propTypes = {
  control: PropTypes.oneOf(['mouse', 'keyboard']),
  data: PropTypes.array,
  datum: PropTypes.object.isRequired,
  focus: PropTypes.bool,
  height: PropTypes.number,
  itemsInView: PropTypes.number,
  keygen: PropTypes.any,
  lineHeight: PropTypes.number,
  loading: PropTypes.oneOfType([PropTypes.element, PropTypes.bool]),
  multiple: PropTypes.bool,
  onControlChange: PropTypes.func,
  onChange: PropTypes.func,
  renderItem: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  renderPending: PropTypes.bool,
  selectId: PropTypes.string,
  bindOptionFunc: PropTypes.func.isRequired,
  autoClass: PropTypes.string,
  style: PropTypes.object,
  text: PropTypes.object,
  groupKey: PropTypes.string,
  getRef: PropTypes.func,
  customHeader: PropTypes.node,
  filterText: PropTypes.string,
  hideCreateOption: PropTypes.bool,
}

export default OptionList
