import React, { Component, isValidElement } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { getLocale } from '../locale'
import { listClass } from '../styles'
import { isFunc, isArray, isString } from '../utils/is'
import { getKey } from '../utils/uid'
import { removeStack, addStack } from '../utils/lazyload'
import Spin from '../Spin'

import Checkbox from '../Table/Checkbox'

class Index extends Component {
  constructor(props) {
    super(props)

    this.bindNode = this.bindNode.bind(this)
    this.bindObserver = this.bindObserver.bind(this)
    this.scrollLoading = this.scrollLoading.bind(this)

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

  renderList() {
    const { data, onChange, keygen, empty } = this.props

    if (!isArray(data) || data.length <= 0)
      return <div className={listClass('item', 'empty')}>{empty || getLocale('noData')}</div>

    // have checked ?
    const haveRowSelected = isFunc(onChange)
    const { length } = data

    return data.map((value, index) => (
      <div
        className={this.getItemClassName(value, index, haveRowSelected)}
        key={getKey(value, keygen, index)}
        ref={index === length - 1 ? this.bindObserver : null}
      >
        {this.renderCheckBox(haveRowSelected, value, index)}
        {this.getContent(value, index)}
      </div>
    ))
  }

  renderFooter() {
    const { footer } = this.props
    if (isFunc(footer)) return <div className={listClass('footer')}>{footer()}</div>
    if (isValidElement(footer)) return <div className={listClass('footer')}>{footer}</div>
    return null
  }

  render() {
    const { loading, style, size, bordered } = this.props
    return (
      <div
        className={classnames(listClass('container', size, bordered && 'bordered'), this.props.className)}
        style={style}
        ref={this.bindNode}
      >
        {loading && (
          <div className={listClass('loading')}>{typeof loading === 'boolean' ? <Spin size={40} /> : loading}</div>
        )}
        <div className={listClass('list')}>{this.renderList()}</div>
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
}

Index.defaultProps = {
  size: 'default',
  loading: false,
}

Index.displayName = 'ShineoutList'

export default Index
