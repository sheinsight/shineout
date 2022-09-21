# Cascader *级联选择*

<example />

## API

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| className | string | 无 | 扩展className |
| clearable | boolean | true | 是否显示清除数据图标 |
| data | any[] | [] | 数据，子节点为children，如果 children 值为 null 或 长度为 0 时，视为叶子节点 |
| defaultValue | any[] | 无 | 默认选中的 key （非受控） |
| disabled | (data: any) => boolean \| boolean | false | 显示选择框时有效，为 true 时，所有节点禁用选择，为函数时，根据函数返回结果确定是否禁用 |
| expandTrigger | 'click' \| 'hover' \| 'hover-only' | 'click' | 节点展开触发方式 |
| keygen | ((data: any, parentKey: any) => string) \| string  | 必填 | 生成key的辅助方法<br />为函数时，使用此函数返回值<br />为string时，使用这个string对应的数据值。如 'id'，相当于 (d) => d.id |
| loader | (key: any, data: any) => void | 无 | 设置loader属性后，未定义children的节点视为动态加载节点，点击展开触发 loader事件，children 为 null 或者长度为 0 视为叶子节点 |
| mode | 0 \| 1 \| 2 \| 3 \| 4 | 无 | 选中值模式，未设置值为单选<br />0: 只返回完全选中的节点，包含父节点<br />1: 返回全部选中的节点和半选中的父节点<br />2: 只返回选中的子节点<br />3: 如果父节点选中，只返回父节点 <br />4: 所选即所得 |
| onChange | (value: any[], selected: boolean) => void | 无 | 设置 onChange 属性时，显示 选择框。参数为当前选中值，和 mode 属性相关 |
| renderItem | (data: any) => ReactNode \| string | 必填 | 为 string 时，返回 d\[string]<br />为 function 时，返回函数结果 |
| renderResult | (data: any, result: any[]) => ReactNode \| string | renderItem | 选中后在结果中显示的内容，默认和 renderItem 相同。返回 null 则不展示，result 为当前选中的所有值。 |
| value | any[] | 无 | 选中的 key （受控） |
| absolute | boolean \| (() => element) | false | 为 true 时，选项弹出层在 BODY 下独立 render， 为函数时 选项弹出层在函数返回的 DOM 下render  |
| compressed | boolean \| 'no-repeat' | false | 将选中值合并。为'no-repeat'时弹出框中不重复展示值 |
| childrenKey | string | 'children' | 指定子数据的属性名 |
| finalDismiss | boolean | false | 选择末级节点后是否关闭选项列表 |
| onCollapse | (collapse: boolean) => void | 无 | 下拉列表展开/收起回调 |
| onFilter | (text: string) => (data: any) => boolean | 无 | onFilter 不为空时，可以输入过滤数据<br />onFilter 如果返回一个函数，使用这个函数做前端过滤<br />如果不返回，可以自行做后端过滤<br />单选状态下支持 |
| height | number | 300 | 下拉列表高度 |
| filterDelay | number | 400 | 毫秒。用户输入触发 fitler 事件的延时 |
| size | string | 无 | 尺寸 |
| singleRemove | boolean | 无 | 支持单个节点删除 |
| unmatch | boolean | 无 | 是否展示data中不存在的值 |
| underline | boolean | false | 是否只展示下边框 |
| showArrow | boolean | true | 是否显示下拉箭头，仅针对单选情况 |
| getComponentRef | (componentRef: any) => void  | 无 | 绑定组件的引用, 可以调用某些组件的方法 |
| filterSameChange | boolean | false | 过滤掉具有相同值的onChange回调 |
| loading | boolean \| ReactNode | 无 | 下拉列表 loading 状态 |
| compressedBound | number | 无 | 开启多选后，指定允许展示标签数量，超过后将折叠 |
| wideMatch | boolean | 无 | 开启 wideMatch 后，将筛选出所有可能的匹配项目 |

