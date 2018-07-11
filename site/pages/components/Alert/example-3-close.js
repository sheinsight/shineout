/**
 * cn - 关闭 onClose
 * en - onClose
 */
import React, { PureComponent } from 'react'
import { Alert } from 'shineout'

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
      <div>
        <Alert onClose>
          Alert onClose=true
        </Alert>

        <Alert onClose={this.handleClose}>
          Alert onClose=function
        </Alert>

        {
          placeholder && <Alert type="info">{placeholder}</Alert>
        }
      </div>
    )
  }
}
