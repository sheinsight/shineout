import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Btns from './btns'
import { PureComponent } from '../component'
import Card from './Card'
import { transferClass } from '../styles'
import Context from './context'
import splitSelecteds from './select'
import { isRTL } from '../config'
import getDataset from '../utils/dom/getDataset'

class Transfer extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      selecteds: props.selectedKeys
        ? splitSelecteds(props.selectedKeys, props)
        : splitSelecteds(props.defaultSelectedKeys, props) || [[], []],
    }
    this.getSelected = this.getSelected.bind(this)
    this.setSelecteds = this.setSelecteds.bind(this)
    this.getLoading = this.getLoading.bind(this)
  }

  getLoading(index) {
    const { loading } = this.props
    if (Array.isArray(loading)) return loading[index]
    return loading
  }

  getSelected() {
    if ('selectedKeys' in this.props) return splitSelecteds(this.props.selectedKeys, this.props)
    return this.state.selecteds
  }

  setSelecteds(index, value) {
    const { onSelectChange } = this.props
    const { selecteds } = this.state
    const newSelecteds = index ? [selecteds[0], value] : [value, selecteds[1]]

    if (onSelectChange) onSelectChange(newSelecteds[0], newSelecteds[1])

    this.setState({
      selecteds: newSelecteds,
    })
  }

  render() {
    const {
      titles,
      data,
      datum,
      keygen,
      renderItem,
      footers,
      operations,
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
      rowsInView,
      lineHeight,
      listHeight,
      renderFilter,
      children,
    } = this.props
    const selecteds = this.getSelected()

    const datumValues = datum.getValue()

    // use this.props.value prioritized
    if ('value' in this.props && datumValues !== this.props.value) {
      this.props.datum.setValue(this.props.value)
    }
    const sources = data.filter(d => !datum.check(d))
    const targets = datumValues.reduce((p, n) => {
      const d = datum.getDataByValue(data, n)
      if (d) p.push(d)
      return p
    }, [])
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

Transfer.defaultProps = {
  titles: [],
  data: [],
  footers: [],
  operations: [],
  operationIcon: true,
  renderItem: d => d,
  rowsInView: 20,
  lineHeight: 32,
  listHeight: 180,
}

Transfer.propTypes = {
  titles: PropTypes.array,
  data: PropTypes.array,
  datum: PropTypes.object,
  keygen: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  renderItem: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  footers: PropTypes.array,
  operations: PropTypes.array,
  operationIcon: PropTypes.bool,
  value: PropTypes.array,
  className: PropTypes.string,
  style: PropTypes.object,
  listClassName: PropTypes.string,
  listStyle: PropTypes.object,
  selectedKeys: PropTypes.array,
  defaultSelectedKeys: PropTypes.array,
  onSelectChange: PropTypes.func,
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  empty: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onFilter: PropTypes.func,
  itemClass: PropTypes.string,
  loading: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  onSearch: PropTypes.func,
  rowsInView: PropTypes.number,
  lineHeight: PropTypes.number,
  listHeight: PropTypes.number,
  renderFilter: PropTypes.func,
  children: PropTypes.func,
}

export default Transfer
