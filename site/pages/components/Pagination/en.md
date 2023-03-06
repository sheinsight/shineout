# Pagination

<example />

## API 
| Property | Type | Default | Description |
| --- | --- | --- | --- |
| align | 'left' \| 'center' \| 'right' | 'left' | align of pagination |
| className | string | - | Extend className |
| current | number | - | Current page. |
| defaultCurrent | number | 1 | Initial page number |
| disabled | boolean | false | Disabled |
| layout | string[] | \['links'] | The layout of child elements, options: <br />'links': page number<br />'simple': simple page number(Do not use both simple and links)<br />'list': page size selector<br />'jumper': jump to page number<br />'simple': minimalist mode<br />function({ current, total, pageSize }): custom information |
| onChange | (current: number, pageSize: number) => void | - | The callback function when current page or pageSize is changing<br />current: new page number<br />pageSize: number of each page |
| pageSize | number | 10 | Number of each page |
| pageSizeList | number[] | \[10, 20, 30, 50, 100] | The list of number of each page |
| size | 'large' \| 'default' \| 'small' | 'default' | size of pagination |
| text | object | none | Replaced text<br />prev: the previous page<br />next: the next page<br />page:the text of pageSizeList<br />jumper: jump to input box text, '{input}' pilaceholder for input box |
| total | number | 0 | Total number. If total is less than 0, hide the Pagination. |
| sizeListProps| object | - | Additional attributes which need to given page size selector  | 
| span| number | 5 | The number of pagination buttons | 