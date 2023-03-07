import React, { PureComponent } from 'react'
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
import { ResultProps } from './Props'
import { ResultItem, UnMatchedValue } from '../@types/common'

export const IS_NOT_MATCHED_VALUE = 'IS_NOT_MATCHED_VALUE'

const getResultContent = <Item, Value>(
  data: ResultItem<Item>,
  renderResult: ResultProps<Item, Value>['renderResult'],
  renderUnmatched: ResultProps<Item, Value>['renderUnmatched']
): React.ReactNode => {
  const unMatchedData: UnMatchedValue = data as UnMatchedValue

  if (isObject(unMatchedData) && unMatchedData.IS_NOT_MATCHED_VALUE) {
    if (typeof renderUnmatched === 'function') return renderUnmatched(unMatchedData.value)
    return isObject(unMatchedData.value)
      ? renderResult(unMatchedData.value as Item)
      : (unMatchedData.value as React.ReactNode)
  }
  return renderResult(data as Item)
}

// eslint-disable-next-line
function Item<Value>({
  content,
  data,
  disabled,
  onClick,
  only,
}: {
  content: React.ReactNode | string
  data: any
  disabled: boolean
  onClick: (value: Value) => void
  only: boolean
}) {
  const value = data
  const click = disabled || !onClick ? undefined : () => onClick(value as Value)
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

  bindResult(el: HTMLDivElement) {
    this.resultEl = el
  }

  updateMore(preProps: ResultProps<Item, Value>) {
    const { result, compressed, onFilter, keygen, data, datum } = this.props
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
          const getUnMatchKey = (d: ResultItem<Item>, k: ResultProps<Item, Value>['keygen']) => {
            const unMatchedData = d as UnMatchedValue

            return datum.isUnMatch(d) ? (d as UnMatchedValue).value : getKey(unMatchedData, k as any)
          }
          const isSameData = (
            data1: ResultItem<Item>,
            data2: ResultItem<Item>,
            k: ResultProps<Item, Value>['keygen']
          ) => getUnMatchKey(data1, k) === getUnMatchKey(data2, k)
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
        // @ts-ignore
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
    // @ts-ignore
    this.state.more = -1
    this.forceUpdate()
  }

  handleRemove(data: ResultItem<Item>) {
    const { onRemove } = this.props
    onRemove(data)
  }

  handelMore(more: number) {
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
          <a tabIndex={-1} data-role="close" className={treeSelectClass('indicator', 'close')} />
        </div>
      )
      /* eslint-enable */
    }

    return null
  }

  renderInput(text: React.ReactNode, key: string | number = 'input') {
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

  renderItem(data: ResultItem<Item>, index?: number) {
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
        disabled={datum.disabled(data as Item)}
        onClick={this.handleRemove}
      />
    )
  }

  renderMore(items: React.ReactNode[]) {
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

  renderPlaceholder(showPlaceholder?: boolean) {
    const { focus, onFilter, innerTitle } = this.props

    if (focus && onFilter && showPlaceholder) {
      return this.renderInput(' ')
    }

    return (
      <span
        style={showPlaceholder ? undefined : { display: 'none' }}
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
    const placeholder = this.renderPlaceholder(showPlaceholder)
    const result = showPlaceholder ? null : this.renderResult()
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
          {placeholder}
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

export default Result
