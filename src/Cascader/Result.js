import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { inputClass, selectClass, cascaderClass } from '../styles'
import Input from './Input'
import icons from '../icons'
import Popover from '../Popover'

class Result extends Component {
  constructor(props) {
    super(props)

    this.state = {
      more: false,
    }

    this.handleNodeClick = this.handleNodeClick.bind(this)
    this.handelMore = this.handelMore.bind(this)
  }

  componentDidUpdate() {
    const { compressed, value } = this.props
    if (compressed && value.length <= 1) this.state.more = false
  }

  handleNodeClick(id, show = false) {
    const { path } = this.props.datum.getPath(id)
    this.props.onPathChange(id, null, path)
    if (show) {
      this.props.showList()
    }
  }

  handelMore(more) {
    this.setState({ more })
  }

  removeTargetNode(node) {
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

  renderMore(list, render) {
    const { more } = this.state
    const { singleRemove, value, selectId, size } = this.props
    const removeContainerClassName = cascaderClass(singleRemove && 'remove-container')
    return (
      <a tabIndex={-1} key={list.length} className={cascaderClass('item', 'item-compressed')}>
        <span>{`+${list.length - 1}`}</span>
        <Popover visible={more} onVisibleChange={this.handelMore} className={cascaderClass('popover')}>
          <div className={cascaderClass('result', size)} data-id={selectId}>
            {list.map((d, i) => {
              const res = d && render(d, list)
              if (!res) return null
              return (
                <a
                  tabIndex={-1}
                  className={classnames(cascaderClass('item'), removeContainerClassName)}
                  onClick={this.handleNodeClick.bind(this, value[i], true)}
                  key={i}
                >
                  {res}
                  {this.renderClose(d)}
                </a>
              )
            })}
          </div>
        </Popover>
      </a>
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

  renderClose(node) {
    const { singleRemove } = this.props
    if (!singleRemove) return null
    return (
      <span className={cascaderClass('single-remove')} onClick={this.removeTargetNode.bind(this, node)}>
        {icons.Close}
      </span>
    )
  }

  renderResult() {
    const { datum, value, renderItem, renderResult, compressed, focus, onFilter, singleRemove } = this.props
    const nodes = value.map(v => datum.getDataById(v))
    let render = renderResult || renderItem
    if (typeof render === 'string') {
      const copyRender = render
      render = n => n[copyRender]
    }

    const removeContainerClassName = cascaderClass(singleRemove && 'remove-container')

    const neededResult = compressed ? nodes.slice(0, 1) : nodes
    const items = neededResult.map((n, i) => {
      const res = n && render(n, nodes)
      if (!res) return null
      return (
        <a
          tabIndex={-1}
          className={classnames(cascaderClass('item'), removeContainerClassName)}
          onClick={this.handleNodeClick.bind(this, value[i])}
          key={i}
        >
          {res}
          {this.renderClose(n)}
        </a>
      )
    })

    if (compressed && nodes.length > 1) {
      items.push(this.renderMore(nodes, render, value))
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
  compressed: PropTypes.bool,
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
