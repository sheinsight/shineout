import { ReactNode } from 'react'
import { GetInputBorderProps } from '../hoc/Props'
import { GetInputableProps } from 'src/Form/Props'
import { StandardProps, FormItemStandardProps, CommonProps } from '../@types/common'

export type DateTimeType = Date | number | string | undefined

export type DatePickerValue = DateTimeType | DateTimeType[]

export type AreaType = 'year' | 'month' | 'week' | 'day' | 'time' | 'quick' | 'quarter'

export type vaildFn = (date: Date, ...args: any) => boolean

export type vaildFns = ((date: Date, ...args: any) => boolean)[]

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
  onValueBlur: () => void
  value: DatePickerValue
}

// HOC Value 类型
export interface DatePickerValueProps extends FormItemStandardProps {
  type: string
  format: string
  timeZone: string
  allowSingle: boolean
  value: DatePickerValue
  range: boolean | number
  onBlur?: <T>(e?: T) => void
}

// HOC Value 类型过滤器
export type GetDatePickerValueProps<Props> = Omit<Props, 'onChange' | 'Value'> &
  Omit<DatePickerValueProps, 'onChange' | 'Value'> &
  BaseDatePickerValueProps

export type ContainerProp<Value> = GetInputableProps<
  GetInputBorderProps<GetDatePickerValueProps<DatePickerProps>>,
  Value
>

export interface DatePickerIconProps {
  tag: string
  name: string
  className?: string
  disabled?: boolean
  onClick?: (e?: React.MouseEvent) => void
}

export interface PickerProps {
  index: number
  current: Date | Date[]
  min?: DateTimeType
  max?: DateTimeType
  type?: 'date' | 'time' | 'datetime' | 'month' | 'week' | 'quarter' | 'year'
  value: DatePickerProps['value']
  format?: string
  onChange: (
    date: Date[] | Date,
    change: boolean,
    blur: boolean,
    isEnd: boolean,
    isQuickSelect: boolean,
    areaType: AreaType
  ) => void
  timeZone: string
  disabled?: ((date: Date, type: DisabledType, value: DatePickerValue) => boolean) | boolean
  defaultTime?: [Date, Date]
  handleHover: (index: number, isEnter: boolean) => void
}

export interface DayProps<Value> {
  current: Date
  disabled?: ContainerProp<Value>['disabled']
  format: string
  index: number
  max?: Date
  min?: Date
  onChange: (
    date: Date,
    change: boolean,
    blur: boolean,
    isEnd?: boolean,
    isQuickSelect?: boolean,
    areaType?: AreaType
  ) => void
  onChangeSync: any
  onDayHover: any
  onModeChange: (type: 'month' | 'year') => void
  range: DatePickerProps['range']
  rangeDate: Date[]
  rangeTemp?: Date
  showTimePicker: boolean
  type: string
  value: Date
  defaultTime: [Date, Date]
  allowSingle: DatePickerProps['allowSingle']
  timeZone: DatePickerProps['timeZone']
  disabledRegister: (
    disabled: Function,
    mode: 'time' | 'date' | 'week' | 'month' | 'year' | 'quarter' | 'datetime',
    index: number
  ) => void
}

export interface TimeProps<Value> extends Omit<DayProps<Value>, 'onChange' | 'format'> {
  index: number
  format: string
  onChange: (time: Date) => void
  hourStep: DatePickerProps<Value>['hourStep']
  minuteStep: DatePickerProps<Value>['minuteStep']
  secondStep: DatePickerProps<Value>['secondStep']
  disabledTime: DatePickerProps<Value>['disabledTime']
  disabledRegister: DayProps<Value>['disabledRegister']
}

export interface TimeScrollProps<Value> {
  value: number
  total: number
  step?: number
  current: Date
  ampm?: boolean
  min?: Date | null
  max?: Date | null
  range: TimeProps<Value>['range']
  mode: 'H' | 'h' | 'm' | 's' | 'ampm'
  timeZone?: DatePickerProps['timeZone']
  disabled: TimeProps<Value>['disabled']
  disabledTime: TimeProps<Value>['disabledTime']
  onChange: (val: number) => void
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
  onChange: (date: Date, index: number, e: React.FocusEvent<Element>) => void
}
