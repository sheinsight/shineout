import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { inputClass, selectClass } from '../styles'
import Input from './Input'

// eslint-disable-next-line
function Item({ renderResult, data, onClick }) {
  return (
    <a className={selectClass('item')} onClick={() => onClick(data)}>
      {renderResult(data)}
      <span className={selectClass('indicator', 'close')} />
    </a>
  )
}

class Result extends PureComponent {
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

  renderInput(text) {
    const { onFilter } = this.props
    return <Input placeholder={text} onFilter={onFilter} />
  }

  renderPlaceholder() {
    const { focus, onFilter } = this.props

    if (focus && onFilter) {
      return this.renderInput(' ')
    }

    return (
      <span className={inputClass('placeholder')}>
        {this.props.placeholder}&nbsp;
      </span>
    )
  }

  renderResult() {
    const {
      multiple, result, renderResult, onRemove, focus, onFilter,
    } = this.props

    if (multiple) {
      const items = result.map((d, i) => (
        <Item key={i} data={d} onClick={onRemove} renderResult={renderResult} />
      ))

      return items
    }

    if (focus && onFilter) {
      return this.renderInput(result[0])
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
  disabled: PropTypes.bool,
  focus: PropTypes.bool,
  multiple: PropTypes.bool.isRequired,
  onRemove: PropTypes.func,
  onClear: PropTypes.func,
  onFilter: PropTypes.func,
  result: PropTypes.array.isRequired,
  renderResult: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
}

export default Result
