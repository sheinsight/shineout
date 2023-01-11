import React, { ReactNode } from 'react'
import { GetTableConsumerProps } from '../Table/Props'
import { GetInputBorderProps } from '../hoc/Props'
import { GetInputableProps } from '../Form/Props'
import { StandardProps, CommonProps, RegularAttributes } from '../@types/common'

export type DateTimeType = Date | number | string | undefined

export type DatePickerValue = DateTimeType | DateTimeType[]

export type AreaType = 'year' | 'month' | 'week' | 'day' | 'time' | 'quick' | 'quarter'

export type Mode = 'year' | 'month' | 'quarter' | 'time' | 'day' | 'minute' | 'second' | 'hour'

export type TimeMode = 'hour' | 'minute' | 'second' | 'ampm'

export type DateMode = Mode | 'date'

export type vaildFn = (date: Date, ...args: any) => boolean

export type vaildFns = ((date: Date, ...args: any) => boolean)[]

export type Quick = {
  value: Date[]
  invalid: boolean
  name?: string | undefined
}

export type DisabledRegister = (
  disabled: Function,
  mode: 'time' | 'date' | 'week' | 'month' | 'year' | 'quarter' | 'datetime' | 'day',
  index?: number
) => void

export interface QuickSelect {
  name?: string
  value?: DatePickerValue
}

export type PickMouseEvent = (e: React.MouseEvent) => void

export type DisabledType = 'start' | 'end'

export interface BaseProps<T = DatePickerValue> extends StandardProps, Pick<CommonProps, 'absolute'> {
  /**
   * onChange get undefined while clear
   *
   * 清空值时抛出 undefined
   *
   * default: false
   */
  clearWithUndefined?: boolean

  /**
   * show border bottom
   *
   * 仅仅展示下边框
   *
   * default: false
   */
  underline?: boolean

  /**
   * width
   *
   * 宽度
   *
   * default: null
   */
  width?: number | string

  /**
   * whether it can be cleared
   *
   * 是否可清空
   *
   * default: true
   */
  clearable?: boolean

  /**
   * When the value is true, disabled all options; When the value is function, disable the options that this function returns true.
   *
   * 如果 disabled 为 true，禁用全部选项，如果 disabled 为函数，根据函数反回结果禁用选项
   *
   * default: false
   */
  disabled?: ((date: Date, type?: DisabledType, value?: DatePickerValue) => boolean) | boolean

  /**
   * default values for different types: 'date': 'yyyy-MM-dd'. 'time': 'HH:mm:ss'. 'week': 'RRRR II'. 'month': 'yyyy-MM'. 'week': 'RRRR II'. 'quarter': 'yyyy-[Q]Q'. 'year': 'yyyy'. 'datetime': 'yyyy-MM-dd HH:mm:ss'
   *
   *
   * 不同type对应的默认值。'date': 'yyyy-MM-dd'。'time': 'HH:mm:ss'。'week': 'RRRR II'。'month': 'yyyy-MM'。'quarter': 'yyyy-[Q]Q'。 'year': 'yyyy' 。 'datetime': 'yyyy-MM-dd HH:mm:ss'
   *
   *
   * default:
   */
  format?: string

  /**
   * Format the selected time
   *
   * 对选中时间进行格式化
   *
   * default: props.format
   */
  formatResult?: string | ((date: Date) => string)

  /**
   * a callback when the value is changing
   *
   * 值改变回调函数
   *
   * default: -
   */
  onChange?: (value: T, quickSelect?: QuickSelect | null) => void

  /**
   * placeholder text. When the range property is not empty, it is an array of length 2.
   *
   * 占位文字。range 属性不为空时，为长度为2的数组
   *
   * default: -
   */
  placeholder?: string | string[]

  /**
   * range span，unit: **second**，When it is true, selection scope is not limited.
   *
   * 范围跨度，单位 **秒**，为 true 时表示不限制选择范围。
   *
   * default: -
   */
  range?: boolean | number

  /**
   * type of datepicker
   *
   * 时间类型
   *
   * default: 'date'
   */
  type?: 'date' | 'time' | 'datetime' | 'month' | 'week' | 'quarter' | 'year'

  /**
   * Default time when selecting a date, the format is: 'HH:mm:ss'
   *
   * 选择日期时默认的时间, 格式为: 'HH:mm:ss'
   *
   * default: -
   */
  defaultTime?: DatePickerValue

  /**
   * panel z-index
   *
   * 选择面板 z-index 值
   *
   * default: 1000
   */
  zIndex?: number

  /**
   * allow single select, only in range can set
   *
   * 是否允许单选, 仅在 range 模式下有效
   *
   * default: false
   */
  allowSingle?: boolean

  /**
   * quick select, only in range can set, name: tip, value: range date
   *
   * 快速选择, 仅在 range 模式下有效, name: 文字提示, value: 时间范围
   *
   * default: false
   */
  quickSelect?: Array<QuickSelect>

  /**
   * option min value
   *
   * 可选最小值
   *
   * default: none
   */
  min?: DateTimeType

  /**
   * option max value
   *
   * 可选最大值
   *
   * default: none
   */
  max?: DateTimeType

  /**
   * The initial month of range selection, the value is a time object, valid only in range mode, and the priority is lower than value and defaultValue
   *
   * 范围选择的初始月份, 值为时间对象 或者时间戳, 仅在 range 模式下生效, 优先级低于 value 和 defaultValue
   *
   * default: -
   */
  defaultRangeMonth?: Array<DateTimeType>

  /**
   *
   * default date of panel，work under has no value
   *
   * 面板默认时间，在未选择日期时生效
   *
   * default: -
   *
   */
  defaultPickerValue?: DateTimeType | DateTimeType[]

