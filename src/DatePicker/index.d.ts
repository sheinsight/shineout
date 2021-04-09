import * as React from 'react'

export type DateTimeType = Date | number | string

export type AreaType = 'year' | 'month' | 'week' | 'day' | 'time' | 'quick'

export type DisabledType = 'start' | 'end'

export type DatePickerValue = DateTimeType | [DateTimeType, DateTimeType];

interface Base {
  [propType: string]: any
}

export interface QuickSelect extends Base {
  name?: string,
  value?: Array<DateTimeType>
}

export interface DatePickerProps {

  /**
   * extend className
   * 
   * 扩展className
   * 
   * default: -
   */
  className?: string;

  /**
   * whether it can be cleared
   * 
   * 是否可清空
   * 
   * default: true
   */
  clearable?: boolean;

  /**
   * default
   * 
   * 默认值。如果 defaultValue 和 format 类型不一致，会执行一次 format，并触发 onChange 事件返回 format 后的值
   * 
   * default: -
   */
  defaultValue?: DatePickerValue;

  /**
   * When the value is true, disabled all options; When the value is function, disable the options that this function returns true.
   * 
   * 如果 disabled 为 true，禁用全部选项，如果 disabled 为函数，根据函数反回结果禁用选项
   * 
   * default: false
   */
  disabled?: ((date: Date, type: DisabledType, value: DatePickerValue,) => boolean) | boolean;

  /**
   * default values for different types: 'date': 'yyyy-MM-dd'. 'time': 'HH:mm:ss'. 'week': 'RRRR II'. 'month': 'yyyy-MM'. 'datetime': 'yyyy-MM-dd HH:mm:ss'
   * 
   * 
   * 不同type对应的默认值。'date': 'yyyy-MM-dd'。'time': 'HH:mm:ss'。'week': 'RRRR II'。'month': 'yyyy-MM'。'datetime': 'yyyy-MM-dd HH:mm:ss'
   * 
   * 
   * default: 
   */
  format?: string;

  /**
   * Format the selected time
   * 
   * 对选中时间进行格式化
   * 
   * default: props.format
   */
  formatResult?: string | ((date: Date) => string);

  /**
   * a callback when the value is changing
   * 
   * 值改变回调函数
   * 
   * default: -
   */
  onChange?: (value: string | [string | undefined, string | undefined], quickSelect?: QuickSelect | void) => void;

  /**
   * placeholder text. When the range property is not empty, it is an array of length 2.
   * 
   * 占位文字。range 属性不为空时，为长度为2的数组
   * 
   * default: -
   */
  placeholder?: string | string[];

  /**
   * range span，unit: **second**，When it is true, selection scope is not limited.
   * 
   * 范围跨度，单位 **秒**，为 true 时表示不限制选择范围。
   * 
   * default: -
   */
  range?: boolean | number;

  /**
   * Container element style
   * 
   * 最外层扩展样式
   * 
   * default: -
   */
  style?: React.CSSProperties;

  /**
   * type of datepicker
   * 
   * 时间类型
   * 
   * default: 'date'
   */
  type?: 'date' | 'time' | 'datetime' | 'month' | 'week';

  /**
   * When the value is string, it needs to match the format attribute.  When the range property is true, the value is an array of length 2.
   * 
   * 值。为 string 时，需要和 format 属性匹配。range 属性为 true 时，值为长度为2的数组
   * 
   * default: -
   */
  value?: DatePickerValue;

  /**
   * Default time when selecting a date, the format is: 'HH:mm:ss'
   * 
   * 选择日期时默认的时间, 格式为: 'HH:mm:ss'
   * 
   * default: -
   */
  defaultTime?: DatePickerValue;

  /**
   * When it is true, the pop-up layer of option append into document.body.
   * 
   * 为 true 时，选项弹出层在 DOM 中独立 render
   * 
   * default: false
   */
  absolute?: boolean;

  /**
   * panel z-index
   * 
   * 选择面板 z-index 值
   * 
   * default: 1000
   */
  zIndex?: number;

  /**
   * allow single select, only in range can set
   * 
   * 是否允许单选, 仅在 range 模式下有效
   * 
   * default: false
   */
  allowSingle?: boolean;

  /**
   * quick select, only in range can set, name: tip, value: range date
   * 
   * 快速选择, 仅在 range 模式下有效, name: 文字提示, value: 时间范围
   * 
   * default: false
   */
  quickSelect?: Array<QuickSelect>;

  /**
   * option min value
   * 
   * 可选最小值
   * 
   * default: none
   */
  min?: DateTimeType;

  /**
   * option max value
   * 
   * 可选最大值
   * 
   * default: none
   */
  max?: DateTimeType;

  /**
   * The initial month of range selection, the value is a time object, valid only in range mode, and the priority is lower than value and defaultValue
   * 
   * 范围选择的初始月份, 值为时间对象 或者时间戳, 仅在 range 模式下生效, 优先级低于 value 和 defaultValue
   * 
   * default: -
   */
  defaultRangeMonth?: Array<DateTimeType>;

  /**
   * 
   * default date of panel，work under has no value
   * 
   * 面板默认时间，在未选择日期时生效
   * 
   * default: -
   * 
   */
  defaultPickerValue?: DateTimeType | DateTimeType[];

  /**
   * hour step
   * 
   * 小时选项步长
   * 
   * default: none
   */
  hourStep?: number;

  /**
   * minute step
   * 
   * 分钟选项步长
   * 
   * default: none
   */
  minuteStep?: number;

  /**
   * second step
   * 
   * 秒选项步长
   * 
   * default: none
   */
  secondStep?: number;

  /**
   * Disable the specified Time.
   * 
   * 禁用指定 Time。
   * 
   * default: none
   */
  disabledTime?: string | ((time: string) => boolean);

  /**
   * value onchange callback (every type of date)
   * 
   * 值改变回调，有别于 onChange, onPickerChange会在每项值改变的时候执行
   * 
   * default: none
   */
  onPickerChange?: (value: DatePickerValue, quickSelect: QuickSelect | void, areaType: AreaType) => void;
}

declare class DatePicker extends React.Component<DatePickerProps, {}> {

  render(): JSX.Element;
}

export default DatePicker

