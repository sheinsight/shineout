import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { inputClass, treeSelectClass } from '../styles'
import { isObject } from '../utils/is'
import Input from './Input'

export const IS_NOT_MATCHED_VALUE = 'IS_NOT_MATCHED_VALUE'

const getResultContent = (data, renderResult) => {
  if (isObject(data) && data.IS_NOT_MATCHED_VALUE) {
    return isObject(data.value) ? renderResult(data.value) : data.value
  }
  return renderResult(data)
}

// eslint-disable-next-line
function Item({ renderResult, data, disabled, onClick }) {
  const value = data
  const click = disabled || !onClick ? undefined : () => onClick(value)
  const synDisabled = disabled || !click
  return (
    <a tabIndex={-1} className={treeSelectClass('item', disabled && 'disabled')}>
      {getResultContent(data, renderResult)}
      {!synDisabled && <span className={treeSelectClass('indicator', 'close')} onClick={click} />}
    </a>
  )
}

class Result extends PureComponent {
  constructor(props) {
    super(props)
    this.handleRemove = this.handleRemove.bind(this)
  }

  handleRemove(...args) {
    const { onRemove } = this.props
    onRemove(...args)
  }

  renderClear() {
    const { onClear, result, disabled } = this.props
    if (onClear && result.length > 0 && disabled !== true) {
      /* eslint-disable */
      return (
        <a
          tabIndex={-1}
          data-role="close"
          className={treeSelectClass('indicator', 'close')}
          href="javascript:;"
          onClick={onClear}
        />
      )
      /* eslint-enable */
    }

    return null
  }

  renderInput(text, key = 'input') {
    const { multiple, onFilter, focus, setInputReset } = this.props
    return (
      <Input
        key={`${key}.${focus ? 1 : 0}`}
        updatAble={!multiple}
        multiple={multiple}
        focus={focus}
        text={text}
        onFilter={onFilter}
        setInputReset={setInputReset}
      />
    )
  }

  renderPlaceholder() {
    const { focus, onFilter } = this.props

    if (focus && onFilter) {
      return this.renderInput(' ')
    }

    return (
      <span className={classnames(inputClass('placeholder'), treeSelectClass('ellipsis'))}>
        {this.props.placeholder}
        &nbsp;
      </span>
    )
  }

  renderResult() {
    const { multiple, compressed, result, renderResult, onFilter, focus, datum, filterText } = this.props

    if (multiple) {
      const neededResult = compressed ? result.slice(0, 1) : result
      const items = neededResult.map((d, i) => (
        <Item
          key={i}
          data={d}
          disabled={datum.disabled(d)}
          onClick={compressed ? undefined : this.handleRemove}
          renderResult={renderResult}
        />
      ))

      if (compressed && result.length > 1) {
        items.push(
          <a tabIndex={-1} key={result.length} className={treeSelectClass('item', 'item-compressed')}>
            <span>{`+${result.length - 1}`}</span>
          </a>
        )
      }

      if (focus && onFilter) {
        items.push(this.renderInput(filterText, result.length))
      }

      return items
    }

    if (onFilter) {
      return this.renderInput(getResultContent(result[0], renderResult))
    }

    return <span className={treeSelectClass('ellipsis')}>{getResultContent(result[0], renderResult)}</span>
  }

  render() {
    const result = this.props.result.length === 0 ? this.renderPlaceholder() : this.renderResult()
    const { compressed } = this.props

    return (
      <div className={treeSelectClass('result', compressed && 'compressed')}>
        {result}
        {!this.props.multiple && (
          // eslint-disable-next-line
          <a tabIndex={-1} className={treeSelectClass('indicator', 'caret')} href="javascript:;" />
        )}
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
  result: PropTypes.array.isRequired,
  renderResult: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  setInputReset: PropTypes.func,
  compressed: PropTypes.bool,
}

export default Result
