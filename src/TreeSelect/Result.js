import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { addResizeObserver } from '../utils/dom/element'
import { treeSelectClass } from './styles'
import { inputClass } from '../Input/styles'
import { inputTitleClass } from '../InputTitle/styles'
import { isEmpty, isObject, isNumber } from '../utils/is'
import Input from './Input'
import Caret from '../icons/Caret'
import More, { getResetMore } from '../Select/More'
import InputTitle from '../InputTitle'
import { getKey } from '../utils/uid'
import { getDirectionClass } from '../utils/classname'

export const IS_NOT_MATCHED_VALUE = 'IS_NOT_MATCHED_VALUE'

const getResultContent = (data, renderResult, renderUnmatched) => {
  if (isObject(data) && data.IS_NOT_MATCHED_VALUE) {
    if (typeof renderUnmatched === 'function') return renderUnmatched(data.value)
    return isObject(data.value) ? renderResult(data.value) : data.value
  }
  return renderResult(data)
}

// eslint-disable-next-line
function Item({ content, data, disabled, onClick, only }) {
  const value = data
  const click = disabled || !onClick ? undefined : () => onClick(value)
  const synDisabled = disabled || !click
  return (
    <a
      tabIndex={-1}
      className={treeSelectClass(
        getDirectionClass('item'),
        disabled && getDirectionClass('disabled'),
        synDisabled && getDirectionClass('ban'),
        only && 'item-only'
      )}
    >
      {content}
      {!synDisabled && <span className={treeSelectClass('indicator', 'close')} onClick={click} />}
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

  bindResult(el) {
    this.resultEl = el
  }

  updateMore(preProps) {
    const { result, compressed, onFilter, keygen, data } = this.props
    if (compressed) {
      if (this.isCompressedBound()) {
        return
      }
      let shouldRest = false
      if (preProps.result.length !== result.length || (data || []).length !== (preProps.data || []).length) {
        shouldRest = true
      } else if (preProps.result !== result) {
        let i = preProps.result.length - 1
        while (i >= 0) {
          const getUnMatchKey = (d, k) => (d && d.IS_NOT_MATCHED_VALUE ? d.value : getKey(d, k))
          const isSameData = (data1, data2, k) => getUnMatchKey(data1, k) === getUnMatchKey(data2, k)
          if (!isSameData(result[i], preProps.result[i], keygen)) {
            shouldRest = true
            break
          }
          i -= 1
        }
      }

      if (shouldRest) {
        this.resetMore()
      } else if (result.length && this.shouldResetMore) {
        this.shouldResetMore = false
        this.state.more = getResetMore(
          onFilter,
          this.resultEl,
          this.resultEl.querySelectorAll(`.${treeSelectClass('item')}`)
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
    onRemove(...args)
  }

  handelMore(more) {
    this.setState({ more })
  }

  isCompressedBound() {
    const { compressedBound } = this.props
    return compressedBound && isNumber(compressedBound) && compressedBound >= 1
  }

  renderClear() {
    const { onClear, result, disabled } = this.props
    if (onClear && result.length > 0 && disabled !== true) {
      /* eslint-disable */
      return (
        <div key="clear" onClick={onClear} className={treeSelectClass('close-warpper')}>
          <a
            tabIndex={-1}
            data-role="close"
            className={treeSelectClass('indicator', 'close')}
          />
        </div>
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

  renderItem(data, index) {
    const { renderResult, renderUnmatched, datum } = this.props
    const content = getResultContent(data, renderResult, renderUnmatched)
    if (content === null) return null
    const { more } = this.state

    return (
      <Item
        only={more === 1}
        key={index}
        content={content}
        data={data}
        disabled={datum.disabled(data)}
        onClick={this.handleRemove}
      />
    )
  }

  renderMore(items) {
    const { compressed } = this.props
    const more = this.getCompressedBound()
    return [
      <More
        key="more"
        className={treeSelectClass(getDirectionClass('item'), 'item-compressed')}
        popoverClassName={treeSelectClass('popover')}
        contentClassName={treeSelectClass(getDirectionClass('result'))}
        compressed={compressed}
        data={items}
        cls={treeSelectClass}
        showNum={more}
      />,
    ]
  }

  renderPlaceholder() {
    const { focus, onFilter, innerTitle } = this.props

    if (focus && onFilter) {
      return this.renderInput(' ')
    }

    return (
      <span
        className={classnames(
          inputClass('placeholder'),
          treeSelectClass('ellipsis'),
          innerTitle && inputTitleClass('hidable')
        )}
      >
        {this.props.placeholder}
        &nbsp;
      </span>
    )
  }

  renderResult() {
    const { multiple, compressed, result, renderResult, renderUnmatched, onFilter, focus, filterText } = this.props

    if (multiple) {
      let items = result.map((n, i) => this.renderItem(n, i)).filter(n => !isEmpty(n))

      if (compressed) {
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
    const showPlaceholder = this.props.result.length === 0
    const result = showPlaceholder ? this.renderPlaceholder() : this.renderResult()
    const { compressed, innerTitle, focus, onFilter } = this.props
    const open = (onFilter && focus) || !showPlaceholder
    return (
      <InputTitle
        innerTitle={innerTitle}
        open={open}
        className={treeSelectClass('title-box')}
        titleClass={treeSelectClass(getDirectionClass('title-box-title'))}
      >
        <div
          ref={this.bindResult}
          className={classnames(
            treeSelectClass(getDirectionClass('result'), compressed && 'compressed', showPlaceholder && 'empty'),
            innerTitle && inputTitleClass('item-scroll')
          )}
        >
          {result}
          {!this.props.multiple && (
            // eslint-disable-next-line
            <a tabIndex={-1} className={treeSelectClass('indicator', 'caret')}>
              {<Caret />}
            </a>
          )}
          {this.renderClear()}
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
  result: PropTypes.array.isRequired,
  renderResult: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  setInputReset: PropTypes.func,
  compressed: PropTypes.bool,
  compressedBound: PropTypes.number,
  renderUnmatched: PropTypes.func,
  innerTitle: PropTypes.node,
  keygen: PropTypes.any,
  data: PropTypes.array,
}

export default Result
