import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { getProps } from '../utils/proptypes'
import { getKey } from '../utils/uid'
import { inputClass, selectClass } from '../styles'
import Option from './Option'

class Select extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      focus: false,
    }

    this.bindElement = this.bindElement.bind(this)
    this.handleFocus = this.handleState.bind(this, true)
    this.handleBlur = this.handleState.bind(this, false)
    this.handleChange = this.handleChange.bind(this)
    this.renderItem = this.renderItem.bind(this)
  }

  bindElement(el) {
    this.element = el
  }

  handleState(focus) {
    this.setState({ focus })

    const { onBlur, onFocus } = this.props
    if (focus) onFocus()
    else onBlur()
  }

  handleChange(data, checked) {
    const { datum, onChange } = this.props
    if (checked) datum.add(data)
    else datum.remove(data)

    this.element.blur()

    onChange(datum.getValue())
  }

  renderResult() {
    const { placeholder } = this.props
    return <span className={inputClass('placeholder')}>{placeholder}</span>
  }

  renderItem(data) {
    const { renderItem } = this.props
    return typeof renderItem === 'function'
      ? renderItem(data)
      : data[renderItem]
  }

  renderOptions() {
    const { data, keygen } = this.props
    if (data.length === 0) {
      return <div className={selectClass('options')}>options</div>
    }

    return (
      <div className={selectClass('options')}>
        {
          data.map((d, i) => (
            <Option
              key={getKey(d, keygen, i)}
              data={d}
              onClick={this.handleChange}
              renderItem={this.renderItem}
            />
          ))
        }
      </div>
    )
  }

  render() {
    const className = selectClass('inner')

    return (
      <div
        tabIndex={-1}
        ref={this.bindElement}
        className={className}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
      >
        {this.renderResult()}
        {this.renderOptions()}
      </div>
    )
  }
}

Select.propTypes = {
  // datum: PropTypes.object,
  ...getProps(['placehodler', 'keygen']),
  data: PropTypes.array,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  renderItem: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),
}

Select.defaultProps = {
  data: [],
  renderItem: e => e,
}

export default Select
