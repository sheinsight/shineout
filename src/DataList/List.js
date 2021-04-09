import React, { Component, isValidElement } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { getLocale } from '../locale'
import LazyList from '../AnimationList/LazyList'
import { listClass } from '../styles'
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
    removeStack(this.id)
    this.node = null
    this.observer = null
    this.id = null
  }

  getItemClassName(value, index, flag) {
    const { rowClassName } = this.props
    const base = listClass('item', flag && 'checkbox')
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

    removeStack(this.id)
    this.id = addStack({
      container: this.node,
      element: node,
      render: this.scrollLoading,
      offset: 20,
    })
  }

  renderCheckBox(flag, data, index) {
    if (!flag) return null
    const { datum } = this.props
    return <Checkbox data={data} index={index} datum={datum} />
  }

  renderItem(value, index) {
    const { keygen, data, onChange } = this.props
    const { length } = data
    const haveRowSelected = isFunc(onChange)
    return (
      <div
        className={this.getItemClassName(value, index, haveRowSelected)}
        key={getKey(value, keygen, index)}
        ref={index === length - 1 ? this.bindObserver : null}
      >
        {this.renderCheckBox(haveRowSelected, value, index)}
        {this.getContent(value, index)}
      </div>
    )
  }

  renderList(isEmpty) {
    const { data, empty, keygen, fixed, rowsInView, lineHeight } = this.props

    if (isEmpty) return <div className={listClass('item', 'empty')}>{empty || getLocale('noData')}</div>

    if (!fixed) return data.map(this.renderItem)
    return (
      <LazyList
        lineHeight={lineHeight}
        data={data}
        keygen={keygen}
        renderItem={this.renderItem}
        itemsInView={rowsInView}
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
    const { data, loading, style, size, bordered, fixed, height } = this.props
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
}

Index.defaultProps = {
  size: 'default',
  loading: false,
}

Index.displayName = 'ShineoutList'

export default Index
