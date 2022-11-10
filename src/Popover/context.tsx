import React, { ComponentType } from 'react'
import createReactContext from '../context'
import { GetPopoverConsumerProps, PopoverContextValue } from './Props'

const context = createReactContext<PopoverContextValue | undefined>(undefined)

const { Consumer } = context

// eslint-disable-next-line
export const Provider = context.Provider

export const consumer = <P extends {}>(Origin: ComponentType<P>) => (props: GetPopoverConsumerProps<P>) => (
  <Consumer>{bindChain => <Origin {...props as P} bindChain={bindChain} />}</Consumer>
)
