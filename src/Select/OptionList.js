import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { getKey } from '../utils/uid'
import { setTranslate } from '../utils/dom/translate'
import List from '../List'
import Scroll from '../Scroll'
import Spin from '../Spin'
import { getLocale } from '../locale'
import { selectClass } from '../styles'
import Option from './Option'

const ScaleList = List(['fade', 'scale-y'], 'fast')

const root = document.createElement('div')
root.className = selectClass('root')
document.body.appendChild(root)

class OptionList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentIndex: 0,
      hoverIndex: 0,
      scrollTop: 0,
    }

    this.hoverMove = this.hoverMove.bind(this)

    this.handleHover = this.handleHover.bind(this)
    this.handleScroll = this.handleScroll.bind(this)
    this.handleMouseMove = this.handleMouseMove.bind(this)

    this.isFixed = props.fixed
    this.element = document.createElement('div')
    this.element.className = selectClass('fixed-wrapper')
  }

  componentDidMount() {
    if (this.isFixed) root.appendChild(this.element)
  }

  componentWillUnmount() {
    if (this.isFixed) root.removeChild(this.element)
  }

  getText(key) {
    return this.props.text[key] || getLocale(key)
  }

  hoverMove(step) {
    const max = this.props.data.length
    const { lineHeight, height } = this.props
    // eslint-disable-next-line
    let { hoverIndex, currentIndex } = this.state
    if (hoverIndex === undefined) hoverIndex = currentIndex
    else hoverIndex += step

    if (hoverIndex >= max) {
      hoverIndex = 0
      this.lastScrollTop = 0
    }
    if (hoverIndex < 0) hoverIndex = max - 1

    const scrollTop = hoverIndex / max
    const offset = scrollTop * height
    const emptyHeight = (hoverIndex * lineHeight) + offset

    if (emptyHeight < this.lastScrollTop + offset) {
      // fixed at top

      this.optionInner.style.marginTop = `${offset}px`
      setTranslate(this.optionInner, '0px', `-${emptyHeight}px`)
      this.lastScrollTop = emptyHeight - offset

      currentIndex = hoverIndex - 1
      if (currentIndex < 0) currentIndex = max
      this.setState({ currentIndex, scrollTop: emptyHeight / (lineHeight * max) })
    } else if (emptyHeight + lineHeight > this.lastScrollTop + offset + height) {
      // fixed at bottom

      this.optionInner.style.marginTop = `${offset}px`
      const scrollHeight = (emptyHeight + lineHeight) - height
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
    const { data, itemsInView, lineHeight } = this.props
    const fullHeight = itemsInView * lineHeight
    const contentHeight = (data.length * lineHeight) - h
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

    setTranslate(this.optionInner, '0px', `-${this.lastScrollTop + (scrollTop * h)}px`)

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
      data, datum, keygen, multiple, itemsInView, lineHeight, height, control,
      loading, renderItem, focus, disabled, onChange, rect,
    } = this.props
    const { hoverIndex, currentIndex } = this.state

    let scroll = ''
    if (height < lineHeight * data.length) {
      scroll = 'y'
    }

    const style = {}
    if (this.isFixed && rect) {
      style.position = 'absolute'
      style.width = rect.width
      style.left = rect.left
      style.top = rect.top
    }

    return (
      <ScaleList
        show={focus}
        onMouseMove={this.handleMouseMove}
        style={style}
        className={selectClass('options', `control-${control}`)}
      >
        {
          // eslint-disable-next-line
          loading ?
            <span className={selectClass('option')}>
              {typeof loading === 'boolean' ? <Spin size={20} /> : loading}
            </span>
            : (data.length === 0 || disabled
              ? <span className={selectClass('option')}>{this.getText('noData')}</span>
              : (
                <Scroll
                  scroll={scroll}
                  style={{ height: scroll ? height : undefined }}
                  onScroll={this.handleScroll}
                  scrollHeight={data.length * lineHeight}
                  scrollTop={this.state.scrollTop}
                >
                  <div ref={(el) => { this.optionInner = el }}>
                    <div style={{ height: currentIndex * lineHeight }} />
                    {
                      data.slice(currentIndex, currentIndex + itemsInView).map((d, i) => (
                        <Option
                          isActive={datum.check(d)}
                          isHover={hoverIndex === currentIndex + i}
                          key={getKey(d, keygen, i)}
                          index={currentIndex + i}
                          data={d}
                          multiple={multiple}
                          onClick={onChange}
                          renderItem={renderItem}
                          onHover={this.handleHover}
                        />
                      ))
                    }
                  </div>
                </Scroll>
              )
            )
        }
      </ScaleList>
    )
  }

  render() {
    const list = this.renderList()

    if (this.isFixed) return ReactDOM.createPortal(list, this.element)

    return list
  }
}

OptionList.propTypes = {
  control: PropTypes.oneOf(['mouse', 'keyboard']),
  data: PropTypes.array,
  datum: PropTypes.object.isRequired,
  disabled: PropTypes.bool,
  fixed: PropTypes.bool,
  focus: PropTypes.bool,
  height: PropTypes.number,
  itemsInView: PropTypes.number,
  keygen: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),
  lineHeight: PropTypes.number,
  loading: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.bool,
  ]),
  multiple: PropTypes.bool,
  onControlChange: PropTypes.func,
  onChange: PropTypes.func,
  rect: PropTypes.object,
  renderItem: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),
  text: PropTypes.object,
}

export default OptionList
