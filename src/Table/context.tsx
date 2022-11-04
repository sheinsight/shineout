import React from 'react'
import createReactContext from '../context'

const context = createReactContext({})

// eslint-disable-next-line
export const Provider = context.Provider

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
    }}
  </context.Consumer>
)

export default consumer
