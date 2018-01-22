import React, { Fragment, PureComponent } from 'react'
import Alert from 'shineout/Alert'

export default class extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      placeholder: '',
    }

    this.handleClose = this.handleClose.bind(this)
  }

  handleClose() {
    this.setState({
      placeholder: 'Alert was dismissed.',
    })
  }

  render() {
    const { placeholder } = this.state
    return (
      <Fragment>
        <Alert onClose>
          Alert onClose=true
        </Alert>

        <Alert onClose={this.handleClose}>
          Alert onClose=function
        </Alert>

        {
          placeholder && <Alert type="info">{placeholder}</Alert>
        }
      </Fragment>
    )
  }
}
