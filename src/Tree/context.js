import React from 'react'
import createReactContext from 'create-react-context'

const context = createReactContext()

// eslint-disable-next-line
export const Provider = context.Provider

export const consumer = Origin => prop => (
  <context.Consumer>
    {
      (value) => {
        console.log(value.has(prop.id))
        return <Origin {...prop} expanded={value.has(prop.id)} />
}
    }
  </context.Consumer>
)

