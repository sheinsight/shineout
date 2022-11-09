import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Block from './Block'

class BlockField extends PureComponent {
  constructor(props) {
    super(props)
    console.warn('Form.BlockField is not recommend. Use Form.FieldSet instead.')
  }

  render() {
    const { children, ...other } = this.props
    return <Block {...other}>{children}</Block>
  }
}

BlockField.propTypes = {
  children: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.any,
}

export default BlockField
