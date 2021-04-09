import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { PureComponent } from '../component'
import { getProps } from '../utils/proptypes'
import { getKey } from '../utils/uid'
import { CHANGE_TOPIC } from '../Datum/types'
import Checkbox from './Checkbox'
import { Provider } from './context'
import { checkinputClass } from '../styles'

class CheckboxGroup extends PureComponent {
  constructor(props) {
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

  getContent(d) {
    const { renderItem } = this.props
    if (typeof renderItem === 'string') {
      return d[renderItem]
    }
    if (typeof renderItem === 'function') {
      return renderItem(d)
    }

    return ''
  }

  handleUpdate() {
    this.forceUpdate()
  }

  handleClick(val, checked, index) {
    const { data, datum } = this.props
    if (checked) {
      datum.add(data[index])
    } else {
      datum.remove(data[index])
    }
  }

  handleRawChange(value, checked) {
    const { datum } = this.props
    if (checked) {
      datum.add(value)
    } else {
      datum.remove(value)
    }
  }

  render() {
    const { block, data, datum, keygen, children } = this.props

    const className = classnames(checkinputClass('group', ['no-block', 'block'][Number(block)]), this.props.className)

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

CheckboxGroup.propTypes = {
  ...getProps(PropTypes, 'children', 'keygen'),
  block: PropTypes.bool,
  data: PropTypes.array,
  datum: PropTypes.object.isRequired,

  renderItem: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
}

CheckboxGroup.defaultProps = {
  renderItem: d => d,
}

export default CheckboxGroup
