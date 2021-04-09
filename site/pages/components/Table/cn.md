# Table *表格*

<example />

## API 

### Table

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| bordered | boolean | false | 是否显示外边框 |
| className | string | 无 | 扩展className |
| columns | object[] | 无 | 数组，见 TableColumn |
| data | object[] | 无 | 数据 |
| disabled | (data: object) => boolean \| boolean | false | 如果 disabled 为 true，禁用全部选项，如果 disabled 为函数，根据函数反回结果禁用选项 |
| fixed | 'both' \| 'x' \| 'y' \| 'auto' | 无 | 虚拟滚动条方向设置，不设置则使用原生滚动条且关闭懒加载 | 
| format | (data: object) => any \| string | d => d | 格式化 value<br />默认值，返回原始数据<br />为string时，会作为key从原始数据中获取值，相当于 (d) => d\[format\]<br /> 为函数时，以函数返回结果作为 value |
| loading | boolean \| ReactNode | false | 数据加载中，为true时会展示一个默认的[Spin](/components/Spin)组件，可以传入一个自定义的Spin代替 |
| keygen | ((data: object) => any) \| string \| true | 必填 | 生成每一项key的辅助方法<br />为 true 时，以数据项本身作为key，相当于 (d => d)<br />为函数时，使用此函数返回值<br />为string时，使用这个string对应的数据值。如 'id'，相当于 (d => d.id) |
| onScroll | (x: number, y: number) => void | 无 | 滚动条滚动后回调函数；<br />x: 横向滚动比(0 <= x <= 1)<br />y: 纵向滚动比(0 <= y <= 1) |
| onRowClick | (data: object, index: number) => void | 无 | 行点击事件; <br />data: 当前行数据<br />index: 当前行索引 |
| onRowSelect | (rows: any[]) => void | 无 | 选择行。rows为选中的数据。如果需要数据需要格式化的处理，建议配置 format 和 prediction |
| prediction | (v: any, data: object) => boolean | (val, d) => val===format(d) | 默认使用 format 函数执行的结果来比较是否匹配，在某些情况下（例如返回原始数据的对象，更新数据时，生成了一个值相同，非同一个对象的选项），需要借助 prediction 函数来判断是否匹配 |
| rowClassName | (record: object, index: number) => string | 无 | 指定单行className |
| rowHeight | number | 40 | 单行表格的预期高度，只是一个大概的估值，用来展示滚动条 |
| rowsInView | number | 20 | 单次render的最大行数。Table 采用了lazy render的方式来优化在大量数据下的性能，如果你的表格显示的高度超出了20条，可以调整rowsInView的值。为 0 表示单次 render 所有数据。 |
| showSelectAll | boolean | true | 是否显示全选 |
| striped | boolean | false | 是否显示交错斑马底纹 |
| style | object | 无 | 扩展样式 |
| value | any[] | 无 | 当前选中值，格式和 onRowSelect 返回值一致 |
| empty | string \| ReactNode | 无数据 | 空数据文案 |
| verticalAlign | 'top' \| 'middle' | 'top' | 单元格内容垂直对齐方式 |
| rowClickAttr | true \| string \| string[] | \['*'\] | 设置行内元素的attribut来按需触发onRowClick, '*'表示接受行点击触发 |
| sorter | (sortKey: any, sorter: 'asc' \| 'desc', sortedList: object[]) => (a: object, b: object) => boolean | alphaSort(Column.sorter, sorter) | 表格统一排序函数，参数分别为 Column.sorter 和 排序方式;<br />支持多列排序，sorter传入对象{ rule: string \| function, weight: number }, rule为排序规则，为字符串时参考单列排序的用法, weight为权重，指明排序的优先级. <br />多列排序时，sortedList返回所有参与排序的字段信息|
| treeExpandKeys | any[] | 无  | 树形数据展开行，受控 |
| hover | boolean | true | 数据行鼠标悬浮高亮效果 |
| onTreeExpand | (openKeys: string[], data: object, expand: boolean) => void | 无 |  展开行，keys为展开的行 |
| treeEmptyExpand | boolean | false | 树形表格子数据为空时依然展示展开按钮 |
| treeCheckAll | boolean | false | 全选时是否将子孙数据选中 | 
| onSortCancel | () => void | 无 | 排序取消事件 |
| radio | boolean | false | 是否单选 |
| rowEvents | object | 无 | tr 事件监听器集合 |
| defaultTreeExpandKeys | any[] | 无 | 默认展开行(非受控) |
| dataChangeResize | boolean | false | 数据发生变化后是否重新计算列宽 |
| onColumnResize | (newColumns: object[]) => void | 无 | 列宽伸缩后的回调 |
| size | 'small' \| 'normal' | 'normal' | 表格尺寸 |
| pagination | object | 无 | 分页数据 |
| innerScrollAttr | string[] | 无 | 虚拟滚动模式下，设置行内元素的 attribut 来实现内部滚动 |
| expandKeys | any[] | 无 | 展开行受控 |
| sticky | boolean \| object | 无 | 表头是否附着顶部，为 true 时距离顶部为0，为对象时属性值参考 [Sticky组件](/components/Sticky) |
| cellSelectable | boolean | false | 是否启用 ctrl/cmd + click 选中单元格 |

### TableColumn

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| colSpan | function(row) | 无 | 合并列控制函数，row为单行数据，返回值一个整数，标明需要合并的列数 |
| fixed | string | 无 | 可选\['left', 'right']；<br />需要设置Table的fixed为'x'或'both'才生效；<br />如果相邻的多列需要锁定，只需指定最外侧的column即可 |
| group | string \| string\[] | 无 | 表头分组，相邻的相同 group 会生成一个新的表头 |
| key | string \| number | 无 | 列的key，默认使用index |
| render | string \| function(d,i) | 必填 | 表格内容生成函数；<br />d: 当前行数据<br />i: 当前行索引<br />为了使用方便，可以传入一个数据的key，如 'id'，相当于 (d) => { return d.id } |
| rowSpan | function(a, b) | 无 | 根据函数返回的结果（boolean）判断是否合并行，a、b为相邻的两行数据。 |
| sorter | function(order) \| string | 无 | sorter 不为空时，这一列会出现排序 icon。order的值为\['asc', 'desc']<br />字符串表示排序依据字段，作为第一个参数传入Table.sorter<br />前端排序，返回一个排序函数，参考 Array.sort。<br />服务端排序，不要返回值，自行处理即可。 |
| title | string \| ReactElement \| function | 无 | 表头显示内容 |
| type | string | 无 | 特殊用途列，可选值为 \['expand', 'row-expand', 'checkbox']<br />expand: 行展开列，render 函数返回函数时，表示此行可以展开，内容为此函数返回结果<br />row-expand: 同expand。不同为点击行内空白区域也可以折叠/展开行。<br />checkbox: 选择列，用于仅固定选择列的场景 |
| width | number | 无 | 列宽 |
| align | string | 'left' | 单元格内容排布方式，可选 \['left', 'center', 'right'\]
| treeColumnsName | string | 无 | 树形表格子数据字段名 |
| treeIndent | number | 25 | 每一层缩进宽度 |   
| minWidth | number | 无 | 最小列宽 |
| hide | boolean | false | 只针对行展开列有效，表示是否隐藏该列 |
| defaultOrder | string | 'asc' \| 'desc' | 默认排序规则 | 
