# DatePicker *日期选择*

<example />

## API

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| className | string | 无 | 扩展className |
| defaultValue | string \| number \| Date \| array | 无 | 默认值 |
| format | string | 不同type对应的默认值<br />'date': 'YYYY-MM-DD'<br />'time': 'HH:mm:ss'<br />'week': 'YYYY WW'<br />'month': 'YYYY-MM'<br />'datetime': 'YYYY-MM-DD HH:mm:ss'  | 格式化，见下表 |
| onChange | function(d) | | 值改变回调函数 |
| placeholder | string \| array | 无 | 占位文字<br />range 属性为 true 时，为长度为2的数组 |
| range | bool | false | 是否为范围选择 |
| style | object | 无 | 最外层扩展样式 |
| type | string | 'date' | 可选值为 \['date', 'time', 'datetime', 'month', 'week'] |
| value | string \| number \| Date \| array | 无 | 值。为 string 时，需要和 format 属性匹配。<br />range 属性为 true 时，值为长度为2的数组 |


### Format

常用的 format 格式如下，完整的格式参考 [date-fns 文档](https://date-fns.org/v1.29.0/docs/format)

| 格式 | 说明 | 示例 |
| --- | --- | --- |
|	M	| 月 | 1, 2, ..., 12 |
| MM | 月（补0）| 01, 02, ..., 12 |
| Q | 季度 | 1, 2, 3, 4 |
| D | 日 |	1, 2, ..., 31
| DD | 日（补0） |	01, 02, ..., 31 |
| W | 周 | 1, 2, ..., 53 |
| WW | 周（补0）| 01, 02, ..., 53 |
| YY | 年 | 00, 01, ..., 99 |
| YYYY | 完整年 | 1900, 1901, ..., 2099 |
| A | AM/PM | AM, PM |
| a | am/pm |	am, pm |
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
| X | 时间戳（秒） |	512969520 |
| x | 时间戳（毫秒） | 512969520900 |