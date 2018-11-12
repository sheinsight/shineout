import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { inputClass, selectClass, cascaderClass } from '../styles'

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
    const {
      clearable, value, disabled, onClear,
    } = this.props
    const className = classnames(
      selectClass('indicator', 'close'),
      cascaderClass('close'),
    )

    if (clearable && value.length > 0 && !disabled) {
      /* eslint-disable */
      return (
        <a
          className={className}
          href="javascript:;"
          onClick={onClear}
        />
      )
      /* eslint-enable */
    }

    return null
  }

  renderPlaceholder() {
    return (
      <span className={classnames(inputClass('placeholder'), selectClass('ellipsis'))}>
        {this.props.placeholder}&nbsp;
      </span>
    )
  }

  renderResult() {
    const {
      datum, value, renderItem, renderResult,
    } = this.props
    const nodes = value.map(v => datum.getDataById(v))
    const render = renderResult || renderItem

    return nodes.map((n, i) => {
      const res = n && render(n)
      if (!res) return null
      return (
        <a
          className={cascaderClass('item')}
          onClick={this.handleNodeClick.bind(this, value[i])}
          key={i}
        >
          {res}
        </a>
      )
    })
  }

  render() {
    const { style, value } = this.props
    const result = value.length === 0
      ? this.renderPlaceholder()
      : this.renderResult()

    return (
      <div className={cascaderClass('result')} style={style}>
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
  clearable: PropTypes.bool,
  datum: PropTypes.object,
  disabled: PropTypes.bool,
  multiple: PropTypes.bool,
  onClear: PropTypes.func,
  onPathChange: PropTypes.func,
  placeholder: PropTypes.any,
  renderItem: PropTypes.func,
  renderResult: PropTypes.func,
  style: PropTypes.object,
  value: PropTypes.array,
}

Result.defaultProps = {
  value: [],
}

export default Result
