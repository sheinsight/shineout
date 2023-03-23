import * as React from 'react'

export interface StandardProps {
  /**
   * @en extend className
   * @cn 扩展 className
   *
   */
  className?: string

  /**
   * @en Container element style
   * @cn 最外层扩展样式
   */
  style?: React.CSSProperties
}

export type KeygenResult = string | number

export type KeygenType<DataItem> = ObjectKey<DataItem> | ((data: DataItem, index?: number) => KeygenResult) | true
export type StructKeygenType<DataItem> = ObjectKey<DataItem> | ((data: DataItem, index?: number) => KeygenResult)

/**
 * 目前已知的最为简短的写法: @see https://github.com/Microsoft/TypeScript/issues/29729#issuecomment-1082546550
 * 在类型守卫中会存在问题: @see https://github.com/Microsoft/TypeScript/issues/29729#issuecomment-1082791844
 */
export type ObjectKey<T = any> = T extends ObjectType ? (keyof T & string) : never
export declare namespace RegularAttributes {
  type Size = 'small' | 'default' | 'large'
  type Type = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
  type Align = 'left' | 'center' | 'right'
  type ListPosition = 'drop-down' | 'drop-up'
}

export type ObjectType<V = any> = { [name: string]: V }

export type ValueOf<T> = T[keyof T]

export type ForceAdd<U extends {}, V> = U & Omit<V, keyof U>

// 选出 U 中存在的 Keys
export type ExistKey<U, Keys extends string> = Omit<U, keyof Omit<U, Keys>>

// 将 U 中 存在的 keys 变成可选
export type PartialKeys<U, keys extends string> = Omit<U, keys> & Partial<ExistKey<U, keys>>

export type ValueArr<Value> = Value extends any[] ? Value : Value[]

export type ValueItem<Value> = Value extends (infer U)[] ? U : Value

export interface UnMatchedValue {
  IS_NOT_MATCHED_VALUE: boolean
  value: any
}
export type ResultItem<DataItem> = DataItem | UnMatchedValue
