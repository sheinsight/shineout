import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Button from '../Button'
import Spin from '../Spin'
import { consumer } from './context'

const spinStyle = { display: 'inline-block', marginRight: 8 }

class Submit extends PureComponent {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.props.onClick()
  }

  render() {
    const { onClick, loading, ...other } = this.props
    return (
      <Button type="primary" {...other} onClick={this.handleClick}>
        {
          loading &&
          <span style={spinStyle}>
            <Spin size={12} name="ring" color="#fff" />
          </span>
        }
      </Button>
    )
  }
}

Submit.propTypes = {
  loading: PropTypes.bool,
  onClick: PropTypes.func,
}

export default consumer(Submit)
