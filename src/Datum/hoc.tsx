import React from 'react'
import { curry } from '../utils/func'
import { capitalize } from '../utils/strings'
import { IGNORE_VALIDATE, WITH_OUT_DISPATCH } from './types'
import List from './List'
import Form from './Form'
import { ObjectType } from "../@types/common"

const types = {
  form: Form,
  list: List,
}
interface DatumHocOptions<Props> {
  type: 'list' | 'form'
  key:  keyof Props & string
  limit: number,
  bindProps: (keyof Props)[],
  ignoreUndefined: boolean,
  pure: boolean
}

interface BaseProps {
  onChange?: (...args: any) => void
  onDatumBind?: (datum: ObjectType) => void
  datum?: unknown
  initValidate?: boolean
  value?: any
  disabled?: boolean | ((...args: any) => boolean)
}

type filterProps = 'onDatumBind'

export default curry(<U extends BaseProps>(options: DatumHocOptions<U>, Origin: React.ComponentType<Omit<U,filterProps >>) => {
  const { type = 'list', key = 'value', limit = 0, bindProps = [], ignoreUndefined, pure = true } = options || {}
  const Datum = types[type]
  const Component = pure ? React.PureComponent : React.Component
  return class extends Component<U> {
    static defaultProps = {
      initValidate: false,
    }

    datum: ObjectType

    prevValues: any

    constructor(props: U) {
      super(props)
      const { datum, onChange, initValidate } = props

      if (datum instanceof Datum) {
        this.datum = datum
      } else {
        const ops = bindProps.reduce(
          (o: any, k) => {
            o[k] = props[k]
            return o
          },
          { limit, initValidate }
        )
        if (key in props) {
          ops[key] = props[key]
        }
        if (`default${capitalize(key)}` in props) {
          ops[`default${capitalize(key)}`] = props[`default${capitalize(key)}` as keyof  U]
        }
        this.datum = new (Datum as any)(Object.assign(ops, datum))
      }

      if (onChange) {
        this.datum.onChange = onChange
      }
    }

    componentDidMount() {
      this.datum.setLock(false)
      this.prevValues = this.props[key]
    }

    componentDidUpdate(prevProps: U) {
      // update datum.onchange
      this.datum.setLock(false)
      if (prevProps.onChange !== this.props.onChange) {
        this.datum.onChange = this.props.onChange
      }
    }

    setValue(t?: string) {
      const values = this.props[key]
      if (ignoreUndefined && values === undefined) return
      this.datum.setValue(values, t)
    }

    render() {
      const { onDatumBind, ...props } = this.props
      if (onDatumBind) onDatumBind(this.datum)
      if (bindProps.includes('disabled')) {
        this.datum.setDisabled(props.disabled)
      }
      const values = this.props[key]
      if (type === 'form' && values !== this.prevValues) {
        this.setValue(this.props.initValidate ? undefined : IGNORE_VALIDATE)
        this.datum.setLock(true)
        this.prevValues = values
      }

      if (type === 'list') this.setValue(WITH_OUT_DISPATCH)
      // delete props[key]
      return (
        <Origin {...props} datum={this.datum} />
      )
    }
  }
})
