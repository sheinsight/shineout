/**
 * cn - 筛选数据 - 内置
 *    -- onFilter 返回函数时，使用这个函数做前端过滤
 * en - Filter - built-in
 *    -- When the onFilter property returns a function, use this function to do front-end filtering.
 */
import React from 'react'
import PropTypes from 'prop-types'
import { Select } from 'shineout'

const data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']

const highlight = Component =>
  class extends React.Component {
    static propTypes = {
      onFilter: PropTypes.func,
      renderItem: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
      highlightStyle: PropTypes.object,
      beforeChange: PropTypes.func,
    }

    static defaultProps = {
      renderItem: d => d,
      highlightStyle: { color: '#FF4E50' },
    }

    constructor(props) {
      super(props)
      this.state = {
        filterText: undefined,
      }
      this.handlerFilter = this.handlerFilter.bind(this)
      this.renderItem = this.renderItem.bind(this)
      this.handleReset = this.handleReset.bind(this)
    }

    handlerFilter(text) {
      const { onFilter } = this.props
      this.setState({ filterText: text })
      return onFilter(text)
    }

    handleReset(...args) {
      const { beforeChange } = this.props
      if (beforeChange) beforeChange(...args)
      this.setState({ filterText: undefined })
    }

    renderItem(d, index) {
      const { renderItem, highlightStyle } = this.props
      const { filterText } = this.state
      const result = typeof renderItem === 'function' ? renderItem(d, index) : d[renderItem]
      if (!filterText) return result
      if (typeof result !== 'string') return result
      return result.split(filterText).map((item, i, arr) => {
        if (i === arr.length - 1) return <React.Fragment key={i}>{item}</React.Fragment>
        return (
          <React.Fragment key={i}>
            {item}
            <span style={highlightStyle}>{filterText}</span>
          </React.Fragment>
        )
      })
    }

    render() {
      const mp = {
        ...this.props,
        onFilter: this.props.onFilter ? this.handlerFilter : undefined,
        renderItem: this.renderItem,
        beforeChange: this.handleReset,
      }
      return <Component {...mp} />
    }
  }

const HighlightFilter = highlight(Select)

export default function() {
  return (
    <div>
      <HighlightFilter
        style={{ width: 240, marginBottom: 12 }}
        data={data}
        keygen
        placeholder="Select color"
        onFilter={text => d => d.indexOf(text) >= 0}
        renderResult={d => d}
      />
      <br />
      <HighlightFilter
        style={{ width: 300 }}
        multiple
        keygen
        data={data}
        placeholder="Select color"
        onFilter={text => d => d.indexOf(text) >= 0}
        renderResult={d => d}
      />
    </div>
  )
}
