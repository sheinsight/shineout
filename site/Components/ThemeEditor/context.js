import React from 'react'
import createReactContext from 'shineout/context'

export const context = createReactContext()

// eslint-disable-next-line
export const Provider = context.Provider

export const consumer = Origin => props => (
  <context.Consumer>{value => <Origin {...props} {...value} />}</context.Consumer>
)
