import { CSSProperties, ReactElement, ReactNode } from "react"

import {ConfigType} from "../hoc/Props"

export type SpinName = 'default' |
  'chasing-dots' |
  'cube-grid' |
  'double-bounce' |
  'fading-circle' |
  'four-dots' |
  'plane' |
  'pulse' |
  'ring' |
  'scale-circle' |
  'three-bounce' |
  'wave'|
  'chasing-ring'

export interface OriginSpinProps {
  wrapperClass?: string,
  wrapperStyle?: CSSProperties,

  size: number | string,
  color?: string
  // renderOption
  spinClass: (...args: (string | undefined)[])=>string,
  render?: (spinClass: OriginSpinProps['spinClass'], i: number, props: OriginSpinProps) => ReactNode,
  style?: CSSProperties,
  count?: number,
  itemStyle?: CSSProperties
  itemClass?: string
  itemSize?: number | string,
}

export interface TypeSpinProps extends Omit<OriginSpinProps, 'style' | 'spinClass' | 'count' | 'render' | 'itemStyle' | 'itemClass' | 'itemSize'> {
}

export interface SpinProps extends Omit<TypeSpinProps, 'size'> {
  style?: CSSProperties,
  className?: string,
  name?: SpinName,
  tip?: ReactElement
  children?: ReactElement
  size?: number | string,
  loading?: boolean
}

export type SpinPropsWithHoc =  ConfigType<SpinProps>


