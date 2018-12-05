import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { getLocale } from '../locale'
import { getKey } from '../utils/uid'
import List from '../List'
import Spin from '../Spin'
import Checkbox from '../Checkbox/Checkbox'
import { selectClass } from '../styles'
import BoxOption from './BoxOption'

const ScaleList = List(['fade', 'scale-y'], 'fast', 'flex')
const emptyFunc = () => {}


class BoxList extends Component {
  constructor(props) {
    super(props)

    // fake events
    props.bindOptionFunc('handleHover', emptyFunc)
    props.bindOptionFunc('hoverMove', emptyFunc)
    props.bindOptionFunc('getIndex', emptyFunc)

    this.handleSelectAll = this.handleSelectAll.bind(this)
  }

  getText(key) {
    return this.props.text[key] || getLocale(key)
  }

  handleSelectAll(_, checked) {
    const { datum, data } = this.props
    if (checked) datum.add(data)
    else datum.clear()
  }

  renderHeader(count) {
    const {
      data, onFilter, loading, multiple,
    } = this.props

    if (loading || (!onFilter && !multiple)) return null

    let checked = 'indeterminate'
    if (count === 0) checked = false
    else if (count === data.length) checked = true

    return (
      <div className={selectClass('header')}>
        <Checkbox onChange={this.handleSelectAll} checked={checked}>
          {this.getText('selectAll')}
        </Checkbox>
      </div>
    )
  }

  renderOptions(options) {
    const { loading } = this.props
    if (loading) return null

    return (
      <div className={selectClass('box-options')}>{options}</div>
    )
  }

  render() {
    const {
      columnWidth, columns, data, datum, keygen, multiple,
      loading, renderItem, focus, onChange, selectId,
    } = this.props

    const options = []
    if (data.length === 0) {
      options.push(<div className={selectClass('no-data')}>{this.getText('noData')}</div>)
    }

    let checkedCount = 0
    data.forEach((d, i) => {
      const isActive = datum.check(d)
      if (isActive) checkedCount += 1
      options.push((
        <BoxOption
          key={getKey(d, keygen, i)}
          isActive={isActive}
          disabled={datum.disabled(d)}
          data={d}
          columns={columns}
          multiple={multiple}
          onClick={onChange}
          renderItem={renderItem}
        />
      ))
    })

    return (
      <ScaleList
        show={focus}
        onMouseMove={this.handleMouseMove}
        data-id={selectId}
        style={{ width: columnWidth * columns }}
        className={selectClass('box-list')}
      >
        {loading && typeof loading === 'boolean' ? <Spin size={30} /> : loading}
        {this.renderHeader(checkedCount)}
        {this.renderOptions(options)}
      </ScaleList>
    )
  }
}

BoxList.propTypes = {
  columnWidth: PropTypes.number,
  columns: PropTypes.number,
  data: PropTypes.array,
  datum: PropTypes.object.isRequired,
  focus: PropTypes.bool,
  keygen: PropTypes.any,
  loading: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.bool,
  ]),
  multiple: PropTypes.bool,
  onChange: PropTypes.func,
  onFilter: PropTypes.func,
  renderItem: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),
  selectId: PropTypes.string,
  bindOptionFunc: PropTypes.func.isRequired,
  text: PropTypes.object,
}

BoxList.defaultProps = {
  columnWidth: 160,
}

export default BoxList
