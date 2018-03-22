import { PureComponent, cloneElement } from 'react'
import PropTypes from 'prop-types'

class Field extends PureComponent {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(value) {
    if (value && value.nativeEvent) {
      // eslint-disable-next-line
      value = value.target.value
    }

    this.props.onChange(value)
  }

  render() {
    const { children } = this.props
    let { value } = this.props

    if (value === undefined && children &&
      typeof children.type === 'object' &&
      children.type.defaultProps
    ) {
      // eslint-disable-next-line
      value = children.type.defaultProps.value
    }

    if (value === undefined && children.props) {
      // eslint-disable-next-line
      value = children.props.value
    }

    return cloneElement(children, { onChange: this.handleChange, value })
  }
}

Field.propTypes = {
  children: PropTypes.element.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.any,
}

export default Field
