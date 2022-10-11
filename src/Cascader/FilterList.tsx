import React from 'react'
import classnames from 'classnames'
import absoluteList from '../AnimationList/AbsoluteList'
import { Component } from '../component'
import { getFlattenTree } from '../utils/tree'
import { selectClass } from '../Select/styles'
import { cascaderClass } from './styles'
import Spin from '../Spin'
import { CascaderProps } from './interface'
import DatumTree from '../Datum/Tree'

interface FilterItemProps<U, T> {
  datum: DatumTree
  filterText: string
  data: CascaderProps<U, T>['data']
  onChange?: CascaderProps<U, T>['onChange']
  onFilter?: CascaderProps<U, T>['onFilter']
  renderItem?: CascaderProps<U, T>['renderItem']
  expandTrigger?: CascaderProps<U, T>['expandTrigger']
  onPathChange: (key: string, item: U, keys: string[], is: boolean) => void
}

interface FilterListProps<U, T> extends CascaderProps<U, T> {
  focus: boolean
  fixed: string
  datum: DatumTree
  filterText: string
  getRef: () => void
  onPathChange: (key: string, item: U, keys: string[], is: boolean) => void
  filterDataChange: (list: any) => void
}

class FilterItem<U, T extends string[]> extends Component<FilterItemProps<U, T>, {}> {
  constructor(props: FilterItemProps<U, T>) {
    super(props)
    this.handleSelect = this.handleSelect.bind(this)
    this.handleSelectItem = this.handleSelectItem.bind(this)
  }

  checkDisabled(data: U) {
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
    const keys = data!.slice(0, index + 1).map(i => datum.getKey(i)) as T
    if (onChange) onChange(keys)
    onPathChange(datum.getKey(item), item, keys.slice(0, keys.length - 1), true)
    if (onFilter && filterText) onFilter('')
  }

  handleSelect() {
    const { data } = this.props
    this.handleSelectItem(data!.length - 1)
  }

  renderItem(item: U) {
    const { renderItem } = this.props
    let render = renderItem
    if (typeof render === 'string') {
      const copyRender = render
      render = n => n[copyRender]
    }
    return (render as Function)(item)
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
class FilterList<U, T extends string[]> extends Component<FilterListProps<U, T>, {}> {
  getKey(path: U[]) {
    const { datum } = this.props
    return path.map(d => datum.getKey(d)).join('-')
  }

  getWideMatch<V>(list: V[][]) {
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
