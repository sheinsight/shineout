import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { formClass } from '../styles'
import { getProps, defaultProps } from '../utils/proptypes'

class Form extends PureComponent {
  constructor(props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleReset = this.handleReset.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    const { datum, onSubmit } = this.props
    if (onSubmit) onSubmit(datum.data)
  }

  handleReset() {
    const { datum, onReset } = this.props
    datum.clear()
    if (onReset) onReset()
  }

  render() {
    const { layout } = this.props
    const className = classnames(
      formClass('_', layout),
      this.props.className,
    )

    return (
      <form className={className} onReset={this.handleReset} onSubmit={this.handleSubmit}>
        {this.props.children}
      </form>
    )
  }
}

Form.propTypes = {
  ...getProps('disabled'),
  datum: PropTypes.object,
  layout: PropTypes.string,
  onReset: PropTypes.func,
  onSubmit: PropTypes.func,
}

Form.defaultProps = {
  ...defaultProps,
}

export default Form
