# Datepicker

<example />

## API

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| className | string | 无 | extend className |
| clearable | bool | true | whether it can be cleared |
| defaultValue | string \| number \| Date \| array | none | default |
| format | string | default values for different types: <br />'date': 'YYYY-MM-dd'<br />'time': 'HH:mm:ss'<br />'week': 'YYYY WW'<br />'month': 'YYYY-MM'<br />'datetime': 'YYYY-MM-dd HH:mm:ss'  | Formatted, see the table below. |
| onChange | function(d) | | a callback when the value is changing |
| placeholder | string \| array | none | placeholder text<br />When the range property is not empty, it is an array of length 2. |
| range | bool \| number | none | range span，unit: **second**，<br />When it is true, it means that the selection range is not restricted. |
| style | object | none | the outermost extension style |
| type | string | 'date' | options:  \['date', 'time', 'datetime', 'month', 'week'] |
| value | string \| number \| Date \| array | none | 值。为 string 时，需要和 format 属性匹配。<br />range 属性为 true 时，值为长度为2的数组 |


### Format

The commonly used format is as follows

| format | Description | example |
| --- | --- | --- |
|	M	| month | 1, 2, ..., 12 |
| MM | month(fill up 0) | 01, 02, ..., 12 |
| Q | quarter | 1, 2, 3, 4 |
| d | day |	1, 2, ..., 31
| dd | day(fill up 0) |	01, 02, ..., 31 |
| W | week | 1, 2, ..., 53 |
| WW | week(fill up 0) | 01, 02, ..., 53 |
| yy | year | 00, 01, ..., 99 |
| yyyy | full year | 1900, 1901, ..., 2099 |
| A | AM/PM | AM, PM |
| a | am/pm |	am, pm |
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
| X | Time stamp(s) |	512969520 |
| x | Time stamp(ms) | 512969520900 |