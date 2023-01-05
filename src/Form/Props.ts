import React, { ReactNode } from 'react'
import { FormError } from '../utils/errors'
import FormDatum from '../Datum/Form'
import { ForceAdd, ObjectType, StandardProps, RegularAttributes, PartialKeys } from '../@types/common'
import { FormItemRule } from '../Rule/Props'
import { ButtonProps } from '../Button/Props'
import { CardConsumerType } from '../Card/Props'
import { GetDatumFormProps } from '../Datum/Props'

export interface RuleObject {
  [name: string]: FormItemRule<any> | RuleObject
}
export interface FormRef<Value> {
  getValue: () => Value
  validate: () => Promise<any>
  validateFields: (fields: string | string[]) => Promise<any>
  validateFieldsWithError: (fields: string | string[]) => Promise<any>
  clearValidate: () => void
  submit: (withValidate?: boolean) => void
  reset: () => void
}
/** ----------------fieldSet-----------------------* */
export interface FieldSetChildrenFunc<Value = any> {
  (
    params: {
      list: any
      value: Value
      onChange: (value: Value) => void
      onRemove: () => void
      index: number
      onInsert: (value: Value) => void
      onAppend: (value: Value) => void
      error: Error[]
      datum: FormDatum<ObjectType>
    }
  ): React.ReactNode
}

export interface FieldSetProviderValueType {
  path?: string
  val?: () => Promise<FormError | true>
}

export interface FieldSetProps<Value = any> {
  defaultValue?: Value[]
  empty?: (onInsert: (value: Value) => void) => React.ReactNode
  formDatum: FormDatum<ObjectType>
  name: string
  onError?: (error?: Error) => void
  /**
   * Validation rules
   *
   * 校验规则
   *
   * default: none
   */
  rules?: FormItemRule<any>
  /**
   * When children type is not function, handle a set data type of object
   *
   * When children type is function, handle a group of data type of array. options property:
   *
   * list: all data of name.
   *
   * value: a single piece of data for the value obtained by name.
   *
   * onChange: a callback when the value is changing.
   *
   * onRemove: a callback when a child component is removed.
   *
   * index: the current index.
   *
   * onInsert: Insert a piece of data before the current item.
   *
   * onAppend: Insert a piece of data after the current item.
   *
   * children 不为 function，用来处理 object 类型数据，children 内的 name 会拼接 FieldSet name，如 FieldSet name 为 'a', children 元素name 为 b，children 实际处理的数据为 a.b;
   *
   * children 为 function 时，用来处理数组数据。options 属性为
   *
   * list: name 下的全部数据。
   *
   * value: 根据name获取的值的单条数据。
   *
   * onChange: 子组件数据改变回调。
   *
   * onRemove: 子组件删除回调。
   *
   * index: 当前项索引。
   *
   * onInsert: 在当前项之前插入一条数据。
   *
   * onAppend: 在当前项之后附加一条数据。
   *
   * default: required
   */
  children?: FieldSetChildrenFunc<Value> | React.ReactNode
}

export type GetFieldSetConsumerProps<U> = Omit<U, 'innerFormNamePath' | 'fieldSetValidate'>

/** ----------------formContext-----------------------* */
export interface FormContextValue {
  formDatum: FormDatum<ObjectType>
  formMode?: string
  disabled?: any
  labelAlign?: 'top' | 'left' | 'right'
  labelVerticalAlign?: 'top' | 'middle' | 'bottom'
  size?: RegularAttributes.Size
  labelWidth?: string | number
  combineRules: <U>(name: string, rule: FormItemRule<U>) => FormItemRule<U>
  keepErrorHeight?: boolean
}
export interface FormProviderProps<V extends ObjectType> {
  datum: FormDatum<V>
  disabled?: boolean
  /**
   * The default is empty, follow the theme style.
   *
   * 默认为空，跟随主题样式。
   *
   * default:
   */
  labelAlign?: 'top' | 'left' | 'right'
  /**
   * the default value is top.
   *
   * 默认顶部对齐
   *
   * default: 'top'
   */
  labelVerticalAlign?: 'top' | 'middle' | 'bottom'
  size?: RegularAttributes.Size
  /**
   * The width of label. It is invalid when labelAlign is 'top'.
   *
   * 标签宽度，labelAlign 为 'top' 时无效。
   *
   * default: 140px
   */
  labelWidth?: number | string
  /**
   * mode, with useMode
   *
   * 模式，和 useMode 配合使用
   *
   * default:
   */
  mode?: string
  pending?: boolean
  rules?: RuleObject
  /**
   * Single-line error prompt will not stretch the page height
   *
   * 单行错误提示不撑开页面高度
   *
   * default: false
   */
  keepErrorHeight?: boolean
}

export type FormContextKey = keyof FormContextValue

export type GetFormConsumerProps<U, Keys extends FormContextKey> = Omit<
  PartialKeys<U, Keys>,
  'formDatum' | 'combineRules'
>
export type GetFormProviderProps<U, Value> = ForceAdd<U, FormProviderProps<Value>>

