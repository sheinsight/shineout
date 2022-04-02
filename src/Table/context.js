import React from 'react'
import createReactContext from '../context'

const context = createReactContext()

// eslint-disable-next-line
export const Provider = context.Provider

const consumer = Origin => props => (
  <context.Consumer>
    {value => {
      // eslint-disable-next-line react/prop-types
      const mp = Object.assign({}, props, value && props.absolute === undefined && { absolute: true })
      return <Origin {...mp} />
    }}
  </context.Consumer>
)

export default consumer
