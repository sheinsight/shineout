import React from 'react'
import createReactContext from 'create-react-context'

const context = createReactContext()

const { Consumer } = context

// eslint-disable-next-line
export const Provider = context.Provider

export const consumer = Origin => props => (
  <Consumer>
    {
      ({ bindItem, unbindItem }) => (
        <Origin
          {...props}
          bindItem={bindItem}
          unbindItem={unbindItem}
        />
      )
    }
  </Consumer>
)
