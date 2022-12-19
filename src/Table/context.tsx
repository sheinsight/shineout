import React, { ComponentType } from 'react'
import createReactContext from '../context'
import { getTableConsumerProps } from './Props'

const context = createReactContext<boolean | undefined>(undefined)

// eslint-disable-next-line
export const Provider = context.Provider

const consumer = <Props extends { absolute?: any }>(
  Origin: ComponentType<Props>
): React.FC<getTableConsumerProps<Props>> => props => (
  <context.Consumer>
    {value => {
      const mp = Object.assign({}, props, value && props.absolute === undefined && { absolute: true })
      return <Origin {...mp} />
    }}
  </context.Consumer>
)

export default consumer
