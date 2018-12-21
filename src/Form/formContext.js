import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import createReactContext from 'create-react-context'
import { curry } from '../utils/func'
import { deepGet } from '../utils/objects'
import { isObject, isArray } from '../utils/is'
import convert from '../Rule/convert'

const context = createReactContext()

// eslint-disable-next-line
export const Provider = context.Provider
// eslint-disable-next-line
export const Consumer = context.Consumer

export const formProvider = (Origin) => {
  class FormProvider extends PureComponent {
    constructor(props) {
      super(props)
      this.combineRules = this.combineRules.bind(this)
    }

    getRulesFromString(str) {
      const { rule } = this.props
      if (!str || !rule) return []
      return convert(rule, str)
    }

    combineRules(name, propRules = [], inline) {
      const { rules } = this.props
      let newRules = []
      if (isObject(rules) && name) {
        newRules = deepGet(rules, name) || []
      } else if (isArray(rules)) {
        newRules = rules
      }

      return [...propRules, ...newRules, ...this.getRulesFromString(inline)]
    }

    render() {
      const {
        datum, labelAlign, labelWidth, disabled, pending, mode,
      } = this.props
      const value = {
        formDatum: datum,
        formMode: mode,
        disabled: disabled || pending,
        labelAlign,
        labelWidth,
        combineRules: this.combineRules,
      }

      return (
        <Provider value={value}>
          <Origin {...this.props} />
        </Provider>
      )
    }
  }

  FormProvider.propTypes = {
    datum: PropTypes.object,
    disabled: PropTypes.bool,
    labelAlign: PropTypes.string,
    labelWidth: PropTypes.any,
    mode: PropTypes.string,
    pending: PropTypes.bool,
    rule: PropTypes.object,
    rules: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
    ]),
  }

  return FormProvider
}

export const formConsumer = curry((keys, Origin, props) => {
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
      {value => <Origin {...filterProps(value)} {...props} />}
    </Consumer>
  )
})
