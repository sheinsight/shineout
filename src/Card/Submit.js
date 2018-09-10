import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Button from '../Button'

class Submit extends PureComponent {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    setTimeout(() => {
      this.props.onSubmit()
    }, 50)
  }

  render() {
    const {
      onSubmit, loading, children, formStatus, ...other
    } = this.props
    return (
      <Button
        type="primary"
        {...other}
        disabled={formStatus === 'disabled'}
        loading={formStatus === 'pending' || loading}
        onClick={this.handleClick}
      >
        { children }
      </Button>
    )
  }
}

Submit.propTypes = {
  children: PropTypes.any,
  formStatus: PropTypes.string,
  loading: PropTypes.bool,
  onCollapse: PropTypes.func,
  onSubmit: PropTypes.func,
}

export default Submit
