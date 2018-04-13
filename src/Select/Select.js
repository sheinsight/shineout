import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import immer from 'immer'
import { getProps } from '../utils/proptypes'
import { getKey } from '../utils/uid'
import { setTranslate } from '../utils/dom/translate'
import List from '../List'
import Scroll from '../Scroll'
import { selectClass } from '../styles'
import Option from './Option'
import Result from './Result'

const ScaleList = List(['fade', 'scale-y'], 'fast')

class Select extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      focus: false,
      result: [],
      scrollTop: 0,
      hoverIndex: undefined,
      currentIndex: 0,
    }

    this.bindElement = this.bindElement.bind(this)
    this.handleFocus = this.handleState.bind(this, true)
    this.handleBlur = this.handleState.bind(this, false)
    this.handleClear = this.handleClear.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleRemove = this.handleChange.bind(this, false)
    this.handleScroll = this.handleScroll.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleHover = this.handleHover.bind(this)

    this.resetResult = this.resetResult.bind(this)
    this.renderItem = this.renderItem.bind(this)

    if (props.multiple) {
      props.datum.limit = undefined
    }
    props.datum.listen('set-value', this.resetResult)

    this.lastScrollTop = 0
  }

  componentDidMount() {
    this.resetResult()
  }

  getIndex() {
    const { data, itemsInView } = this.props
    const { scrollTop } = this.state
    const max = data.length
    let index = Math.ceil((scrollTop * max) - (itemsInView * scrollTop))
    if (index > max - itemsInView) index = max - itemsInView
    if (index < 0) index = 0
    return index
  }

  bindElement(el) {
    this.element = el
  }

  hoverMove(step) {
    const max = this.props.data.length
    const { lineHeight, height } = this.props
    // eslint-disable-next-line
    let { hoverIndex, currentIndex } = this.state
    if (hoverIndex === undefined) hoverIndex = currentIndex
    else hoverIndex += step

    console.log(hoverIndex)

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

  handleState(focus, event) {
    if (this.props.disabled) return

    if (event && event.target.getAttribute('data-role') === 'close') {
      return
    }

    this.setState({ focus, hoverIndex: undefined })

    const { onBlur, onFocus } = this.props
    if (focus) onFocus()
    else onBlur()
  }

  handleChange(checked, data) {
    const { datum, multiple, disabled } = this.props
    if (disabled) return

    if (multiple) {
      if (checked) {
        datum.add(data)
        this.setState(immer((state) => {
          state.result.push(data)
        }))
      } else {
        datum.remove(data)
        this.setState({ result: this.state.result.filter(r => r !== data) })
      }
    } else {
      datum.set(data)
      this.setState({ result: [data] })
      this.element.blur()
    }

    this.forceUpdate()
  }

  handleClear() {
    this.setState({ result: [] })
    this.props.datum.setValue([])

    if (this.state.focus === false) {
      this.forceUpdate()
    } else {
      this.handleState(false)
    }
  }

  handleScroll(x, y, max, bar, v, h, pixelX, pixelY) {
    const { data, itemsInView, lineHeight } = this.props
    const fullHeight = itemsInView * this.props.lineHeight
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
    }

    let index = Math.floor(this.lastScrollTop / lineHeight) - 1
    if (data.length - itemsInView < index) index = data.length - itemsInView
    if (index < 0) index = 0

    setTranslate(this.optionInner, '0px', `-${this.lastScrollTop + (scrollTop * h)}px`)

    this.setState({ scrollTop, currentIndex: index })
  }

  handleEnter() {
    const { hoverIndex } = this.state
    const data = this.props.data[hoverIndex]
    const checked = !this.props.datum.check(data)
    this.handleChange(checked, data)
  }

  handleKeyDown(e) {
    e.preventDefault()
    switch (e.keyCode) {
      case 38:
        this.hoverMove(-1)
        break
      case 40:
        this.hoverMove(1)
        break
      case 13:
        this.handleEnter()
        break
      default:
    }
  }

  handleHover(index) {
    this.setState({ hoverIndex: index })
  }

  // result performance
  resetResult() {
    const { data, datum } = this.props
    const result = []
    data.forEach((d) => {
      if (datum.check(d)) result.push(d)
    })
    this.setState({ result })
  }

  renderItem(data, index) {
    const { renderItem } = this.props
    return typeof renderItem === 'function'
      ? renderItem(data, index)
      : data[renderItem]
  }

  renderOptions() {
    const {
      data, datum, keygen, multiple, itemsInView, lineHeight, height,
    } = this.props
    const { hoverIndex, currentIndex } = this.state

    let scroll = ''
    if (height < lineHeight * data.length) {
      scroll = 'y'
    }

    return (
      <ScaleList
        show={this.state.focus}
        className={selectClass('options')}
      >
        {
          data.length === 0
          ? <span className={selectClass('option')}>No Data</span>
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
                      onClick={this.handleChange}
                      renderItem={this.renderItem}
                      onHover={this.handleHover}
                    />
                  ))
                }
              </div>
            </Scroll>
          )
        }
      </ScaleList>
    )
  }

  render() {
    const {
      placeholder, multiple, clearable, disabled, size,
    } = this.props
    const className = selectClass(
      'inner',
      this.state.focus && 'focus',
      size,
      multiple && 'multiple',
      disabled && 'disabled',
    )
    const renderResult = this.props.renderResult || this.renderItem

    return (
      <div
        tabIndex={-1}
        ref={this.bindElement}
        className={className}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        onKeyDown={this.handleKeyDown}
      >
        <Result
          onClear={clearable ? this.handleClear : undefined}
          onRemove={this.handleRemove}
          disabled={disabled}
          focus={this.state.focus}
          result={this.state.result}
          multiple={multiple}
          placeholder={placeholder}
          renderResult={renderResult}
        />
        { !disabled && this.renderOptions() }
      </div>
    )
  }
}

Select.propTypes = {
  ...getProps(['placehodler', 'keygen']),
  clearable: PropTypes.bool,
  data: PropTypes.array,
  datum: PropTypes.object.isRequired,
  disabled: PropTypes.bool,
  height: PropTypes.number,
  itemsInView: PropTypes.number,
  lineHeight: PropTypes.number,
  multiple: PropTypes.bool,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  renderItem: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),
  size: PropTypes.string,
}

Select.defaultProps = {
  clearable: false,
  data: [],
  height: 250,
  itemsInView: 10,
  lineHeight: 32,
  multiple: false,
  renderItem: e => e,
}

export default Select
