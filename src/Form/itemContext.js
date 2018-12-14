import React, { Component } from 'react'
import PropTypes from 'prop-types'
import createReactContext from 'create-react-context'
import immer from 'immer'
import { objectValues } from '../utils/objects'
import { errorSubscribe } from '../Datum/types'

const { Provider, Consumer } = createReactContext()

export const itemProvider = Origin => class extends Component {
  static propTypes = {
    formDatum: PropTypes.object,
  }

  constructor(props) {
    super(props)

    this.state = {
      inputs: {},
      errors: {},
    }
    this.events = {
      bindInputToItem: this.bind.bind(this),
      unbindInputFromItem: this.unbind.bind(this),
      onError: this.handleError.bind(this),
    }
    this.handleUpdate = this.handleUpdate.bind(this)
  }

  componentWillUnmount() {
    this.$willUnmount = true
  }

  handleUpdate() {
    if (this.updateTimer) clearTimeout(this.updateTimer)
    this.updateTimer = setTimeout(() => {
      if (this.$willUnmount) return
      this.forceUpdate()
    })
  }

  bind(name) {
    const names = Array.isArray(name) ? name : [name]
    const { formDatum } = this.props
    if (formDatum) {
      names.forEach((n) => {
        formDatum.subscribe(errorSubscribe(n), this.handleUpdate)
      })
    }

    this.setState(immer((state) => {
      names.forEach((n) => { state.inputs[n] = true })
    }))
  }

  unbind(name) {
    const names = Array.isArray(name) ? name : [name]
    const { formDatum } = this.props
    if (formDatum) {
      names.forEach((n) => {
        formDatum.unsubscribe(errorSubscribe(n))
      })
    }

    this.setState(immer((state) => {
      names.forEach((n) => { delete state.inputs[n] })
    }))
  }

  handleError(name, error) {
    this.setState(immer((state) => {
      state.errors[name] = error
    }))
  }

  render() {
    const { formDatum } = this.props
    const errors = []

    if (formDatum) {
      Object.keys(this.state.inputs).forEach((name) => {
        const err = formDatum.getError(name)
        if (err) errors.push(err)
      })
    }

    objectValues(this.state.errors).forEach((err) => {
      if (err) errors.push(err)
    })

    return (
      <Provider value={this.events}>
        <Origin {...this.props} formItemErrors={errors} />
      </Provider>
    )
  }
}

// eslint-disable-next-line
export const itemConsumer = Origin => (props) => {
  return (
    <Consumer>
      {events => <Origin {...props} {...events} />}
    </Consumer>
  )
}
