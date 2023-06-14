import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { selectClass } from './styles'
import { inputClass } from '../Input/styles'
import { inputTitleClass } from '../InputTitle/styles'
import { isObject, isFunc, isString, isEmpty, isNumber } from '../utils/is'
import { addResizeObserver } from '../utils/dom/element'
import Input from './Input'
import Caret from '../icons/Caret'
import { isRTL } from '../config'
import More, { getResetMore } from './More'
import InputTitle from '../InputTitle'
import { getDirectionClass } from '../utils/classname'
import ShallowEqual from '../utils/shallowEqual'

export const IS_NOT_MATCHED_VALUE = 'IS_NOT_MATCHED_VALUE'

/**
 * get result className from resultClassName attr
 * @param {function | string} f props => resultClassName
 * @param {any} value result value
 * @returns {string | null}
 */
const getResultClassName = (f, value) => {
  if (isFunc(f)) {
    return f(isObject(value) && value.IS_NOT_MATCHED_VALUE ? value.value : value)
  }
  if (isString(f)) {
    return f
  }
  return null
}

const getResultContent = (data, renderResult, renderUnmatched) => {
  if (isObject(data) && data.IS_NOT_MATCHED_VALUE) {
    if (typeof renderUnmatched === 'function') return renderUnmatched(data.value)
    return isObject(data.value) ? renderResult(data.value) : data.value
  }
  return renderResult(data)
}

// eslint-disable-next-line
function Item(props) {
  // eslint-disable-next-line react/prop-types
  const { value, onClick, resultClassName, title = false, only, getDataByValue, getContent, isDisabled } = props

  const data = getDataByValue(value)
  const disabled = isDisabled(data)
  const content = getContent(data)
  if (data === null) return null
  const click = disabled || !onClick ? undefined : () => onClick(data)
  const synDisabled = disabled || !click
  return (
    <a
      title={title && isString(content) ? content : null}
      tabIndex={-1}
      className={classnames(
        selectClass(
          getDirectionClass('item'),
          disabled && getDirectionClass('disabled'),
          synDisabled && getDirectionClass('ban'),
          only && 'item-only'
        ),
        getResultClassName(resultClassName, data)
      )}
    >
      {content}
      {!synDisabled && <span className={selectClass('indicator', 'close')} onClick={click} />}
    </a>
  )
}

