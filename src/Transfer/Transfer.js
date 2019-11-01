import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Btns from './btns'
import { Component } from '../component'
import Card from './Card'
import { transferClass } from '../styles'
import Context from './context'
import splitSelecteds from './select'

class Transfer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selecteds: props.selectedKeys
        ? splitSelecteds(props.selectedKeys, props)
        : splitSelecteds(props.defaultSelectedKeys, props) || [[], []],
    }
    this.getSelected = this.getSelected.bind(this)
    this.setSelecteds = this.setSelecteds.bind(this)
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
      empty,
      disabled,
    } = this.props
    const selecteds = this.getSelected()

    // use this.props.value prioritized
    if ('value' in this.props && this.props.datum.getValue() !== this.props.value) {
      this.props.datum.setValue(this.props.value)
    }

    const sources = data.filter(d => !datum.check(d))
    const targets = data.filter(d => datum.check(d))

    return (
      <div className={classnames(transferClass('_'), className)} style={style}>
        <Context.Provider value={{ selecteds, setSelecteds: this.setSelecteds }}>
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
            onFilter={onFilter}
            empty={empty}
            disabled={disabled}
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
            setSelecteds={this.setSelecteds}
            index={1}
            footer={footers[1]}
            listClassName={listClassName}
            listStyle={listStyle}
            onFilter={onFilter}
            empty={empty}
            disabled={disabled}
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
}

export default Transfer
