# Tree *树形选择*

## 

#### 本页面中用到的数据如下（数据量比较大，请谨慎点开）
<example name="data" />

<example />

## API

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| className | string | 无 | 扩展className |
| onChange | (value: string[]) => void | 无 | 设置 onChange 属性时，显示 选择框。参数为当前选中值，和 mode 属性相关 |
| data | object[] | [] | 数据，子节点为children，如果 children 值为 null 或 长度为 0 时，视为叶子节点 |
| defaultExpanded | string[] | 无 | 默认展开的节点 key（非受控） |
| disabled | (data: any) => boolean \| boolean | false | 显示选择框时有效，为 true 时，所有节点禁用选择，为函数时，根据函数返回结果确定是否禁用 |
| expanded | string[] | 无 | 展开的节点 key （受控） |
| keygen | ((data: any, parentKey: string) => string) \| string | 必填 | 生成key的辅助方法<br />为函数时，使用此函数返回值<br />为string时，使用这个string对应的数据值。如 'id'，相当于 (d) => d.id |
| line | boolean | true | 是否显示连接线 |
| loader | (key: string) => void | 无 | 设置loader属性后，未定义children的节点视为动态加载节点，点击展开触发 loader事件，children 为 null 或者长度为 0 视为叶子节点 |
| mode | 0 \| 1 \| 2 \| 3 \| 4 | 1 | 选中值模式<br />0: 只返回完全选中的节点，包含父节点<br />1: 返回全部选中的节点和半选中的父节点<br />2: 只返回选中的子节点<br />3: 如果父节点选中，只返回父节点<br />4: 所选即所得 |
| onExpand | (value: string[]) => void | 无 | 节点展开回调，参数为当前展开节点 key 数组 |
| renderItem | (data: object) => ReactNode | 必填 | 为 string 时，返回 d\[string]<br />为 function 时，返回函数结果 |
| defaultValue | string[] | 无 | 默认选中的 key （非受控） | 
| value | string[] | 无 | 选中的 key （受控） | 
| onDrop | (data: object, key: string, targetKey: string, position: number) => void | 无 | 设置 onDrop 属性时，为可拖动状态<br />data: 拖动后重新排序的完整数据<br />key: 拖动的节点key<br />targetKey: 目标节点 key<br />position: 在目标节点的位置，以 0 开始 | 
| defaultExpandAll | boolean | false | 默认展开所有节点 | 
| childrenKey | string | 'children' | 指定子数据的属性名 |
| expandIcons | \[ReactNode, ReactNode] | 无 | 自定义展开/收起按钮 |
| dragImageSelector | (data: object) => string \| string | 无 | 定义拖拽图片的选择器 |
| dragImageStyle | object | 无 | 拖拽图片的样式 |
| leafClass | (data: object) => string \| string | 无 | 叶子节点的 class, 函数的参数为该条叶子节点数据 |
| dragHoverExpand | boolean | false | 拖拽时自动展开含有子节点的节点 |
| doubleClickExpand | boolean | false | 双击是否展开节点 |
| onClick | (data: object) => void | 无 | 节点点击事件 |
| iconClass | string | 无 | 展开/收起按钮的类名 |
| nodeClass | string \| ((data: any) => string) | 无 | 节点的class，如果是函数，参数为该节点数据 |
| dragSibling | boolean  | 无 | 是否只能平级拖拽 |
