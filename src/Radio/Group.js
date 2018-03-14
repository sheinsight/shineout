import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { getProps } from '../utils/proptypes'
import { getKey } from '../utils/uid'
import Radio from './Radio'
import { checkinputClass } from '../styles'

class RadioGroup extends PureComponent {
  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
  }

  componentDidMount() {
    this.props.datum.listen('change', this.handleUpdate)
  }

  componentWillUnmount() {
    this.props.datum.unlisten('change', this.handleUpdate)
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
    datum.set(data[index])
  }

  render() {
    const {
      block, data, datum, disabled, keygen, children,
    } = this.props

    const className = classnames(
      checkinputClass('group', block && 'block'),
      this.props.className,
    )

    return (
      <div className={className}>
        {
          data.map((d, i) => (
            <Radio
              checked={datum.check(d)}
              disabled={disabled}
              key={getKey(d, keygen, i)}
              htmlValue={i}
              index={i}
              onChange={this.handleClick}
            >
              {this.getContent(d)}
            </Radio>
          ))
        }
        {children}
      </div>
    )
  }
}

RadioGroup.propTypes = {
  ...getProps('children', 'disabled', 'keygen'),
  block: PropTypes.bool,
  data: PropTypes.array.isRequired,
  datum: PropTypes.object.isRequired,
  renderItem: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]).isRequired,
}

export default RadioGroup
