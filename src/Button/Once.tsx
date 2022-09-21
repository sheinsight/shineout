import React, { PureComponent } from 'react'
import Button from './Button'
import { ButtonProps } from './interface'

class OnceButton extends PureComponent<ButtonProps, { loading?: boolean }> {
  constructor(props: ButtonProps) {
    super(props)

    this.state = {
      loading: props.loading,
    }

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e: React.MouseEvent<HTMLElement>) {
    const { onClick } = this.props
    this.setState({ loading: true })
    if (onClick) onClick(e)
  }

  render() {
    return <Button {...this.props} loading={this.state.loading} onClick={this.handleClick} />
  }
}

export default OnceButton
