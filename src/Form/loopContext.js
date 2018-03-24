import React, { PureComponent } from 'react'
import createReactContext from 'create-react-context'

const { Provider, Consumer } = createReactContext()

export const loopProvider = Origin => class extends PureComponent {
  constructor(props) {
    super(props)
    this.validations = []

    this.contextValue = {
      bind: this.bind.bind(this),
      unbind: this.unbind.bind(this),
    }

    this.validate = this.validate.bind(this)
  }

  bind(validate) {
    if (this.validations.indexOf(validate) < 0) {
      this.validations.push(validate)
    }
  }

  unbind(validate) {
    this.validations = this.validations.filter(v => v !== validate)
  }

  validate() {
    return Promise.all(this.validations.map(v => v()))
  }

  render() {
    return (
      <Provider value={this.contextValue}>
        <Origin {...this.props} validate={this.validate} />
      </Provider>
    )
  }
}

// eslint-disable-next-line
export const loopConsumer = Origin => class extends PureComponent {
  render() {
    return (
      <Consumer>
        { value => <Origin {...this.props} loopContext={value} /> }
      </Consumer>
    )
  }
}
