import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { getProps, defaultProps } from '../utils/proptypes'

class Form extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    return (
      <form>
        {this.props.children}
      </form>
    )
  }
}

Form.propTypes = {
  ...getProps('disabled'),
  onSubmit: PropTypes.func,
}

Form.defaultProps = {
  ...defaultProps,
}

export default Form
