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
    }

    this.bindElement = this.bindElement.bind(this)
    this.handleFocus = this.handleState.bind(this, true)
    this.handleBlur = this.handleState.bind(this, false)
    this.handleClear = this.handleClear.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleRemove = this.handleChange.bind(this, false)
    this.handleScroll = this.handleScroll.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)

    this.resetResult = this.resetResult.bind(this)
    this.renderItem = this.renderItem.bind(this)

    if (props.multiple) {
      props.datum.limit = undefined
    }
    props.datum.listen('set-value', this.resetResult)
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
    let { hoverIndex } = this.state
    if (hoverIndex === undefined) hoverIndex = step === 1 ? 0 : (max - 1)
    else hoverIndex += step

    if (hoverIndex >= max) hoverIndex = 0
    if (hoverIndex < 0) hoverIndex = max - 1

    this.setState({ hoverIndex })
    console.log(hoverIndex)
  }

  handleState(focus, event) {
    if (this.props.disabled) return

    if (event && event.target.getAttribute('data-role') === 'close') {
      return
    }

    this.setState({ focus })

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

  handleScroll(x, y, max, bar, v, h) {
    const fullHeight = this.props.itemsInView * this.props.lineHeight
    const scrollTop = h > fullHeight ? 0 : y
    bar.style.paddingTop = `${scrollTop * h}px`
    setTranslate(this.optionInner, '0', `-${scrollTop * 100}%`)
    this.setState({ scrollTop })
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
        console.log('enter')
        break
      default:
    }
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
    const { hoverIndex } = this.state

    const index = this.getIndex()
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
              style={{ height: scroll ? height : 'auto' }}
              onScroll={this.handleScroll}
              scrollHeight={data.length * lineHeight}
              scrollTop={this.state.scrollTop}
            >
              <div ref={(el) => { this.optionInner = el }}>
                {
                  data.slice(index, index + itemsInView).map((d, i) => (
                    <Option
                      isActive={datum.check(d)}
                      isHover={hoverIndex === index + i}
                      key={getKey(d, keygen, i)}
                      index={index + i}
                      data={d}
                      multiple={multiple}
                      onClick={this.handleChange}
                      renderItem={this.renderItem}
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
