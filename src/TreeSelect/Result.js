import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { inputClass, treeSelectClass } from '../styles'
import { isEmpty, isObject } from '../utils/is'
import Input from './Input'
import Popover from '../Popover'
import Caret from '../icons/Caret'
import More from '../Select/More'

export const IS_NOT_MATCHED_VALUE = 'IS_NOT_MATCHED_VALUE'

const getResultContent = (data, renderResult, renderUnmatched) => {
  if (isObject(data) && data.IS_NOT_MATCHED_VALUE) {
    if (typeof renderUnmatched === 'function') return renderUnmatched(data.value)
    return isObject(data.value) ? renderResult(data.value) : data.value
  }
  return renderResult(data)
}

// eslint-disable-next-line
function Item({ content, data, disabled, onClick }) {
  const value = data
  const click = disabled || !onClick ? undefined : () => onClick(value)
  const synDisabled = disabled || !click
  return (
    <a tabIndex={-1} className={treeSelectClass('item', disabled && 'disabled', synDisabled && 'ban')}>
      {content}
      {!synDisabled && <span className={treeSelectClass('indicator', 'close')} onClick={click} />}
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
    onRemove(...args)
  }

  handelMore(more) {
    this.setState({ more })
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

  renderItem(data, useClose, index) {
    const { renderResult, renderUnmatched, datum } = this.props
    const content = getResultContent(data, renderResult, renderUnmatched)
    if (content === null) return null
    return (
      <Item
        key={index}
        content={content}
        data={data}
        disabled={datum.disabled(data)}
        onClick={useClose ? this.handleRemove : undefined}
      />
    )
  }

  renderMore(items) {
    const { compressed } = this.props
    const [firstItem, ...others] = items
    return [
      firstItem,
      <More
        key="more"
        className={treeSelectClass('item', 'item-compressed')}
        popoverClassName={treeSelectClass('popover')}
        contentClassName={treeSelectClass('result')}
        compressed={compressed}
        data={[React.cloneElement(firstItem, { onClick: this.handleRemove }), ...others]}
        cls={treeSelectClass}
      />,
    ]
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
    const { multiple, compressed, result, renderResult, renderUnmatched, onFilter, focus, filterText } = this.props

    if (multiple) {
      let items = result
        .map((n, i) => this.renderItem(n, (i === 0 && result.length <= 1) || !compressed || i > 0, i))
        .filter(n => !isEmpty(n))

      if (compressed && result.length > 1) {
        items = this.renderMore(items)
      }

      if (focus && onFilter) {
        items.push(this.renderInput(filterText, result.length))
      }

      return items
    }

    if (onFilter) {
      return this.renderInput(getResultContent(result[0], renderResult, renderUnmatched))
    }

    return (
      <span className={treeSelectClass('ellipsis')}>{getResultContent(result[0], renderResult, renderUnmatched)}</span>
    )
  }

  render() {
    const result = this.props.result.length === 0 ? this.renderPlaceholder() : this.renderResult()
    const { compressed } = this.props
    return (
      <div className={treeSelectClass('result', compressed && 'compressed')}>
        {result}
        {!this.props.multiple && (
          // eslint-disable-next-line
          <a tabIndex={-1} className={treeSelectClass('indicator', 'caret')}>
            {<Caret />}
          </a>
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
  renderUnmatched: PropTypes.func,
}

export default Result
