# Pagination

<example />

## API 
| Property | Type | Default | Description |
| --- | --- | --- | --- |
| align | string | 'left' | options: \['left', 'center', 'right'] |
| className | string | none | Extend className |
| current | number | none | Current page. If it is passed in value, the component will be controlled component and  the callback function must be handled by onChange. |
| defaultCurrent | number | 1 | Initial page number |
| disabled | bool | false | disabled |
| layout | array | \['links'] | The layout of subcomponent, options: <br />'links': page number<br />'simple': simple page number(Do not use both links and links)<br />'list': number of each page<br />'jumper': jump page number<br />function({ current, total, pageSize }): Anonymous function for displaying information |
| onChange | function(current, pageSize) | none | The callback function when current or pageSize is changing<br />current: new page number<br />pageSize: number of each page |
| pageSize | number | 10 | number of each page |
| pageSizeList | number\[] | \[10, 20, 30, 50, 100] | the list of number of each page
| text | object | none | replaced text<br />prev: The previous page<br />next: The next page<br />page:the text of pageSizeList<br />jumper: Jump to input box text, '{input}' pilaceholder for input box |
| total | number | 0 | Total number |