/** ----------------formItemContext-----------------------* */
export interface FormItemContextValue {
  onItemError?: (id: string, error?: Error) => void
  bindInputToItem?: (name: string) => void
  unbindInputFromItem?: (name: string) => void
}

export type GetFormItemConsumerProps<U> = Omit<U, keyof FormItemContextValue>

/** ----------------inputable-----------------------* */
export interface BaseInputProps {
  value?: any
  onChange?: any
}

export interface InputableProps<Value> {
  beforeChange?: (value: Value | undefined, datum: FormDatum<ObjectType>) => Value | undefined
  onChange?: (value: Value | undefined, ...rest: any) => void
  onError?: (e?: Error) => void
  popover?: string
  value?: Value
  error?: Error
  // readOnly?: boolean
  disabled?: boolean
  filterSameChange?: boolean
  combineRules?: (name: string, rules?: FormItemRule<Value>) => FormItemRule<Value>
  required?: boolean
  bind?: string[]
  onItemError?: (id: string, error?: Error) => void
  bindInputToItem?: (name: string) => void
  unbindInputFromItem?: (name: string) => void
  scuSkip?: string[]
  defaultValue?: Value
  reserveAble?: boolean
  rules?: FormItemRule<Value>
  /**
   * 内部属性
   */
  formDatum?: FormDatum<ObjectType>
  fieldSetValidate?: (validator: boolean) => void
  name?: string | string[]
  forceChangeOnValueSet?: boolean
}
export type InputableFormConsumerKey = 'formDatum' | 'disabled' | 'combineRules' | 'size'
// 过滤掉原生属性required
type InputablePropsFiltered<Value> = Omit<InputableProps<Value>, 'required'>
// value 和 onChange 变为可选属性 并去掉validateHook属性
type HandleValueProps<Props extends BaseInputProps> = Omit<Props, 'value' | 'onChange' | 'validateHook'> &
  Partial<Pick<Props, 'value' | 'onChange'>>
// inputable 中增加了一些属性
type AddInputProps<Props extends BaseInputProps, Value> = ForceAdd<
  HandleValueProps<Props>,
  InputablePropsFiltered<Value>
>

type InputWidthFieldSet<Props, Value> = GetFieldSetConsumerProps<AddInputProps<Props, Value>>
type InputWidthItem<Props, Value> = GetFormItemConsumerProps<InputWidthFieldSet<Props, Value>>

type InputWidthForm<Props, Value> = GetFormConsumerProps<InputWidthItem<Props, Value>, InputableFormConsumerKey>
// consumer
export type GetInputableProps<Props extends BaseInputProps, Value> = InputWidthForm<Props, Value>

/** ----------------formMode-----------------------* */
export interface FormModeProps {
  formMode?: string
  reverse?: boolean
  children?: React.ReactNode
}

/** ----------------form-----------------------* */

export type formStatus = 'disabled' | 'pending' | ''

export interface SimpleFormProps<Value = ObjectType> extends StandardProps {
  /**
   * Form value
   *
   * Form值
   *
   * default:
   */
  value?: Value
  datum: FormDatum<ObjectType>
  /**
   * When disabled is true, all the elements in the form are disabled.
   *
   * 是否禁用，为 true 时，表单内所有元素 disabled 都为 true
   *
   * default: false
   */
  disabled?: boolean
  /**
   * When inline is true, the form is horizontal layout
   *
   * 是否水平布局
   *
   * default: false
   */
  inline?: boolean
  layout?: string
  pending?: boolean
  /**
   * callback when the error happens
   *
   * 异常回调处理
   *
   * default:
   */
  onError?: (e: Error) => void
  /**
   * Validation rules
   *
   * 校验规则
   *
   * default: none
   */
  onReset?: () => void
  /**
   * the function for Form Submission.  When the internal validation fails, it will not be triggered.
   *
   * 表单提交函数。表单内部校验失败时不会触发。
   *
   * default:
   */
  onSubmit?: (data: Value, detail?: any, event?: Event) => void

  /**
   * Validation rules
   *
   * 校验规则
   *
   * default: none
   */
  rules?: RuleObject
  /**
   * When the verification fails, whether to scroll to the first verification failure component, when the value is a number, it means the offset relative to the top
   *
   * 校验失败时是否滚动到第一个校验失败组件，该值为数字时，表示相对于顶部的偏移量
   *
   * default: false
   */
  scrollToError?: boolean | number
  setFormStatus: (status: formStatus) => void
  /**
   * ms, the interval between two submissions(Prevent repeat submission)
   *
   * ms, 两次提交间隔时长（防止重复提交）
   *
   * default: 1000
   */
  throttle?: number
  /**
   * bind form ref, Can call some form methods
   *
   * 绑定 form 的引用, 可以调用某些 form 的方法
   *
   * default: -
   */
  formRef?: ((form: FormRef<Value>) => void) | { current?: FormRef<Value> }

  error?: ObjectType<string | Error>
}