  /**
   * hour step
   *
   * 小时选项步长
   *
   * default: none
   */
  hourStep?: number

  /**
   * minute step
   *
   * 分钟选项步长
   *
   * default: none
   */
  minuteStep?: number

  /**
   * second step
   *
   * 秒选项步长
   *
   * default: none
   */
  secondStep?: number

  /**
   * Disable the specified Time.
   *
   * 禁用指定 Time。
   *
   * default: none
   */
  disabledTime?: string | ((time: string) => boolean)

  /**
   * horizontal align of the value
   *
   * 值水平排布方式
   *
   * default: center
   *
   */
  align?: 'left' | 'right' | 'center'

  /**
   * value onchange callback (every type of date)
   *
   * 值改变回调，有别于 onChange, onPickerChange会在每项值改变的时候执行
   *
   * default: none
   */
  onPickerChange?: (value: DatePickerValue, quickSelect: boolean | QuickSelect | void, areaType: AreaType) => void

  /**
   * inner title
   *
   * 内嵌标题
   *
   * default: -
   */
  innerTitle?: ReactNode

  /**
   * The name of a Form that accesses data
   *
   * Form 存取数据的名称
   *
   * default: -
   */
  name?: string | string[]

  /**
   * Allow enter something into DatePicker
   *
   * 可输入
   *
   * default: -
   */
  inputable?: boolean

  /**
   * Set Position can control the different position of DatePicker
   *
   * 弹出框位置
   *
   * default: -
   */
  position?: 'left-top' | 'left-bottom' | 'right-top' | 'right-bottom'

  /**
   * There are three built-in size: small、default、large.
   *
   * 不同尺寸
   *
   * default: 'default'
   */
  size?: RegularAttributes.Size

  /**
   * set timeZone
   *
   * 设置时区
   *
   * default: -
   */
  timeZone?: string
}

// HOC Value 类型
export interface DatePickerValueProps extends Pick<BaseProps, 'timeZone' | 'allowSingle' | 'range' | 'onChange'> {
  type?: string
  format?: string
  value: DatePickerValue
  // onChange: (value: DatePickerValue, callback?: () => void, quickSelect?: boolean) => void
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
   * When the value is string, it needs to match the format attribute. When the range property is true, the value is an array of length 2.
   *
   * 值。为 string 时，需要和 format 属性匹配。range 属性为 true 时，值为长度为2的数组
   *
   * default: -
   */
  value: DatePickerValue
  children?: ReactNode
  onValueBlur: () => void

  /**
   * -
   *
   * 内部使用
   *
   * -
   */
  onBlur: (e: any) => void

  /**
   * -
   *
   * 内部使用
   *
   * -
   */
  onFocus: (e: any) => void
  onChange: (value: T, callback?: () => void, quickSelect?: boolean) => void
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

export interface PickerProps extends Pick<BaseProps, 'range' | 'type'> {
  min?: Date
  max?: Date
  pos?: string
  index?: number
  format: string
  rangeDate?: Date[]
  quicks?: Quick[]
  rangeTemp?: Date
  onChangeSync?: (
    index: number,
    date: Date,
    change: boolean,
    end: number,
    mode: string,
    isQuickSelect: boolean,
    areaType: AreaType
  ) => void
  timeZone?: string
  defaultTime: Date[]
  current: Date | Date[]
  showTimePicker: boolean
  value: Date
  onDayHover?: (date: Date) => void
  handleHover?: (index: number, isEnter: boolean) => void
  onChange: (
    date: Date[] | Date,
    change: boolean,
    blur?: boolean,
    isEnd?: boolean,
    isQuickSelect?: boolean,
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
    date: Date,
    change: boolean,
    blur: boolean,
    isEnd?: boolean,
    isQuickSelect?: boolean,
    areaType?: AreaType
  ) => void
  quicks?: Quick[]
  allowSingle?: boolean
  disabledRegister: DisabledRegister
}

export interface QuickProps extends Pick<BaseProps, 'type'> {
  onChange: (quick: Quick) => void
  quicks?: Quick[]
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
  onChangeSync?: (
    index: number,
    date: Date,
    change: boolean,
    end: number,
    mode: string,
    isQuickSelect: boolean,
    areaType: AreaType
  ) => void
  defaultTime: Date[]
  showTimePicker: boolean
  onModeChange: (type: Mode) => void
  disabledRegister: DisabledRegister
  onChange: (
    date: Date,
    change?: boolean,
    blur?: boolean,
    isEnd?: boolean,
    isQuickSelect?: boolean,
    areaType?: AreaType
  ) => void
}

export type GetDatePickerProps<Props> = Props
export type GetDatePickerValueProps<Props> = Omit<Props, 'onValueBlur' | 'onChange'> & Pick<BaseProps, 'onChange'>

export type DatePickerPropsWidthAbsolute<T = DatePickerValue> = GetTableConsumerProps<ContainerProps<T>>
export type DatePickerPropsWidthValue<T = DatePickerValue> = GetDatePickerValueProps<DatePickerPropsWidthAbsolute<T>>
export type DatePickerPropsWidthInputBorder<T = DatePickerValue> = GetInputBorderProps<DatePickerPropsWidthValue<T>>
export type DatePickerPropsWidthInputable<T = DatePickerValue> = GetInputableProps<
  DatePickerPropsWidthInputBorder<T>,
  DatePickerValue
>
export type DatePickerProps<T = DatePickerValue> = GetDatePickerProps<DatePickerPropsWidthInputable<T>>

export declare class DatePickerClass<T = DatePickerValue> extends React.Component<DatePickerProps<T>, {}> {
  render(): JSX.Element
}

export type DatePickerType = typeof DatePickerClass
