import React from 'react'
import createReactContext from '../context'

const context = createReactContext()

const { Consumer } = context

// eslint-disable-next-line
export const Provider = context.Provider

export const consumer = Origin => props => (
  <Consumer>{({ bindItem, unbindItem }) => <Origin {...props} unbindItem={unbindItem} bindItem={bindItem} />}</Consumer>
)
