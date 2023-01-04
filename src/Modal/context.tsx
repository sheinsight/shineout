import React from 'react'
import createReactContext from '../context'

const context = createReactContext({})

// eslint-disable-next-line
export const Provider = context.Provider

<<<<<<<< HEAD:src/Table/context.tsx
interface AbsoluteProps {
  absolute?: boolean
}

export type GetAbsoluteProps<P> = Omit<P, 'absolute'> & AbsoluteProps

const consumer = <T, >(Origin: React.ComponentType<T>): React.FC<T> => (props:T & AbsoluteProps) => (
  <context.Consumer>
    {value => {
      // eslint-disable-next-line react/prop-types
      const mp = Object.assign({}, props, value && props.absolute === undefined && { absolute: true })
      return <Origin {...mp as T} />
========
const consumer = <Props extends {}>(Origin: React.ComponentType<Props>) => (
  props: Props & { absolute: string; zIndex: number }
) => (
  <context.Consumer>
    {value => {
      // eslint-disable-next-line react/prop-types
      const mp = Object.assign({}, props, value && props.absolute && props.zIndex === undefined && { zIndex: 1051 })
      return <Origin {...mp} />
>>>>>>>> feat-2.0:src/Modal/context.tsx
    }}
  </context.Consumer>
)

export default consumer
