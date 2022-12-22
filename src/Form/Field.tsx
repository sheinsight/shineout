import * as React from 'react'
import shallowEqual from '../utils/shallowEqual'
import { FieldProps } from './Props'

class Field<Value> extends React.Component<FieldProps<Value>> {
  static defaultProps = {
    cache: false,
  }

  constructor(props: FieldProps<Value>) {
    super(props)
    this.handleChange = this.handleChange.bind(this)

    // this.cacheChildren = undefined
    // this.cacheElement = null
  }

  shouldComponentUpdate(nextProps: FieldProps<Value>) {
    const options = this.props.cache ? { skip: ['children'] } : {}
    return !shallowEqual(this.props, nextProps, options)
  }

  handleChange(value: any) {
    if (value && value.nativeEvent) {
      // eslint-disable-next-line
      value = value.target.value
    }

    this.props.onChange(value)
  }

  render() {
    const { children, value, error, disabled } = this.props

    if (typeof children === 'function') {
      return children({ value, error, onChange: this.handleChange, disabled })
    }
    if (React.isValidElement(children)) {
      return React.cloneElement(children, {
        value,
        error,
        onChange: this.handleChange,
        disabled: disabled || (children.props && children.props.disabled),
      })
    }

    console.error(new Error('Form.Field expect a single ReactElement or a function.'))
    return null
  }
}

export default Field
