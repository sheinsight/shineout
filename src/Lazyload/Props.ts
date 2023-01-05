import { ReactNode } from 'react'

export interface LazyloadProps {
  children?: ReactNode
  placeholder?: ReactNode
  container?: HTMLElement
  offset?: number
}
