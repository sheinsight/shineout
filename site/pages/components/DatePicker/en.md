# Datepicker

<example />

<apis />

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
