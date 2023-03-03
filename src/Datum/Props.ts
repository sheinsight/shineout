import { FormItemRule } from '../Rule/Props'
import { ForceAdd, ObjectKey, ObjectType } from '../@types/common'
import { ValidType } from './types'

interface RuleObject {
  [name: string]: FormItemRule<any> | RuleObject
}
export interface FormValid {
  (v: any, formValue: ObjectType, type?: ValidType): Promise<any>
  (type?: ValidType): Promise<any>
}

export interface FormDatumOptions<V extends {}> {
  /**
   * When removeUndefined is true, remove undefined value on submit.
   *
   * 是否删除值为 undefined 的字段，默认值为删除
   *
   * default: true
   */
  removeUndefined?: boolean
  rules?: RuleObject
  onChange?: (value: V) => void
  value?: V
  error?: { [name: string]: string | Error }
  initValidate?: boolean
  defaultValue?: V
}

export interface ListDatumOptions<DataItem, Value> {
  value?: Value
  onChange?: (value: Value, data?: DataItem, checked?: boolean) => void

  /**
   * @en set with multiple, value will separator by this
   * @cn 多选情况下设置后，value 会处理为 separator 分隔的字符串。
   */
  separator?: string
  /**
   * @inner 内部属性，用于单选
   */
  limit?: number
  /**
   * @inner 内部属性，用于单选取消
   */
  distinct?: boolean
  /**
   * @en By default, the result of the format function is used to compare whether it matches. In some cases (for example, whe an object that returns the original data is updated, an different option with the same value  is generated), the prediction function needs to be used to determine whether match
   * @cn (val, d) => val===format(d) | 默认使用 format 函数执行的结果来比较是否匹配，在某些情况下（例如返回原始数据的对象，更新数据时，生成了一个值相同，非同一个对象的选项），需要借助 prediction 函数来判断是否匹配
   * @default (val, d) => val===format(d)
   */
  prediction?: (value: Value extends (infer U)[] ? U : Value, data: DataItem) => boolean
  /**
   * @en When the value is true, disabled all checkboxes; When the value is function, disable the checkbox that this function returns true.
   * @cn 如果 disabled 为 true，禁用全部选项，如果 disabled 为函数，根据函数反回结果禁用选项
   * @default false
   * @override ((data: Item) => boolean) | boolean
   */
  disabled?: ((data: DataItem, ...rest: any) => boolean) | boolean

  /**
   * @en Format value. The defaule value is return the original data. When it is a string, the value is fetched from the original data as a key equivalent to (d) => d[format] When it is a function, use its return value.
   * @cn 格式化 value。 默认值，返回原始数据。 为string时，会作为key从原始数据中获取值，相当于 (d) => d[format]。为函数时，以函数返回结果作为 value。
   * @default: d => d
   * @override ObjectKey<Item> | ((data: Item) => Value extends (infer U)[] ? U : Value)
   */
  format?: ObjectKey<DataItem> | ((data: DataItem) => Value extends (infer U)[] ? U : Value)
}

export interface DatumHocOptions<Props> {
  type: 'list' | 'form'
  key: keyof Props & string
  limit: number
  bindProps: (keyof Props)[]
  ignoreUndefined: boolean
  pure: boolean
}

export interface DatumBaseProps {
  onChange?: unknown
  datum?: unknown
  disabled?: unknown
}

export interface DatumAddProps {
  /**
   * @inner 内部属性
   */
  onDatumBind?: (datum: ObjectType) => void
  /**
   * @inner 内部属性
   */
  datum?: ObjectType
}

export type GetDatumProps<U> = DatumAddProps & {
  initValidate?: boolean
} & Omit<U, keyof DatumAddProps>

export type GetDatumListProps<
  U,
  DataItem,
  Value,
  Keys extends keyof ListDatumOptions<DataItem, Value>
> = DatumAddProps &
  Omit<ForceAdd<U, Pick<ListDatumOptions<DataItem, Value>, Keys | 'onChange' | 'value'>>, keyof DatumAddProps>

export type GetDatumFormProps<U, Value, Keys extends keyof FormDatumOptions<Value>> = DatumAddProps &
  Omit<
    ForceAdd<U, Pick<FormDatumOptions<Value>, Keys | 'onChange' | 'value' | 'initValidate' | 'defaultValue'>>,
    keyof DatumAddProps
  >
