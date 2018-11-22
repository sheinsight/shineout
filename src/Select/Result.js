import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { inputClass, selectClass } from '../styles'
import Input from './Input'

// eslint-disable-next-line
function Item({ renderResult, data, disabled, onClick }) {
  const click = disabled ? undefined : () => onClick(data)
  return (
    <a className={selectClass('item', disabled && 'disabled')} onClick={click}>
      {renderResult(data)}
      {!disabled && <span className={selectClass('indicator', 'close')} />}
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
    setTimeout(() => {
      onRemove(...args)
    }, 10)
  }

  renderClear() {
    const { onClear, result, disabled } = this.props

    if (onClear && result.length > 0 && !disabled) {
      /* eslint-disable */
      return (
        <a
          data-role="close"
          className={selectClass('indicator', 'close')}
          href="javascript:;"
          onClick={onClear}
        />
      )
      /* eslint-enable */
    }

    return null
  }

  renderInput(text, key = 'input') {
    const {
      multiple, onFilter, focus, onInputFocus, setInputReset,
    } = this.props
    return (
      <Input
        key={key}
        onInputFocus={onInputFocus}
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
      <span className={classnames(inputClass('placeholder'), selectClass('ellipsis'))}>
        {this.props.placeholder}&nbsp;
      </span>
    )
  }

  renderResult() {
    const {
      multiple, result, renderResult, onFilter, focus, datum,
    } = this.props

    if (multiple) {
      const items = result.map((d, i) => (
        <Item
          key={i}
          data={d}
          disabled={datum.disabled(d)}
          onClick={this.handleRemove}
          renderResult={renderResult}
        />
      ))

      if (focus && onFilter) {
        items.push(this.renderInput('', result.length))
      }

      return items
    }

    if (onFilter) {
      return this.renderInput(renderResult(result[0]))
    }

    return (
      <span className={selectClass('ellipsis')}>
        {renderResult(result[0])}
      </span>
    )
  }

  render() {
    const result = this.props.result.length === 0
      ? this.renderPlaceholder()
      : this.renderResult()

    return (
      <div className={selectClass('result')}>
        { result }
        {
          !this.props.multiple &&
          // eslint-disable-next-line
          <a className={selectClass('indicator', 'caret')} href="javascript:;" />
        }
        {this.renderClear()}
      </div>
    )
  }
}

Result.propTypes = {
  datum: PropTypes.object,
  disabled: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.func,
  ]),
  focus: PropTypes.bool,
  multiple: PropTypes.bool.isRequired,
  onRemove: PropTypes.func,
  onClear: PropTypes.func,
  onFilter: PropTypes.func,
  onInputFocus: PropTypes.func,
  result: PropTypes.array.isRequired,
  renderResult: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  setInputReset: PropTypes.func,
}

export default Result
