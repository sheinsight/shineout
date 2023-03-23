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
  /**
   * @en default Value
   * @cn 默认值
   */
  defaultValue?: Value[]
  /**
   * @en Show content when data is empty. (only valid when children is function)
   * @cn 数据为空时展示内容。（仅在children为function时有效）
   */
  empty?: (onInsert: (value: Value) => void) => React.ReactNode
  formDatum: FormDatum<ObjectType>
  /**
   * @en The name that accesses data from from
   * @cn 从 Form 中存取数据的名称
   */
  name: string
  /**
   * @inner 内部属性
   */
  onError?: (error?: Error) => void
  /**
   * @en Validation rules
   * @cn 校验规则
   * @override RuleItem[]
   */
  rules?: FormItemRule<any>
  /**
   * @en When children type is not function, handle a set data type of object
   * When children type is function, handle a group of data type of array. options property:
   * list: all data of name.
   * value: a single piece of data for the value obtained by name.
   * onChange: a callback when the value is changing.
   * onRemove: a callback when a child component is removed.
   * index: the current index.
   * onInsert: Insert a piece of data before the current item.
   * onAppend: Insert a piece of data after the current item.
   *
   * @cn children 不为 function，用来处理 object 类型数据，children 内的 name 会拼接 FieldSet name，如 FieldSet name 为 'a', children 元素name 为 b，children 实际处理的数据为 a.b;
   * children 为 function 时，用来处理数组数据。options 属性为
   * list: name 下的全部数据。
   * value: 根据name获取的值的单条数据。
   * onChange: 子组件数据改变回调。
   * onRemove: 子组件删除回调。
   * index: 当前项索引。
   * onInsert: 在当前项之前插入一条数据。
   * onAppend: 在当前项之后附加一条数据。
   *
   * @override ((opts: object) => ReactNode) |ReactNode
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
   * @en The default is empty, follow the theme style.
   * @cn 默认为空，跟随主题样式。
   */
  labelAlign?: 'top' | 'left' | 'right'
  /**
   * @en the default value is top.
   * @cn 默认顶部对齐
   * @default 'top'
   */
  labelVerticalAlign?: 'top' | 'middle' | 'bottom'
  /**
   * @en Form element size
   * @cn 表单元素的尺寸
   * @default 'default'
   * @override union
   */
  size?: RegularAttributes.Size
  /**
   * @en The width of label. It is invalid when labelAlign is 'top'.
   * @cn 标签宽度，labelAlign 为 'top' 时无效。
   * @default 140px
   */
  labelWidth?: number | string
  /**
   * @en mode, with useMode
   * @cn 模式，和 useMode 配合使用
   */
  mode?: string
  pending?: boolean
  rules?: RuleObject
  /**
   * @en Single-line error prompt will not stretch the page height
   * @cn 单行错误提示不撑开页面高度
   * @default false
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
  /**
   * @en The callback before the value is changed, when the return value is not empty, it will be used as the new value of the component
   * @cn 值改变前的回调，当返回值不为空时将作为组件的新值
   * @override (value: any , datum?: FormDatum) => any
   */
  beforeChange?: (value: Value | undefined, datum?: FormDatum<ObjectType>) => Value | undefined | void
  onChange?: (value: Value | undefined, ...rest: any) => void
  /**
   * @en rules validation callback
   * @cn rules 校验回调
   */
  onError?: (e?: Error) => void
  /**
   * @inner 内部属性
   */
  popover?: string
  /**
   * @en value
   * @cn 值
   */
  value?: Value
  /**
   * @inner 内部属性
   */
  error?: Error
  // readOnly?: boolean
  disabled?: boolean
  /**
   * @en onChange is not triggered when two selected values are the same
   * @cn 当两次选择的值相同时不触发onChange
   * @default false
   */
  filterSameChange?: boolean
  combineRules?: (name: string, rules?: FormItemRule<Value>) => FormItemRule<Value>
  required?: boolean
  /**
   * @en When the value changes, it will link to verify the fields in the bind, which needs to be used with Form
   * @cn 当值改变是会联动校验 bind 中的字段, 需要配合Form 使用
   */
  bind?: string[]
  onItemError?: (id: string, error?: Error) => void
  bindInputToItem?: (name: string) => void
  unbindInputFromItem?: (name: string) => void
  /**
   * @inner 内部属性
   */
  scuSkip?: string[]
  /**
   * @en defaultValue 和 value 类型相同
   * @cn 默认值  和 value 类型相同
   */
  defaultValue?: Value
  /**
   * @en If set to true, the form will not automatically delete the data after the component is uninstalled
   * @cn 设置为true 组件卸载后表单不自动删除数据
   */
  reserveAble?: boolean
  /**
   * @en Validation rules, see [Rule](/components/rule) usage for details
   * @cn 校验规则 详见 [Rule](/components/rule)
   * @override RuleItem[]
   */
  rules?: FormItemRule<Value>
  /**
   * @inner 内部属性
   */
  formDatum?: FormDatum<ObjectType>
  fieldSetValidate?: (validator: boolean) => void
  /**
   * @en Form field, used with Form
   * @cn 表单字段, 配合 Form 使用
   */
  name?: string | string[]
  /**
   * @inner 内部属性
   */
  forceChangeOnValueSet?: boolean
}
export type InputableFormConsumerKey = 'formDatum' | 'disabled' | 'combineRules' | 'size'
// 过滤掉原生属性required
type InputablePropsFiltered<Value> = Omit<InputableProps<Value>, 'required'>
// value 和 onChange 变为可选属性 并去掉validateHook属性
type HandleValueProps<Props extends BaseInputProps> = PartialKeys<Omit<Props, 'validateHook'>, 'value' | 'onChange'>
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
   * @en Form Content
   * @cn Form 内容
   */
  children?: ReactNode
  /**
   * @en Form value
   * @cn 表单数据
   * @override object
   */
  value?: Value
  datum: FormDatum<ObjectType>
  /**
   * @en When disabled is true, all the elements in the form are disabled.
   * @cn 是否禁用，为 true 时，表单内所有元素 disabled 都为 true
   * @default false
   */
  disabled?: boolean
  /**
   * @en When inline is true, the form is horizontal layout
   * @cn 是否水平布局
   * @default false
   */
  inline?: boolean
  /**
   * @inner 内部属性
   */
  layout?: string
  /**
   * @inner 内部属性
   */
  pending?: boolean
  /**
   * @en callback when the error happens
   * @cn 异常回调处理
   */
  onError?: (e: Error) => void
  /**
   * @en Validation rules
   * @cn 校验规则
   */
  onReset?: () => void
  /**
   * @en the function for Form Submission.  When the internal validation fails, it will not be triggered.
   * @cn 表单提交函数。表单内部校验失败时不会触发。
   */
  onSubmit?: (data: Value, detail?: any, event?: Event) => void

  /**
   * @en Validation rules
   * @cn 校验规则
   * @override object
   */
  rules?: RuleObject
  /**
   * @en When the verification fails, whether to scroll to the first verification failure component, when the value is a number, it means the offset relative to the top
   * @cn 校验失败时是否滚动到第一个校验失败组件，该值为数字时，表示相对于顶部的偏移量
   * @default false
   */
  scrollToError?: boolean | number
  /**
   * @inner 内部属性
   */
  setFormStatus: (status: formStatus) => void
  /**
   * @en ms, the interval between two submissions(Prevent repeat submission)
   * @cn ms, 两次提交间隔时长（防止重复提交）
   * @default 1000
   */
  throttle?: number
  /**
   * @en bind form ref, Can call some form methods
   * @cn 绑定 form 的引用, 可以调用某些 form 的方法
   * @override
   */
  formRef?: ((form: FormRef<Value>) => void) | { current?: FormRef<Value> }
  /**
   * @inner 内部属性
   */
  error?: ObjectType<string | Error>
}

