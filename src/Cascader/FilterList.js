import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import absoluteList from '../AnimationList/AbsoluteList'
import { Component } from '../component'
import { getFlattenTree } from '../utils/tree'
import { selectClass } from '../Select/styles'
import { cascaderClass } from './styles'
import Spin from '../Spin'

class FilterItem extends Component {
  static propTypes = {
    renderItem: PropTypes.func.isRequired,
    data: PropTypes.array,
    datum: PropTypes.any,
    onChange: PropTypes.func,
    onPathChange: PropTypes.func,
    filterText: PropTypes.string,
    onFilter: PropTypes.func,
    expandTrigger: PropTypes.string,
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
    const { data, datum, onChange, onPathChange, onFilter, filterText, expandTrigger } = this.props
    if (expandTrigger === 'hover-only' && index !== data.length - 1) return
    if (e) e.stopPropagation()
    const item = this.props.data[index]
    if (this.checkDisabled(item)) return
    const keys = data.slice(0, index + 1).map(i => datum.getKey(i))
    onChange(keys)
    onPathChange(datum.getKey(item), item, keys.slice(0, keys.length - 1), true)
    if (onFilter && filterText) onFilter('')
  }

  handleSelect() {
    const { data } = this.props
    this.handleSelectItem(data.length - 1)
  }

  renderItem(item) {
    const { renderItem } = this.props
    let render = renderItem
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
    expandTrigger: PropTypes.string,
    datum: PropTypes.any,
    onChange: PropTypes.func,
    onPathChange: PropTypes.func,
    filterText: PropTypes.string,
    onFilter: PropTypes.func,
    wideMatch: PropTypes.bool,
    height: PropTypes.number,
    filterDataChange: PropTypes.func,
    loading: PropTypes.oneOfType([PropTypes.bool, PropTypes.node]),
  }

  getKey(path) {
    const { datum } = this.props
    return path.map(d => datum.getKey(d)).join('-')
  }

  getWideMatch(list) {
    const { filterDataChange } = this.props
    return list.filter(arr => arr.some(item => filterDataChange(item)))
  }

  renderList() {
    const { data, childrenKey, height, loading, wideMatch, ...others } = this.props
    let list = getFlattenTree(data, childrenKey, wideMatch)

    if (wideMatch) {
      list = this.getWideMatch(list)
    }
    return (
      <div className={cascaderClass('filter-list')} style={{ maxHeight: height }}>
        {loading ? (
          <div className={cascaderClass('list-loading')}>
            {typeof loading === 'boolean' ? <Spin size={20} /> : loading}
          </div>
        ) : (
          list.map(path => <FilterItem key={this.getKey(path)} {...others} data={path} />)
        )}
      </div>
    )
  }

  render() {
    const {
      focus,
      getRef,
      fixed,
      data,
      childrenKey,
      renderItem,
      datum,
      expandTrigger,
      onChange,
      onPathChange,
      filterText,
      onFilter,
      wideMatch,
      height,
      filterDataChange,
      ...others
    } = this.props
    if (!focus) return null
    return (
      <div
        {...others}
        ref={getRef}
        className={classnames(
          selectClass('options'),
          cascaderClass('filter', expandTrigger === 'hover-only' && 'leaf-only')
        )}
      >
        {this.renderList()}
      </div>
    )
  }
}

export default absoluteList(FilterList)
