import React, { Component, isValidElement } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { getLocale } from '../locale'
import LazyList from '../AnimationList/LazyList'
import { listClass } from './styles'
import { isFunc, isArray, isString } from '../utils/is'
import { getKey } from '../utils/uid'
import { removeStack, addStack } from '../utils/lazyload'
import Spin from '../Spin'
import getDataset from '../utils/dom/getDataset'
import Checkbox from '../Table/Checkbox'
import { isRTL } from '../config'

class Index extends Component {
  constructor(props) {
    super(props)

    this.bindNode = this.bindNode.bind(this)
    this.bindObserver = this.bindObserver.bind(this)
    this.scrollLoading = this.scrollLoading.bind(this)
    this.renderItem = this.renderItem.bind(this)

    this.id = null
  }

  componentWillUnmount() {
    removeStack(this.id, true)
    this.node = null
    this.observer = null
    this.id = null
  }

  getItemClassName(value, index, flag, isLast) {
    const { rowClassName } = this.props
    const base = listClass('item', flag && 'checkbox', isLast && 'item-last')
    if (isFunc(rowClassName)) return classnames(base, rowClassName(value, index))
    if (isString(rowClassName)) return classnames(base, rowClassName)
    return base
  }

  getContent(value, index) {
    const { renderItem } = this.props
    if (isFunc(renderItem)) return renderItem(value, index)
    if (isString(renderItem)) return value[renderItem]
    if (isString(value)) return value
    return null
  }

  scrollLoading() {
    const { scrollLoading } = this.props
    if (!isFunc(scrollLoading)) return
    scrollLoading()
  }

  bindNode(node) {
    this.node = node
  }

  bindObserver(node) {
    this.observer = node
    if (!node) return

    removeStack(this.id, true)
    this.id = addStack({
      container: this.node,
      element: node,
      render: this.scrollLoading,
      offset: 20,
      noRemove: true,
    })
  }

  renderCheckBox(flag, data, index) {
    if (!flag) return null
    const { datum } = this.props
    return <Checkbox data={data} index={index} datum={datum} force={datum.check(data)} />
  }

  renderItem(value, index) {
    const { keygen, onChange, data, colNum } = this.props
    const haveRowSelected = isFunc(onChange)

    const content = this.getContent(value, index)
    const lastColStart = data.length - (data.length % colNum || colNum)
    const isLast = index >= lastColStart
    return (
      <div className={this.getItemClassName(value, index, haveRowSelected, isLast)} key={getKey(value, keygen, index)}>
        {this.renderCheckBox(haveRowSelected, value, index)}
        {haveRowSelected ? <div className={listClass('item-meta')}>{content}</div> : content}
      </div>
    )
  }

  renderList(isEmpty) {
    const { data, empty, keygen, fixed, rowsInView, lineHeight, value, colNum } = this.props

    if (isEmpty) return <div className={listClass('item', 'empty')}>{empty || getLocale('noData')}</div>

    if (!fixed) {
      const items = data.map(this.renderItem)
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
    if (isFunc(footer)) return <div className={listClass('footer')}>{footer()}</div>
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
        {...getDataset(this.props)}
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

Index.propTypes = {
  onChange: PropTypes.func,
  className: PropTypes.string,
  data: PropTypes.array,
  renderItem: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  footer: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  datum: PropTypes.object.isRequired,
  keygen: PropTypes.oneOfType([PropTypes.func, PropTypes.string, PropTypes.bool]).isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  format: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  loading: PropTypes.oneOfType([PropTypes.bool, PropTypes.node]),
  style: PropTypes.object,
  scrollLoading: PropTypes.func,
  rowClassName: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  size: PropTypes.oneOf(['default', 'small', 'large']),
  bordered: PropTypes.bool,
  empty: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  fixed: PropTypes.bool,
  rowsInView: PropTypes.number,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  lineHeight: PropTypes.number,
  value: PropTypes.array,
  colNum: PropTypes.number,
}

Index.defaultProps = {
  size: 'default',
  loading: false,
  colNum: 1,
}

Index.displayName = 'ShineoutList'

export default Index
