import React, { ReactNode } from 'react'
import { GetInputBorderProps } from '../hoc/Props'
import { GetInputableProps } from 'src/Form/Props'
import { GetAbsoluteProps } from 'src/Table/context'
import { StandardProps, FormItemStandardProps, CommonProps } from '../@types/common'

export type DateTimeType = Date | number | string | undefined

export type DatePickerValue = DateTimeType | DateTimeType[]

export type AreaType = 'year' | 'month' | 'week' | 'day' | 'time' | 'quick' | 'quarter'

export type Mode = 'year' | 'month' | 'quarter' | 'time' | 'day' | 'minute' | 'second' | 'hour'

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
  value?: Array<DateTimeType> | DateTimeType
}

export type PickMouseEvent = (e: React.MouseEvent) => void

type FormItemProps<T> = Omit<FormItemStandardProps<T>, 'name'>

export type DisabledType = 'start' | 'end'

export interface DatePickerProps<T = DatePickerValue>
  extends StandardProps,
    FormItemProps<T>,
    Pick<CommonProps, 'absolute'> {
  clearWithUndefined?: boolean
  underline?: boolean
  width?: number | string
  clearable?: boolean
  disabled?: ((date: Date, type?: DisabledType, value?: DatePickerValue) => boolean) | boolean
  format?: string
  formatResult?: string | ((date: Date) => string)
  onChange?: (value: T, quickSelect?: QuickSelect | void) => void
  placeholder?: string | string[]
  range?: boolean | number
  type?: 'date' | 'time' | 'datetime' | 'month' | 'week' | 'quarter' | 'year'
  defaultTime?: DatePickerValue
  zIndex?: number
  allowSingle?: boolean
  quickSelect?: Array<QuickSelect>
  min?: DateTimeType
  max?: DateTimeType
  defaultRangeMonth?: Array<DateTimeType>
  defaultPickerValue?: DateTimeType | DateTimeType[]
  hourStep?: number
  minuteStep?: number
  secondStep?: number
  disabledTime?: string | ((time: string) => boolean)
  align?: 'left' | 'right' | 'center'
  onPickerChange?: (value: DatePickerValue, quickSelect: boolean | QuickSelect | void, areaType: AreaType) => void
  innerTitle?: ReactNode
  name?: string | string[]
  inputable?: boolean
  position?: 'left-top' | 'left-bottom' | 'right-top' | 'right-bottom' | string
  size?: 'small' | 'default' | 'large'
  timeZone?: string
}

// HOC Value 向下透传类型
export interface BaseDatePickerValueProps {
  onChange: (value: DatePickerValue, callback?: () => void, quickSelect?: boolean) => void
  onValueBlur?: () => void
  value: DatePickerValue
}

// HOC Value 类型
export interface DatePickerValueProps extends FormItemStandardProps {
  type?: string
  format?: string
  timeZone?: string
  allowSingle?: boolean
  value: DatePickerValue
  range?: boolean | number
  onBlur?: <T>(e?: T) => void
}

// HOC Value 类型过滤器
export type GetDatePickerValueProps<Props> = Omit<Props, 'onChange' | 'Value'> & BaseDatePickerValueProps

export type ContainerProp<Value> = GetInputableProps<
  GetInputBorderProps<GetDatePickerValueProps<GetAbsoluteProps<DatePickerProps>>>,
  Value
>

export interface DatePickerIconProps {
  tag: string
  name: string
  className?: string
  disabled?: boolean
  onClick?: (e?: React.MouseEvent) => void
}

export interface TimeScrollProps<Value> {
  value: number
  total: number
  step?: number
  current: Date
  ampm?: boolean
  min?: Date | null
  max?: Date | null
  onChange: (val: number) => void
  range: UnionPannelProps<Value>['range']
  mode: 'H' | 'h' | 'm' | 's' | 'ampm'
  timeZone?: DatePickerProps['timeZone']
  disabled: UnionPannelProps<Value>['disabled']
  disabledTime: UnionPannelProps<Value>['disabledTime']
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

export interface PickerProps {
  min?: Date
  max?: Date
  pos?: string
  index: number
  range?: number
  format: string
  rangeTemp: Date
  rangeDate: Date[]
  quicks?: Quick[]
  onChangeSync: (
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
  value: any
  onDayHover: (date: Date) => void
  handleHover?: (index: number, isEnter: boolean) => void
  type?: 'date' | 'time' | 'datetime' | 'month' | 'week' | 'quarter' | 'year'
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

export interface RangeProps<Value> {
  min?: Date
  max?: Date
  value: Date[]
  current: Date[]
  timeZone?: string
  defaultTime: Date[]
  children: React.ReactNode
  range?: DatePickerProps['range']
  type: ContainerProp<Value>['type']
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
  hourStep?: DatePickerProps<Value>['hourStep']
  minuteStep?: DatePickerProps<Value>['minuteStep']
  secondStep?: DatePickerProps<Value>['secondStep']
  disabledTime?: DatePickerProps<Value>['disabledTime']
}

export interface QuickProps {
  type?: 'date' | 'time' | 'datetime' | 'month' | 'week' | 'quarter' | 'year'
  onChange: (quick: Quick) => void
  quicks?: Quick[]
  current: Date | Date[]
  children?: ReactNode
  timeZone?: string
}

// YearProps & MonthProps & DayProps & TimeProps & WeekProps & QuarterProps
export interface UnionPannelProps<Value> {
  max?: Date
  min?: Date
  value: Date
  type?: string
  index?: number
  current: Date
  format: string
  onDayHover: any
  rangeTemp?: Date
  rangeDate: Date[]
  onChangeSync: any
  defaultTime: Date[]
  showTimePicker: boolean
  range?: DatePickerProps['range']
  onModeChange: (type: Mode) => void
  disabledRegister: DisabledRegister
  timeZone?: DatePickerProps['timeZone']
  disabled?: ContainerProp<Value>['disabled']
  allowSingle?: DatePickerProps['allowSingle']
  hourStep?: DatePickerProps<Value>['hourStep']
  minuteStep?: DatePickerProps<Value>['minuteStep']
  secondStep?: DatePickerProps<Value>['secondStep']
  disabledTime?: DatePickerProps<Value>['disabledTime']
  onChange: (
    date: Date,
    change?: boolean,
    blur?: boolean,
    isEnd?: boolean,
    isQuickSelect?: boolean,
    areaType?: AreaType
  ) => void
}

export class DatePickerClass extends React.Component<ContainerProp<DatePickerProps>, {}> {
  // @ts-ignore
  render(): JSX.Element
}

export type DatePickerType = typeof DatePickerClass
