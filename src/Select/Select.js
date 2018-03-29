import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { getProps } from '../utils/proptypes'
import { getKey } from '../utils/uid'
import List from '../List'
import { inputClass, selectClass } from '../styles'
import Option from './Option'
import Result from './Result'

const ScaleList = List(['fade', 'scale-y'], 'fast')

class Select extends PureComponent {
  constructor(props) {
    super(props)

    this.state = { focus: false }
    this.result = []

    this.bindElement = this.bindElement.bind(this)
    this.handleFocus = this.handleState.bind(this, true)
    this.handleBlur = this.handleState.bind(this, false)
    this.handleChange = this.handleChange.bind(this)
    this.resetResult = this.resetResult.bind(this)
    this.renderItem = this.renderItem.bind(this)

    if (!props.multiple) {
      props.datum.limit = 1
    }
    props.datum.listen('set-value', this.resetResult)
  }

  componentDidMount() {
    this.resetResult()
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
    const { datum, onChange, multiple } = this.props

    if (multiple) {
      if (checked) {
        datum.add(data)
        this.result.push(data)
      } else {
        datum.remove(data)
        this.result = this.result.filter(r => r !== data)
      }
    } else {
      datum.set(data)
      this.result = [data]
      this.element.blur()
    }

    onChange(datum.getValue())
  }

  resetResult() {
    const { data, datum } = this.props
    this.result = []
    data.forEach((d) => {
      if (datum.check(d)) this.result.push(d)
    })
  }

  renderResult() {
    const { placeholder } = this.props
    if (this.result.length === 0) {
      return <span className={inputClass('placeholder')}>{placeholder}</span>
    }

    return this.result.map()
  }

  renderItem(data) {
    const { renderItem } = this.props
    return typeof renderItem === 'function'
      ? renderItem(data)
      : data[renderItem]
  }

  renderOptions() {
    const { data, datum, keygen } = this.props

    return (
      <ScaleList
        show={this.state.focus}
        className={selectClass('options')}
      >
        {
          data.length === 0 &&
          <span className={selectClass('option')}>No Data</span>
        }
        {
          data.map((d, i) => (
            <Option
              isActive={datum.check(d)}
              key={getKey(d, keygen, i)}
              data={d}
              onClick={this.handleChange}
              renderItem={this.renderItem}
            />
          ))
        }
      </ScaleList>
    )
  }

  render() {
    const { placeholder, multiple } = this.props
    const className = selectClass('inner')
    const renderResult = this.props.renderResult || this.props.renderItem

    return (
      <div
        tabIndex={-1}
        ref={this.bindElement}
        className={className}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
      >
        <Result
          focus={this.state.focus}
          result={this.result}
          multiple={multiple}
          placeholder={placeholder}
          renderResult={renderResult}
        />
        {this.renderOptions()}
      </div>
    )
  }
}

Select.propTypes = {
  // datum: PropTypes.object,
  ...getProps(['placehodler', 'keygen']),
  data: PropTypes.array,
  datum: PropTypes.object.isRequired,
  multiple: PropTypes.bool,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  renderItem: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),
}

Select.defaultProps = {
  data: [],
  multiple: false,
  renderItem: e => e,
}

export default Select
