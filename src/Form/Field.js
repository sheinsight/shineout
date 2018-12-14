import { cloneElement, isValidElement, Component } from 'react'
import PropTypes from 'prop-types'
import shallowEqual from '../utils/shallowEqual'

class Field extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)

    this.cacheChildren = undefined
    this.cacheElement = null
  }

  shouldComponentUpdate(nextProps) {
    const options = this.props.cache ? { skip: ['children'] } : {}
    return !(shallowEqual(this.props, nextProps, options))
  }

  handleChange(value) {
    if (value && value.nativeEvent) {
      // eslint-disable-next-line
      value = value.target.value
    }

    this.props.onChange(value)
  }

  render() {
    const { children, value, error } = this.props

    if (typeof children === 'function') {
      return children({ value, error, onChange: this.handleChange })
    }

    if (isValidElement) {
      return cloneElement(children, { value, error, onChange: this.handleChange })
    }

    console.error(new Error('Form.Field expect a single ReactElement or a function.'))
    return null
  }
}

Field.propTypes = {
  cache: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.element,
  ]).isRequired,
  error: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.any,
}

Field.defaultProps = {
  cache: true,
}

export default Field
