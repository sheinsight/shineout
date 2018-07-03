import React from 'react'
import PropTypes from 'prop-types'
import immer from 'immer'
import PureComponent from '../PureComponent'
import { getProps } from '../utils/proptypes'
import { getKey } from '../utils/uid'
import { setTranslate } from '../utils/dom/translate'
import List from '../List'
import Scroll from '../Scroll'
import Spin from '../Spin'
import { selectClass } from '../styles'
import Option from './Option'
import Result from './Result'
import { getLocale } from '../locale'

const ScaleList = List(['fade', 'scale-y'], 'fast')

class Select extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      focus: false,
      result: [],
      position: 'drop-down',
      scrollTop: 0,
      hoverIndex: undefined,
      currentIndex: 0,
    }

    this.setInputReset = this.setInputReset.bind(this)
    this.bindElement = this.bindElement.bind(this)
    this.handleFocus = this.handleState.bind(this, true)
    this.handleBlur = this.handleState.bind(this, false)
    this.handleClear = this.handleClear.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleRemove = this.handleChange.bind(this, false)
    this.handleScroll = this.handleScroll.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleKeyUp = this.handleKeyUp.bind(this)
    this.handleHover = this.handleHover.bind(this)
    this.handleInputFocus = this.handleInputFocus.bind(this)

    this.resetResult = this.resetResult.bind(this)
    this.renderItem = this.renderItem.bind(this)

    if (props.multiple) {
      props.datum.limit = undefined
    }
    props.datum.listen('set-value', this.resetResult)

    this.lastScrollTop = 0
    // option list not render till first focused
    this.firstFocused = false
  }

  componentDidMount() {
    this.resetResult()
  }

  componentDidUpdate(prevProps, prevState) {
    const { data, onFilter } = this.props

    if (data !== prevProps.data) {
      this.lastScrollTop = 0
      setTimeout(() => {
        this.setState({ scrollTop: 0, hoverIndex: 0 })
      })
    }
    // clear filter
    if (prevState.focus !== this.state.focus && !this.state.focus && onFilter) {
      setTimeout(() => {
        onFilter()
      }, 400)
    }
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

  getText(key) {
    return this.props.text[key] || getLocale(key)
  }

  setInputReset(fn) {
    this.inputReset = fn
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

  handleState(focus, event, force) {
    if (this.props.disabled) return

    if (focus === this.state.focus) return

    const classList = (event.target.className || '').split(' ')
    if (classList.indexOf(selectClass('option')) >= 0) return
    if (classList.indexOf(selectClass('close')) >= 0) return

    if (!focus && this.inputLocked) {
      this.inputLocked = false
      return
    }

    // prevent input blur
    if (classList.indexOf(selectClass('input')) >= 0 && !force) return

    if (focus) this.firstFocused = true

    const { onBlur, onFocus, height } = this.props
    let { position } = this.props
    const windowHeight = window.innerHeight || document.documentElement.clientHeight
    const bottom = height + this.element.getBoundingClientRect().bottom
    if (bottom > windowHeight && !position) position = 'drop-up'

    this.setState({ focus, hoverIndex: undefined, position: position || 'drop-down' })

    if (focus) onFocus()
    else onBlur()
  }

  handleChange(checked, data) {
    const {
      datum, multiple, disabled, onFilter,
    } = this.props
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
      if (onFilter) onFilter()
      if (this.inputReset) this.inputReset()
    } else {
      datum.set(data)
      this.setState({ result: [data] })
      this.handleState(false, { target: {} }, true)
    }

    this.forceUpdate()
  }

  handleInputFocus() {
    this.inputLocked = true
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

  handleEnter() {
    const { hoverIndex } = this.state
    const data = this.props.data[hoverIndex]
    if (data) {
      const checked = !this.props.datum.check(data)
      this.handleChange(checked, data)
    }
  }

  handleKeyDown(e) {
    this.keyLocked = true
    // e.preventDefault()
    switch (e.keyCode) {
      case 38:
        this.hoverMove(-1)
        e.preventDefault()
        break
      case 40:
        this.hoverMove(1)
        e.preventDefault()
        break
      case 13:
        this.handleEnter()
        e.preventDefault()
        break
      default:
    }
  }

  handleKeyUp() {
    this.keyLocked = false
  }

  handleHover(index) {
    if (this.keyLocked) return
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
      data, datum, keygen, multiple, itemsInView, lineHeight, height, loading,
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
          // eslint-disable-next-line
          loading ?
            <span className={selectClass('option')}>
              {typeof loading === 'boolean' ? <Spin size={20} /> : loading}
            </span>
            : (data.length === 0 || !this.firstFocused
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
                          onClick={this.handleChange}
                          renderItem={this.renderItem}
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
    const {
      placeholder, multiple, clearable, disabled, size, onFilter,
    } = this.props
    const className = selectClass(
      'inner',
      size,
      this.state.focus && 'focus',
      this.state.position,
      multiple && 'multiple',
      disabled && 'disabled',
    )
    const renderResult = this.props.renderResult || this.renderItem

    return (
      <div
        tabIndex={-1}
        ref={this.bindElement}
        className={className}
        onClick={this.handleFocus}
        onBlur={this.handleBlur}
        onKeyDown={this.handleKeyDown}
        onKeyUp={this.handleKeyUp}
      >
        <Result
          onClear={clearable ? this.handleClear : undefined}
          onRemove={this.handleRemove}
          onFilter={onFilter}
          disabled={disabled}
          focus={this.state.focus}
          result={this.state.result}
          multiple={multiple}
          placeholder={placeholder}
          renderResult={renderResult}
          onInputFocus={this.handleInputFocus}
          onInputBlur={this.handleBlur}
          setInputReset={this.setInputReset}
        />
        { !disabled && this.renderOptions() }
      </div>
    )
  }
}

Select.propTypes = {
  ...getProps(PropTypes, 'placehodler', 'keygen'),
  clearable: PropTypes.bool,
  data: PropTypes.array,
  datum: PropTypes.object.isRequired,
  disabled: PropTypes.bool,
  height: PropTypes.number,
  itemsInView: PropTypes.number,
  lineHeight: PropTypes.number,
  loading: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.bool,
  ]),
  multiple: PropTypes.bool,
  onBlur: PropTypes.func,
  onFilter: PropTypes.func,
  onFocus: PropTypes.func,
  position: PropTypes.string,
  renderItem: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),
  size: PropTypes.string,
  text: PropTypes.object,
}

Select.defaultProps = {
  clearable: false,
  data: [],
  height: 250,
  itemsInView: 10,
  lineHeight: 32,
  loading: false,
  multiple: false,
  renderItem: e => e,
  text: {},
}

export default Select
