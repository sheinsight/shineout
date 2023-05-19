import React from 'react'
import createReactContext from '../context'
import { Component } from '../component'
import { filterProps } from '../utils/objects'
import validate from '../utils/validate'
import { wrapFormError, FormError, isSameError } from '../utils/errors'
import { ERROR_TYPE, FORCE_PASS, IGNORE_VALIDATE } from '../Datum/types'
import FieldError from './FieldError'
import { FieldSetProviderValueType, FieldSetProps, GetFieldSetConsumerProps } from './Props'

const { Provider, Consumer } = createReactContext<FieldSetProviderValueType | undefined>(undefined)

function extendName(path: string | undefined, name: string): string
function extendName(path: string | undefined, name: undefined): undefined
function extendName(path: string | undefined, name: string[]): string[]

function extendName(path: string = '', name: string | undefined | string[]): string | string[] | undefined {
  if (name === undefined) return undefined
  if (name === '') return path
  if (Array.isArray(name)) {
    return name.map(n => extendName(path, n))
  }
  return `${path}${path.length > 0 ? '.' : ''}${name}`
}

class FieldSet<Value extends any[]> extends Component<FieldSetProps<Value>, {}> {
  updateTimer: NodeJS.Timeout

  static defaultProps = {
    rules: [],
  }

  constructor(props: FieldSetProps<Value>) {
    super(props)

    this.validate = this.validate.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
  }

  componentDidMount() {
    super.componentDidMount()
    const { formDatum, name, defaultValue } = this.props
    formDatum.bind(name, this.handleUpdate, defaultValue, this.validate)
  }

  componentWillUnmount() {
    super.componentWillUnmount()
    const { formDatum, name } = this.props
    formDatum.unbind(name, this.handleUpdate)
  }

  validate(): Promise<FormError | true> {
    const { formDatum, name } = this.props
    const value = formDatum.get(name)
    const data = formDatum.getValue()
    const validateProps = filterProps(this.props, v => typeof v === 'string' || typeof v === 'number')
    // @ts-ignore
    validateProps.type = 'array'
    let rules = [...(this.props.rules || [])]
    rules = rules.concat(formDatum.getRule(name))

    if (rules.length === 0) return Promise.resolve(true)

    return validate(value, data, rules, validateProps).then(
      () => {
        this.handleError()
        return true
      },
      e => {
        this.handleError(e)
        return wrapFormError(e)
      }
    )
  }

  updateWithValidate() {
    this.validate().then(() => {
      this.forceUpdate()
    })
  }

  handleError(error?: Error) {
    const { formDatum, name, onError } = this.props
    if (isSameError(error, formDatum.getError(name, true))) return
    formDatum.setError(name, error, true)
    if (onError) onError(error)
  }

  handleUpdate(_v: any, _n: any, type?: typeof ERROR_TYPE | typeof FORCE_PASS | typeof IGNORE_VALIDATE) {
    if (this.updateTimer) clearTimeout(this.updateTimer)
    this.updateTimer = setTimeout(() => {
      if (type === ERROR_TYPE || type === FORCE_PASS || type === IGNORE_VALIDATE) {
        this.forceUpdate()
      } else {
        this.updateWithValidate()
      }
    })
  }

  handleInsert(index: number, value: Value) {
    const { formDatum, name } = this.props
    formDatum.insert(name, index, value)
    this.updateWithValidate()
  }

  handleRemove(index: number) {
    const { formDatum, name } = this.props
    formDatum.splice(name, index)
    this.updateWithValidate()
  }

  handleChange(index: number, value: Value, update?: boolean) {
    const { formDatum, name } = this.props
    formDatum.set(`${name}[${index}]`, value)
    if (update) this.updateWithValidate()
  }

  render() {
    const { children, formDatum, name, empty, defaultValue } = this.props

    const errors = formDatum.getError(name)
    const result = []

    if (typeof children !== 'function') {
      return (
        <Provider value={{ path: name, val: this.validate }}>
          {children}
          {errors instanceof Error && <FieldError key="error" error={errors} />}
        </Provider>
      )
    }

    let values = formDatum.get(name) || defaultValue || []
    if (values && !Array.isArray(values)) values = [values]
    if (values.length === 0 && empty) {
      result.push(empty(this.handleInsert.bind(this, 0)))
    } else {
      const errorList = (Array.isArray(errors) ? errors : [errors]).filter(Boolean)
      values.forEach((v: Value[number], i: number) => {
        result.push(
          <Provider key={i} value={{ path: `${name}[${i}]`, val: this.validate }}>
            {children({
              list: values,
              value: v,
              index: i,
              error: errorList,
              datum: formDatum,
              onChange: this.handleChange.bind(this, i),
              onInsert: this.handleInsert.bind(this, i),
              onAppend: this.handleInsert.bind(this, i + 1),
              onRemove: this.handleRemove.bind(this, i),
            })}
          </Provider>
        )
      })
    }

    if (errors instanceof Error) {
      result.push(<FieldError key="error" error={errors} />)
    }

    return result
  }
}

export const fieldSetConsumer = <U extends { name?: string | string[] }>(
  Origin: React.ComponentType<U>
): React.FC<GetFieldSetConsumerProps<U>> => props => (
  <Consumer>
    {({ path, val } = {}) => (
      <Origin
        {...props as U}
        name={extendName(path, props.name as any)}
        innerFormNamePath={path}
        fieldSetValidate={val}
      />
    )}
  </Consumer>
)

export const FieldSetProvider = Provider

export default fieldSetConsumer(FieldSet)
