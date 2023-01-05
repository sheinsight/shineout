import React from 'react'
import classnames from 'classnames'
import Spin from '../Spin'
import filter from './filter'
import SCard from '../Card'
import Checkbox from '../Checkbox'
import { PureComponent } from '../component'
import { transferClass } from './styles'
import { getKey } from '../utils/uid'
import { createFunc } from '../utils/func'
import { isFunc } from '../utils/is'
import Item from './item'
import LazyList from '../AnimationList/LazyList'
import { getLocale } from '../locale'
import Input from '../Input'
import { CardProps } from './Props'
import { keyType } from '../@types/common'

interface CardState {
  listHeight: number
  mounted: boolean
}
class Card<DataItem, Value extends any[]> extends PureComponent<CardProps<DataItem, Value>, CardState> {
  cardBody: HTMLDivElement

  constructor(props: CardProps<DataItem, Value>) {
    super(props)
    this.getCheckAll = this.getCheckAll.bind(this)
    this.checkAll = this.checkAll.bind(this)
    this.handleRenderItem = this.handleRenderItem.bind(this)
    this.bindCardBody = this.bindCardBody.bind(this)
    this.customSetSelected = this.customSetSelected.bind(this)

    this.state = {
      listHeight: props.listHeight,
      mounted: false,
    }
  }

  getCheckAll() {
    const { selecteds, data } = this.props

    if (selecteds.length === 0) return false

    if (selecteds.length === data.length) return true

    return 'indeterminate'
  }

  bindCardBody(node: HTMLDivElement) {
    this.cardBody = node
    let { listHeight } = this.props
    if (node) {
      listHeight = node.offsetHeight
    }
    this.setState({ listHeight, mounted: true })
  }

  checkAll(c?: boolean) {
    const { setSelecteds, index, data, keygen, disabled } = this.props
    if (c) {
      if (typeof disabled === 'function')
        setSelecteds(
          index,
          data.reduce(
            (r, d, i) => {
              if (disabled(d)) return r
              r.push(getKey(d, keygen, i))
              return r
            },
            [] as keyType[]
          )
        )
      else setSelecteds(index, data.map((d, i) => getKey(d, keygen, i)))
    } else {
      setSelecteds(index, [])
    }
  }

  handleRenderItem(d: DataItem, i: number) {
    const { keygen, index, renderItem, disabled, lineHeight } = this.props
    const disable = disabled === true
    const key = getKey(d, keygen, i)

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

  customSetSelected(value: keyType) {
    const { index, setSelecteds, selecteds } = this.props
    if (typeof value === 'string') {
      setSelecteds(index, [...selecteds, value])
      return
    }
    if (Array.isArray(value)) {
      setSelecteds(index, value)
    }
  }

  renderLazyList() {
    const { filterText, data, rowsInView, lineHeight, keygen } = this.props
    const { mounted, listHeight } = this.state
    if (!mounted) return null
    return (
      <LazyList
        stay={!filterText}
        data={data}
        itemsInView={rowsInView}
        lineHeight={lineHeight}
        height={listHeight}
        keygen={keygen}
        // scrollHeight={lineHeight * data.length}
        renderItem={this.handleRenderItem}
      />
    )
  }

  renderBody() {
    const { customRender, index, values, filterText } = this.props
    if (isFunc(customRender)) {
      const custom = customRender({
        onSelected: this.customSetSelected,
        direction: index === 0 ? 'left' : 'right',
        selectedKeys: this.props.selecteds,
        value: values,
        filterText,
      })
      if (custom) return custom
    }

    return this.renderLazyList()
  }

  renderFilter() {
    const { onFilter, onSearch, renderFilter, filterText, disabled } = this.props
    if (!onFilter && !onSearch) return null
    if (renderFilter && typeof renderFilter === 'function') {
      return (
        <div className={transferClass('filter')}>
          {renderFilter({
            value: filterText,
            disabled: disabled === true,
            onFilter,
            placeholder: getLocale('search'),
          })}
        </div>
      )
    }
    return (
      <div className={transferClass('filter')}>
        <Input
          disabled={disabled === true}
          onChange={onFilter}
          placeholder={getLocale('search')}
          clearable
          value={filterText}
        />
      </div>
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
      empty,
      disabled,
      loading,
      listHeight,
      customRender,
    } = this.props

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
        {this.renderFilter()}
        <Spin loading={loading}>
          <SCard.Body className={classnames(transferClass('card-body'), listClassName)} style={listms}>
            <div className={transferClass('body-container')} ref={this.bindCardBody}>
              {this.renderBody()}
              {!isFunc(customRender) && data.length === 0 && (
                <div className={transferClass('empty')}>{empty || getLocale('noData')}</div>
              )}
            </div>
          </SCard.Body>
        </Spin>

        {footer && <SCard.Footer className={transferClass('card-footer')}>{footer}</SCard.Footer>}
      </SCard>
    )
  }
}

export default filter(Card)
