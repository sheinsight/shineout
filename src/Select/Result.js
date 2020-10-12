import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Popover from '../Popover'
import { inputClass, selectClass } from '../styles'
import { isObject, isFunc, isString } from '../utils/is'
import Input from './Input'
import Caret from '../icons/Caret'

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
function Item({ renderResult, renderUnmatched, data, disabled, onClick, resultClassName, title = false }) {
  const value = data
  const click = disabled || !onClick ? undefined : () => onClick(value)
  const synDisabled = disabled || !click
  const content = getResultContent(data, renderResult, renderUnmatched)
  if (content === null) return null
  return (
    <a
      title={title && isString(content) ? content : null}
      tabIndex={-1}
      className={classnames(
        selectClass('item', disabled && 'disabled', synDisabled && 'ban'),
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
      more: false,
    }

    this.handleRemove = this.handleRemove.bind(this)
    this.handelMore = this.handelMore.bind(this)
  }

  componentDidUpdate() {
    const { result, compressed } = this.props
    if (compressed && result.length <= 1) this.state.more = false
  }

  handleRemove(...args) {
    const { onRemove } = this.props
    setTimeout(() => {
      onRemove(...args)
    }, 10)
  }

  isEmptyResult() {
    const { result, renderResult, renderUnmatched } = this.props
    if (result.length <= 0) return true
    const res = result.reduce((acc, cur) => {
      if (getResultContent(cur, renderResult, renderUnmatched)) {
        acc.push(cur)
      }
      return acc
    }, [])
    return res.length <= 0
  }

  handelMore(more) {
    this.setState({ more })
  }

  renderMore(list) {
    const { datum, renderResult, renderUnmatched, compressedClassName, resultClassName } = this.props
    const { more } = this.state
    const className = classnames(selectClass('popover'), compressedClassName)
    return (
      <a tabIndex={-1} key="more" className={selectClass('item', 'item-compressed', more && 'item-more')}>
        <span>{`+${list.length - 1}`}</span>
        <Popover visible={more} onVisibleChange={this.handelMore} className={className}>
          <div className={selectClass('result')}>
            {list.map((d, i) => (
              <Item
                key={i}
                data={d}
                disabled={datum.disabled(d)}
                onClick={this.handleRemove}
                renderResult={renderResult}
                renderUnmatched={renderUnmatched}
                resultClassName={resultClassName}
              />
            ))}
          </div>
        </Popover>
      </a>
    )
  }

  renderClear() {
    const { onClear, result, disabled } = this.props

    if (onClear && result.length > 0 && disabled !== true) {
      /* eslint-disable */
      return (
        <div onClick={onClear} className={selectClass('close-warpper')}>
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
    const { multiple, onFilter, trim, focus, onInputFocus, onInputBlur, setInputReset, focusSelected } = this.props
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
      />
    )
  }

  renderPlaceholder() {
    const { focus, onFilter } = this.props

    if (focus && onFilter) {
      return this.renderInput()
    }

    return (
      <span className={classnames(inputClass('placeholder'), selectClass('ellipsis'))}>
        <span>{this.props.placeholder}</span>
        &nbsp;
      </span>
    )
  }

  renderResult() {
    const {
      multiple,
      compressed,
      result,
      renderResult,
      renderUnmatched,
      onFilter,
      focus,
      datum,
      filterText,
      resultClassName,
    } = this.props

    if (multiple) {
      const neededResult = compressed ? result.slice(0, 1) : result
      const firstRemove = !compressed || result.length === 1
      const items = neededResult.map((d, i) => (
        <Item
          key={i}
          data={d}
          disabled={datum.disabled(d)}
          onClick={firstRemove ? this.handleRemove : undefined}
          renderResult={renderResult}
          renderUnmatched={renderUnmatched}
          resultClassName={resultClassName}
          title
        />
      ))

      if (compressed && result.length > 1) {
        items.push(this.renderMore(result))
      }

      if (focus && onFilter) {
        items.push(this.renderInput(filterText, result.length))
      }

      return items
    }

    if (onFilter) {
      return this.renderInput(getResultContent(result[0], renderResult, renderUnmatched))
    }

    const v = getResultContent(result[0], renderResult, renderUnmatched)
    const title = isString(v) ? v : undefined

    return (
      <span
        title={title}
        className={classnames(selectClass('ellipsis'), getResultClassName(resultClassName, result[0]))}
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
      <a tabIndex={-1} className={selectClass('indicator', multiple ? 'multi' : 'caret')}>
        {showCaret && <Caret />}
      </a>
    )
  }

  render() {
    const { compressed } = this.props
    const result = this.isEmptyResult() ? this.renderPlaceholder() : this.renderResult()

    return (
      <div className={selectClass('result', compressed && 'compressed')}>
        {result}
        {this.renderIndicator()}
        {this.renderClear()}
      </div>
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
  result: PropTypes.array.isRequired,
  renderResult: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  setInputReset: PropTypes.func,
  compressed: PropTypes.bool,
  trim: PropTypes.bool,
  renderUnmatched: PropTypes.func,
  showArrow: PropTypes.bool,
  focusSelected: PropTypes.bool,
  compressedClassName: PropTypes.string,
  resultClassName: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
}

export default Result
