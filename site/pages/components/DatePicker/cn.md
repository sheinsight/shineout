# DatePicker *日期选择*

####   <br />*请注意date-fns的 format 字符串 与 Moment.js 的区别: [区别](https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md)

<example />

<apis />

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