class Result extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      more: -1,
    }

    this.handleRemove = this.handleRemove.bind(this)
    this.handelMore = this.handelMore.bind(this)
    this.bindResult = this.bindResult.bind(this)
    this.resetMore = this.resetMore.bind(this)
  }

  componentDidMount() {
    const { compressed } = this.props
    if (compressed && !this.isCompressedBound()) {
      this.cancelResizeObserver = addResizeObserver(this.resultEl, this.resetMore, { direction: 'x' })
    }
  }

  componentDidUpdate(preProps) {
    this.updateMore(preProps)
  }

  componentWillUnmount() {
    if (this.cancelResizeObserver) this.cancelResizeObserver()
  }

  getCompressedBound() {
    const { compressedBound } = this.props
    if (this.isCompressedBound()) {
      return compressedBound
    }
    return this.state.more
  }

  isCompressedBound() {
    const { compressedBound } = this.props
    return compressedBound && isNumber(compressedBound) && compressedBound >= 1
  }

  bindResult(el) {
    this.resultEl = el
  }

  updateMore(preProps) {
    const { compressed, onFilter, values, data } = this.props

    if (compressed) {
      if (this.isCompressedBound()) return

      const shouldRest = !ShallowEqual(preProps.values, values) || (data || []).length !== (preProps.data || []).length
      if (shouldRest) {
        this.resetMore()
      } else if ((values || []).length && this.shouldResetMore) {
        this.shouldResetMore = false
        this.state.more = getResetMore(
          onFilter,
          this.resultEl,
          this.resultEl.querySelectorAll(`.${selectClass('item')}`)
        )
        this.forceUpdate()
      }
    }
  }

  resetMore() {
    if (!this.props.compressed) return
    this.shouldResetMore = true
    this.state.more = -1
    this.forceUpdate()
  }

  handleRemove(...args) {
    const { onRemove } = this.props
    setTimeout(() => {
      onRemove(...args)
    }, 10)
  }

  isEmptyResult() {
    const { values, renderResult, renderUnmatched, getResultByValue } = this.props
    if (values.length <= 0) return true
    const hasValue =
      values.findIndex(item => {
        const cur = getResultByValue(item)
        const r = getResultContent(cur, renderResult, renderUnmatched)
        return !isEmpty(r)
      }) >= 0
    return !hasValue
  }

  handelMore(more) {
    this.setState({ more })
  }

  renderItem(value, index) {
    const { renderResult, renderUnmatched, datum, resultClassName, getResultByValue } = this.props
    if (value === null) return null
    const more = this.getCompressedBound()
    return (
      <Item
        key={index}
        only={more === 1}
        value={value}
        getDataByValue={getResultByValue}
        getContent={data => getResultContent(data, renderResult, renderUnmatched)}
        isDisabled={data => datum.disabled(data)}
        onClick={this.handleRemove}
        resultClassName={resultClassName}
        title
      />
    )
  }

  renderMore(items) {
    const { compressedClassName, compressed } = this.props
    const more = this.getCompressedBound()
    const className = classnames(selectClass('popover'), compressedClassName)

    return [
      <More
        key="more"
        showNum={more}
        className={selectClass(getDirectionClass('item'), 'item-compressed')}
        popoverClassName={className}
        contentClassName={selectClass(getDirectionClass('result'))}
        compressed={compressed}
        data={items}
        more={more}
        cls={selectClass}
      />,
    ]
  }

  renderClear() {
    const { onClear, disabled, values } = this.props

    if (onClear && values.length && disabled !== true) {
      /* eslint-disable */
      return (
        <div key="clear" onClick={onClear} className={selectClass('close-warpper')}>
          <a
            tabIndex={-1}
            data-role="close"
            className={selectClass('indicator', 'close')}
          />
        </div>
      )
      /* eslint-enable */
    }

    return null
  }

  renderInput(text, key = 'input') {
    const {
      multiple,
      onFilter,
      trim,
      focus,
      onInputFocus,
      onInputBlur,
      setInputReset,
      focusSelected,
      bindFocusInputFunc,
      // collapse,
      maxLength,
      convertBr,
    } = this.props
    return (
      <Input
        key={`${key}.${focus ? 1 : 0}`}
        onInputFocus={onInputFocus}
        onInputBlur={onInputBlur}
        updatAble={!multiple}
        multiple={multiple}
        focus={focus}
        text={text}
        trim={trim}
        onFilter={onFilter}
        setInputReset={setInputReset}
        focusSelected={focusSelected}
        bindFocusInputFunc={bindFocusInputFunc}
        // collapse={collapse}
        maxLength={maxLength}
        convertBr={convertBr}
      />
    )
  }

  renderPlaceholder(empty) {
    const { focus, onFilter, filterText, multiple, innerTitle } = this.props

    if (focus && onFilter && empty) {
      return this.renderInput(multiple ? filterText : '')
    }

    return (
      <span
        key="placeholder"
        style={!empty ? { display: 'none' } : undefined}
        className={classnames(
          inputClass('placeholder'),
          selectClass('ellipsis'),
          innerTitle && inputTitleClass('hidable')
        )}
      >
        <span>{this.props.placeholder}</span>
        &nbsp;
      </span>
    )
  }

  renderResult() {
    const {
      multiple,
      compressed,
      renderResult,
      renderUnmatched,
      onFilter,
      focus,
      filterText,
      resultClassName,
      getResultByValue,
    } = this.props
    const values = this.props.values || []

    if (multiple) {
      let items = values.map((n, i) => this.renderItem(n, i)).filter(n => !isEmpty(n))

      if (compressed) {
        items = this.renderMore(items)
      }

      if (focus && onFilter) {
        items.push(this.renderInput(filterText, values.length))
      }
      return items
    }

    const result0 = getResultByValue(values[0])
    if (onFilter) {
      return this.renderInput(getResultContent(result0, renderResult, renderUnmatched))
    }

    const v = getResultContent(result0, renderResult, renderUnmatched)
    const title = isString(v) ? v : undefined

    return (
      <span
        key="result"
        title={title}
        className={classnames(selectClass('ellipsis'), getResultClassName(resultClassName, result0))}
      >
        {v}
      </span>
    )
  }

  renderIndicator() {
    const { multiple, showArrow, compressed } = this.props
    if (!showArrow || (multiple && !compressed)) return null
    const showCaret = !multiple
    // eslint-disable-next-line
    return (
      <a key="indicator" tabIndex={-1} className={selectClass('indicator', multiple ? 'multi' : 'caret')}>
        {showCaret && <Caret />}
      </a>
    )
  }

  render() {
    const { compressed, innerTitle, focus, onFilter } = this.props
    const showPlaceholder = this.isEmptyResult()
    const placeholder = this.renderPlaceholder(showPlaceholder)
    const result = showPlaceholder ? null : this.renderResult()

    const rtl = isRTL()
    const clearEl = this.renderClear()
    const indicator = this.renderIndicator()
    const inner = [result, placeholder, indicator, clearEl]
    const open = (onFilter && focus) || !showPlaceholder

    return (
      <InputTitle
        innerTitle={innerTitle}
        open={open}
        className={selectClass('title-box')}
        titleClass={selectClass(getDirectionClass('title-box-title'))}
      >
        <div
          ref={this.bindResult}
          className={classnames(
            selectClass(
              getDirectionClass('result'),
              compressed && 'compressed',
              showPlaceholder && 'empty',
              clearEl && 'result-clearable'
            ),
            innerTitle && inputTitleClass(getDirectionClass('item'), 'item-scroll')
          )}
        >
          {rtl ? inner.reverse() : inner}
        </div>
      </InputTitle>
    )
  }
}

Result.propTypes = {
  datum: PropTypes.object,
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  filterText: PropTypes.string,
  focus: PropTypes.bool,
  multiple: PropTypes.bool.isRequired,
  onRemove: PropTypes.func,
  onClear: PropTypes.func,
  onFilter: PropTypes.func,
  onInputBlur: PropTypes.func,
  onInputFocus: PropTypes.func,
  renderResult: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
  placeholder: PropTypes.string,
  setInputReset: PropTypes.func,
  bindFocusInputFunc: PropTypes.func,
  // collapse: PropTypes.func,
  data: PropTypes.array,
  compressed: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  compressedBound: PropTypes.number,
  trim: PropTypes.bool,
  renderUnmatched: PropTypes.func,
  showArrow: PropTypes.bool,
  focusSelected: PropTypes.bool,
  compressedClassName: PropTypes.string,
  resultClassName: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  maxLength: PropTypes.number,
  innerTitle: PropTypes.node,
  values: PropTypes.array.isRequired,
  getResultByValue: PropTypes.func,
  convertBr: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
}

export default Result
