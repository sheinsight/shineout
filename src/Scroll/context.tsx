import React, { ComponentType } from 'react'
import createReactContext from '../context'
import { GetScrollContextConsumerValue, ScrollContextProviderValue } from './Props'

const context = createReactContext<ScrollContextProviderValue>({})

const { Consumer } = context

// eslint-disable-next-line
export const Provider = context.Provider

export const scrollConsumer = <U extends {}>(Origin: ComponentType<U>): React.FC<GetScrollContextConsumerValue<U>> => (
  props: GetScrollContextConsumerValue<U>
) => (
  <Consumer>
    {(value = {}) => (
      <Origin {...props as U} scrollElement={value.element} scrollLeft={value.left} scrollTop={value.top} />
    )}
  </Consumer>
)
