import React from 'react'
import createReactContext from 'create-react-context'

const context = createReactContext()

// eslint-disable-next-line
export const Provider = context.Provider

export const consumer = Origin => prop => (
  <context.Consumer>
    {value => <Origin {...prop} expanded={value.indexOf(prop.id) >= 0} />}
  </context.Consumer>
)

