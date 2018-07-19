import React from 'react'
import createReactContext from 'create-react-context'

const context = createReactContext()

const { Consumer } = context

// eslint-disable-next-line
export const Provider = context.Provider

export const scrollConsumer = Origin => props => (
  <Consumer>
    {
      (value = {}) => (
        <Origin
          {...props}
          scrollElement={value.element}
          scrollLeft={value.left}
          scrollTop={value.top}
        />
      )
    }
  </Consumer>
)
