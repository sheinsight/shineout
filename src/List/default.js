import React, { Component, isValidElement } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { listClass } from '../styles'
import { isFunc, isArray } from '../utils/is'
import { compose } from '../utils/func'
import { getKey } from '../utils/uid'
import Datum from '../Datum'
import Spin from '../Spin'

import Checkbox from '../Table/Checkbox'

// calc all children height
const calcHeight = node => {
  let h = 0
  node.childNodes.forEach(elem => {
    h += elem.offsetHeight
  })
  return h
}

class Index extends Component {
  constructor(props) {
    super(props)

    this.renderList = this.renderList.bind(this)
    this.renderFooter = this.renderFooter.bind(this)
    this.bindNode = this.bindNode.bind(this)
    this.handleScroll = this.handleScroll.bind(this)

    this.height = 0
  }

  componentDidMount() {
    if (this.node) {
      this.node.addEventListener('scroll', this.handleScroll)
      this.height = calcHeight(this.node) - this.node.clientHeight
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.loading !== this.props.loading && !this.props.loading && this.node) {
      this.height = calcHeight(this.node) - this.node.clientHeight
    }
  }

  componentWillUnmount() {
    if (this.node) {
      this.node.removeEventListener('scroll', this.handleScroll)
    }
  }

  bindNode(node) {
    this.node = node
  }

  handleScroll(e) {
    const { loading, scrollLoading } = this.props
    if (loading || e.target.scrollTop !== this.height) return

    if (!isFunc(scrollLoading)) return
    scrollLoading()
  }

  updateContainerHeight() {
    if (!this.node) return
    this.height = this.node.clientHeight
  }

  renderCheckBox(flag, data, index) {
    if (!flag) return null
    const { datum } = this.props
    return <Checkbox data={data} index={index} datum={datum} />
  }

  renderList() {
    const { data, renderItem, onChange, keygen } = this.props
    if (!isFunc(renderItem) || !isArray(data) || data.length <= 0)
      return <div className={listClass('item', 'empty')}>empty data</div>

    // have checked ?
    const haveRowSelected = isFunc(onChange)

    return data.map((value, index) => (
      <div className={listClass('item', haveRowSelected && 'checkbox')} key={getKey(value, keygen, index)}>
        {this.renderCheckBox(haveRowSelected, value, index)}
        {renderItem(value, index)}
      </div>
    ))
  }

  renderFooter() {
    const { footer } = this.props
    if (isFunc(footer)) return footer()
    if (isValidElement(footer)) return footer
    return null
  }

  render() {
    const { loading = false, style } = this.props
    return (
      <Spin loading={loading}>
        <div className={classnames(listClass('container'), this.props.className)} style={style} ref={this.bindNode}>
          <div className={listClass('list')}>{this.renderList()}</div>
          <div className={listClass('footer')}>{this.renderFooter()}</div>
        </div>
      </Spin>
    )
  }
}

Index.propTypes = {
  onChange: PropTypes.func,
  className: PropTypes.string,
  data: PropTypes.array,
  renderItem: PropTypes.func.isRequired,
  footer: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  datum: PropTypes.object.isRequired,
  keygen: PropTypes.oneOfType([PropTypes.func, PropTypes.string, PropTypes.bool]).isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  format: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  loading: PropTypes.bool,
  style: PropTypes.object,
  scrollLoading: PropTypes.func,
}

export default compose(
  Datum.hoc({
    bindProps: ['disabled', 'limit', 'format'],
    ignoreUndefined: true,
    setValueType: null,
    pure: false,
  })
)(Index)
