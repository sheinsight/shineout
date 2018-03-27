import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { inputClass, selectClass } from '../styles'

class Select extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {}
  }

  renderResult() {
    const { placeholder } = this.props
    return <span className={inputClass('placeholder')}>{placeholder}</span>
  }

  render() {
    return (
      <div>
        {this.renderResult()}
      </div>
    )
  }
}

Select.propTypes = {
  datum: PropTypes.object,
  placeholder: PropTypes.string,
}

export default Select
