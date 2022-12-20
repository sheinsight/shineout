import React from 'react'
import createReactContext from '../context'
import { MenuProvider, MenuProviderProps } from './Props'

const context = createReactContext<MenuProvider>({} as MenuProvider)

const { Consumer } = context

// eslint-disable-next-line
export const Provider = context.Provider

export const consumer = <U extends {}>(Origin: React.ComponentType<U>): React.FC<MenuProviderProps<U>> => props => (
  <Consumer>
    {({ bindItem, unbindItem }) => <Origin {...props as U} unbindItem={unbindItem} bindItem={bindItem} />}
  </Consumer>
)
