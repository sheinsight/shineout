import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { getProps } from '../utils/proptypes'
import { getKey } from '../utils/uid'
import Checkbox from './Checkbox'
import { checkinputClass } from '../styles'

class CheckboxGroup extends PureComponent {
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
    if (checked) {
      datum.add(data[index])
    } else {
      datum.remove(data[index])
    }
  }

  render() {
    const {
      block, data, datum, disabled, keygen,
    } = this.props

    const className = classnames(
      checkinputClass('group', block && 'block'),
      this.props.className,
    )

    return (
      <div className={className}>
        {
          data.map((d, i) => (
            <Checkbox
              checked={datum.check(d)}
              disabled={disabled}
              key={getKey(d, keygen, i)}
              htmlValue={i}
              index={i}
              onChange={this.handleClick}
            >
              {this.getContent(d)}
            </Checkbox>
          ))
        }
      </div>
    )
  }
}

CheckboxGroup.propTypes = {
  ...getProps('disabled', 'keygen'),
  block: PropTypes.bool,
  data: PropTypes.array.isRequired,
  datum: PropTypes.object.isRequired,

  renderItem: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]).isRequired,
}

export default CheckboxGroup
