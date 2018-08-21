# Table

<example />

## API 

### Table
| Property | Type | Default | Description |
| --- | --- | --- | --- |
| bordered | bool | false | Whether to display the outer border |
| className | string | none | extend className |
| columns | Column\[] | none | array，见Column |
| data | object\[] | none | data |
| datum | object | none | If the format and prediction propertt do not meet the requirements, you can pass in a [Datum.List](#/components/Datum.List) object or the Datum.List configuration to process data. |
| fixed | string | none | options:  \['both', 'x', 'y'] 
| format | string \| function | d => d | Format value<br />Default value, return original data. <br />When it is a string, it will get the value from the original data as a key .The same as (d) => d[format]<br /> When it is a function, the result returned by the function will be the value. |
| loading | bool \| element | false | In the data loading, when it is true, a default[Spin](#/components/Spin)component will be displayed, and a custom Spin can be passed in to replace. |
| keygen | string \| function(obj):string | index | Generate a auxiliary method for each key<br />If not filled, index will be used (not recommended, in some cases there may be problems)<br />When it is a function, use its return value. <br />When it is a string，ues the value of the string.For example, 'id' is the same thing as (d) => d.id . |
| onScroll | function(x, y) | none | The callback function after scrolling.<br />x: Horizontal rolling ratio(0 <= x <= 1)<br />y: Vertical scroll ratio(0 <= y <= 1) |
| onRowSelect | function(rows) | none | Select row. Rows is the selected data. If data needs to be formatted, it is recommended to use datum. |
| prediction | function | (val, d) => val===format(d) | By default, the result of the format function is used to compare whether it matches. In some cases (for example, whe an object that returns the original data is updated, an different option with the same value  is generated), the prediction function needs to be used to determine whether match |
| rowHeight | number | 40 | The expected height of a one-line table is just a rough estimate to show the scroll bar. |
| rowsInView | number | 20 | The maximum number of rows for a single render. Table uses lazy render to optimize performance under large amounts of data. If your table displays more than 20 rows, you can adjust the value of rowsInView. |
| showSelectAll | bool | true | Whether to show being fully selected. |
| striped | bool | false | Whether to display staggered zebra shading |
| style | object | none | extend style |
| value | array | none | The current selected value is in the same format as the onRowSelect's return value. |

### Column
| Property | Type | Default | Description |
| --- | --- | --- | --- |
| colSpan | function(row) | none | The function for controlling to merge columns. Row is a single row of data and the return value is an integer indicating the number of columns that need to be merged。 |
| fixed | string | none | options: \['left', 'right']；<br />You need to set the Table's fixed to 'x' or 'both' to take effect; <br /> If the adjacent multiple columns need to be locked, just specify the outermost column. |
| group | string \| string\[] | none | The group of header. Adjacent and identical groups will generate a new header. |
| key | string \| number | none | The key of the column; Use index by default |
| render | string \| function(d,i) | required | The generation function for Table content.<br />d: the data of the current row<br />i: the index of the current row <br />For ease of use, you can pass in the key of a data, such as 'id', which is equivalent to (d) => { return d.id } |
| rowSpan | function(a, b) | none | When it is a function, it is judged whether the rows are merged according to the result (bool) returned by the function, and a and b are two adjacent rows of data. |
| sorter | function(order) | none | When the sorter is not empty, the sort icon appears in this column. the value of order: \['asc', 'desc']<br />Front-end sorting returns a sort function, refer to Array.sort.<br />Server-side sorting, do not return values and handle it itself. |
| title | string \| ReactElement \| function | none | The content of the header |
| type | string | none | Special column, options: \['expand', 'checkbox']<br />expand: Expand the column. When the render function returns a function, it means that the row can be expanded and the content  is the result returned by this function. <br />checkbox: Select column for scenes with only fixed selection columns |
| width | number | none | the width of the column |