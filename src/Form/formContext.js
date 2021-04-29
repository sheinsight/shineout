import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import createReactContext from '../context'
import { curry } from '../utils/func'
import { deepGet } from '../utils/objects'
import { isObject, isArray } from '../utils/is'
import convert from '../Rule/convert'
import { RULE_TYPE } from '../Rule'

const context = createReactContext()

const isRule = rules => {
  if (!isObject(rules)) return false
  return rules.$$type === RULE_TYPE
}

// eslint-disable-next-line
export const Provider = context.Provider
// eslint-disable-next-line
export const Consumer = context.Consumer

export const formProvider = Origin => {
  class FormProvider extends PureComponent {
    constructor(props) {
      super(props)
      this.combineRules = this.combineRules.bind(this)
      this.groupValidate = this.groupValidate.bind(this)
    }

    getRulesFromString(str) {
      const { rule } = this.props
      if (!isRule(rule)) {
        console.error(new Error('Form rule is missed or is not a Rule instance.'))
        return []
      }
      if (!str) return []
      return convert(rule, str)
    }

    combineRules(name, propRules) {
      const { rules } = this.props
      let newRules = []
      if (isObject(rules) && name) {
        newRules = deepGet(rules, name) || []
      } else if (isArray(rules)) {
        newRules = rules
      }

      if (typeof propRules === 'string') {
        newRules = newRules.concat(this.getRulesFromString(propRules))
      } else if (isArray(propRules)) {
        newRules = newRules.concat(propRules)
      }

      return newRules
    }

    groupValidate(name) {
      // not implement...
    }

    render() {
      const { datum, labelAlign, labelVerticalAlign, labelWidth, disabled, pending, mode } = this.props
      const value = {
        formDatum: datum,
        formMode: mode,
        disabled: disabled || pending,
        labelAlign,
        labelVerticalAlign,
        labelWidth,
        combineRules: this.combineRules,
        groupValidate: this.groupValidate,
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
    labelVerticalAlign: PropTypes.string,
    labelWidth: PropTypes.any,
    mode: PropTypes.string,
    pending: PropTypes.bool,
    rule: PropTypes.object,
    rules: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  }

  return FormProvider
}

export const formConsumer = curry((keys, Origin, props) => {
  const filterProps = value => {
    const cps = {}
    if (!value) return cps
    if (!keys) return value

    keys.forEach(k => {
      const val = value[k]
      if (val !== undefined) cps[k] = val
    })
    return cps
  }

  return <Consumer>{value => <Origin {...filterProps(value)} {...props} />}</Consumer>
})
