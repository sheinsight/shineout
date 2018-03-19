import React, { PureComponent } from 'react'
import immer from 'immer'
import createReactContext from 'create-react-context'

const { Provider, Consumer } = createReactContext()

export const itemProvider = Origin => class extends PureComponent {
  constructor(props) {
    super(props)

    this.state = { errors: {} }
    this.handleError = this.handleError.bind(this)
  }

  handleError(name, error) {
    this.setState(immer((state) => {
      if (!error) {
        delete state.errors[name]
      } else {
        state.errors[name] = error
      }
    }))
  }

  render() {
    return (
      <Provider value={this.handleError}>
        <Origin {...this.props} formItemErrors={this.state.errors} />
      </Provider>
    )
  }
}

// eslint-disable-next-line
export const itemConsumer = Origin => class extends PureComponent {
  createErrorHandle(fn) {
    // eslint-disable-next-line
    const { onError } = this.props
    return (name, error) => {
      if (fn) fn(name, error)
      if (onError) onError(name, error)
    }
  }

  render() {
    return (
      <Consumer>
        {fn => <Origin {...this.props} onError={this.createErrorHandle(fn)} />}
      </Consumer>
    )
  }
}
