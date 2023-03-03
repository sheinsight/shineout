# Datepicker

####   <br />*Please note that the format tokens differ from Moment.js and other libraries: [differ](https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md)

<example />

<apis />

### DatePickerFormat

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
