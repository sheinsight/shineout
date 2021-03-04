import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { inputClass, selectClass, cascaderClass } from '../styles'
import Input from './Input'
import icons from '../icons'
import More from '../Select/More'
import { isEmpty } from '../utils/is'

// eslint-disable-next-line react/prop-types
function Item({ children, close, className, data, isPopover, singleRemove, click }) {
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
    <a tabIndex={-1} className={classnames(cascaderClass('item'), className)} onClick={onClick}>
      {children}
      {singleRemove && (
        <span className={cascaderClass('single-remove')} onClick={onClose}>
          {icons.Close}
        </span>
      )}
    </a>
  )
}

class Result extends PureComponent {
  constructor(props) {
    super(props)

    this.handleNodeClick = this.handleNodeClick.bind(this)
    this.renderItem = this.renderItem.bind(this)
    this.removeTargetNode = this.removeTargetNode.bind(this)
  }

  handleNodeClick(data, show = false) {
    const id = this.props.datum.getKey(data)
    const { path } = this.props.datum.getPath(id)
    this.props.onPathChange(id, null, path)
    if (show) {
      this.props.showList()
    }
  }

  handleNode(nodes, render) {
    const { compressed, singleRemove, value, datum } = this.props

    const neededResult = compressed ? nodes.slice(0, 1) : nodes

    const removeContainerClassName = cascaderClass(singleRemove && 'remove-container')

    const items = neededResult
      .map((n, i) =>
        this.renderItem({
          className: removeContainerClassName,
          index: i,
          data: n,
          raw: value.map(v => datum.getDataById(v)),
          render,
        })
      )
      .filter(n => !isEmpty(n))

    if (items.length > 0) {
      return items
    }
    nodes.shift()
    return this.handleNode(nodes, render)
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
    const className = classnames(selectClass('indicator', 'close'), cascaderClass('close'))

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
    const itemClassName = classnames(className, cascaderClass(singleRemove && 'remove-container'))
    const res = data && render(data, raw)
    if (!res) return null
    return (
      <Item
        key={index}
        {...options}
        data={data}
        className={itemClassName}
        singleRemove={singleRemove}
        close={this.removeTargetNode}
        isPopover
        click={this.handleNodeClick}
      >
        {res}
      </Item>
    )
  }

  renderMore(list, render) {
    const { selectId, size, compressed, value, datum } = this.props
    return (
      <More
        key="more"
        data={list}
        className={cascaderClass('item', 'item-compressed')}
        popoverClassName={cascaderClass('popover')}
        contentClassName={cascaderClass('result', size)}
        renderItem={this.renderItem}
        dataId={selectId}
        render={render}
        close={this.removeTargetNode}
        compressed={compressed}
        raw={value.map(v => datum.getDataById(v))}
      />
    )
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

  renderPlaceholder() {
    const { focus, onFilter } = this.props
    if (focus && onFilter) {
      return this.renderInput()
    }
    return (
      <span key="placeholder" className={classnames(inputClass('placeholder'), selectClass('ellipsis'))}>
        {this.props.placeholder}
        &nbsp;
      </span>
    )
  }

  renderResult() {
    const { datum, value, renderItem, renderResult, compressed, focus, onFilter } = this.props
    const nodes = value.map(v => datum.getDataById(v))
    let render = renderResult || renderItem
    if (typeof render === 'string') {
      const copyRender = render
      render = n => n[copyRender]
    }

    const items = this.handleNode(nodes, render)

    if (compressed && nodes.length > 1) {
      items.push(this.renderMore(nodes, render))
    }

    if (items.filter(v => v).length === 0) {
      items.push(this.renderPlaceholder())
    } else if (focus && onFilter) {
      items.push(this.renderInput())
    }

    return items
  }

  render() {
    const { style, value } = this.props
    const result = value.length === 0 ? this.renderPlaceholder() : this.renderResult()

    return (
      <div className={cascaderClass('result')} style={style}>
        {result}
        {!this.props.multiple && (
          // eslint-disable-next-line
          <a tabIndex={-1} className={selectClass('indicator', 'caret')} />
        )}
        {this.renderClear()}
      </div>
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
}

Result.defaultProps = {
  value: [],
}

export default Result
