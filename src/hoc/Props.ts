export type MovableType<U> = U & {
  moveable?: boolean
}

export type ResizableType<Props>  = Props & {
  resizable?: boolean | string
}

export type ConfigType<Props>  = Props
