# Table

<example />

## API 

### Table
| Property | Type | Default | Description |
| --- | --- | --- | --- |
| bordered | bool | false | Whether to display the border |
| className | string | - | extend className |
| columns | Column\[] | - | array，见Column |
| data | object\[] | - | data |
| datum | object | - | If the format and prediction does not satisfied your requirements, you can pass in a [Datum.List](/components/Datum.List) object or the Datum.List configuration to process data. |
| disabled | bool \| function | false | When the value is true, disabled all checkboxes; When the value is function, disable the checkbox that this function returns true. |
| fixed | string | - | options:  \['both', 'x', 'y'] 
| format | string \| function | d => d | Format value<br />The defaule value is return the original data.<br />When it is a string, the value is fetched from the original data as a key equivalent to (d) => d\[format]<br />When it is a function, use its return value. |
| loading | bool \| element | false | When it is true, a default [Spin](/components/Spin) component will be displayed, a custom loading icon can be passed in to replace. |
| keygen | string \| function(obj):string | index | Generate a auxiliary method for each key<br />If not filled, index will be used (not recommended, in some cases there may be problems)<br />When it is a function, use its return value. <br />When it is a string，ues the value of the string.For example, 'id' is the same thing as (d) => d.id . |
| onScroll | function(x, y) | none | The callback function after scrolling.<br />x: Horizontal rolling ratio(0 <= x <= 1)<br />y: Vertical scroll ratio(0 <= y <= 1) |
| onRowClick | function(data, index) | none | Callback when row click.<br />data: current row data<br />index: current row index |
| onRowSelect | function(rows) | none | Select row. Rows is the selected data. |
| prediction | function | (val, d) => val===format(d) | By default, the result of the format function is used to compare whether it matches. In some cases (for example, whe an object that returns the original data is updated, an different option with the same value  is generated), the prediction function needs to be used to determine whether match |
| rowClassName | function(record, index) | - | Specify row className |
| rowHeight | number | 40 | The expected height of a one-line table is just a rough estimate to show the scroll bar. |
| rowsInView | number | 20 | The maximum number of rows for a single render. Table uses lazy render to optimize performance under large amounts of data. If your table displays more than 20 rows, you can change the value of rowsInView. Value of 0 disables lazy loading.|
| showSelectAll | bool | true | Whether to show being fully selected. |
| striped | bool | false | Whether to display zebra shading. |
| style | object | - | Container element style |
| value | array | none | The current selected value. |
| empty | string | Data not found | empty text |
| rowClickAttr | string \| string[] | \['*'\] | Sets the attribute of inner element to trigger onRowClick as needed, and '*' to accept the row click |
| sorter | func | alphaSort(Column.sorter, sorter) | the method of table sort，args are Column.sorter and order |
| treeExpandKeys | array | none  | Tree Table expanded row keys |
| onTreeExpand | function(keys) | none | expand row change, keys is expanded row keys |
| hover | bool | true | row hover highlight |
| treeEmptyExpand | bool | false | show expand button while children data is empty |
| treeCheckAll | bool | false | check children data while select all | 
| onSortCancel | func | none | sort cancel event |
| radio | bool | false | is Radio |
| rowEvents | array | none | tr events |

### Column
| Property | Type | Default | Description |
| --- | --- | --- | --- |
| colSpan | function(record) | none | The function for controlling to merge columns. The return value is an integer indicating the number of columns that need to be merged。 |
| fixed | string | - | options: \['left', 'right']；<br />Need to set the Table's fixed to 'x' or 'both'; |
| group | string \| string\[] | - | The group of header column. |
| key | string \| number | none | The key of the column |
| render | string \| function(d,i) | required | The generation function for Table content.<br />d: the data of the current row<br />i: the index of the current row <br />For ease of use, you can pass in the key of a data, such as 'id', which is equivalent to (d) => { return d.id } |
| rowSpan | function(a, b) | none | When it is a function, it is judged whether the rows are merged according to the result (bool) returned by the function, and a and b are two adjacent rows of data. |
| sorter | function(order) \| string | none | When the sorter is not empty, the sort icon appears in this column. the value of order: \['asc', 'desc']<br />Indicate the sort key string, will pass to table sorter method.<br />Front-end sorting returns a sort function, refer to Array.sort.<br />Server-side sorting, do not return values and handle it itself. |
| title | string \| ReactElement \| function(data) | none | The content of the header |
| type | string | - | Special column, options: \['expand', 'row-expand', 'checkbox']<br />expand: Expand the column. When the render function returns a function, it means that the row can be expanded and the content  is the result returned by this function. <br />row-expand: Similar to expand. The difference is that clicking on the entire row triggers the expand event.<br />checkbox: Select column for scenes with only fixed selection columns |
| width | number | - | the width of the column |
| align | string | 'left' | cell align \['left', 'center', 'right'\]
| treeColumnsName | string | none | tree table children-data name |
| treeIndent | number | 25 | indent of each level |   
