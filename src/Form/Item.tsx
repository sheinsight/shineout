import React, { ComponentType, PureComponent } from "react"
import classnames from 'classnames'
import immer from 'immer'
import createReactContext from '../context'
import { Component } from '../component'
import { errorSubscribe, RESET_TOPIC } from '../Datum/types'
import { getGrid } from '../Grid/utils'
import { objectValues } from '../utils/objects'
import { formClass } from './styles'
import { ObjectType } from "../@types/common"
import FormDatum from '../Datum/Form'
import { FormItemContextValue, GetFormItemConsumerProps } from "./Props"



const { Provider, Consumer } = createReactContext<FormItemContextValue>({} as FormItemContextValue)

class Label extends PureComponent<{
  width?: number | string
  children: React.ReactNode
}> {
  render() {
    const { width, children } = this.props
    if (children === undefined) return null

    return (
      <div style={{ width }} className={formClass('label')}>
        {children}
      </div>
    )
  }
}

interface ItemProps {
  grid?: number | {width: number, offset: number, response: 'sm' | 'md' | 'lg' | 'xl'},
  className?: string,
  keepErrorHeight?: boolean,
  label?: string,
  labelAlign?: 'top'|'left'|'right',
  labelWidth?: string | number,
  required?: boolean,
  tip?: React.ReactNode,
  formDatum?: FormDatum<any>
  labelVerticalAlign?: 'top' | 'middle' | 'bottom'
  style: React.CSSProperties
}
interface ItemState {
  inputs: ObjectType<Boolean>
  errors: ObjectType<Error>
}

// eslint-disable-next-line
class Item extends Component<ItemProps, ItemState> {
  static defaultProps = {
    className: '',
    style: {},
    formItemErrors: [],
    keepErrorHeight: false,
}

  events: FormItemContextValue

  updateTimer: NodeJS.Timeout

  constructor(props: ItemProps) {
    super(props)

    this.state = {
      inputs: {},
      errors: {},
    }
    this.events = {
      bindInputToItem: this.bind.bind(this),
      unbindInputFromItem: this.unbind.bind(this),
      onItemError: this.handleError.bind(this),
    }
    this.handleUpdate = this.handleUpdate.bind(this)

    if (props.formDatum) props.formDatum.subscribe(RESET_TOPIC, this.handleUpdate)
  }

  getErrors() {
    const { formDatum } = this.props
    const errors: Error[] = []

    if (formDatum) {
      Object.keys(this.state.inputs).forEach(name => {
        const err = formDatum.getError(name)
        if (err) errors.push(err)
      })
    }

    objectValues(this.state.errors).forEach(err => {
      if (err) errors.push(err)
    })

    return errors
  }

  handleUpdate() {
    if (this.updateTimer) clearTimeout(this.updateTimer)
    this.updateTimer = setTimeout(() => {
      this.forceUpdate()
    })
  }

  bind(name: string) {
    const names = Array.isArray(name) ? name : [name]
    const { formDatum } = this.props
    if (formDatum) {
      names.forEach(n => {
        formDatum.subscribe(errorSubscribe(n), this.handleUpdate)
      })
    }

    this.setState(
      immer(state => {
        names.forEach(n => {
          state.inputs[n] = true
        })
      })
    )
  }

  unbind(name: string) {
    const names = Array.isArray(name) ? name : [name]
    const { formDatum } = this.props
    if (formDatum) {
      names.forEach(n => {
        formDatum.unsubscribe(errorSubscribe(n))
      })
    }

    this.setState(
      immer(state => {
        names.forEach(n => {
          delete state.inputs[n]
        })
      })
    )
  }

  handleError(name: string, error: Error) {
    this.setState(
      immer(state => {
        state.errors[name] = error
      })
    )
  }

  renderHelp(errors: Error[]) {
    if (errors.length > 0) {
      return (
        <div className={formClass('error')}>
          {errors.map((e, i) => (
            <div key={i}>{e.message}</div>
          ))}
        </div>
      )
    }

    const { tip } = this.props
    if (!tip) return null
    return <div className={formClass('tip')}>{tip}</div>
  }

  render() {
    const {
      children,
      grid,
      label,
      labelAlign,
      labelVerticalAlign,
      labelWidth,
      required,
      style,
      keepErrorHeight,
    } = this.props

    const errors = this.getErrors()
    const className = classnames(
      getGrid(grid),
      formClass(
        'item',
        required && 'required',
        errors.length > 0 && 'invalid',
        labelVerticalAlign && `label-vertical-align-${labelVerticalAlign}`,
        keepErrorHeight && `item-keep-height`,
        ['top', 'right', 'left'].indexOf(labelAlign || '') >= 0 && `label-align-${labelAlign}`
      ),
      this.props.className
    )

    return (
      <Provider value={this.events}>
        <div className={className} style={style}>
          <Label width={labelWidth}>{label}</Label>
          <div className={formClass('control')}>
            {children}
            {this.renderHelp(errors)}
          </div>
        </div>
      </Provider>
    )
  }
}


export default Item

// eslint-disable-next-line
export const itemConsumer = <U, >(Origin: ComponentType<U>): React.FC<GetFormItemConsumerProps<U>> =>  (props) => {
  return <Consumer>{events => <Origin {...props as U} {...events} />}</Consumer>
}
