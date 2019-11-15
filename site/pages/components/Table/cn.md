# Table *表格*

<example />

## API 

### Table
| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| bordered | bool | false | 是否显示外边框 |
| className | string | 无 | 扩展className |
| columns | Column\[] | 无 | 数组，见Column |
| data | object\[] | 无 | 数据 |
| datum | object | 无 | 如果 format 和 prediction 属性无法满足需求，可以传入一个 [Datum.List](/components/Datum.List) 对象，或者 Datum.List 配置来处理数据。 |
| disabled | bool \| function | false | 如果 disabled 为 true，禁用全部选项，如果 disabled 为函数，根据函数反回结果禁用选项 |
| fixed | string | 无 | 可填值 \['both', 'x', 'y'] 
| format | string \| function | d => d | 格式化 value<br />默认值，返回原始数据<br />为string时，会作为key从原始数据中获取值，相当于 (d) => d[format]<br /> 为函数时，以函数返回结果作为 value |
| loading | bool \| element | false | 数据加载中，为true时会展示一个默认的[Spin](/components/Spin)组件，可以传入一个自定义的Spin代替 |
| keygen | string \| function(obj):string \| true | 必填 | 生成每一项key的辅助方法<br />为 true 时，以数据项本身作为key，相当于 (d => d)<br />为函数时，使用此函数返回值<br />为string时，使用这个string对应的数据值。如 'id'，相当于 (d => d.id) |
| onScroll | function(x, y) | 无 | 滚动条滚动后回调函数；<br />x: 横向滚动比(0 <= x <= 1)<br />y: 纵向滚动比(0 <= y <= 1) |
| onRowClick | function(data, index) | 无 | 行点击事件; <br />data: 当前行数据<br />index: 当前行索引 |
| onRowSelect | function(rows) | 无 | 选择行。rows为选中的数据。如果需要数据需要格式化的处理，建议使用 datum |
| prediction | function | (val, d) => val===format(d) | 默认使用 format 函数执行的结果来比较是否匹配，在某些情况下（例如返回原始数据的对象，更新数据时，生成了一个值相同，非同一个对象的选项），需要借助 prediction 函数来判断是否匹配 |
| rowClassName | function(record, index) | 无 | 指定单行className |
| rowHeight | number | 40 | 单行表格的预期高度，只是一个大概的估值，用来展示滚动条 |
| rowsInView | number | 20 | 单次render的最大行数。Table 采用了lazy render的方式来优化在大量数据下的性能，如果你的表格显示的高度超出了20条，可以调整rowsInView的值。为0表示禁用懒加载。 |
| showSelectAll | bool | true | 是否显示全选 |
| striped | bool | false | 是否显示交错斑马底纹 |
| style | object | 无 | 扩展样式 |
| value | array | 无 | 当前选中值，格式和 onRowSelect 返回值一致 |
| empty | string \| ReactElement | 无数据 | 空数据文案 |
| verticalAlign | string | 'top' | 单元格内容垂直对齐方式，可选值为 \['top', 'middle'\] |
| rowClickAttr | string \| string[] | \['*'\] | 设置行内元素的attribut来按需触发onRowClick, '*'表示接受行点击触发 |
| sorter | func | alphaSort(Column.sorter, sorter) | 表格统一排序函数，参数分别为 Column.sorter 和 排序方式 |
| treeExpandKeys | array | 无  | 树形数据展开行，受控 |
| hover | bool | true | 数据行鼠标悬浮高亮效果 |
| onTreeExpand | function(keys) | 无 |  展开行，keys为展开的行 |
| treeEmptyExpand | bool | false | 树形表格子数据为空时依然展示展开按钮 |
| treeCheckAll | bool | false | 全选时是否将子孙数据选中 | 
| onSortCancel | func | 无 | 排序取消事件 |
| radio | bool | false | 是否单选 |
| rowEvents | array | 无 | tr 事件监听器集合 |

### Column
| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| colSpan | function(row) | 无 | 合并列控制函数，row为单行数据，返回值一个整数，标明需要合并的列数 |
| fixed | string | 无 | 可选\['left', 'right']；<br />需要设置Table的fixed为'x'或'both'才生效；<br />如果相邻的多列需要锁定，只需指定最外侧的column即可 |
| group | string \| string\[] | 无 | 表头分组，相邻的相同 group 会生成一个新的表头 |
| key | string \| number | 无 | 列的key，默认使用index |
| render | string \| function(d,i) | 必填 | 表格内容生成函数；<br />d: 当前行数据<br />i: 当前行索引<br />为了使用方便，可以传入一个数据的key，如 'id'，相当于 (d) => { return d.id }
| rowSpan | function(a, b) | 无 | 根据函数返回的结果（bool）判断是否合并行，a、b为相邻的两行数据。 |
| sorter | function(order) \| string | 无 | sorter 不为空时，这一列会出现排序 icon。order的值为\['asc', 'desc']<br />字符串表示排序依据字段，作为第一个参数传入Table.sorter<br />前端排序，返回一个排序函数，参考 Array.sort。<br />服务端排序，不要返回值，自行处理即可。
| title | string \| ReactElement \| function | 无 | 表头显示内容 |
| type | string | 无 | 特殊用途列，可选值为 \['expand', 'row-expand', 'checkbox']<br />expand: 行展开列，render 函数返回函数时，表示此行可以展开，内容为此函数返回结果<br />row-expand: 同expand。不同为点击行内空白区域也可以折叠/展开行。<br />checkbox: 选择列，用于仅固定选择列的场景 |
| width | number | 无 | 列宽 |
| align | string | 'left' | 单元格内容排布方式，可选 \['left', 'center', 'right'\]
| treeColumnsName | string | 无 | 树形表格子数据字段名 |
| treeIndent | number | 25 | 每一层缩进宽度 |   