/** ----------------formItem-----------------------* */
export interface ItemProps extends StandardProps {
  /**
   * @inner 待废弃
   */
  grid?: number | { width: number; offset: number; response: 'sm' | 'md' | 'lg' | 'xl' }
  /**
   * @en Single-line error prompt will not stretch the page height
   * @cn 单行错误提示不撑开页面高度
   * @default false
   */
  keepErrorHeight?: boolean
  /**
   * @en When it is undefined, the tag does not be rendered or occupy space. If there is no content, but it needs to be occupied, you can use an empty string ''.
   * @cn 未定义时，标签不会render，也不会占位。如果无内容需要占位，使用空字符串 ''。
   */
  label?: React.ReactNode
  /**
   * @en The default is empty, follow the theme style.
   * @cn 默认为空，跟随主题样式。
   */
  labelAlign?: 'top' | 'left' | 'right'
  /**
   * @en The width of label. It is invalid when labelAlign is 'top'.
   * @cn 标签宽度，labelAlign 为 'top' 时无效。
   * @default 140px
   */
  labelWidth?: string | number
  /**
   * @en Required tags for pure display. Do not trigger validation
   * @cn 必填标记，纯展示用，不会触发校验
   * @default false
   */
  required?: boolean
  /**
   * @en Prompting information
   * @cn 提示文案
   */
  tip?: React.ReactNode
  formDatum?: FormDatum<any>
  /**
   * @en label vertical align
   * @cn 标签垂直方向对齐方式
   * @default "top"
   */
  labelVerticalAlign?: 'top' | 'middle' | 'bottom'
  /**
   * @en form element
   * @cn 表单元素
   */
  children?: React.ReactNode
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
  /**
   * @inner 内部属性
   */
  cache?: boolean
  /**
   * @inner 内部属性
   */
  onChange: (value: Value) => void
  /**
   * @inner 内部属性
   */
  value: Value
  /**
   * @inner 内部属性
   */
  error?: Error
  /**
   * @inner 内部属性
   */
  disabled?: boolean
  /**
   * @en React components that support value and onChange or function. The function object attribute is as follows:
   * value: The value obtained from the parent Form or Form.Block by name.
   * error: the error information of data validation. type is Error.
   * onChange: The callback when the value is changing.
   * disabled: inherit the disabled attribute of Form.
   *
   * @cn 支持 value 和 onChange 的 React 组件，或者函数，函数object属性如下
   * value: 根据 name 从上级 Form 或 Form.Block 获取的值
   * error：数据校验错误信息，类型为 Error
   * onChange: 值改变回调函数
   * disabled: 继承 Form 的 disabled 属性
   *
   * @override ((opts: object) => ReactNode) | ReactNode
   */
  children?: React.ReactNode | FieldChildrenFunc<Value>
}
/** ----------------FieldError-----------------------* */
export interface FieldErrorProps {
  error?: Error | Error[]
}

