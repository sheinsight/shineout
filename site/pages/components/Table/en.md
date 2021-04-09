# Table

<example />

## API 

### Table

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| bordered | boolean | false | Whether to display the border |
| className | string | - | extend className |
| columns | object[] | - | array，见 TableColumn |
| data | object[] | - | data |
| disabled | (data: object) => boolean \| boolean | false | When the value is true, disabled all checkboxes; When the value is function, disable the checkbox that this function returns true. |
| fixed | 'both' \| 'x' \| 'y' \| 'auto' | - | visual scroll-bar direction, empty will use native scroll-bar and disabled lazy load | 
| format | (data: object) => any \| string | d => d | Format value<br />The defaule value is return the original data.<br />When it is a string, the value is fetched from the original data as a key equivalent to (d) => d\[format]<br />When it is a function, use its return value. |
| loading | boolean \| ReactNode | false | When it is true, a default [Spin](/components/Spin) component will be displayed, a custom loading icon can be passed in to replace. |
| keygen | ((data: object) => any) \| string \| boolean | index | Generate a auxiliary method for each key<br />If not filled, index will be used (not recommended, in some cases there may be problems)<br />When it is a function, use its return value. <br />When it is a string，ues the value of the string.For example, 'id' is the same thing as (d) => d.id . |
| onScroll | (x: number, y: number) => void | none | The callback function after scrolling.<br />x: Horizontal rolling ratio(0 <= x <= 1)<br />y: Vertical scroll ratio(0 <= y <= 1) |
| onRowClick | (data: object, index: number) => void | none | Callback when row click.<br />data: current row data<br />index: current row index |
| onRowSelect | (rows: any[]) => void | none | Select row. Rows is the selected data. |
| prediction | (v: any, data: object) => boolean | (val, d) => val===format(d) | By default, the result of the format function is used to compare whether it matches. In some cases (for example, whe an object that returns the original data is updated, an different option with the same value  is generated), the prediction function needs to be used to determine whether match |
| rowClassName | (record: object, index: number) => string | - | Specify row className |
| rowHeight | number | 40 | The expected height of a one-line table is just a rough estimate to show the scroll bar. |
| rowsInView | number | 20 | The maximum number of rows for a single render. Table uses lazy render to optimize performance under large amounts of data. If your table displays more than 20 rows, you can change the value of rowsInView. Value of 0 render all data.|
| showSelectAll | boolean | true | Whether to show being fully selected. |
| striped | boolean | false | Whether to display zebra shading. |
| style | object | - | Container element style |
| value | any[] | none | The current selected value. |
| empty | string \| ReactNode | Data not found | empty text |
| verticalAlign | 'top' \| 'middle' | 'top' | vertical align with content |
| rowClickAttr | true \| string \| string[] | \['*'\] | Sets the attribute of inner element to trigger onRowClick as needed, and '*' to accept the row click |
| sorter | (sortKey: any, sorter: 'asc' \| 'desc', sortedList: any[]) => (a: object, b: object) => boolean | alphaSort(Column.sorter, sorter) | the method of table sort，args are Column.sorter and order<br /> Multi-column sorting is supported. The sorter passes in the object {rule: string \| function, weight: number}, where rule is a sorting rule, which refers to the use of single-column sorting when it is a string, weight is the weight, indicating the priority of the order<br /> When sorting on multiple columns, sortedList returns information about all fields involved in sorting|
| treeExpandKeys | any[] | none  | Tree Table expanded row keys |
| onTreeExpand | (openKeys: string[], data: object, expand: boolean) => void | none | expand row change, keys is expanded row keys |
| hover | boolean | true | row hover highlight |
| treeEmptyExpand | boolean | false | show expand button while children data is empty |
| treeCheckAll | boolean | false | check children data while select all | 
| onSortCancel | () => void | none | sort cancel event |
| radio | boolean | false | is Radio |
| rowEvents | object | none | tr events |
| defaultTreeExpandKeys | any[] | none | Default expanded row keys |
| dataChangeResize | boolean | false | Whether to recalculate the column width after the data changes |
| onColumnResize | (newColumns: object[]) => void | none | columns resize callback |
| size | 'small' \| 'normal' | 'normal' | size of table |
| pagination | object | none | pagination of table |
| innerScrollAttr | string[] | 无 | set inner scrollable element's attribute |
| expandKeys | any[] | none | controlled expand rows |
| sticky | boolean \| object | none | sticky header, When it is true, the distance from the top is 0. When it is an object, the attribute value reference [Sticky component] (/components/Sticky)  |
| cellSelectable | boolean | false | whether to enable ctrl/cmd + click check |

### TableColumn

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| colSpan | function(record) | none | The function for controlling to merge columns. The return value is an integer indicating the number of columns that need to be merged。 |
| fixed | string | - | options: \['left', 'right']；<br />Need to set the Table's fixed to 'x' or 'both'; |
| group | string \| string\[] | - | The group of header column. |
| key | string \| number | none | The key of the column |
| render | string \| function(d,i) | required | The generation function for Table content.<br />d: the data of the current row<br />i: the index of the current row <br />For ease of use, you can pass in the key of a data, such as 'id', which is equivalent to (d) => { return d.id } |
| rowSpan | function(a, b) | none | When it is a function, it is judged whether the rows are merged according to the result (boolean) returned by the function, and a and b are two adjacent rows of data. |
| sorter | function(order) \| string | none | When the sorter is not empty, the sort icon appears in this column. the value of order: \['asc', 'desc']<br />Indicate the sort key string, will pass to table sorter method.<br />Front-end sorting returns a sort function, refer to Array.sort.<br />Server-side sorting, do not return values and handle it itself. |
| title | string \| ReactElement \| function(data) | none | The content of the header |
| type | string | - | Special column, options: \['expand', 'row-expand', 'checkbox']<br />expand: Expand the column. When the render function returns a function, it means that the row can be expanded and the content  is the result returned by this function. <br />row-expand: Similar to expand. The difference is that clicking on the entire row triggers the expand event.<br />checkbox: Select column for scenes with only fixed selection columns |
| width | number | - | the width of the column |
| align | string | 'left' | cell align \['left', 'center', 'right'\] |
| treeColumnsName | string | none | tree table children-data name |
| treeIndent | number | 25 | indent of each level |   
| minWidth | number | - | the minimum width of the column |
| hide | boolean | false | hide the column, only work on row-expand column |
| dataChangeResize | boolean | false | Recalculate columns width while data change |
| defaultOrder | string | 'asc' \| 'desc' | default sort | 
