import React, { PureComponent, ReactNode } from 'react'
import classnames from 'classnames'
import { inputClass } from '../Input/styles'
import { selectClass } from '../Select/styles'
import { cascaderClass } from './styles'
import Input from './Input'
import icons from '../icons'
import More, { getResetMore } from '../Select/More'
import { addResizeObserver } from '../utils/dom/element'
import { isEmpty, isNumber } from '../utils/is'
import { CHANGE_TOPIC } from '../Datum/types'
import Caret from '../icons/Caret'
import { getDirectionClass } from '../utils/classname'
import InputTitle from '../InputTitle'
import { inputTitleClass } from '../InputTitle/styles'
import { ResultProps, ResultItemProps, CascaderBaseValue } from './Props'

function Item<DataItem>({
  children,
  close,
  className,
  data,
  isPopover,
  singleRemove,
  click,
  only,
}: ResultItemProps<DataItem>) {
  const onClose = close
    ? (e: any) => {
        close(data, isPopover, e)
      }
    : undefined
  const onClick = click
    ? () => {
        click(data, isPopover)
      }
    : undefined
  return (
    <a
      tabIndex={-1}
      className={classnames(cascaderClass(getDirectionClass('item'), only && 'item-only'), className)}
      onClick={onClick}
    >
      {children}
      {singleRemove && (
        <span className={cascaderClass(getDirectionClass('single-remove'))} onClick={onClose}>
          {icons.Close}
        </span>
      )}
    </a>
  )
}

interface ResultState {
  more: number
}

class Result<DataItem, Value extends CascaderBaseValue> extends PureComponent<
  ResultProps<DataItem, Value>,
  ResultState