/** ----------------formItem-----------------------* */
export interface ItemProps extends StandardProps {
  grid?: number | { width: number; offset: number; response: 'sm' | 'md' | 'lg' | 'xl' }
  /**
   * Single-line error prompt will not stretch the page height
   *
   * 单行错误提示不撑开页面高度
   *
   * default: false
   */
  keepErrorHeight?: boolean
  /**
   * When it is undefined, the tag does not be rendered or occupy space. If there is no content, but it needs to be occupied, you can use an empty string ''.
   *
   * 未定义时，标签不会render，也不会占位。如果无内容需要占位，使用空字符串 ''。
   *
   * default: undefined
   */
  label?: React.ReactNode
  /**
   * The default is empty, follow the theme style.
   *
   * 默认为空，跟随主题样式。
   *
   * default:
   */
  labelAlign?: 'top' | 'left' | 'right'
  /**
   * The width of label. It is invalid when labelAlign is 'top'.
   *
   * 标签宽度，labelAlign 为 'top' 时无效。
   *
   * default: 140px
   */
  labelWidth?: string | number
  /**
   * Required tags for pure display. Do not trigger validation
   *
   * 必填标记，纯展示用，不会触发校验
   *
   * default: false
   */
  required?: boolean
  /**
   * Prompting information
   *
   * 提示文案
   *
   * default:
   */
  tip?: React.ReactNode
  formDatum?: FormDatum<any>
  labelVerticalAlign?: 'top' | 'middle' | 'bottom'
}

/** ----------------formButton-----------------------* */
export interface FormButtonProps extends Omit<ButtonProps, 'htmlType' | 'onRef'> {
  onClick?: () => void
  type?: RegularAttributes.Type
}

/** ----------------Field-----------------------* */

export interface FieldChildrenFunc<Value = any> {
  (params: { value: Value; error?: Error; onChange: (value: Value) => void; disabled?: boolean }): React.ReactNode
}
export interface FieldProps<Value> {
  cache?: boolean
  onChange: (value: Value) => void
  value: Value
  error?: Error
  disabled?: boolean
  /**
   * React components that support value and onChange or function. The function object attribute is as follows: value: The value obtained from the parent Form or Form.Block by name. error: the error information of data validation. type is Error. onChange: The callback when the value is changing.
   *
   * 支持 value 和 onChange 的 React 组件，或者函数，函数object属性如下。value: 根据 name 从上级 Form 或 Form.Block 获取的值。error：数据校验错误信息，类型为 Error。onChange: 值改变回调函数
   *
   * default: required
   */
  children?: React.ReactElement | FieldChildrenFunc<Value>
}
/** ----------------FieldError-----------------------* */
export interface FieldErrorProps {
  error?: Error | Error[]
}

/** ----------------Flow-----------------------* */

export interface FlowProps {
  children?: (datum: FormDatum<ObjectType>) => ReactNode
  formDatum: FormDatum<ObjectType>
  names?: string[]
}

/** ----------------index-----------------------* */
// Form
export type FormCardConsumerKey = 'setFormStatus'
export type FormDatumKey = 'removeUndefined' | 'error'
export type FormPropsWithCardConsumer<Value> = CardConsumerType<SimpleFormProps<Value>, FormCardConsumerKey>
export type FormPropsWithProvider<Value> = GetFormProviderProps<FormPropsWithCardConsumer<Value>, Value>
export type FormProps<Value> = GetDatumFormProps<FormPropsWithProvider<Value>, Value, FormDatumKey>

export declare class Form<Value> extends React.Component<FormProps<Value>, any> {
  static Item: typeof FormItem

  static Field: typeof FormField

  static Flow: typeof FormFlow

  static FieldSet: typeof FormFieldSet

  static Submit: React.ComponentType<FormButtonProps>

  static Reset: React.ComponentType<FormButtonProps>

  static Button: React.ComponentType<FormButtonProps>

  static formConsumer: any

  static useMode: (...args: string[]) => React.ComponentType<FormModeProps>[]

  render: () => JSX.Element
}
export type FormCompType = typeof Form

// FormItem
export type FormItemWithFormConsumerKeys =
  | 'formDatum'
  | 'labelWidth'
  | 'labelAlign'
  | 'labelVerticalAlign'
  | 'keepErrorHeight'
export type FormItemProps = GetFormConsumerProps<ItemProps, FormItemWithFormConsumerKeys>
export declare class FormItem extends React.Component<FormItemProps, any> {
  render: () => JSX.Element
}

// FormField
export type FormFieldProps<Value> = GetInputableProps<FieldProps<Value>, Value>
export declare class FormField<Value> extends React.Component<FormFieldProps<Value>, any> {
  render: () => JSX.Element
}

// FormFlow
export type FormFlowWithFormConsumerKeys = 'formDatum'
export type FormFlowProps = GetFormConsumerProps<FlowProps, FormFlowWithFormConsumerKeys>
export declare class FormFlow extends React.Component<FormFlowProps, any> {
  render: () => JSX.Element
}

// FormFieldSet
export type FormFieldSetWithFormConsumerKeys = 'formDatum'
export type FormFieldSetProps<Value> = GetFormConsumerProps<FieldSetProps<Value>, FormFlowWithFormConsumerKeys>
export declare class FormFieldSet<Value> extends React.Component<FormFieldSetProps<Value>, any> {
  render: () => JSX.Element
}
