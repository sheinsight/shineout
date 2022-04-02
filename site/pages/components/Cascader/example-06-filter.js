/**
 * cn - 筛选数据
 *    -- onFilter 可用于数据过滤，不返回结果时，可实现服务端过滤；返回函数时，用于前端过滤。
 *    -- 单选状态下筛选结果以列表展示，多选状态任保持树状结构展示。
 * en - Filter
 *    -- onFilter can be used for data filtering, for server-side filtering when no results are returned, and for front-end filtering when a function is returned.
 *    -- Support in single selection state
 */
import React from 'react'
import PropTypes from 'prop-types'
import { Cascader, Form } from 'shineout'

const data = [
  {
    value: 'jiangsu',
    children: [
      {
        value: 'nanjing',
        children: [
          {
            value: 'jiangning',
          },
          {
            value: 'gulou',
          },
        ],
      },
    ],
  },
  {
    value: 'anhui',
    children: [
      {
        value: 'hefei',
        children: [
          {
            value: 'feidong',
          },
        ],
      },
    ],
  },
]

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

const HighlightCascader = highlight(Cascader)
export default () => (
  <div>
    <Form.Item label="Single">
      <HighlightCascader
        onFilter={text => d => d.value.indexOf(text) >= 0}
        data={data}
        absolute
        keygen="value"
        renderItem={n => `${n.value}`}
        renderResult={d => d.value}
      />
    </Form.Item>

    <Form.Item label="Multiple">
      <HighlightCascader
        mode={1}
        onFilter={text => d => d.value.indexOf(text) >= 0}
        data={data}
        absolute
        keygen="value"
        renderItem={n => `${n.value}`}
        renderResult={d => d.value}
      />
    </Form.Item>
  </div>
)
