import React from 'react'
import createReactContext from '../context'

const context = createReactContext({})

// eslint-disable-next-line
export const Provider = context.Provider

const consumer = <U,>(Origin: React.ComponentType<U>): React.FC<U> => (props: U & { absolute?:boolean}) => (
  <context.Consumer>
    {value => {
      const mp = Object.assign({}, props, value && props.absolute === undefined && { absolute: true })
      return <Origin {...mp as U} />
    }}
  </context.Consumer>
)

export default consumer
