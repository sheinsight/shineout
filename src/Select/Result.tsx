import React, { PureComponent } from 'react'
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
import { ResultProps } from './Props'
import { ResultItem, UnMatchedValue } from '../@types/common'
import ShallowEqual from '../utils/shallowEqual'

export const IS_NOT_MATCHED_VALUE = 'IS_NOT_MATCHED_VALUE'

/**
 * get result className from resultClassName attr
 * @param {function | string} f props => resultClassName
 * @param {any} value result value
 * @returns {string | null}
 */
const getResultClassName = <Item, Value>(f: ResultProps<Item, Value>['resultClassName'], data: ResultItem<Item>) => {
  const unMatchedData: UnMatchedValue = data as UnMatchedValue
  if (isFunc(f)) {
    return f(isObject(unMatchedData) && unMatchedData.IS_NOT_MATCHED_VALUE ? unMatchedData.value : unMatchedData)
  }
  if (isString(f)) {
    return f
  }
  return null
}

const getResultContent = <Item, Value>(
  data: ResultItem<Item>,
  renderResult: ResultProps<Item, Value>['renderResult'],
  renderUnmatched: ResultProps<Item, Value>['renderUnmatched']
) => {
  const unMatchedData: UnMatchedValue = data as UnMatchedValue

  if (isObject(unMatchedData) && unMatchedData.IS_NOT_MATCHED_VALUE) {
    if (typeof renderUnmatched === 'function') return renderUnmatched(unMatchedData.value)
    return isObject(unMatchedData.value) ? renderResult(unMatchedData.value) : unMatchedData.value
  }
  return renderResult(data)
}

// eslint-disable-next-line
function Item<Item, Value>({
  isDisabled,
  onClick,
  resultClassName,
  value,
  getDataByValue,
  getContent,
  title = false,
  only,
}: {
  value: Value
  getDataByValue: (value: Value) => ResultItem<Item>
  getContent: (data: ResultItem<Item>) => React.ReactNode | string
  isDisabled: (value: ResultItem<Item>) => boolean
  onClick: (value: ResultItem<Item>) => void
  resultClassName: ResultProps<Item, Value>['resultClassName']
  title: boolean
  only: boolean
}) {
  const data = getDataByValue(value)
  if (data === null) return null
  const content = getContent(data)

  const disabled = isDisabled(data)
  const click = disabled || !onClick ? undefined : () => onClick(data)
  const synDisabled = disabled || !click
  return (
    <a
      title={title && isString(content) ? content : undefined}
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

interface ResultState {
  more: number
}

class Result<Item, Value> extends PureComponent<ResultProps<Item, Value>, ResultState> {
  resultEl: HTMLDivElement

  cancelResizeObserver: () => void

  shouldResetMore: boolean

  constructor(props: ResultProps<Item, Value>) {
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

  componentDidUpdate(preProps: ResultProps<Item, Value>) {
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

  bindResult(el: HTMLDivElement) {
    this.resultEl = el
  }

  updateMore(preProps: ResultProps<Item, Value>) {
    const { compressed, onFilter, values, data } = this.props

    if (compressed) {
      if (this.isCompressedBound()) return

      const shouldRest = !ShallowEqual(preProps.values, values) || (data || []).length !== (preProps.data || []).length
      if (shouldRest) {
        this.resetMore()
      } else if ((values || []).length && this.shouldResetMore) {
        this.shouldResetMore = false
        // @ts-ignore
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
    // @ts-ignore
    this.state.more = -1
    this.forceUpdate()
  }

  handleRemove(...args: any[]) {
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

  handelMore(more: number) {
    this.setState({ more })
  }

  renderItem(value: any, index: number) {
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

  renderMore(items: React.ReactNode[]) {
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
    if (onClear && values && values.length && disabled !== true) {
      /* eslint-disable */
      return (
        <div key="clear" onClick={onClear} className={selectClass('close-warpper')}>
          <a tabIndex={-1} data-role="close" className={selectClass('indicator', 'close')} />
        </div>
      )
      /* eslint-enable */
    }

    return null
  }

  renderInput(text: React.ReactNode, key: string | number = 'input') {
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

  renderPlaceholder(empty?: boolean) {
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
        title={title as string}
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

export default Result
