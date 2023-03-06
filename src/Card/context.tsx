import React from 'react'
import createReactContext from '../context'
import { CardContextValueType } from './Props'

const context = createReactContext<CardContextValueType>({} as CardContextValueType)

export const { Provider } = context

function filterProps<U extends {}, V extends keyof U>(props: U, keys: V[]) {
  if (!props) return {}

  const value: Partial<U> = {}
  keys.forEach(k => {
    value[k as keyof U] = props[k as keyof U]
  })
  return value as Pick<U, V>
}

export const consumer = <U, V extends keyof CardContextValueType>(Origin: React.ComponentType<U>, keys: V[] = []) => (
  props: Omit<U, V>
) => (
  <context.Consumer>
    {(value: CardContextValueType) => <Origin {...props as U} {...filterProps(value, keys)} />}
  </context.Consumer>
)
