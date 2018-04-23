import React from 'react'
import createReactContext from 'create-react-context'

const context = createReactContext()

// eslint-disable-next-line
export const Provider = context.Provider

export const consumer = Origin => props => (
  <context.Consumer>
    {onClick => <Origin {...props} onClick={onClick} />}
  </context.Consumer>
)
