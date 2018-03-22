import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import createReactContext from 'create-react-context'
import { curry } from '../utils/func'

const context = createReactContext()

// eslint-disable-next-line
export const Provider = context.Provider
// eslint-disable-next-line
export const Consumer = context.Consumer

export const formProvider = (Origin) => {
  function FormProvider(props) {
    const { datum, labelWidth, disabled } = props
    const value = {
      formDatum: datum,
      disabled,
      labelWidth,
    }

    return (
      <Provider value={value}>
        <Origin {...props} />
      </Provider>
    )
  }

  FormProvider.propTypes = {
    datum: PropTypes.object,
    disabled: PropTypes.bool,
    labelWidth: PropTypes.any,
  }

  return FormProvider
}

export const formConsumer = curry((keys, Origin) => class extends PureComponent {
  render() {
    const filterProps = (value) => {
      const cps = {}
      if (!value) return cps
      if (!keys) return value

      keys.forEach((k) => {
        const val = value[k]
        if (val !== undefined) cps[k] = val
      })
      return cps
    }
    return (
      <Consumer>
        {value => <Origin {...this.props} {...filterProps(value)} />}
      </Consumer>
    )
  }
})
