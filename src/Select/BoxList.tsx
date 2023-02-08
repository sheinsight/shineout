import React, { Component } from 'react'
import { getLocale } from '../locale'
// import icons from '../icons'
import { getKey } from '../utils/uid'
import List from '../AnimationList'
import Spin from '../Spin'
// import Input from '../Input'
import Checkbox from '../Checkbox/Checkbox'
import { selectClass } from './styles'
import BoxOption from './BoxOption'
import LazyList from '../AnimationList/LazyList'
import { getCustomList } from './utils'
import { BoxListProps } from './Props'
import { CheckValueType } from '../Checkbox/Props'

const ScaleList = List(['fade', 'scale-y'], 'fast', 'flex')
const emptyFunc = () => {}

const DefaultValue = {
  columnWidth: 160,
}

class BoxList<Item, Value> extends Component<BoxListProps<Item, Value>> {
  static defaultProps = DefaultValue

  handleMouseMove: () => void

  constructor(props: BoxListProps<Item, Value>) {
    super(props)

    // fake events
    props.bindOptionFunc('handleHover', emptyFunc)
    props.bindOptionFunc('hoverMove', emptyFunc)
    props.bindOptionFunc('getIndex', emptyFunc)

    this.handleSelectAll = this.handleSelectAll.bind(this)
    this.handleRenderItem = this.handleRenderItem.bind(this)
  }

  getText(key: string) {
    return this.props.text[key] || getLocale(key)
  }

  getWidth() {
    const { columnWidth = DefaultValue.columnWidth, columns } = this.props
    if (columns === -1) return columnWidth
    return columnWidth * columns
  }

  handleSelectAll(_: any, checked: boolean) {
    const { datum, data } = this.props
    if (checked) datum.add(data)
    else datum.remove(data)
  }

  handleRenderItem(data: Item[], groupIndex: number) {
    const { datum, keygen, columns, multiple, onChange, renderItem, lineHeight } = this.props
    return (
      <div style={{ height: lineHeight }}>
        {data.map((d, i) => {
          const isActive = datum.check(d as any)
          return (
            <BoxOption
              key={getKey(d, keygen, groupIndex + i)}
              isActive={isActive}
              disabled={datum.disabled(d)}
              data={d}
              columns={columns}
              multiple={multiple}
              onClick={onChange}
              renderItem={renderItem}
            />
          )
        })}
      </div>
    )
  }

  renderHeader(count: number) {
    const { data, loading, multiple, columnsTitle } = this.props

    if (loading || !multiple) return null

    let checked: CheckValueType = 'indeterminate'
    if (count === 0) checked = false
    else if (count === data.length) checked = true

    return (
      <div className={selectClass('header')}>
        {multiple && (
          <Checkbox onChange={this.handleSelectAll} checked={checked}>
            {this.getText('selectAll')}
          </Checkbox>
        )}
        {columnsTitle && <span className={selectClass('header-title')}>{columnsTitle}</span>}
      </div>
    )
  }

  renderLazyList() {
    const { columns, height, lineHeight, data, itemsInView } = this.props
    const sliceData = data.reduce((red: Item[][], item) => {
      let lastItem: Item[] = red[red.length - 1]
      if (!lastItem) {
        lastItem = []
        red.push(lastItem)
      }
      if (lastItem.length >= columns) red.push([item])
      else lastItem.push(item)
      return red
    }, [])
    return (
      <LazyList
        lineHeight={lineHeight}
        data={sliceData}
        itemsInView={itemsInView}
        height={height}
        renderItem={this.handleRenderItem}
      />
    )
  }

  renderStack() {
    const { columns, datum, multiple, onChange, renderItem, data, keygen } = this.props
    return data.map((d, i) => {
      const isActive = datum.check(d as any)
      return (
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
      )
    })
  }

  renderOptions() {
    const { loading, columns, data, renderPending, emptyText } = this.props
    if (loading) return null
    const stack = columns === -1
    const empty = renderPending || data.length === 0
    return (
      <div className={selectClass('box-options', stack && 'scrollable')}>
        {empty ? (
          <div key="empty" className={selectClass('no-data')}>
            {emptyText || this.getText('noData')}
          </div>
        ) : (
          <React.Fragment>{stack ? this.renderStack() : this.renderLazyList()}</React.Fragment>
        )}
      </div>
    )
  }

  render() {
    const { data, datum, style, loading, focus, selectId, getRef, customHeader, renderOptionList } = this.props
    const checkedCount = data.filter(d => datum.check(d)).length

    const newStyle = Object.assign({}, style, { width: this.getWidth() })
    const results = (
      <>
        {customHeader}
        {loading && typeof loading === 'boolean' ? <Spin size={30} /> : loading}
        {this.renderHeader(checkedCount)}
        {this.renderOptions()}
      </>
    )

    return (
      <ScaleList
        show={focus}
        onMouseMove={this.handleMouseMove}
        data-id={selectId}
        style={newStyle}
        className={selectClass('box-list')}
        getRef={getRef}
      >
        {getCustomList(results, renderOptionList, loading)}
      </ScaleList>
    )
  }
}

export default BoxList
