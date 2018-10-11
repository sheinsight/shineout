import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Button from './Button'

class OnceButton extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      loading: props.loading,
    }

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e) {
    const { onClick } = this.props
    this.setState({ loading: true })
    if (onClick) onClick(e)
  }

  render() {
    return (
      <Button
        {...this.props}
        loading={this.state.loading}
        onClick={this.handleClick}
      />
    )
  }
}

OnceButton.propTypes = {
  loading: PropTypes.bool,
  onClick: PropTypes.func,
}

export default OnceButton
