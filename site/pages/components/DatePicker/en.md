# Datepicker

####   <br />*Please note that the format tokens differ from Moment.js and other libraries: [differ](https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md)

<example />

## API

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| className | string | - | extend className |
| clearable | bool | true | whether it can be cleared |
| defaultValue | string \| number \| Date \| array | - | default |
| disabled | bool \| function | false | When the value is true, disabled all options; When the value is function, disable the options that this function returns true. |
| format | string | | default values for different types: <br />'date': 'yyyy-MM-dd'<br />'time': 'HH:mm:ss'<br />'week': 'RRRR II'<br />'month': 'yyyy-MM'<br />'datetime': 'yyyy-MM-dd HH:mm:ss' |
| formatResult | string | props.format | Format the selected time |
| onChange | function(d) | | a callback when the value is changing |
| placeholder | string \| array | - | placeholder text<br />When the range property is not empty, it is an array of length 2. |
| range | bool \| number | - | range span，unit: **second**，<br />When it is true, selection scope is not limited. |
| style | object | - | Container element style |
| type | string | 'date' | options:  \['date', 'time', 'datetime', 'month', 'week'] |
| value | string \| number \| Date \| array | - | When the value is string, it needs to match the format attribute. <br /> When the range property is true, the value is an array of length 2. |
| defaultTime | string | - | Default time when selecting a date, the format is: 'HH:mm:ss' |
| absolute | bool | false | When it is true, the pop-up layer of option append into document.body. |
| zIndex | number | 1000 | panel z-index |
| allowSingle | boolean | false | allow single select, only in range can set | 
| quickSelect | array<object> | false | quick select, only in range can set, name: tip, value: range date | 
| min | string \| number \| Date | none | option min value |
| max | string \| number \| Date | none | option max value |
| defaultRangeMonth | array:\[date] | - | The initial month of range selection, the value is a time object, valid only in range mode, and the priority is lower than value and defaultValue | 

### Format

tip: The format string we used (date-fns) and moment.js are inconsistent, such as:<br />
moment: YYYY  => date-fns: yyyy <br />
moment: DD&nbsp;&nbsp;&nbsp;&nbsp; => date-fns: dd <br />
moment: hh&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  => date-fns: HH<br />
The commonly used format is as follows

| format | Description | example |
| --- | --- | --- |
|	M	| month | 1, 2, ..., 12 |
| MM | month(fill up 0) | 01, 02, ..., 12 |
| Q | quarter | 1, 2, 3, 4 |
| d | day |	1, 2, ..., 31
| dd | day(fill up 0) |	01, 02, ..., 31 |
| I | ISO week | 1, 2, ..., 53 |
| II | ISO week(fill up 0) | 01, 02, ..., 53 |
| yy | year | 00, 01, ..., 99 |
| yyyy | full year | 1900, 1901, ..., 2099 |
| a | AM/PM | AM, PM |
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
| t | Time stamp(s) |	512969520 |
| T | Time stamp(ms) | 512969520900 |
