import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Button from '../Button'

class Submit extends PureComponent {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    this.check()
  }

  componentDidUpdate() {
    this.check()
  }

  check() {
    if (this.props.formStatus === 'overBound') {
      console.error('Modal.Submit cannot be used when there are multiple Forms in Modal')
    }
  }

  handleClick(e) {
    e.persist()
    setTimeout(() => {
      this.props.onSubmit(e.target)
    }, 50)
  }

  render() {
    const { onSubmit, loading, children, formStatus, ...other } = this.props
    return (
      <Button
        type="primary"
        {...other}
        disabled={other.disabled || formStatus === 'disabled'}
        loading={formStatus === 'pending' || loading}
        onClick={this.handleClick}
      >
        {children}
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