> {
  static defaultProps = {
    value: [],
  }

  cancelResizeObserver: () => void

  resultEl: HTMLElement

  shouldResetMore: boolean

  constructor(props: ResultProps<DataItem, Value>) {
    super(props)
    this.state = {
      more: -1,
    }

    this.handleNodeClick = this.handleNodeClick.bind(this)
    this.renderItem = this.renderItem.bind(this)
    this.removeTargetNode = this.removeTargetNode.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
    this.bindResult = this.bindResult.bind(this)
    this.resetMore = this.resetMore.bind(this)
  }

  componentDidMount() {
    const { datum } = this.props
    datum.subscribe(CHANGE_TOPIC, this.handleUpdate)
    const { compressed } = this.props
    if (compressed && !this.isCompressedBound()) {
      this.cancelResizeObserver = addResizeObserver(this.resultEl, this.resetMore, { direction: 'x' })
    }
  }

  componentDidUpdate(preProps: ResultProps<DataItem, Value>) {
    this.updateMore(preProps)
  }

  componentWillUnmount() {
    const { datum } = this.props
    datum.unsubscribe(CHANGE_TOPIC, this.handleUpdate)
    if (this.cancelResizeObserver) this.cancelResizeObserver()
  }

  getCompressedBound() {
    const { compressedBound } = this.props
    if (this.isCompressedBound()) {
      return compressedBound
    }
    return this.state.more
  }

  handleUpdate() {
    this.forceUpdate()
  }

  bindResult(el: HTMLDivElement) {
    this.resultEl = el
  }

  isCompressedBound() {
    const { compressedBound } = this.props
    return compressedBound && isNumber(compressedBound) && compressedBound >= 1
  }

  updateMore(preProps: ResultProps<DataItem, Value>) {
    const { compressed, value = [], onFilter, data } = this.props
    if (compressed) {
      if (this.isCompressedBound()) return
      if ((preProps.value || []).join('') !== (value || []).join('')) {
        this.resetMore()
      } else if ((preProps.data || []).length !== (data || []).length) {
        this.resetMore()
      } else if (value.length && this.shouldResetMore) {
        this.shouldResetMore = false
        const more = getResetMore(onFilter, this.resultEl, this.resultEl.querySelectorAll(`.${cascaderClass('item')}`))
        this.setState({ more })
        this.forceUpdate()
      }
    }
  }

  resetMore() {
    if (!this.props.compressed) return
    this.shouldResetMore = true
    this.setState({ more: -1 })
    this.forceUpdate()
  }

  handleNodeClick(data: DataItem, show = false) {
    const id = this.props.datum.getKey(data)
    const { path } = this.props.datum.getPath(id) || {}
    if (!path) return
    this.props.onPathChange(id, null, path as Value)
    if (show) {
      this.props.showList()
    }
  }

  handleNode(nodes: any[], render: (data: DataItem, row: DataItem[]) => ReactNode) {
    const { singleRemove } = this.props

    const removeContainerClassName = cascaderClass(singleRemove && getDirectionClass('remove-container'))

    return nodes
      .map((n, i) =>
        this.renderItem({
          className: removeContainerClassName,
          index: i,
          data: n,
          raw: nodes,
          render,
        })
      )
      .filter(n => !isEmpty(n))
  }

  removeTargetNode(node: DataItem, isPopover: boolean, event: Event) {
    if (isPopover) {
      event.stopPropagation()
    }
    const { handleRemove } = this.props
    handleRemove(node)
  }

  renderClear() {
    const { clearable, value = [], onClear } = this.props
    const className = classnames(selectClass('indicator', 'close'), cascaderClass(getDirectionClass('close')))

    if (clearable && value.length > 0) {
      /* eslint-disable */
      return (
        <a
          tabIndex={-1}
          className={className}
          onClick={onClear}
        />
      )
      /* eslint-enable */
    }

    return null
  }

  renderItem({
    index,
    render,
    data,
    raw,
    className,
    ...options
  }: {
    index: number
    render: (_data: DataItem, row: DataItem[]) => ReactNode
    data: DataItem
    raw: DataItem[]
    className: string
  }) {
    const { singleRemove, datum, renderUnmatched } = this.props
    let res
    if (datum.isUnMatch(data)) {
      if (renderUnmatched) {
        res = renderUnmatched(data.value)
      } else {
        res = typeof data.value === 'string' ? data.value : null
      }
    } else {
      res = data && render(data, raw)
    }

    if (!res) return null
    const more = this.getCompressedBound()
    return (
      <Item
        key={index}
        only={more === 1}
        {...options}
        data={data}
        className={className}
        singleRemove={singleRemove}
        close={this.removeTargetNode}
        isPopover
        click={this.handleNodeClick}
      >
        {res}
      </Item>
    )
  }

  renderMore(list: ReactNode[]) {
    const { selectId, size, compressed } = this.props
    const more = this.getCompressedBound()
    return [
      <More
        key="more"
        data={list}
        className={cascaderClass(getDirectionClass('item'), 'item-compressed')}
        popoverClassName={cascaderClass('popover')}
        contentClassName={cascaderClass('result', size)}
        dataId={selectId}
        showNum={more}
        compressed={compressed}
      />,
    ]
  }

  renderInput() {
    const { onFilter, focus, trim, bindInput, filterText } = this.props
    return (
      <Input
        filterText={filterText}
        ref={bindInput}
        trim={!!trim}
        key={`input.${focus ? 1 : 0}`}
        focus
        onFilter={onFilter!}
      />
    )
  }

  renderPlaceholder(empty?: boolean) {
    const { focus, onFilter, innerTitle } = this.props
    if (focus && onFilter) {
      return this.renderInput()
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
        {this.props.placeholder}
        &nbsp;
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

  renderResult() {
    const { datum, value = [], renderItem, renderResult, compressed } = this.props
    const nodes = value.map(v => datum.getDataById(v))
    let render = renderResult || renderItem
    if (typeof render === 'string') {
      const copyRender = render
      render = (n: DataItem) => (n[copyRender] as unknown) as ReactNode
    }
    let items = this.handleNode(nodes, render as (d: DataItem, row: DataItem[]) => ReactNode)

    if (compressed && items.length) {
      items = this.renderMore(items)
    }
    items.push(this.renderPlaceholder(items.length === 0))

    return items
  }

  render() {
    const { style, value = [], compressed, multiple, innerTitle, onFilter, focus } = this.props
    const empty = value.length === 0
    const result = this.renderResult()
    const clearEl = this.renderClear()
    const shouldCompressed = multiple && compressed
    return (
      <InputTitle
        className={cascaderClass('title-box')}
        titleClass={cascaderClass(
          getDirectionClass('title-box-title'),
          shouldCompressed && 'title-box-title-compressed'
        )}
        innerTitle={innerTitle}
        open={!empty || (onFilter && focus)}
      >
        <div
          ref={this.bindResult}
          className={classnames(
            cascaderClass(getDirectionClass('result'), shouldCompressed && 'compressed', clearEl && 'result-clearable'),
            innerTitle && inputTitleClass('item-scroll')
          )}
          style={style}
        >
          {result}
          {this.renderIndicator()}
          {clearEl}
        </div>
      </InputTitle>
    )
  }
}

export default Result
