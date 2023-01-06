import React from 'react'
import createReactContext from '../context'

const context = createReactContext<any>(undefined)

// eslint-disable-next-line
export const Provider = context.Provider

export const consumer = (Origin: React.ComponentType) => (props: any) => (
  <context.Consumer>{value => <Origin {...props} {...value} />}</context.Consumer>
)
