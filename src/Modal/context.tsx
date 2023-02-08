import React from 'react'
import createReactContext from '../context'

const context = createReactContext({})

// eslint-disable-next-line
export const Provider = context.Provider

const consumer = <Props extends {}>(Origin: React.ComponentType<Props>) => (
  props: Props & { absolute: string; zIndex: number }
) => (
  <context.Consumer>
    {value => {
      const mp = Object.assign({}, props, value && props.absolute && props.zIndex === undefined && { zIndex: 1051 })
      return <Origin {...mp} />
    }}
  </context.Consumer>
)

export default consumer
