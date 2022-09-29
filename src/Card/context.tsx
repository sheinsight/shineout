import React from 'react'
import createReactContext from '../context'

export type CardContextValueType = {
  collapsed?: boolean
  onCollapse?: ()=> void
  collapsible?: string | boolean
  formStatus?: string,
  onSubmit?: (value: any) => void,
  setFormStatus?: (status: string) => void,
}

const context = createReactContext<CardContextValueType>({})



export const {Provider} = context

function filterProps<U extends {}, V extends keyof U>(props: U, keys: V[]) {
  if (!props) return {}

  const value: Partial<U> = {}
  keys.forEach((k) => {
    value[k as keyof U] = props[k as keyof U]
  })
  return value as Pick<U, V>
}

export const consumer = <U, V extends keyof U>(Origin: React.ComponentType<U>, keys: V[] = []) => (props: Omit<U, V>) => (
  <context.Consumer>{(value: Pick<U, V>) => <Origin {...props as U} {...filterProps(value, keys)} />}</context.Consumer>
)
