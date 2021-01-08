import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import absoluteList from '../AnimationList/AbsoluteList'
import { Component } from '../component'
import { getFlattenTree } from '../utils/tree'
import { cascaderClass, selectClass } from '../styles'

class FilterItem extends Component {
  static propTypes = {
    renderItem: PropTypes.func.isRequired,
    renderResult: PropTypes.func,
    data: PropTypes.array,
    datum: PropTypes.any,
    onChange: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.handleSelect = this.handleSelect.bind(this)
    this.handleSelectItem = this.handleSelectItem.bind(this)
  }

  checkDisabled(data) {
    const { datum } = this.props
    const key = datum.getKey(data)
    return datum.isDisabled(key)
  }

  handleSelectItem(index, e) {
    const { data, datum, onChange } = this.props
    if (e) e.stopPropagation()
    const item = this.props.data[index]
    if (this.checkDisabled(item)) return
    const keys = data.slice(0, index + 1).map(i => datum.getKey(i))
    onChange(keys)
    console.log(keys)
  }

  handleSelect() {
    const { data } = this.props
    this.handleSelectItem(data.length - 1)
  }

  renderItem(item) {
    const { renderItem, renderResult } = this.props
    let render = renderResult || renderItem
    if (typeof render === 'string') {
      const copyRender = render
      render = n => n[copyRender]
    }
    return render(item)
  }

  render() {
    const { data } = this.props
    return (
      <div className={cascaderClass('node')} onClick={this.handleSelect}>
        {data.map((item, i) => {
          const content = (
            <div
              onClick={this.handleSelectItem.bind(this, i)}
              key="content"
              className={cascaderClass('filter-list-content', this.checkDisabled(item) && 'disabled')}
            >
              {this.renderItem(item)}
            </div>
          )
          if (i === 0) return content
          return [
            <span key="separator" className={cascaderClass('filter-list-separator')}>
              /
            </span>,
            content,
          ]
        })}
      </div>
    )
  }
}

// eslint-disable-next-line react/no-multi-comp
class FilterList extends Component {
  static propTypes = {
    data: PropTypes.array,
    focus: PropTypes.bool,
    getRef: PropTypes.func,
    fixed: PropTypes.any,
    childrenKey: PropTypes.string,
    renderItem: PropTypes.any,
    renderResult: PropTypes.any,
    expandTrigger: PropTypes.string,
    datum: PropTypes.any,
    onChange: PropTypes.func,
  }

  getKey(path) {
    const { datum } = this.props
    return path.map(d => datum.getKey(d)).join('-')
  }

  renderList() {
    const { data, childrenKey, ...others } = this.props
    const list = getFlattenTree(data, childrenKey)
    return list.map(path => <FilterItem key={this.getKey(path)} {...others} data={path} />)
  }

  render() {
    const {
      focus,
      getRef,
      fixed,
      data,
      childrenKey,
      renderItem,
      renderResult,
      datum,
      expandTrigger,
      onChange,
      ...others
    } = this.props
    if (!focus) return null
    return (
      <div
        {...others}
        className={classnames(
          selectClass('options'),
          cascaderClass('filter-list', expandTrigger === 'hover-only' && 'leaf-only')
        )}
      >
        {this.renderList()}
      </div>
    )
  }
}

export default absoluteList(FilterList)
