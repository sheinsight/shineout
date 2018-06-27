import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { uploadClass } from '../styles'

class Value extends PureComponent {
  constructor(props) {
    super(props)
    this.handleRemove = this.handleRemove.bind(this)
  }

  handleRemove() {
    this.props.onRemove(this.props.index)
  }

  render() {
    const { renderResult, value } = this.props
    const className = uploadClass('view-value')

    return (
      <div className={className}>
        { renderResult(value) }

        <a
          href="javascript:;"
          className={uploadClass('close')}
          onClick={this.handleRemove}
        >
          &times;
        </a>
      </div>
    )
  }
}

Value.propTypes = {
  index: PropTypes.number,
  onRemove: PropTypes.func,
  renderResult: PropTypes.func,
  value: PropTypes.any,
}

Value.defaultProps = {
  renderResult: a => a,
}

export default Value
