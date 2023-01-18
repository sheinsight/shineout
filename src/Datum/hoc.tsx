import React from 'react'
import { curry } from '../utils/func'
import { capitalize } from '../utils/strings'
import { IGNORE_VALIDATE, WITH_OUT_DISPATCH } from './types'
import List from './List'
import Form from './Form'
import { ObjectType } from '../@types/common'
import { DatumBaseProps, DatumHocOptions, GetDatumProps } from './Props'

const types = {
  form: Form,
  list: List,
}

export default curry(<U extends DatumBaseProps>(options: DatumHocOptions<U>, Origin: React.ComponentType<U>) => {
  const { type = 'list', key = 'value', limit = 0, bindProps = [], ignoreUndefined, pure = true } = options || {}
  const Datum = types[type]
  const Component = pure ? React.PureComponent : React.Component

  return class extends Component<GetDatumProps<U>> {
    static defaultProps: any = {
      initValidate: false,
    }

    datum: ObjectType

    prevValues: any

    constructor(props: GetDatumProps<U>) {
      super(props)
      const { datum, onChange, initValidate } = props

      if (datum instanceof Datum) {
        this.datum = datum
      } else {
        const ops = bindProps.reduce(
          (o: any, k) => {
            o[k] = props[k as keyof GetDatumProps<U>]
            return o
          },
          { limit, initValidate }
        )
        if (key in props) {
          ops[key] = props[key as keyof GetDatumProps<U>]
        }
        if (`default${capitalize(key)}` in props) {
          ops[`default${capitalize(key)}`] = props[`default${capitalize(key)}` as keyof GetDatumProps<U>]
        }
        this.datum = new (Datum as any)(Object.assign(ops, datum))
      }

      if (onChange) {
        this.datum.onChange = onChange
      }
    }

    componentDidMount() {
      this.datum.setLock(false)
      this.prevValues = this.props[key as keyof GetDatumProps<U>]
    }

    componentDidUpdate(prevProps: GetDatumProps<U>) {
      // update datum.onchange
      this.datum.setLock(false)
      if (prevProps.onChange !== this.props.onChange) {
        this.datum.onChange = this.props.onChange
      }
    }

    setValue(t?: string) {
      const values = this.props[key as keyof GetDatumProps<U>]
      if (ignoreUndefined && values === undefined) return
      this.datum.setValue(values, t)
    }

    render() {
      const { onDatumBind, ...props } = this.props
      if (onDatumBind) onDatumBind(this.datum)
      if (bindProps.includes('disabled')) {
        this.datum.setDisabled(props.disabled)
      }
      const values = this.props[key as keyof GetDatumProps<U>]
      if (type === 'form' && values !== this.prevValues) {
        this.setValue(this.props.initValidate ? undefined : IGNORE_VALIDATE)
        this.datum.setLock(true)
        this.prevValues = values
      }

      if (type === 'list') this.setValue(WITH_OUT_DISPATCH)
      // delete props[key]

      return <Origin {...props as U} datum={this.datum} />
    }
  }
})
