import { ReactNode } from 'react'
import { StandardProps, FormItemStandardProps, CommonProps } from '../@types/common'

export type DateTimeType = Date | number | string | undefined

export type AreaType = 'year' | 'month' | 'week' | 'day' | 'time' | 'quick' | 'quarter'

export type DatePickerValue = DateTimeType | DateTimeType[]

export interface QuickSelect {
  name?: string
  value?: Array<DateTimeType> | DateTimeType
}

type FormItemProps<T> = Omit<FormItemStandardProps<T>, 'name'>

type DisabledType = 'start' | 'end'

export interface DatePickerProps<T = DatePickerValue>
  extends StandardProps,
    FormItemProps<T>,
    Pick<CommonProps, 'absolute'> {
  clearWithUndefined?: boolean
  underline?: boolean
  width?: number | string
  clearable?: boolean
  disabled?: ((date: Date, type: DisabledType, value: DatePickerValue) => boolean) | boolean
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

