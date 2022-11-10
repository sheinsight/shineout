import React from 'react'
import Component from './Rate'
import inputable from '../Form/inputable'
import { OriginRateProps, ArgProps } from './Props'

type InnerProps = Omit<OriginRateProps, keyof ArgProps>
export default (background: ArgProps['background'], front: ArgProps['front'], opts: Partial<InnerProps> = {}) => {
  const Rate = inputable((props: InnerProps) => (
    <Component {...opts as InnerProps} {...props} background={background} front={front || background} />
  ))
  Rate.displayName = 'ShineoutRate'
  return Rate
}
