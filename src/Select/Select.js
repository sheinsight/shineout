import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import immer from 'immer'
import { getProps } from '../utils/proptypes'
import { getKey } from '../utils/uid'
import List from '../List'
import { selectClass } from '../styles'
import Option from './Option'
import Result from './Result'

const ScaleList = List(['fade', 'scale-y'], 'fast')

class Select extends PureComponent {
  constructor(props) {
    super(props)

    this.state = { focus: false, result: [] }

    this.bindElement = this.bindElement.bind(this)
    this.handleFocus = this.handleState.bind(this, true)
    this.handleBlur = this.handleState.bind(this, false)
    this.handleClear = this.handleClear.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleRemove = this.handleChange.bind(this, false)

    this.resetResult = this.resetResult.bind(this)
    this.renderItem = this.renderItem.bind(this)

    if (props.multiple) {
      props.datum.limit = undefined
    }
    props.datum.listen('set-value', this.resetResult)
  }

  componentDidMount() {
    this.resetResult()
  }

  bindElement(el) {
    this.element = el
  }

  handleState(focus, event) {
    if (event && event.target.getAttribute('data-role') === 'close') {
      return
    }

    this.setState({ focus })

    const { onBlur, onFocus } = this.props
    if (focus) onFocus()
    else onBlur()
  }

  handleChange(checked, data) {
    const { datum, multiple } = this.props

    if (multiple) {
      if (checked) {
        datum.add(data)
        this.setState(immer((state) => {
          state.result.push(data)
        }))
      } else {
        datum.remove(data)
        this.setState({ result: this.state.result.filter(r => r !== data) })
      }
    } else {
      datum.set(data)
      this.setState({ result: [data] })
      this.element.blur()
    }

    this.forceUpdate()
  }

  handleClear() {
    this.setState({ result: [] })
    this.props.datum.setValue([])

    if (this.state.focus === false) {
      this.forceUpdate()
    } else {
      this.handleState(false)
    }
  }

  // result performance
  resetResult() {
    const { data, datum } = this.props
    const result = []
    data.forEach((d) => {
      if (datum.check(d)) result.push(d)
    })
    this.setState({ result })
  }

  renderItem(data) {
    const { renderItem } = this.props
    return typeof renderItem === 'function'
      ? renderItem(data)
      : data[renderItem]
  }

  renderOptions() {
    const {
      data, datum, keygen, multiple,
    } = this.props

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
              multiple={multiple}
              onClick={this.handleChange}
              renderItem={this.renderItem}
            />
          ))
        }
      </ScaleList>
    )
  }

  render() {
    const { placeholder, multiple, clearable } = this.props
    const className = selectClass(
      'inner',
      this.state.focus && 'focus',
      this.props.size,
    )
    const renderResult = this.props.renderResult || this.renderItem

    return (
      <div
        tabIndex={-1}
        ref={this.bindElement}
        className={className}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
      >
        <Result
          onClear={clearable ? this.handleClear : undefined}
          onRemove={this.handleRemove}
          focus={this.state.focus}
          result={this.state.result}
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
  clearable: PropTypes.bool,
  data: PropTypes.array,
  datum: PropTypes.object.isRequired,
  multiple: PropTypes.bool,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  renderItem: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),
  size: PropTypes.string,
}

Select.defaultProps = {
  clearable: false,
  data: [],
  multiple: false,
  renderItem: e => e,
}

export default Select
