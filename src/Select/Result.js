import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class Result extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {}
  }

  renderIndicator() {
    const { focus } = this.props
    return focus ? 'x' : '^'
  }

  renderPlaceholder() {
    return <span>{this.props.placeholder}</span>
  }

  render() {
    const { multiple, result, renderResult } = this.props

    if (result.length === 0) return this.renderPlaceholder()
    if (!multiple) return <span>{renderResult(result[0])}</span>

    return (
      <div />
    )
  }
}

Result.propTypes = {
  focus: PropTypes.bool.isRequired,
  multiple: PropTypes.bool.isRequired,
  result: PropTypes.array.isRequired,
  renderResult: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
}

export default Result
