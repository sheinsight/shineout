import React, { Component, isValidElement } from 'react'
import classnames from 'classnames'
import { getLocale } from '../locale'
import LazyList from '../AnimationList/LazyList'
import { listClass } from './styles'
import Datum from '../Datum/List'
import { isFunc, isArray, isString } from '../utils/is'
import { getKey } from '../utils/uid'
import { removeStack, addStack } from '../utils/lazyload'
import Spin from '../Spin'
import getDataset from '../utils/dom/getDataset'
import Checkbox from '../Table/Checkbox'
import { isRTL } from '../config'

import { ListProps ,ListBaseItemProps} from './interface'

interface DataListProps<U, T> extends ListProps<U, T>, ListBaseItemProps {
  datum: Datum<U, T>
  height: number
}

const DefaultProps = {
  colNum: 1,
  loading: false,
  size: 'default',
}

type Props<U, T> = DataListProps<U, T> & Required<Pick<DataListProps<U, T>, keyof typeof DefaultProps>>

class Index<U, T> extends Component<Props<U, T>> {
  static defaultProps = DefaultProps

  id: string | null

  node: HTMLDivElement | null

  observer: HTMLDivElement | null

  static displayName: string

  constructor(props: Props<U, T>) {
    super(props)

    this.bindNode = this.bindNode.bind(this)
    this.bindObserver = this.bindObserver.bind(this)
    this.scrollLoading = this.scrollLoading.bind(this)
    this.renderItem = this.renderItem.bind(this)

    this.id = null
  }

  componentWillUnmount() {
    removeStack(this.id!, true)
    this.node = null
    this.observer = null
    this.id = null
  }

  getItemClassName(value: U, index: number, flag?: boolean) {
    const { rowClassName } = this.props
    const base = listClass('item', flag && 'checkbox')
    if (isFunc(rowClassName) && rowClassName) return classnames(base, rowClassName(value, index))
    if (isString(rowClassName)) return classnames(base, rowClassName)
    return base
  }

  getContent(value: U, index: number) {
    const { renderItem } = this.props
    if (renderItem && typeof renderItem === 'function') return renderItem(value, index)
    if (isString(renderItem)) return value[renderItem as keyof U]
    if (isString(value)) return value
    return null
  }

  scrollLoading() {
    const { scrollLoading } = this.props
    if (!isFunc(scrollLoading)) return
    if (scrollLoading) scrollLoading()
  }

  bindNode(node: HTMLDivElement) {
    this.node = node
  }

  bindObserver(node: HTMLDivElement) {
    this.observer = node
    if (!node) return

    removeStack(this.id!, true)
    this.id = addStack({
      container: this.node,
      element: node,
      render: this.scrollLoading,
      offset: 20,
      noRemove: true,
    })
  }

  renderCheckBox(flag: boolean, data: U, index: number) {
    if (!flag) return null
    const { datum } = this.props
    return <Checkbox data={data} index={index} datum={datum} force={datum.check(data)} />
  }

  renderItem(value: U, index: number) {
    const { keygen, onChange } = this.props
    const haveRowSelected = isFunc(onChange)
    return (
      <div
        className={this.getItemClassName(value, index, haveRowSelected)}
        key={getKey(value, keygen, index) as React.Key}
      >
        {this.renderCheckBox(haveRowSelected, value, index)}
        {this.getContent(value, index)}
      </div>
    )
  }

  renderList(isEmpty: boolean) {
    const { data, empty, keygen, fixed, rowsInView, lineHeight, value, colNum } = this.props

    if (isEmpty) return <div className={listClass('item', 'empty')}>{empty || getLocale('noData')}</div>

    if (!fixed) {
      const items = data!.map(this.renderItem)
      if (colNum && colNum > 1) {
        const frs = Array(colNum)
          .fill('1fr')
          .join(' ')
        return <div style={{ display: 'grid', gridTemplateColumns: frs }}>{items}</div>
      }
      return items
    }
    return (
      <LazyList
        lineHeight={lineHeight}
        data={data}
        keygen={keygen}
        renderItem={this.renderItem}
        itemsInView={rowsInView}
        force={value}
        colNum={colNum}
      />
    )
  }

  renderFooter() {
    const { footer } = this.props
    if (footer && typeof footer === 'function') return <div className={listClass('footer')}>{footer()}</div>
    if (isValidElement(footer)) return <div className={listClass('footer')}>{footer}</div>
    return null
  }

  render() {
    const { data, loading, style, size, bordered, fixed, height, scrollLoading } = this.props
    const isEmpty = !isArray(data) || data.length <= 0
    const ms = Object.assign({}, style, height && { height })
    return (
      <div
        className={classnames(
          listClass('container', size, bordered && 'bordered', fixed && 'fixed', isRTL() && 'rtl'),
          this.props.className
        )}
        style={ms}
        ref={this.bindNode}
        {...getDataset(this.props) as {}}
      >
        {loading && (
          <div className={listClass('loading')}>{typeof loading === 'boolean' ? <Spin size={40} /> : loading}</div>
        )}
        <div className={listClass('list', isEmpty && 'empty')}>{this.renderList(isEmpty)}</div>
        {!isEmpty && isFunc(scrollLoading) && <div ref={this.bindObserver} />}
        {this.renderFooter()}
      </div>
    )
  }
}

Index.displayName = 'ShineoutList'

export default Index
