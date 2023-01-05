import React from 'react'
import createReactContext from '../context'
import { StickyProps } from './Props'

const context = createReactContext({})

// eslint-disable-next-line
export const Provider = context.Provider

export const consumer = (Origin: React.ComponentType<StickyProps>) => (props: StickyProps) => (
  <context.Consumer>{value => <Origin {...props} {...value} />}</context.Consumer>
)
