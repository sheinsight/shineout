import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { inputClass, selectClass, cascaderClass } from '../styles'
import Input from './Input'

class Result extends PureComponent {
  constructor(props) {
    super(props)

    this.handleNodeClick = this.handleNodeClick.bind(this)
  }

  handleNodeClick(id) {
    const { path } = this.props.datum.getPath(id)
    this.props.onPathChange(id, null, path)
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

    const neededResult = compressed ? nodes.slice(0, 1) : nodes
    const items = neededResult.map((n, i) => {
      const res = n && render(n, nodes)
      if (!res) return null
      return (
        <a tabIndex={-1} className={cascaderClass('item')} onClick={this.handleNodeClick.bind(this, value[i])} key={i}>
          {res}
        </a>
      )
    })

    if (compressed && nodes.length > 1) {
      items.push(
        <a tabIndex={-1} key={items.length} className={cascaderClass('item', 'item-compressed')}>
          <span>{`+${nodes.length - 1}`}</span>
        </a>
      )
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
}

Result.defaultProps = {
  value: [],
}

export default Result
