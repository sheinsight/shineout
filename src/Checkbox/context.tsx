import React from 'react'
import createReactContext from '../context'
import { CheckboxContextProvider, CheckboxProviderProps } from './Props'

const context = createReactContext<CheckboxContextProvider>({} as CheckboxContextProvider)

export const { Provider } = context

export const consumer = <U extends any>(
  Origin: React.ComponentType<U>
): React.FC<CheckboxProviderProps<U>> => props => (
  <context.Consumer>{value => <Origin {...props as U} {...value} />}</context.Consumer>
)
