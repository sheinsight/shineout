# TreeSelect *树选择*

TreeSelect 用来选择树形数据结构，若需要非关联树形结构选择可使用 [Select(treeData)](/components/Select)

<example />

## API

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| clearable | bool | false | 是否可清除值 |
| multiple | bool | false | 是否是多选 |
| data | array[{children:[]}] | [] | 数据，子节点为children，如果 children 值为 null 或 长度为 0 时，视为叶子节点 |
| value | string \| array | 无 | 选中的 key （受控），多选时必须为array |
| defaultValue | string \| array | 无 | 初始值，多选时必须为array |
| defaultExpanded | array\[key] | 无 | 默认展开的节点 key（非受控） |
| disabled | boolean \| function(d) | false | 为 true 时，所有节点禁用选择，为函数时，根据函数返回结果确定是否禁用 |
| filterDelay | number | 400 | 毫秒。用户输入触发 fitler 事件的延时 |
| name | string | 无 | Form 存取数据的名称 |
| keygen | string \| function(obj):string \| true | 必填 | 生成每一项key的辅助方法<br />为 true 时，以数据项本身作为key，相当于 (d => d)<br />为函数时，使用此函数返回值<br />为string时，使用这个string对应的数据值。如 'id'，相当于 (d => d.id) |
| expanded | array\[key] | 无 | 展开的节点 key （受控） |
| loader | function(key) | 无 | 设置loader属性后，未定义children的节点视为动态加载节点，点击展开触发 loader事件，children 为 null 或者长度为 0 视为叶子节点 |
| mode | \[0\|1\|2\|3\] | 1 | 选中值模式<br />0: 只返回完全选中的节点，包含父节点<br />1: 返回全部选中的节点和半选中的父节点<br />2: 只返回选中的子节点<br />3: 如果父节点选中，只返回父节点 |
| onExpand | function(array) | 无 | 节点展开回调，参数为当前展开节点 key 数组 |
| onChange | function(array) | 无 | 参数 为 当前选中值 |
| onFilter | function | 无 | onFilter 不为空时，可以输入过滤数据<br />onFilter 如果返回一个函数，使用这个函数做前端过滤<br />如果不返回，可以自行做后端过滤 |
| renderItem | string \| function(d) | 必填 | 为 string 时，返回 d\[string]<br />为 function 时，返回函数结果 |
| renderResult | function(d) | renderItem | 选中后在结果中显示的内容，默认和 renderItem 相同 |
| compressed | bool | false | 将选中值合并，只在多选模式下有效 |
| absolute | bool | false | 为 true 时，选项弹出层在 DOM 中独立 render |
| zIndex | number | 1000 | 选项列表 z-index 值 |
| childrenKey | string | 'children' | 指定子数据的属性名 | 
| defaultExpandAll | bool | false | 默认全部展开节点 | 
