import React, { ReactNode } from 'react'
import { GetTableConsumerProps } from '../Table/Props'
import { GetInputBorderProps } from '../hoc/Props'
import { GetInputableProps } from '../Form/Props'
import { StandardProps, RegularAttributes } from '../@types/common'
import { AbsoluteProps } from '../AnimationList/Props'
import { InputTitleProps } from '../InputTitle/Props'

export type DateTimeType = Date | number | string | undefined

export type DatePickerValue = DateTimeType | DateTimeType[]

export type AreaType = 'year' | 'month' | 'week' | 'day' | 'time' | 'quick' | 'quarter'

export type Mode = 'year' | 'month' | 'quarter' | 'time' | 'day' | 'minute' | 'second' | 'hour'

export type TimeMode = 'hour' | 'minute' | 'second' | 'ampm'

export type DateMode = Mode | 'date'

export type vaildFn = (date: Date, ...args: any) => boolean

export type vaildFns = ((date: Date, ...args: any) => boolean)[]

export type QuickType = {
  value: Date[]
  invalid: boolean
  name: string
}

export interface QuickSelectType<Value = Date[]> {
  name: string
  value: Value
}

export type DisabledRegister = (
  disabled: Function,
  mode: 'time' | 'date' | 'week' | 'month' | 'year' | 'quarter' | 'datetime' | 'day',
  index?: number
) => void

export type PickMouseEvent = (e: React.MouseEvent) => void

export type DisabledType = 'start' | 'end'

export interface BaseProps<Value = DatePickerValue>
  extends StandardProps,
    Pick<AbsoluteProps, 'absolute' | 'zIndex'>,
    Pick<InputTitleProps, 'innerTitle'> {
  /**
   * @cn If clearable is true, show clear value icon
   * @en  是否显示清除数据图标
   * @default true
   */
  clearable?: boolean
  /**
   * @cn onChange get undefined while clear
   * @en 清空值时抛出 undefined
   * @default false
   */
  clearWithUndefined?: boolean

  /**
   * @en When the value is true, disabled all options; When the value is function, disable the options that this function returns true.
   * @cn 如果 disabled 为 true，禁用全部选项，如果 disabled 为函数，根据函数反回结果禁用选项
   * @default false
   */
  disabled?: ((date: Date, type?: DisabledType, value0?: Date, value1?: Date) => boolean) | boolean

  /**
   * @en default values for different types: 'date': 'YYYY-MM-DD'. 'time': 'HH:mm:ss'. 'week': 'GGGG WW'. 'month': 'YYYY-MM'. 'week': 'GGGG WW'. 'quarter': 'YYYY-[Q]Q'. 'year': 'YYYY'. 'datetime': 'YYYY-MM-DD HH:mm:ss'
   * @cn 不同type对应的默认值。'date': 'YYYY-MM-DD'。'time': 'HH:mm:ss'。'week': 'GGGG WW'。'month': 'YYYY-MM'。'quarter': 'YYYY-[Q]Q'。 'year': 'YYYY' 。 'datetime': 'YYYY-MM-DD HH:mm:ss'
   */
  format?: string

  /**
   * @en Format the selected time
   * @cn 对选中时间进行格式化
   * @default props.format
   */
  formatResult?: string | ((date: Date) => string)

  /**
   * @en a callback when the value is changing
   * @cn 值改变回调函数
   */
  onChange?: (value: Value, quickSelect?: QuickSelectType | null) => void

  /**
   * @en placeholder text. When the range property is not empty, it is an array of length 2.
   * @cn 占位文字。range 属性不为空时，为长度为2的数组
   */
  placeholder?: string | string[]

  /**
   * @en range span，unit: **second**，When it is true, selection scope is not limited.
   * @cn 范围跨度，单位 **秒**，为 true 时表示不限制选择范围。
   */
  range?: boolean | number

  /**
   * @en type of datepicker
   * @cn 时间类型
   * @default 'date'
   */
  type?: 'date' | 'time' | 'datetime' | 'month' | 'week' | 'quarter' | 'year'

  /**
   * @en Default time when selecting a date, the format is: 'HH:mm:ss'
   * @cn 选择日期时默认的时间, 格式为: 'HH:mm:ss'
   */
  defaultTime?: DatePickerValue

  /**
   * @en allow single select, only in range can set
   * @cn 是否允许单选, 仅在 range 模式下有效
   * @default false
   */
  allowSingle?: boolean

  /**
   * @en quick select, only in range can set, name: tip, value: range date
   * @cn 快速选择, 仅在 range 模式下有效, name: 文字提示, value: 时间范围
   * @default false
   * @override {name: string, value: Value}[]
   */
  quickSelect?: Array<QuickSelectType<DatePickerValue>>

  /**
   * @en option min value
   * @cn 可选最小值
   */
  min?: DateTimeType

  /**
   * @en option max value
   * @cn 可选最大值
   */
  max?: DateTimeType

  /**
   * @en The initial month of range selection, the value is a time object, valid only in range mode, and the priority is lower than value and defaultValue
   * @cn 范围选择的初始月份, 值为时间对象 或者时间戳, 仅在 range 模式下生效, 优先级低于 value 和 defaultValue
   */
  defaultRangeMonth?: Array<DateTimeType>

  /**
   * @en default date of panel，work under has no value
   * @cn 面板默认时间，在未选择日期时生效
   */
  defaultPickerValue?: DateTimeType | DateTimeType[]

  /**
   * @en hour step
   * @cn 小时选项步长
   */
  hourStep?: number

  /**
   * @en minute step
   * @cn 分钟选项步长
   */
  minuteStep?: number

  /**
   * @en second step
   * @cn 秒选项步长
   */
  secondStep?: number

  /**
   * @en Disable the specified Time.
   * @cn 禁用指定 Time。
   */
  disabledTime?: string | ((time: string) => boolean)

  /**
   * @en horizontal align of the value
   * @cn 值水平排布方式
   * @default center
   *
   */
  align?: 'left' | 'right' | 'center'

  /**
   * @en value onchange callback (every type of date)
   * @cn 值改变回调，有别于 onChange, onPickerChange会在每项值改变的时候执行
   */
  onPickerChange?: (value: DatePickerValue, quickSelect: QuickSelectType | void | undefined, areaType: AreaType) => void

  /**
   * @en Allow enter something into DatePicker
   * @cn 可输入
   */
  inputable?: boolean

  /**
   * @en Set Position can control the different position of DatePicker
   * @cn 弹出框位置
   */
  position?: 'left-top' | 'left-bottom' | 'right-top' | 'right-bottom'

  /**
   * @en There are three built-in size: small、default、large.
   * @cn 不同尺寸
   * @override union
   */
  size?: RegularAttributes.Size

  /**
   * @en Set the default time zone, the format is /^([+-]\\d{2})$/ Support '-12' to '+13'
   * @cn 设置默认时区,格式为/^([+-]\\d{2})$/ 支持 '-12' 到 '+13'
   */
  timeZone?: string
}

