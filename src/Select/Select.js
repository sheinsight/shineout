import React from 'react'
import PropTypes from 'prop-types'
import immer from 'immer'
import PureComponent from '../PureComponent'
import { getProps } from '../utils/proptypes'
import { selectClass } from '../styles'
import Result from './Result'
import { getLocale } from '../locale'
import OptionList from './OptionList'

class Select extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      control: 'mouse',
      focus: false,
      result: [],
      position: 'drop-down',
      scrollTop: 0,
      currentIndex: 0,
    }

    this.bindElement = this.bindElement.bind(this)
    this.bindOptionList = this.bindOptionList.bind(this)

    this.setInputReset = this.setInputReset.bind(this)
    this.handleFocus = this.handleState.bind(this, true)
    this.handleBlur = this.handleState.bind(this, false)
    this.handleClear = this.handleClear.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleRemove = this.handleChange.bind(this, false)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleKeyUp = this.handleKeyUp.bind(this)
    this.handleInputFocus = this.handleInputFocus.bind(this)
    this.handleControlChange = this.handleControlChange.bind(this)

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
        this.setState({ scrollTop: 0 })
      })
      if (this.state.result.length === 0) {
        this.resetResult()
      }
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

  bindOptionList(el) {
    this.optionList = el
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

    this.setState({ focus, position: position || 'drop-down' })

    if (focus) {
      onFocus()
    } else {
      onBlur()
      this.optionList.handleHover(undefined)
    }
  }

  handleControlChange(control) {
    if (control !== this.state.control) this.setState({ control })
  }

  handleChange(checked, data) {
    const {
      datum, multiple, disabled, onFilter,
    } = this.props
    if (disabled) return

    console.log(checked, data)

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
    if (this.props.inputable) {
      this.optionList.handleHover(0, true)
      this.handleControlChange('keyboard')
    }
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

  handleEnter() {
    const { hoverIndex } = this.optionList.state
    const data = this.props.data[hoverIndex]
    if (data) {
      const checked = !this.props.datum.check(data)
      this.handleChange(checked, data)
    }
  }

  handleKeyDown(e) {
    this.keyLocked = true
    this.handleControlChange('keyboard')

    switch (e.keyCode) {
      case 38:
        this.optionList.hoverMove(-1)
        e.preventDefault()
        break
      case 40:
        this.optionList.hoverMove(1)
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
      focus, control, currentIndex, position,
    } = this.state

    const props = {};
    (['data', 'datum', 'keygen', 'multiple', 'text', 'itemsInView', 'fixed', 'lineHeight', 'height', 'loading'])
      .forEach((k) => { props[k] = this.props[k] })

    let rect
    if (this.props.fixed && this.element) rect = this.element.getBoundingClientRect()

    return (
      <OptionList
        {...props}
        ref={this.bindOptionList}
        disabled={!this.firstFocused}
        focus={focus}
        control={control}
        onControlChange={this.handleControlChange}
        currentIndex={currentIndex}
        onChange={this.handleChange}
        renderItem={this.renderItem}
        rect={rect}
        position={position}
      />
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
