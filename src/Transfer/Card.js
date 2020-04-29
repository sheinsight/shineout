import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Spin from '../Spin'
import SCard from '../Card'
import Checkbox from '../Checkbox'
import { PureComponent } from '../component'
import { transferClass } from '../styles'
import { getKey } from '../utils/uid'
import { createFunc } from '../utils/func'
import Item from './item'
import LazyList from '../List/LazyList'
import { getLocale } from '../locale'
import Input from '../Input'

class Card extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      filter: '',
    }

    this.hasData = false

    this.getCheckAll = this.getCheckAll.bind(this)
    this.checkAll = this.checkAll.bind(this)
    this.filterChange = this.filterChange.bind(this)
    this.handleRenderItem = this.handleRenderItem.bind(this)
  }

  getCheckAll() {
    const { selecteds, data } = this.props

    if (selecteds.length === 0) return false

    if (selecteds.length === data.length) return true

    return 'indeterminate'
  }

  checkAll(c) {
    const { setSelecteds, index, data, keygen, disabled } = this.props
    if (c) {
      if (typeof disabled === 'function')
        setSelecteds(
          index,
          data.reduce((r, d, i) => {
            if (disabled(d)) return r
            r.push(getKey(d, keygen, i))
            return r
          }, [])
        )
      else setSelecteds(index, data.map((d, i) => getKey(d, keygen, i)))
    } else {
      setSelecteds(index, [])
    }
  }

  filterChange(v) {
    const { onSearch, index } = this.props

    if (onSearch) onSearch(v, !index)

    this.setState({ filter: v })
  }

  handleRenderItem(d, i) {
    const { keygen, index, renderItem, onFilter, disabled, lineHeight } = this.props
    const disable = disabled === true
    const key = getKey(d, keygen, i)
    if (onFilter && !onFilter(this.state.filter, d, !index)) return null

    this.hasData = true

    return (
      <Item
        lineHeight={lineHeight}
        key={key}
        disabled={disable || (typeof disabled === 'function' && disabled(d))}
        index={index}
        checkKey={key}
        liData={d}
        content={createFunc(renderItem)(d)}
      />
    )
  }

  render() {
    const {
      title,
      data,
      selecteds,
      footer,
      listClassName,
      listStyle,
      onFilter,
      empty,
      disabled,
      loading,
      onSearch,
      lineHeight,
      listHeight,
      rowsInView,
    } = this.props

    this.hasData = false
    const check = this.getCheckAll()
    const disable = disabled === true
    const listms = Object.assign({}, listStyle, { height: listHeight })
    return (
      <SCard className={transferClass('card')}>
        <SCard.Header className={transferClass('card-header')}>
          <div>
            <Checkbox onChange={this.checkAll} checked={check} disabled={disable}>
              {check ? `${selecteds.length} ${getLocale('selected')}` : getLocale('selectAll')}
            </Checkbox>
          </div>
          <div className={transferClass('card-header-title')}>{title}</div>
        </SCard.Header>
        {(onFilter || onSearch) && (
          <div className={transferClass('filter')}>
            <Input
              disabled={disable}
              onChange={this.filterChange}
              placeholder={getLocale('search')}
              clearable
              size="small"
              value={this.state.filter}
            />
          </div>
        )}
        <Spin loading={loading}>
          <SCard.Body className={classnames(transferClass('card-body'), listClassName)} style={listms}>
            <LazyList
              data={data}
              itemsInView={rowsInView}
              lineHeight={lineHeight}
              height={listHeight}
              scrollHeight={lineHeight * data.length}
              renderItem={this.handleRenderItem}
            />

            {!this.hasData && <div className={transferClass('empty')}>{empty || getLocale('noData')}</div>}
          </SCard.Body>
        </Spin>

        {footer && <SCard.Footer className={transferClass('card-footer')}>{footer}</SCard.Footer>}
      </SCard>
    )
  }
}

Card.propTypes = {
  selecteds: PropTypes.array,
  keygen: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  data: PropTypes.array,
  setSelecteds: PropTypes.func,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  renderItem: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  index: PropTypes.number,
  footer: PropTypes.object,
  listClassName: PropTypes.string,
  listStyle: PropTypes.object,
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  onFilter: PropTypes.func,
  empty: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  loading: PropTypes.bool,
  onSearch: PropTypes.func,
  rowsInView: PropTypes.number,
  lineHeight: PropTypes.number,
  listHeight: PropTypes.number,
}

export default Card
