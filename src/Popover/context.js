import React from 'react'
import createReactContext from '../context'

const context = createReactContext()

const { Consumer } = context

// eslint-disable-next-line
export const Provider = context.Provider

export const consumer = Origin => props => (
  <Consumer>{bindChain => <Origin {...props} bindChain={bindChain} />}</Consumer>
)
