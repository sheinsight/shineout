import React, { PureComponent } from "react"
import Button from '../Button'
import {CardSubmitProps} from './interface'
import {CardContextValueType} from './context'

type CardSubmitPropsWithProvider = CardSubmitProps & Pick<CardContextValueType, 'onSubmit' | 'formStatus'>

class Submit extends PureComponent<CardSubmitPropsWithProvider> {
  constructor(props: CardSubmitPropsWithProvider) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e: React.MouseEvent) {
    e.persist()
      setTimeout(() => {
        if (this.props.onSubmit) this.props.onSubmit(e.target)

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

export default Submit
