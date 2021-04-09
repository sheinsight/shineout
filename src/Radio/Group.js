import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { PureComponent } from '../component'
import { getProps } from '../utils/proptypes'
import { getKey } from '../utils/uid'
import { CHANGE_TOPIC } from '../Datum/types'
import { Provider } from '../Checkbox/context'
import { checkinputClass } from '../styles'
import Radio from './Radio'
import { isRTL } from '../config'

class RadioGroup extends PureComponent {
  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
    this.handleUpdate = this.forceUpdate.bind(this)
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

  getContent(d, index) {
    const { renderItem } = this.props
    if (typeof renderItem === 'string') {
      return d[renderItem]
    }
    if (typeof renderItem === 'function') {
      return renderItem(d, index)
    }

    return ''
  }

  handleClick(val, checked, index) {
    const { data, datum } = this.props
    datum.set(data[index])
  }

  handleRawChange(value) {
    this.props.datum.set(value)
  }

  render() {
    const { block, data, datum, keygen, children, button, size } = this.props

    const rtl = isRTL()

    const className = classnames(
      checkinputClass(
        'group',
        block && 'block',
        button && 'button',
        button === 'outline' && 'outline',
        button && size,
        rtl && 'rtl'
      ),
      this.props.className
    )

    if (data === undefined) {
      return (
        <div className={className}>
          <Provider value={{ onRawChange: this.handleRawChange, checked: datum.check.bind(datum) }}>
            {children}
          </Provider>
        </div>
      )
    }

    return (
      <div className={className}>
        {data.map((d, i) => (
          <Radio
            checked={datum.check(d)}
            disabled={datum.disabled(d)}
            key={getKey(d, keygen, i)}
            htmlValue={i}
            index={i}
            onChange={this.handleClick}
          >
            {this.getContent(d, i)}
          </Radio>
        ))}
        {children}
      </div>
    )
  }
}

RadioGroup.propTypes = {
  ...getProps(PropTypes, 'children', 'keygen', 'size'),
  block: PropTypes.bool,
  data: PropTypes.array,
  button: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  datum: PropTypes.object.isRequired,
  renderItem: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
}

RadioGroup.defaultProps = {
  renderItem: d => d,
}

export default RadioGroup