/** ----------------Flow-----------------------* */

export interface FlowProps {
  /**
   * @en datum is the object of Datum.Form.
   * @cn datum 为 Datum.Form 对象
   * @override (datum: FormDatum) => ReactNode
   */
  children?: (datum: FormDatum<ObjectType>) => ReactNode
  formDatum: FormDatum<ObjectType>
  /**
   * @en Specifying which fields to change trigger the Flow update.
   * @cn names 为空时，Form 内任意值变化会触发 Flow 更新；不为空时，只监听指定字段变化
   */
  names?: string[]
}

/** ----------------index-----------------------* */
// Form
export type FormCardConsumerKey = 'setFormStatus'
export type FormDatumKey = 'removeUndefined' | 'error'
export type FormPropsWithCardConsumer<Value> = CardConsumerType<SimpleFormProps<Value>, FormCardConsumerKey>
export type FormPropsWithProvider<Value> = GetFormProviderProps<FormPropsWithCardConsumer<Value>, Value>

/**
 * @title Form
 */
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

/**
 * @title From.Item
 * @cn 表单项，主要用来布局，显示标签，提示文案信息等
 * @en Used to layout, display labels, tips, errors, etc
 */
export type FormItemProps = GetFormConsumerProps<ItemProps, FormItemWithFormConsumerKeys>
export declare class FormItem extends React.Component<FormItemProps, any> {
  render: () => JSX.Element
}

/**
 * @title Form.Field
 * @en Used to handle custom form components, enabling custom form components to get/store/validate value from formdata by name.
 * @cn 用于处理自定义表单组件，使自定义表单组件实现通过rules校验，存储数据功能
 */
export type FormFieldProps<Value> = GetInputableProps<FieldProps<Value>, Value>
export declare class FormField<Value> extends React.Component<FormFieldProps<Value>, any> {
  render: () => JSX.Element
}

export type FormFlowWithFormConsumerKeys = 'formDatum'

export type FormFieldSetWithFormConsumerKeys = 'formDatum'
/**
 * @title Form.FieldSet
 * @en Handle a set(group) data from form by name
 * @cn 用来处理 object 类型 字段和数组。
 */
export type FormFieldSetProps<Value> = GetFormConsumerProps<FieldSetProps<Value>, FormFlowWithFormConsumerKeys>
export declare class FormFieldSet<Value> extends React.Component<FormFieldSetProps<Value>, any> {
  render: () => JSX.Element
}

/**
 * @title Form.Flow
 */
export type FormFlowProps = GetFormConsumerProps<FlowProps, FormFlowWithFormConsumerKeys>
export declare class FormFlow extends React.Component<FormFlowProps, any> {
  render: () => JSX.Element
}

/**
 * @title FormRef
 * @en Form instance method
 * @cn Form 实例的一些方法
 */
export interface FormRef<Value> {
  /**
   * @en return form value
   * @cn 返回表单的值
   * @version 1.4.4
   */
  getValue: () => Value
  /**
   * @en Validate form
   * @cn 校验表单
   * @version 1.4.4
   */
  validate: () => Promise<any>
  /**
   * @en Validation form fields
   * @cn 校验表单指定字段
   * @version 1.7.1
   */
  validateFields: (fields: string | string[]) => Promise<any>
  /**
   * @en The verification can get the error message through Promise.catch
   * @cn 校验可以通过 catch 获取报错信息
   * @version 1.7.3
   */
  validateFieldsWithError: (fields: string | string[]) => Promise<any>
  /**
   * @en Clear check
   * @cn 清除校验
   * @version 1.4.4
   */
  clearValidate: () => void
  /**
   * @en Submit Form, withValidate: Whether to verify
   * @cn 提交表单, withValidate: 是否校验
   * @version 1.4.4
   */
  submit: (withValidate?: boolean) => void
  /**
   * @en reset form
   * @cn 重置表单
   * @version 1.4.4
   */
  reset: () => void
}
