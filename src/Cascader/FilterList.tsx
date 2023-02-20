import React, { ReactNode } from 'react'
import classnames from 'classnames'
import absoluteList from '../AnimationList/AbsoluteList'
import { Component } from '../component'
import { getFlattenTree } from '../utils/tree'
import { selectClass } from '../Select/styles'
import { cascaderClass } from './styles'
import Spin from '../Spin'
import { FilterItemProps, FilterListProps, CascaderBaseValue, FilterListType } from './Props'

class FilterItem<DataItem, T extends CascaderBaseValue> extends Component<FilterItemProps<DataItem, T>, {}> {
  constructor(props: FilterItemProps<DataItem, T>) {
    super(props)
    this.handleSelect = this.handleSelect.bind(this)
    this.handleSelectItem = this.handleSelectItem.bind(this)
  }

  checkDisabled(data: DataItem) {
    const { datum } = this.props
    const key = datum.getKey(data)
    return datum.isDisabled(key)
  }

  handleSelectItem(index: number, e?: MouseEvent) {
    const { data, datum, onChange, onPathChange, onFilter, filterText, expandTrigger } = this.props
    if (data && expandTrigger === 'hover-only' && index !== data.length - 1) return
    if (e) e.stopPropagation()
    const item = this.props.data![index]
    if (this.checkDisabled(item)) return
    const keys = data!.slice(0, index + 1).map((i: DataItem) => datum.getKey(i)) as T
    if (onChange) onChange(keys)
    onPathChange(datum.getKey(item), item, keys.slice(0, keys.length - 1) as T, true)
    if (onFilter && filterText) onFilter('')
  }

  handleSelect() {
    const { data } = this.props
    this.handleSelectItem(data!.length - 1)
  }

  renderItem(item: DataItem) {
    const { renderItem } = this.props
    let render = renderItem
    if (typeof render === 'string') {
      const copyRender = render
      render = n => (n[copyRender] as unknown) as ReactNode
    }
    return render(item)
  }

  render() {
    const { data } = this.props
    return (
      <div className={cascaderClass('node')} onClick={this.handleSelect}>
        {data!.map((item, i) => {
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
class FilterList<U, T extends CascaderBaseValue> extends Component<FilterListProps<U, T>, {}> {
  getKey(path: U[]) {
    const { datum } = this.props
    return path.map(d => datum.getKey(d)).join('-')
  }

  getWideMatch(list: U[][]) {
    const { filterDataChange } = this.props
    return list.filter(arr => arr.some(item => filterDataChange(item)))
  }

  renderList() {
    const { data, childrenKey, height, loading, wideMatch, ...others } = this.props
    let list = getFlattenTree(data!, childrenKey, wideMatch)

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
      placeholder,
      renderOptionList,
      loading,
      ...others
    } = this.props
    if (!focus) return null
    const list = this.renderList()
    return (
      <div
        {...others}
        ref={getRef}
        className={classnames(
          selectClass('options'),
          cascaderClass('filter', expandTrigger === 'hover-only' && 'leaf-only')
        )}
      >
        {renderOptionList ? renderOptionList(list, { loading: !!loading }) : list}
      </div>
    )
  }
}

// @ts-ignore
export default absoluteList(FilterList) as FilterListType
