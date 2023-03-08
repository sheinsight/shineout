# Datepicker

<example />

## API

### DatePicker

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| className | string | - | extend className |
| clearable | boolean | true | whether it can be cleared |
| defaultValue | string \| number \| Date \| \[any, any] | - | default |
| disabled | ((date: Date, type?: start \| end, value0?: Date value1?: Date) => boolean) \| boolean | false | When the value is true, disabled all options; When the value is function, disable the options that this function returns true. (Note: If you only want to disable the time alone, you can use the disabledTime attribute.) |
| format | string | | default values for different types: <br />'date': 'YYYY-MM-DD'<br />'time': 'HH:mm:ss'<br />'week': 'GGGG WW'<br />'month': 'YYYY-MM'<br />'quarter': 'YYYY-\[Q]Q'<br />'year': 'YYYY'<br />'datetime': 'YYYY-MM-DD HH:mm:ss' |
| formatResult | string \| (date: Date) => string | props.format | Format the selected time |
| onChange | (value: string \| \[string \| undefined, string \| undefined\]) => void | - | a callback when the value is changing |
| placeholder | string \| string[] | - | placeholder text<br />When the range property is not empty, it is an array of length 2. |
| range | boolean \| number | - | range span，unit: **second**，<br />When it is true, selection scope is not limited. |
| style | object | - | Container element style |
| type | 'date' \| 'time' \| 'datetime' \| 'month' \| 'quarter' \| 'week' \| 'year' | 'date' | type of datepicker |
| value | string \| number \| Date \| \[any, any] | - | When the value is string, it needs to match the format attribute. <br /> When the range property is true, the value is an array of length 2. |
| defaultTime | string \| \[any, any] | - | Default time when selecting a date, the format is: 'HH:mm:ss' |
| absolute \| (() => element) | boolean | false | When it is true, the pop-up layer of option append into document.body. When it is function, the pop-up layer of option append into it's return DOM.  |
| zIndex | number | 1000 | panel z-index |
| allowSingle | boolean | false | allow single select, only in range can set |
| quickSelect | object[] | false | quick select, name: tip, value: range date or date |
| min | string \| number \| Date | none | option min value |
| max | string \| number \| Date | none | option max value |
| defaultRangeMonth | string[] \| number[] \| Date[] | - | The initial month of range selection, the value is a time object, valid only in range mode, and the priority is lower than value and defaultValue |
| defaultPickerValue | string \| number \| Date \| string[] \| number[] \| Date[] | none | default date of panel，work under has no value |
| hourStep | number | none | hour step |
| minuteStep | number | none | minute step |
| secondStep | number | none | second step |
| onPickerChange | (value: any, quickSelect?: object \| void, type: string) => void | none | value onchange callback (every type of date) |
| disabledTime | string \| ((time: string) => boolean) | none | Disable the specified Time. |
| align | 'center' \| 'left' \| 'right' | 'center' | horizontal align of the value |
| underline | boolean | false | only display border bottom  |
| clearWithUndefined | boolean | false | onChange get undefined while clear value |
| innerTitle | string | - | inner title |
| inputable | boolean | false | Allow enter something into DatePicker |
| position | 'left-top' \| 'left-bottom' \| 'right-top' \| 'right-bottom' | - | Set Position can control the different position of DatePicker |
| size | 'small' \| 'default' \| 'large' | 'default' | There are three built-in size: small、default、large. |
| timeZone | string | - | Set the default time zone, the format is /^(\[+-\]\d{2})$/ Support '-12' to '+13' |
| open | boolean | none | Set visible of datepicker popup |
| onCollapse | (collapse: boolean) => void | none | options collapse callback |

### DatePickerFormat

tip: The formatting (dayjs) string we use will perform a conversion on the incoming format for backward compatibility with the historical version (date-fns): <br />
yy -> YY <br />
d -> D <br />
a -> A <br />
t -> x <br />
T => X <br />
RRRR -> GGGG <br />
I -> W <br />

the commonly used format is as follows

| format | Description | example |
| -- | --- | --- |
|	M	| month | 1, 2, ..., 12 |
| MM | month(fill up 0) | 01, 02, ..., 12 |
| Q | quarter | 1, 2, 3, 4 |
| D | day |	1, 2, ..., 31
| DD | day(fill up 0) |	01, 02, ..., 31 |
| W | ISO week | 1, 2, ..., 53 |
| WW | ISO week(fill up 0) | 01, 02, ..., 53 |
| YY | year | 00, 01, ..., 99 |
| YYYY | full year | 1900, 1901, ..., 2099 |
| A | AM/PM | AM, PM |
| H | hour | 0, 1, ... 23 |
| HH | hour(fill up 0) | 00, 01, ... 23 |
| h | hour（12 hours system） | 1, 2, ..., 12 |
| hh | hour（12 hours system,补0） | 01, 02, ..., 12 |
| m | minute | 0, 1, ..., 59 |
| mm | minute(fill up 0) | 00, 01, ..., 59 |
| s | second | 0, 1, ..., 59 |
| ss | second(fill up 0) | 00, 01, ..., 59 |
| SSS | ms | 000, 001, ..., 999 |
| Z | Time Zone | -01:00, +00:00, ... +12:00 |
| x | Time stamp(s) |	512969520 |
| X | Time stamp(ms) | 512969520900 |
