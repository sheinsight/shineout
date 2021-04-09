# DatePicker *日期选择*

####   <br />*请注意date-fns的 format 字符串 与 Moment.js 的区别: [区别](https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md)

<example />

## API

### DatePicker

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| className | string | 无 | 扩展className |
| clearable | boolean | true | 是否可清空 |
| defaultValue | string \| number \| Date \| \[any, any] | 无 | 默认值。如果 defaultValue 和 format 类型不一致，会执行一次 format，并触发 onChange 事件返回 format 后的值 |
| disabled | (date: Date, type: string, value: \[any, any]) => boolean \| boolean  | false | 如果 disabled 为 true，禁用全部选项，如果 disabled 为函数，根据函数反回结果禁用选项。（注意：如果只想单独禁用时间，可使用 disabledTime 属性。） |
| format | string | | 不同type对应的默认值<br />'date': 'yyyy-MM-dd'<br />'time': 'HH:mm:ss'<br />'week': 'RRRR II'<br />'month': 'yyyy-MM'<br />'datetime': 'yyyy-MM-dd HH:mm:ss' |
| formatResult | string \| (date: Date) => string | props.format | 对选中时间进行格式化 |
| onChange | (value: string \| \[string \| undefined, string \| undefined\]) => void | 无 | 值改变回调函数 |
| placeholder | string \| string[] | 无 | 占位文字<br />range 属性不为空时，为长度为2的数组 |
| range | boolean \| number | 无 | 范围跨度，单位 **秒**，<br />为 true 时表示不限制选择范围。 |
| style | object | 无 | 最外层扩展样式 |
| type | 'date' \| 'time' \| 'datetime' \| 'month' \| 'week' | 'date' | 时间类型|
| value | string \| number \| Date \| \[any, any] | 无 | 值。为 string 时，需要和 format 属性匹配。<br />range 属性为 true 时，值为长度为2的数组 |
| defaultTime | string \| \[any, any] | 无 | 选择日期时默认的时间, 格式为: 'HH:mm:ss' |
| absolute | boolean | false | 为 true 时，选项弹出层在 DOM 中独立 render |
| zIndex | number | 1000 | 选择面板 z-index 值 |
| allowSingle | boolean | false | 是否允许单选, 仅在 range 模式下有效 | 
| quickSelect | object[] | false | 快速选择, 仅在 range 模式下有效, name: 文字提示, value: 时间范围 | 
| min | string \| number \| Date | 无 | 可选最小值 |
| max | string \| number \| Date | 无 | 可选最大值 |
| defaultRangeMonth | number[] \| Date[] | 无 | 范围选择的初始月份, 值为时间对象 或者时间戳, 仅在 range 模式下生效, 优先级低于 value 和 defaultValue | 
| defaultPickerValue | number \| Date \| number[] \| Date[] | 无 | 面板默认时间，在未选择日期时生效 |
| hourStep | number | 无 | 小时选项步长 | 
| minuteStep | number | 无 | 分钟选项步长 | 
| secondStep | number | 无 | 秒选项步长 | 
| onPickerChange | (value: any, quickSelect?: object \| void, type?: string) => void | 无 | 值改变回调，有别于 onChange, onPickerChange会在每项值改变的时候执行 |
| disabledTime | string \| ((time: string) => boolean) | 无 | 禁用指定 Time。 |

### DatePickerFormat

我们使用的格式化字符串(date-fns)和 moment.js 是不一致的, 如:<br />
moment: YYYY  => date-fns: yyyy <br />
moment: DD&nbsp;&nbsp;&nbsp;&nbsp; => date-fns: dd <br />
moment: hh&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  => date-fns: HH<br />
常用的 format 格式如下，更多见 [format](https://date-fns.org/v2.0.0-alpha.20/docs/format)

| 格式 | 说明 | 示例 |
| --- | --- | --- |
|	M	| 月 | 1, 2, ..., 12 |
| MM | 月（补0）| 01, 02, ..., 12 |
| Q | 季度 | 1, 2, 3, 4 |
| d | 日 |	1, 2, ..., 31
| dd | 日（补0） |	01, 02, ..., 31 |
| I | ISO周 | 1, 2, ..., 53 |
| II | ISO周（补0）| 01, 02, ..., 53 |
| yy | 年 | 00, 01, ..., 99 |
| yyyy | 完整年 | 1900, 1901, ..., 2099 |
| a | AM/PM | AM, PM |
| H | 小时 | 0, 1, ... 23 |
| HH | 小时（补0） | 00, 01, ... 23 |
| h | 小时（12小时制） | 1, 2, ..., 12 |
| hh | 小时（12小时制，补0） | 01, 02, ..., 12 |
| m | 分钟 | 0, 1, ..., 59 |
| mm | 分钟（补0） | 00, 01, ..., 59 |
| s | 秒 | 0, 1, ..., 59 |
| ss | 秒（补0） | 00, 01, ..., 59 |
| SSS | 毫秒 | 000, 001, ..., 999 |
| Z | 时区 | -01:00, +00:00, ... +12:00 |
| t | 时间戳（秒） |	512969520 |
| T | 时间戳（毫秒） | 512969520900 |
