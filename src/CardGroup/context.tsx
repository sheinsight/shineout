import React from 'react'
import createReactContext from '../context'
import { CardContextValueType, GetCardConsumerProps } from './Props'

const context = createReactContext<CardContextValueType>({})

// eslint-disable-next-line
export const Provider = context.Provider

export const consumer = <U extends {}>(Origin: React.ComponentType<U>) => (props: GetCardConsumerProps<U>) => (
  <context.Consumer>{(value: CardContextValueType) => <Origin {...props as U} {...value} />}</context.Consumer>
)
