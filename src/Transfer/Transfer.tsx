import React from 'react'
import classnames from 'classnames'
import Btns from './btns'
import { PureComponent } from '../component'
import Card from './Card'
import { transferClass } from './styles'
import Context from './context'
import splitSelecteds from './select'
import { isRTL } from '../config'
import getDataset from '../utils/dom/getDataset'
import { BaseTransferProps, SelectedArr, IndexType } from './Props'
import { KeygenResult } from '../@types/common'

const DefaultProps = {
  titles: [],
  data: [],
  footers: [],
  operations: [],
  operationIcon: true,
  renderItem: (d: any) => d,
  rowsInView: 20,
  lineHeight: 32,
  listHeight: 180,
} as any

interface TransferState {
  selecteds: SelectedArr
}

class Transfer<DataItem, Value extends any[]> extends PureComponent<BaseTransferProps<DataItem, Value>, TransferState> {
  static defaultProps = DefaultProps

  constructor(props: BaseTransferProps<DataItem, Value>) {
    super(props)
    this.state = {
      selecteds: (props.selectedKeys
        ? splitSelecteds(props.selectedKeys, props)
        : splitSelecteds(props.defaultSelectedKeys, props) || [[], []]) as SelectedArr,
    }
    this.getSelected = this.getSelected.bind(this)
    this.setSelecteds = this.setSelecteds.bind(this)
    this.getLoading = this.getLoading.bind(this)
  }

  getLoading(index: IndexType) {
    const { loading } = this.props
    if (Array.isArray(loading)) return loading[index]
    return loading
  }

  getSelected() {
    if ('selectedKeys' in this.props) return splitSelecteds(this.props.selectedKeys || [], this.props) as SelectedArr
    return this.state.selecteds
  }

  setSelecteds(index: IndexType, value: KeygenResult[]) {
    const { onSelectChange } = this.props
    const { selecteds } = this.state
    const newSelecteds = index ? [selecteds![0], value] : [value, selecteds![1]]

    if (onSelectChange) onSelectChange(newSelecteds[0], newSelecteds[1])

    this.setState({
      selecteds: newSelecteds,
    })
  }

  render() {
    const {
      titles = DefaultProps.titles,
      data,
      datum,
      keygen,
      renderItem,
      footers = DefaultProps.footers,
      operations = DefaultProps.operations,
      operationIcon,
      className,
      style,
      listClassName,
      listStyle,
      onFilter,
      onSearch,
      empty,
      disabled,
      itemClass,
      rowsInView = DefaultProps.rowsInView,
      lineHeight = DefaultProps.lineHeight,
      listHeight = DefaultProps.listHeight,
      renderFilter,
      children,
    } = this.props
    const selecteds = this.getSelected()

    const datumValues = datum.getValue()

    // use this.props.value prioritized
    if ('value' in this.props && datumValues !== this.props.value) {
      this.props.datum.setValue(this.props.value)
    }
    const sources = []
    const targets = []
    for (let i = 0; i < data.length; i++) {
      const d = data[i]
      if (datum.check(d)) {
        targets.push(d)
      } else {
        sources.push(d)
      }
    }

    return (
      <div
        className={classnames(transferClass('_', isRTL() && 'rtl'), className)}
        style={style}
        {...getDataset(this.props)}
      >
        <Context.Provider value={{ selecteds, setSelecteds: this.setSelecteds, itemClass }}>
          <Card
            title={titles[0]}
            selecteds={selecteds[0]}
            data={sources}
            keygen={keygen}
            renderItem={renderItem}
            setSelecteds={this.setSelecteds}
            index={0}
            footer={footers[0]}
            listClassName={listClassName}
            listStyle={listStyle}
            loading={this.getLoading(0)}
            onFilter={onFilter}
            empty={empty}
            disabled={disabled}
            onSearch={onSearch}
            rowsInView={rowsInView}
            lineHeight={lineHeight}
            listHeight={listHeight}
            renderFilter={renderFilter}
            customRender={children}
            values={datumValues}
          />
          <Btns
            selecteds={selecteds}
            datum={datum}
            setSelecteds={this.setSelecteds}
            keygen={keygen}
            sources={sources}
            targets={targets}
            operations={operations}
            operationIcon={operationIcon}
            data={data}
            disabled={disabled}
          />
          <Card
            title={titles[1]}
            selecteds={selecteds[1]}
            data={targets}
            keygen={keygen}
            renderItem={renderItem}
            loading={this.getLoading(1)}
            setSelecteds={this.setSelecteds}
            index={1}
            footer={footers[1]}
            listClassName={listClassName}
            listStyle={listStyle}
            onFilter={onFilter}
            empty={empty}
            disabled={disabled}
            onSearch={onSearch}
            rowsInView={rowsInView}
            lineHeight={lineHeight}
            listHeight={listHeight}
            renderFilter={renderFilter}
            customRender={children}
            values={datumValues}
          />
        </Context.Provider>
      </div>
    )
  }
}

export default Transfer