export interface ContainerProps<T = DatePickerValue>
  extends Pick<
    BaseProps,
    | 'disabled'
    | 'format'
    | 'formatResult'
    | 'inputable'
    | 'placeholder'
    | 'position'
    | 'range'
    | 'size'
    | 'type'
    | 'allowSingle'
    | 'defaultTime'
    | 'absolute'
    | 'zIndex'
    | 'quickSelect'
    | 'min'
    | 'max'
    | 'defaultRangeMonth'
    | 'defaultPickerValue'
    | 'hourStep'
    | 'minuteStep'
    | 'secondStep'
    | 'onPickerChange'
    | 'disabledTime'
    | 'align'
    | 'clearable'
    | 'clearWithUndefined'
    | 'innerTitle'
    | 'timeZone'
  > {
  /**
   * @en When the value is string, it needs to match the format attribute.\n When the range property is true, the value is an array of length 2.
   * @cn 值为 string 时，需要和 format 属性匹配。\n 非 string 会格式化为 string。\n range 属性为 true 时，值为长度为2的数组
   */
  value: DatePickerValue
  /**
   * @en extra children
   * @cn 额外渲染的节点
   */
  children?: ReactNode
  onValueBlur: () => void
  /**
   * @en blur event callback
   * @cn blur 事件回调
   */
  onBlur: (e: any) => void
  /**
   * @en focus event callback
   * @cn focus 事件回调
   */
  onFocus: (e: any) => void
  onChange: (value: T, callback?: () => void, quickSelect?: QuickSelectType) => void
}

export interface DatePickerIconProps {
  tag: string
  name: string
  className?: string
  disabled?: boolean
  onClick?: (e?: React.MouseEvent) => void
}

export interface TimeScrollProps
  extends Pick<UnionPannelProps, 'range' | 'disabled' | 'disabledTime'>,
    Pick<BaseProps, 'timeZone'> {
  value: number
  total: number
  step?: number
  current: Date
  ampm?: boolean
  min?: Date | null
  max?: Date | null
  onChange: (val: number) => void
  mode: 'H' | 'h' | 'm' | 's' | 'ampm'
}

