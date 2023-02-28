import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
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

// eslint-disable-next-line react/prop-types
function Item({ children, close, className, data, isPopover, singleRemove, click, only }) {
  const onClose = close
    ? e => {
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

class Result extends PureComponent {
  constructor(props) {
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

  componentDidUpdate(preProps) {
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

  bindResult(el) {
    this.resultEl = el
  }

  isCompressedBound() {
    const { compressedBound } = this.props
    return compressedBound && isNumber(compressedBound) && compressedBound >= 1
  }

  updateMore(preProps) {
    const { compressed, value = [], onFilter, data } = this.props
    if (compressed) {
      if (this.isCompressedBound()) return
      if ((preProps.value || []).join('') !== (value || []).join('')) {
        this.resetMore()
      } else if ((preProps.data || []).length !== (data || []).length) {
        this.resetMore()
      } else if (value.length && this.shouldResetMore) {
        this.shouldResetMore = false
        this.state.more = getResetMore(
          onFilter,
          this.resultEl,
          this.resultEl.querySelectorAll(`.${cascaderClass('item')}`)
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

  handleNodeClick(data, show = false) {
    const id = this.props.datum.getKey(data)
    const { path } = this.props.datum.getPath(id) || {}
    if (!path) return
    this.props.onPathChange(id, null, path)
    if (show) {
      this.props.showList()
    }
  }

  handleNode(nodes, render) {
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

  removeTargetNode(...args) {
    const [node, isPopover, event] = args
    if (isPopover) {
      event.stopPropagation()
    }
    const { handleRemove } = this.props
    handleRemove(node)
  }

  renderClear() {
    const { clearable, value, disabled, onClear } = this.props
    const className = classnames(selectClass('indicator', 'close'), cascaderClass(getDirectionClass('close')))

    if (clearable && value.length > 0 && !disabled) {
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

  renderItem({ index, render, data, raw, className, ...options }) {
    const { singleRemove } = this.props
    const res = data && render(data, raw)
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

  renderMore(list) {
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
    const { onFilter, focus, trim, focusSelected, bindInput, filterText } = this.props
    return (
      <Input
        filterText={filterText}
        ref={bindInput}
        trim={trim}
        key={`input.${focus ? 1 : 0}`}
        focus
        onFilter={onFilter}
        focusSelected={focusSelected}
      />
    )
  }

  renderPlaceholder(empty) {
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
    const { datum, value, renderItem, renderResult, compressed } = this.props
    const nodes = value.map(v => datum.getDataById(v))
    let render = renderResult || renderItem
    if (typeof render === 'string') {
      const copyRender = render
      render = n => n[copyRender]
    }

    let items = this.handleNode(nodes, render)

    if (compressed && items.length) {
      items = this.renderMore(items)
    }
    items.push(this.renderPlaceholder(items.length === 0))

    return items
  }

  render() {
    const { style, value, compressed, multiple, innerTitle, onFilter, focus } = this.props
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

Result.propTypes = {
  clearable: PropTypes.bool,
  datum: PropTypes.object,
  disabled: PropTypes.bool,
  multiple: PropTypes.bool,
  onClear: PropTypes.func,
  onPathChange: PropTypes.func,
  placeholder: PropTypes.any,
  renderItem: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  renderResult: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  style: PropTypes.object,
  value: PropTypes.array,
  compressed: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  compressedBound: PropTypes.number,
  focus: PropTypes.bool,
  onFilter: PropTypes.func,
  trim: PropTypes.bool,
  focusSelected: PropTypes.bool,
  bindInput: PropTypes.func,
  filterText: PropTypes.string,
  singleRemove: PropTypes.bool,
  handleRemove: PropTypes.func,
  selectId: PropTypes.string,
  showList: PropTypes.func,
  size: PropTypes.string,
  showArrow: PropTypes.bool,
  data: PropTypes.array,
  innerTitle: PropTypes.string,
}

Result.defaultProps = {
  value: [],
}

export default Result
