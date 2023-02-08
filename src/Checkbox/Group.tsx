import React, { ReactNode } from 'react'
import classnames from 'classnames'
import { PureComponent } from '../component'
import { getKey } from '../utils/uid'
import { CHANGE_TOPIC } from '../Datum/types'
import Checkbox from './Checkbox'
import { Provider } from './context'
import { checkinputClass } from './styles'
import { BaseCheckboxGroupProps, CheckValueType } from './Props'

class CheckboxGroup<DataItem, Value> extends PureComponent<BaseCheckboxGroupProps<DataItem, Value>, {}> {
  static defaultProps = {
    renderItem: (d: any) => d,
  }

  constructor(props: BaseCheckboxGroupProps<DataItem, Value>) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
    this.handleRawChange = this.handleRawChange.bind(this)
  }

  componentDidMount() {
    super.componentDidMount()
    this.props.datum.subscribe(CHANGE_TOPIC, this.handleUpdate)
  }

  componentWillUnmount() {
    super.componentWillUnmount()
    this.props.datum.unsubscribe(CHANGE_TOPIC, this.handleUpdate)
  }

  getContent(d: DataItem): ReactNode {
    const { renderItem } = this.props
    if (typeof renderItem === 'string') {
      return (d[renderItem] as unknown) as ReactNode
    }
    if (typeof renderItem === 'function') {
      return renderItem(d)
    }

    return ''
  }

  handleUpdate() {
    this.forceUpdate()
  }

  handleClick(_val: unknown, checked: CheckValueType, index: number) {
    const { data, datum } = this.props
    if (checked) {
      datum.add(data![index])
    } else {
      datum.remove(data![index])
    }
  }

  handleRawChange(value: DataItem, checked: CheckValueType) {
    const { datum } = this.props
    if (checked) {
      datum.add(value)
    } else {
      datum.remove(value)
    }
  }

  render() {
    const { block, data, datum, keygen, children, style } = this.props
    const className = classnames(checkinputClass('group', ['no-block', 'block'][Number(block)]), this.props.className)

    if (data === undefined) {
      return (
        <div className={className} style={style}>
          <Provider value={{ onRawChange: this.handleRawChange, checked: datum.check.bind(datum) }}>
            {children}
          </Provider>
        </div>
      )
    }

    return (
      <div className={className} style={style}>
        {data.map((d, i) => (
          <Checkbox
            checked={datum.check(d)}
            disabled={datum.disabled(d)}
            key={getKey(d, keygen, i)}
            htmlValue={i}
            index={i}
            onChange={this.handleClick}
          >
            {this.getContent(d)}
          </Checkbox>
        ))}
        {children}
      </div>
    )
  }
}

export default CheckboxGroup