export interface TextProps {
  value: string
  index: number
  focus: boolean
  timeZone?: string
  disabled: boolean
  className?: string
  inputable?: boolean
  placeholder: string
  focusElement: HTMLSpanElement
  format: string | ((date: Date) => string)
  onTextSpanRef: (e: HTMLSpanElement) => void
  onChange: (date: Date | undefined, index: number, e: React.FocusEvent<Element>) => void
}

type ChangeSyncFunc = (
  index: number,
  date: Date,
  change: boolean | undefined,
  _blur: boolean | undefined,
  _isEnd: boolean | undefined,
  _isQuickSelect: QuickSelectType | undefined,
  areaType: AreaType
) => void

export interface PickerProps extends Pick<BaseProps, 'range' | 'type'> {
  min?: Date
  max?: Date
  pos?: string
  index?: number
  format: string
  rangeDate?: Date[]
  quicks?: QuickType[]
  rangeTemp?: Date
  onChangeSync?: ChangeSyncFunc
  timeZone?: string
  defaultTime: Date[]
  current: Date | Date[]
  showTimePicker: boolean
  value: Date
  onDayHover?: (date: Date) => void
  handleHover?: (index: number, isEnter: boolean) => void
  onChange: (
    date: Date[] | Date,
    change?: boolean,
    blur?: boolean,
    isEnd?: boolean,
    isQuickSelect?: QuickSelectType,
    areaType?: AreaType
  ) => void
  allowSingle?: boolean
  disabled?: ((date: Date, type?: DisabledType, value?: DatePickerValue) => boolean)
  disabledRegister: DisabledRegister
}

export interface RangeProps
  extends Pick<BaseProps, 'range' | 'hourStep' | 'minuteStep' | 'secondStep' | 'disabledTime'> {
  max?: Date
  min?: Date
  value: Date[]
  current: Date[]
  rangeTemp?: Date
  timeZone?: string
  defaultTime: Date[]
  children: React.ReactNode
  type: ContainerProps['type']
  disabled?: ((date: Date, type?: DisabledType, value?: DatePickerValue) => boolean)
  format: string
  onChange: (
    date: Date[],
    change?: boolean,
    blur?: boolean,
    isEnd?: boolean,
    isQuickSelect?: QuickSelectType,
    areaType?: AreaType
  ) => void
  quicks?: QuickType[]
  allowSingle?: boolean
  disabledRegister: DisabledRegister
}

export interface QuickProps extends Pick<BaseProps, 'type'> {
  onChange: (quick: QuickSelectType) => void
  quicks?: QuickType[]
  current: Date | Date[]
  children?: ReactNode
  timeZone?: string
}

// YearProps & MonthProps & DayProps & TimeProps & WeekProps & QuarterProps
export interface UnionPannelProps
  extends Pick<
    BaseProps,
    'range' | 'timeZone' | 'disabled' | 'allowSingle' | 'hourStep' | 'minuteStep' | 'secondStep' | 'disabledTime'
  > {
  max?: Date
  min?: Date
  value: Date
  type?: string
  index?: number
  current: Date
  format: string
  onDayHover?: (date: Date) => void
  rangeTemp?: Date
  rangeDate?: Date[]
  onChangeSync?: ChangeSyncFunc
  defaultTime: Date[]
  showTimePicker: boolean
  onModeChange: (type: Mode) => void
  disabledRegister: DisabledRegister
  onChange: (
    date: Date,
    change?: boolean,
    blur?: boolean,
    isEnd?: boolean,
    isQuickSelect?: QuickSelectType,
    areaType?: AreaType
  ) => void
}

export type GetDatePickerValueProps<Props> = Omit<Props, 'onValueBlur' | 'onChange'> & Pick<BaseProps, 'onChange'>

export type DatePickerPropsWidthAbsolute<T = DatePickerValue> = GetTableConsumerProps<ContainerProps<T>>
export type DatePickerPropsWidthValue<T = DatePickerValue> = GetDatePickerValueProps<DatePickerPropsWidthAbsolute<T>>
export type DatePickerPropsWidthInputBorder<T = DatePickerValue> = GetInputBorderProps<DatePickerPropsWidthValue<T>>
export type DatePickerPropsWidthInputable<T = DatePickerValue> = GetInputableProps<
  DatePickerPropsWidthInputBorder<T>,
  DatePickerValue
>

/**
 * @title DatePicker
 */
export type DatePickerProps<T = DatePickerValue> = Omit<DatePickerPropsWidthInputable<T>, 'autoFocus'>

export declare class DatePickerClass<T = DatePickerValue> extends React.Component<DatePickerProps<T>, {}> {
  render(): JSX.Element
}

export type DatePickerType = typeof DatePickerClass
