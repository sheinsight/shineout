(window.webpackJsonpShineoutDoc=window.webpackJsonpShineoutDoc||[]).push([[59],{2211:function(e,n){e.exports="# 更新日志\n### 1.12.3\n- 取消范围选择中开始时间的年、月、季度的 range 限制 (< 1.12.3)\n\n### 1.12.2\n- 修复 Modal 中 autoFocusButton 会导致页面报错的问题 (1.12.1)\n- 修复 List 在 onChange 情况下，布局可能异常的问题(< 1.12.2)\n- 修复 DatePicker 当设置 quickSelect 是弹窗位置可能计算错误(< 1.12.2)\n\n### 1.12.1\n- 修复 Sticky 在容器隐藏时可能导致位置计算错误的问题( < 1.12.1)\n- 调整 uuid 版本\n\n### 1.12.0\n- Table 新增 summary 属性用于渲染底部信息\n- Cascader 新增 wideMatch 属性支持匹配任何可能的条目\n- Cascader 新增 open 属性控制浮层显隐\n- Cascader 优化懒加载模式下的加载逻辑 仅在点击文字时触发懒加载\n- Cascader 限制懒加载模式下的 mode 类型仅 3 和 4 生效\n- 调整 Popover、Tooltip、Drawer、Modal 等弹出组件 removeChild 方式\n- 优化 uid 的生成方式\n- 优化 Popover、Tooltip 组件容器初始化方式 仅在展示时创建\n\n### 1.11.9\n- 修复范围选择器在特定场景下翻页异常问题(1.11.0 - 1.11.8)\n- 优化 Table TS 类型，新增 CommonColumn 类型导出\n\n### 1.11.8\n- 修复主题编辑器获取 spinDefaultName 会取到 none 的问题(<1.11.8)\n- 修复 Input Textarea EditableArea 当 delay 不为 0 在 Form 中输入后直接点击提交会导致 trim 失效的问题(<1.11.8)\n\n### 1.11.7\n- 修复 TreeSelect 在 unmatch 关闭的情况下依然展示 unmatch 选项且删除时报错的问题 (<1.11.7)\n- 修复 Table 在开启 bordered 功能后，滚动列表时底部边框展示异常的问题 (<1.11.7)\n\n### 1.11.6\n- 修复 Table 拖拽列在某些情况下可能存在报错的问题 (<1.11.6)\n\n### 1.11.5\n- 修复 Select 依赖路径错误 (1.11.4)\n- 修复 Tree key 为number 时拖拽报错问题 (< 1.11.5)\n\n### 1.11.4\n-  修复 Upload filesFilter ts 错误 (< 1.11.4)\n-  修复 Select 创建选项，输入后直接点击 Form 提交按钮, Form 数据不同步的问题 (< 1.11.4)\n-  修复 Input coin 为true, 无法自动补全带千分位的数据 (< 1.11.4)\n-  修复 Pagination 在 Chrome 自动翻译后报错问题 (< 1.11.4)\n-  去掉 normalize 中无效的样式\n\n### 1.11.3\n- 修复 Upload 组件在 Form.Item 中可能抛错的问题并优化相关校验逻辑 (1.10.12 - 1.11.2)\n- 优化 Table 组件开启虚拟列表后在部分设备下滚动列表时可能导致浏览器前进或后退的情况\n- 修复 Table 组件在开启 pagination 后 loading 属性传入非 boolean 值时可能抛出类型错误的问题（< 1.11.3)\n- 修复 Select 组件默认情况下允许输入的问题 (1.11.0 - 1.11.2)\n- 修复 Select 组件通过 renderItem 传入空标签时可能导致 onFilter 无法输入的问题（< 1.11.3)\n- 修复 Select 组件开启 compressed 情况下使用 TreeData 时可能出现展示异常的问题（< 1.11.3)\n\n### 1.11.2\n- 去掉不必要的依赖包\n\n### 1.11.1\n- 修复 es 目录下 TreeSelect.js 的 util 引用路径错误(1.11.0)\n\n### 1.11.0\n- List 新增 colNum 属性支持多列渲染\n- 表单元素支持 reserveAble，当为 true 时组件卸载不删除数据\n- Popover priorityDirection 支持 auto\n- Table 支持自定义渲染 checkbox 列\n- Table 支持 filterAll 全选时候过滤选中数据\n- 优化 Popover 组件嵌套使用情况下会出现无法关闭的问题\n- Cascader 组件支持 innerTitle 内嵌标题\n- DatePicker 支持选择季度和年\n- Select 新增 convertBr 属性用来转化粘贴文本中的换行\n- Select 新增 renderOptionList 属性自定义渲染列表\n- Select TreeSelect Cascader 新增 compressedBound 属性限制截断边界来提高页面性能\n- TreeSelect 新增 getComponentRef 属性获取部分组件方法\n- DatePicker 新增 tomeZone 属性配置时区\n- Upload.Button 新增 size 和 outline 属性\n- Upload 新增 beforeCancel 取消上传前钩子\n\n### 1.10.18\n- 修复 Table 使用 value 受控时, value值改变不触发选择框更新的问题(1.10.15- 1.10.17)\n\n### 1.10.17\n- 修复 Tabs 组件依赖引用错误(1.10.16)\n\n### 1.10.16\n- 修复 Tabs 滚动模式下，容器宽度变化可能导致 tabs 错位的问题(< 1.10.16)\n- 修复 TreeSelect unmatch 的值无法删除的问题(< 1.10.16)\n- 修复 Input 内嵌标题并设置 size 为 small 的时候高度不够的问题(< 1.10.16)\n\n### 1.10.15\n- 修复 DatePicker 在 range 模式下手动输入日期会校验错误的问题(1.10.14)\n- 修复 DatePicker 范围选择，设置 defaultTime 后开始日期的样式没有没选中的问题(< 1.10.15)\n- 修复 Select 多选创建选项时输入删除键会导致直接删除选项的问题(1.7.1 - 1.10.14)\n- 优化 Table 中 td 的渲染次数来提升 Table 组件的性能\n\n### 1.10.14\n- 优化 Select Cascader TreeSelect 在 compressed 模式下至少显示一个标签\n- 修复在 safari 浏览器中 Input 在禁用状态下文字模糊的问题(< 1.10.14)\n\n### 1.10.13\n- 修复 Cascader unmatch = false, compressed = true, value 传入不配的值后，高度塌陷问题(<1.10.13)\n- 修复 SeperateTable 中的 Input 元素 focus 的时候会触发滚动导致表单错位的问题(<1.10.13)\n- 修复 DatePicker 输入禁用的日期或时间后还可以选中的问题(<1.10.13)\n- 修复 DatePicker 设置 hourStep 后滚动卡顿的问题(<1.10.13)\n- 修复 TreeSelect disabled 传入 true， 当 data 数据更新时组件会报错的问题  (1.10.9 - 1.10.12)\n\n### 1.10.12\n- 修复 Table 数据为空时拖拽列宽报错的问题(< 1.10.12)\n- 修复 TreeSelect 多选过滤模式下，选择内容后无法继续输入的问题(< 1.10.12)\n- 修复 Upload 删除错误后 tip 仍然不显示的问题(< 1.10.12)\n- 修复 在 Form 中  Input 设置 delay = 0 后 trim 属性会失效的问题(< 1.10.12)\n- 修复 Table treeData 折叠的时候会滚动到顶部的问题(1.8.2 - 1.10.12)\n\n### 1.10.11\n- 优化 TS 使得 keygen format renderItem 属性提示更加友好\n- 向下兼容 1.9.3 之前的版本 Form value 改变导致的表单组件卸载不删除数据\n- 兼容 Form value 传 null 后导致代码报错的情况\n\n### 1.10.9\n- 修复 Button loading 会导致换行的问题(1.10.8)\n- 修复 TreeSelect 单选模式 data 更新后禁用样式不更新问题(<1.10.9)\n- 修复 SimpleTable 数据变化可能导致表头错误问题 (<1.10.9)\n\n### 1.10.8\n- 修复 Form.Item 的 label 宽度在某些情况下会被挤压的问题(< 1.10.8)\n- 修复 Select value 传 null 时不展示 placeholder 的问题(< 1.10.8)\n- 修复部分组件样式包含 css4 语法导致旧版本浏览器不兼容的问题(1.9.0 - 1.10.7)\n- 修复 TreeSelect mode 属性传入 3 的情况下, key 为 0 会无法识别父节点的问题(< 1.10.8)\n- 修复 Select disabled 传入非 boolean 值时,样式为禁用但还是可以选择的问题(< 1.10.8)\n\n### 1.10.7\n- 修复 Radio 中渲染 Select 会导致 Select 无法关闭的问题(< 1.10.6)\n\n### 1.10.6\n- 修复 Table 表头分组场景下拖拽列定位错误(< 1.10.6)\n- 补全 TS 声明 children 属性来兼容@types/react@18(< 1.10.6)\n\n### 1.10.5\n- 修复 TreeSelect 组件点击删除单个选项后 onChange 无法获取点击数据问题(< 1.10.5)\n- 修复表单元素组件 popover 属性设置无效的问题(1.10.0 - 1.10-4)\n- 修复 Modal 嵌套使用点击子Modal遮罩后会导致父容器也关闭(< 1.10.5)\n- 修复 Switch Ts 声明缺失 className 和 style 属性(< 1.10.5)\n\n### 1.10.4\n- 修复 Input type = number 格式化无法去除前置0的问题(1.10.2 - 1.10.3)\n\n### 1.10.3\n- 修复 DatePicker 设置 defaultTime, 单选日期的时候会用 defaultTime 覆盖已选时间问题(1.7.0 - 1.10.2)\n- 修复 Select TreeSelect Cascader 组件 filter 输入框粘贴多行文本会产生 dom (< 1.10.3)\n- 修复 Cascader renderResult 渲染 span 标签存在的样式问题(< 1.10.3)\n- 修复 Table column 列同时配置 colSpan 和 rowSpan 可能导致页面报错的问题(< 1.10.3)\n\n### 1.10.2\n- 修复 Table 中的按钮样式问题(1.10.0 - 1.10.1)\n- 修复 Input 组件 digits 功能在 safari 浏览器不兼容的问题(1.10.0 - 1.10.1)\n\n### 1.10.1\n- 修复 Select 当 renderResult 返回dom 节点，并设置 compressed 后组件报错问题\n- 修复 Table Select 当手动修改 value 后会触发 onChange 的问题\n\n### 1.10.0\n- 组件全面支持 RTL 阿拉伯语模式\n- Input 支持 autoSelect 聚焦后自动选中文本\n- Input 支持 integerLimit 限制整数位数，仅当 type 为 number 时生效\n- Input 支持 numType 限制输入格式，仅当 type 为 number 时生效\n- Input 支持 autoFix 失焦后自动按照 digits 精度补齐\n\n### 1.9.7\n- 修复 Select compressed 合并值功能出现 \"+0\" 的问题\n- 修复 Select compressed 合并值功能 ,当先传 value 后传 data 的时候没有重新计算合并数量的问题\n- 修复 DatePicker 和 Table 的已知 ts 错误\n\n### 1.9.6\n- 修复 Modal method 传入 moveable 无效的问题\n- 修复单独引入 es 目录下的 Message 组件的样式问题\n- 修复 Cascader 单选模式传入不匹配的 value 导致页面崩掉的问题\n- TreeSelect keygen 支持 number\n\n### 1.9.5\n- 修复 esm 模块 normalize.less 在入口文件中被 treeShaking 掉的问题\n\n### 1.9.4\n- 修复 1.9.3 版本 umd 代码运行报错\n\n### 1.9.3\n- 修复 Table 在某些显示器上出现不该有的滚动条问题\n- 修复 matchMedia api 的兼容问题\n- 修复 Pagination 组件 当total 为 0 的时候无法跳转到第一页的问题\n- 修复 Form 手动修改value 后 datum 更新数据延迟造成的问题\n\n### 1.9.2\n- 修复 Input 等组件 innerTitle 内嵌标题没有居中的问题\n- 修复 Rate 组件选择半星的功能无效的问题\n- 修复表单组件 TS 缺失 rules 和 bind 字段的问题\n- 修复 Cascader 组件筛选输入框可以粘贴图片的问题\n- 优化 Select 树形数据的选中样式和 TreeSelect 一致\n\n### 1.9.0\n- DropDown 组件支持阿拉伯语模式\n- Input、Select、TreeSelect、DatePicker、TextArea、EditableArea 支持 innerTitle 内嵌标题的交互\n- Table 支持 renderSorter 属性来自定义排序图标\n- Cascader 支持 loading 属性来控制下拉列表 loading 状态\n- Select TreeSelect Cascader 支持属性 filterSameChange 属性来过滤值相同的onChange\n- formRef 支持直接传入 useRef 结果\n- Table 支持 changedByExpand 在特定场景（树形数据展开受控)下开启 用来改变滚动条重置的默认行为\n- Input 支持 clearToUndefined 属性，点击清空后数据为undefined\n- 优化 Cascader 在单选模式下手动修改 value 后自动更新展开路径 path\n- 修复 Cascader 同时使用 finalDismiss 和 loader 属性的时候逻辑存在冲突的问题\n\n### 1.8.9\n- 修复 1.8.9 版本引入 dist/shineout.js 文件后报错\n\n### 1.8.8\n- 修复 Table 设置 bordered 后样式的问题\n- 修复 esm 模块 normalize.less 在入口文件中被 treeShaking 掉的问题\n- 修复 DatePicker 的 name 属性 ts 错误\n- 修复 Tag.Input 缺失 ts 声名的问题\n- 修复 Input 在特定场景下输入会卡顿的问题(#1529)\n- 修复 Menu 展开按钮不居中的样式问题\n- 修复 Form 在特定场景下 disabled 不生效的问题(#1526)\n\n### 1.8.7\n- EditableArea 优化内部 delay 逻辑\n- 修复 Tab 内嵌 Table 切换 Tab 后 Table 列错位的问题\n- 修复 ant 、 default 主题下 Modal.show 缺少 padding 样式的问题\n\n### 1.8.6\n- 新增 Popover.Content 组件 ，默认有 padding 和 maxWidth 样式\n- 优化 Popover.Confirm 支持 type = \"warning\" 使用默认warning图标\n- 修复 TreeSelect 多选并且设置 absolute 时，下拉框位置可能渲染不正确的问题\n- 修复 List 组件 传入 fixed 属性后无法受控的问题\n- 修复 Input 同时配置 min, max, rules={\\[rules.max(XXX), rules.min(XXX)\\]} 会导致校验文案错误\n\n### 1.8.5\n- 修复 Select maxLength 输入中文问题\n- 修复 Form.Field 会导致内部组件 disabled 无效的问题\n\n\n### 1.8.4\n- 修复 Table 中嵌套 Table 会继承 bordered 样式的问题\n- 修复 font-weight 500 在 windows 系统不生效的问题\n- 修复 Menu 组件偶尔出现在挂载前设置状态导致控制台报错的问题\n- 修复 Button 传入 href 属性后 disabled 属性将无效的问题\n\n### 1.8.3\n- 修复 Table 中表单触发 scrollIntoView 导致 Table 表头错位问题\n- 修复 Table 最大可拖拽宽度在某些情况下无效的问题\n- 修复 Select 下拉框超出视口后位置可能偏移的问题\n\n### 1.8.2\n- 修复 Table 使用树形数据时收起顶部已展开的树可能导致渲染错位的问题\n- 修复 ToolTip 的动画中箭头和主体分离的问题\n- 修复 Modal 被重新渲染后页面抖动的问题\n\n\n### 1.8.1\n- 修复 TreeSelect keygen 属性重复后页面崩溃问题，并在控制台报错提醒。\n- 修复 Menu 可能在卸载后 setState 的问题\n- 修复 DatePicker max 属性对于月份选择无效问题\n- 补充 Textarea disabled 属性的文档说明和 ts 声明\n- 优化 Select Cascader 清空按钮的样式\n- 完善 Rule 和 Checkbox.Group 的 ts 声明\n\n### 1.8.0\n- Menu、Table、Select、Form 支持阿语模式\n- 构建产物支持esm+es5\n- Form 组件 formRef 属性补全 ts 声明\n- Form.Field 支持透传 Form 的 disabled 属性\n- Select 支持 maxLength 属性控制输入字符串的最大长度\n- Select 在展开状态下支持缩放比例后自动调整位置\n- 修复 body 设置 zoom 样式后 Select 传 absolute 属性下拉列表偏移\n- TreeSelect 清除按钮颜色与 Select 保持一致\n- Button 类型为文字按钮的时候优化 loading 颜色\n- 补全部分组件 TS\n\n\n### 1.7.5\n- 优化 Popover 中的卸载方法确保不会报错\n- 修复 Form.Field 中 defaultValue ts 错误\n\n### 1.7.4\n- 修复 menu 受控 清空 active 后 父节点依然是选中状态\n- 修复 table 偶现固定列偏移的问题\n- 优化 TreeSelect 鼠标悬浮输入框光标改为为文本样式\n- 优化 Spin tip 样式增加间距\n\n### 1.7.3\n- 修复 DatePicker 当 type 为 'week' 时可能出现展示错误日期的情况。\n- Form 的 formRef 提供 validateFieldsWithError 校验部分字段并获取错误信息\n\n### 1.7.2\n- 修复 Pagination 组件 layout 属性传入 jumper 后控制台发出警告的问题\n- Form 组件 keepErrorHeight 属性默认值改为 false 保持和之前版本一致\n\n### 1.7.1\n- 优化 Modal.Confirm onOk 支持 Promise.reject 关闭 loading 但不关闭弹窗\n- Form 支持 keepErrorHeight 单行错误提示不撑开表单高度\n- absolute 属性支持函数返回 element 作为容器\n- Tag onClose 支持返回 Promise reject 后不删除Tag\n- Select 删除文本后增加锁确保不会立刻删除选项\n- Upload.Image onPreview 参数增加 preview 方法，手动预览图片\n- Select 支持 emptyText 自定义 empty 文案\n- 修复 Input.Number 存在的浮点数计算问题\n- 表单组件如果传了value 且没有传 onChange 或 disabled 或 readOnly， 在控制台发出警告\n- 优化 Transfer data数据量超过万级后卡顿的问题\n- 优化 Select compressed 展示效果\n\n### 1.7.0\n\n- 主题变量支持通过 style 标签注入\n- Select compressed 支持动态化显示值个数\n- 兼容低版本 less 写法\n- 内部日期库 date-fns 切换为 dayjs\n- Form 提供 size 属性配置内部输入框的尺寸\n- Form 组件 formRef 提供 validateFields 方法校验指定字段\n- Spin 提供 tip 属性支持传入提示文字\n- 优化 Table loading 的时候 隐藏 empty\n- 修复 DatePicker 单选时时分秒被 defaultTime 强制覆盖的问题\n\n### 1.6.6\n\n- 修复 Table 虚拟滚动下 Input 输入超长导致样式异常的问题\n- 优化 Cascader compressed 模式的样式\n- Cascader 提供给 getComponentRef 方法获取组件实例，可以调用组件的 close 方法\n- 修复 Cascader 组件 在 absolute 模式下组件宽度超过屏幕后 下拉选项向左偏移被挡住的问题\n- Select 多列模式支持选项懒加载\n- 修复 Gap 组件子元素为 null 依然显示的问题\n- 修复 cascader filter 后不显示下拉选项\n- 支持高版本 less\n- 修复 List 无法受控的问题\n- 修复 Input.Number 按住键盘上键失焦后引发死循环的问题\n- 修复 dropdown 组件没有 placeholder 属性的时候样式不一致问题\n- 优化文档及修复屏幕缩放后菜单样式异常的问题\n- Form 新增 defaultValue 属性\n- Upload 支持自定义强制格式校验出错信息文案\n- DatePicker 双击日期后支持保持 defaultTime\n- 修复高版本 less 的兼容性问题\n- 修复 Table onScroll 中更改数据源后导致频繁触发滚动回调的问题\n- 新增 Drawer-抽屉 组件\n- 优化 TS 声明\n- 修复 Input number 输入小数点时出现 NaN 的问题\n\n### 1.6.5\n\n- 新增 Gap 组件，用于设置子元素水平和垂直间距\n- Menu 支持父级节点选中，并更新增父级菜单操作交互\n- Progress 新增 popup 交互\n- Message 新增 setOptions，用于设置全局选项\n- \bUpload 新增 removeConfirm，用于显示删除前的确认\n- Select 新增 optionWidth 属性，用于单独设置下拉列宽宽度\n- Upload.Button 支持多种 type\n- Select/TreeSelect 新增高级筛选模式\n- Upload validator/beforeRemove 支持 Promise\n- Select 筛选后支持默认选中第一个选项\n- Modal 支持全屏展示\n- DatePicker 单选模式增加快速选择功能\n- 移除 create-react-context 依赖\n- 修复若干问题\n\n### 1.6.4\n\n- 组件样式优化，包括 Upload、DatePicker、TreeSelect、Modal、Menu 等组件\n- 组件添加 TypeScript 类型提示支持\n- Cascader 新增筛选功能\n- Table 新增 selection 属性来开启单元格多选复制功能\n- 提高 Table 虚拟列表滚动的准确度\n- 新增组件：Divider、List（虚拟列表）\n- 针对 React17 进行适配\n- Message 支持 hideClose 来隐藏关闭按钮\n- DatePicker 新增 defaultPickerValue，用于设置面板的时间\n- 修复若干问题\n\n### 1.6.2\n\n- Table 新增“表头附着顶部”功能\n- Tooltip 支持 ReactNode 用法\n- Transfer 新增 renderFilter 用于自定义筛选 UI\n- 修复 Table 未设置 fixed=\"y\" 情况下可以纵向滚动的问题\n- 修复文档页打开 codesandbox 缺少 prop-types 的报错\n- Button 新增 space 属性，用于在两个中文字符中插入空格\n- Transfer 支持自定义渲染内容\n- 优化部分组件 TS 声明\n- Modal 新增 Esc 键关闭功能\n- Tree 新增 dragSibling 属性，限制兄弟节点之间拖拽\n\n### 1.6.1\n\n- EditableArea 支持 width 属性\n- Modal.Submit 支持单独设置 disabled 状态\n- Message 支持关闭单个操作\n- Image 新增 autoSSL 属性，用于支持 https 站点\n- Modal title 可根据 type 属性，显示不同状态下 Icon 图标\n- Upload 新增 forceAccept，强制对文件类型进行校验\n- 修复 Modal usePortal false 时无法更新内容的问题\n- 文档页主题编辑器全新改版\n- DatePicker time 模式支持 defaultTime\n- 修复 Sticky 滚动时抖动的问题\n\n### 1.6.0\n\n- Transfer 新增“大数据量”支持\n- Modal 支持缩放、移动\n- 优化 “下拉列表” 性能\n- Tag 新增编辑功能\n- Modal 新增 destroy，支持关闭时卸载子组件\n- 优化 Message 动画\n- CardGroup 支持 自动布局\n- 新的 Modal 弹出动画\n- Table 提升列宽计算速度\n\n### 1.5.1\n\n- Button Secondary 类型样式调整\n- Button 新增 text 属性，支持纯文本按钮展示\n- 新增 Popover 嵌套用法\n- 优化 TypeScript 支持\n- Table 支持指定默认排序规则\n- Sticky 支持自适应宽度\n- 修复 Table group 为动态 ReactNode 时，固定列渲染异常的问题\n\n### 1.4.3\n\n- 修复 TreeSelect 已知 bug\n- 修复 Table 已知 bug\n- 修复 Tooltip disabledChild 标签显示位置不正确的问题\n- Image 修复 src 改变后没有重新更新的问题\n- 修复 Select treeData 筛选后选择数据失败的问题\n- Button 组件统一 disabled 样式\n- Pagination 增加 sizeListProps, 可以给分页选择框增加其他的属性\n- 主题新增清空功能\n- Upload 新增 drop 属性，支持拖拽上传文件\n- Tree 新增 expandIcons，支持自定义展开/收起图标\n- Select options 超过页面边界时新增边界对齐支持\n- TreeTable 新增 treeCheckAll，支持选择所有子孙数据\n- Table 新增 onSortCancel 表格取消排序事件\n- Spin 新增包裹组件用法\n- Table 新增 rowEvents ，可以为 tr 添加事件监听\n- Modal 新增 container 属性来指定渲染目标节点\n- Tree 新增 doubleClickExpand 属性，双击展开子节点\n\n### 1.4.2\n\n- TreeSelect compressed 添加 hover 查看所有值功能\n- Progress 新增渐变色, 设置 color 为对象\n- Image 新增 container 属性, 可以设置在元素内部滚动时懒加载\n- DatePicker 新增 defaultRangeMonth, 可以设置范围选择默认的左右月份\n- Select 修复选中后 ☑️ 不显示的 bug\n- Upload disabled 后值不允许删除\n- Select treeData 支持选中路径获取\n- Select/TreeSelect/Cascader/Tree 支持通过 childrenKey 指定树形数据属性名\n- Upload.Image 新增 renderContent, 可以自定义结果内容的显示.\n- Tooltip 新增 disabledChild 来处理被禁用元素的提示\n- Select 单选下拉箭头动态化\n- Table 新增 treeEmptyExpand 支持\n- 修复 Table 树状数据排序的 bug\n- 修复 Menu 子菜单高度大于父菜单被隐藏的 bug\n- 修复 less 高版本 escape 函数报错 bug\n- 修复 TreeSelect keygen 为整形时选中报错的 bug\n\n### 1.4.1\n\n- 文档新增 codesandbox 支持\n- Select 新增 Separator 属性\n- Select 新增 filterSingleSelect, 可以设置在筛选只剩一条时自动选中\n- Select 新增 groupBy, 可以对数据进行分组\n- Modal 增加 autoFocusButton, 打开之后自动 focus 按钮\n- Radio 新增 按钮样式\n- 新增自定义主题功能\n- Table 支持 列伸缩\n- 修复已知 bug\n\n### 1.4.0\n\n- Tree 支持 defaultExpandAll 默认展开所有节点\n- menu 增加 linkKey 可以设置子菜单的链接\n- Select 的选中结果添加 title 标签\n- Dropdown 支持 absolute\n- Select 多列模式最小宽度和表单框对齐\n- Select 多列模式下支持单列\n- datepicker 的 week 模式 改用 ISOweek 的格式\n- Cascader renderResult 支持获取所有选中值\n- Select 单选自定义校验 value 修正为当前选中值（字符串）\n- Select 多选 compressed 支持鼠标悬浮查看所有值\n- treeTable 支持受控\n- Form 支持传入 Error, 用于手动添加错误\n- DatePicker 范围选择模式下交互修改, 开始时间和结束时间分开, 左边开始时间,右边结束时间, 互不影响\n- DatePicker 增加 quickSelect, 可以实现快速选择的功能\n- Textarea 的 info 可以传入数字, 提供一个默认的提示信息\n- Select 增加多选时点击元素不执行删除\n\n### 1.3.5\n\n- Pagination 选择分页条数的 Select 变更\n- Select 增加 trim 属性, 可以在 onFilter, onCreate 中输入空格\n- Select 增加 autoAdapt 属性, 可以设置自适应选项宽度\n- 添加新组件 Switch\n- 添加 Popover.Confirm 组件\n- 表单组件增加 tab 键操作功能, 涉及的元素(Button, Input, Select, Datepicker, Cascader, TreeSelect)\n- Image 组件大图是增加 loading 功能\n- 修复已知 bug\n\n### 1.3.4\n\n- Form 添加 removeUndefined 属性，用于保留或删除值为 undefined 的字段。\n\n### 1.3.3\n\n- Cascader mode 默认值修正。\n- Form.FieldSet 新增 onError 属性。\n- Table loading CSS 层级调整。\n- Select 新增点击表单收起选项功能。\n- Table 修复由于动态 columns 引发的错列显示问题。\n- 已知 bug 修复。\n\n### 1.3.2\n\n- TreeSelect 和 Cascader 支持 absolute 属性。\n- Modal 新增 bodyStyle 属性。\n- Table 新增 tree-table 功能。\n- Pagination 优化\"页数选择\"显示。\n- 已知 bug 修复。\n\n### 1.3.1\n\n- Card 新增 collapsible=bottom，支持从底部关闭。\n- 提升 Image loading 性能。\n- 已知 bug 修复。\n\n### 1.3.0\n\n- 文档进行移动端适配。\n- Menu keygen 支持字符串、整型及其他类型。\n- TreeSelect 新增 compressed 属性。\n- 新增 Tabs.Link，用来展示链接。\n- 修复 Table 展开行后高度未更新的问题。\n- 已知 bug 修复。\n\n### 1.2.10\n\n- Select 新增 compressed 属性，折叠选中值。\n- Table 可以通过指定 rowsInView 为 0 关闭懒加载。\n- 已知 bug 修复。\n\n### 1.2.9\n\n- 已知 bug 修复。\n\n### 1.2.8\n\n- Slider 添加持续拖动增长功能。\n- Breadcrumb 支持下拉选择条目。\n- 新增 TreeSelect 组件，支持树形数据结构选择。\n- DatePicker 增加了 formatResult 属性，可对选中时间进行格式化。\n- Upload 新增拖拽上传功能。\n- 已知 bug 修复。\n\n### 1.2.7\n\n- DatePicker 增加了 absolute 属性，不受父级样式影响。\n- Table 支持高度自适应。\n- 文档增加搜索功能。\n- 已知 bug 修复。\n\n### 1.2.6\n\n- DatePicker 增加了 defaultTime 属性，可以给选择的日期提供一个默认时间。\n- Table 增加了 rowClickAttr 属性，可以设置行内元素点击触发 onRowClick 事件。\n- Table 的 column 增加了 align 属性，可以设置列内容对齐方式。\n- Popover 提供一种新写法，可以放在组件里面，旧写法已不推荐使用。\n- Carousel 组件增加了自定义 Indicator，设置 Indicator 为函数即可。\n- Upload 增加按钮上传，在按钮表面覆盖单个文件上传进度。\n- 修复了若干已知 bug 。\n\n### 1.2.5\n\n- 修复 Textarea value 为 null 时 warning。\n- Textarea autosize 模式下重新赋值时重设高度。\n- 修复 Form 下，有 name 为 \"id\" 的 bug。\n- Table 支持 touch 事件。\n- Table 在 loading 状态下禁止滚动。\n\n### 1.2.4\n\n- 修复 Tree 拖拽到空白处 bug。\n- 修复 Popover 覆盖元素 onClick 问题。\n- Tabs.Panel 增加 diabled 属性。\n- Modal 增加 usePortal 属性。\n- 修复 Table rowClassName 合并行的问题。\n\n### 1.2.3\n\n- 单元测试 ava -> jest。\n\n### 1.2.2\n\n- fixed 打包后 lib 下代码未处理 module。\n\n### 1.2.1\n\n- webpack 升级到 v4.\n- Select 值不在选项中时，显示 value。\n- 修复 Table 合并行时，滚动条高度计算问题。\n- 增加 Lazyload，可使用，暂不开放。\n\n### 1.2.0\n\n- 新增 Form.FieldSet 组件，用来代替 Form.Block, Form.BlockField, Form.Loop。\n  - Form.FieldSet 主要区别是在处理多层嵌套数据时，将数据变为一级数组进行处理，方便对 errors 进行操作，为联动校验做准备。\n- 重构 Datum.Form，优化数据处理和错误处理。\n- 增加 Rule，简化表单校验规则编写。\n- Tabs 新增 collapsible 选项，可以折叠 Tab 内容。\n- 新增 Select.columns 选项，实现多列选择。\n- 修复空数据下，Table border 显示问题。\n- Table 增加 onRowClick 事件。\n- Table.Column 增加 'row-expand' type，实现点击整行展开。\n- Table 增加 expandKeys\n\n### 1.1\n\n### 1.1.7\n\n- 部分组件 forceUpdate 前加入 componentWillUnmount 判断。\n\n### 1.1.6\n\n- 重写 Form.set，修复使用 Form.Block 时，无法通过 set('a.b.c.d', value) 这种方式触发 change。\n- 重写 Form.validate。\n- 重写 Select.filter，Select.Result，修复 filter 值变化不及时更新等问题。修复 value 和 defaultValue 问题。\n\n### 1.1.5\n\n- 修复 Menu 高度不足时，边框长度未到底。\n- Select disabled 支持函数（禁止选项）。\n- 修复 StrictMode warning。\n- Tabs 增加右对齐。\n\n### 1.1.4\n\n- 移除 dependencies react, react-dom。\n\n### 1.1.3\n\n- 一级组件增加 displayName。\n- Enter 键触发 Form 提交时，先触发 blur，更新数据后再提交。\n- 修复 Modal 在上边和下边弹出未撑满屏幕。\n- 修复 Datepicker.Range type 为 'datetime' 时，出现 'Invalid Date'。\n\n### 1.1.2\n\n- Cascader expandTrigger 增加 'hover-only' 选项\n- 优化 Sticky 滚动\n- Form 增加 mode 属性\n\n### 1.1.1\n\n- Form.Datum.set 支持 object。\n\n### 1.1.0\n\n- 增加 Cascader 组件。\n- 修复 From 自定义 validate 时拿到的 value 为 Datum 对象。\n- Menu mode 为 virticle 时支持内部滚动条。\n- 修复 DatePicker 类型为 datetime 时，未设定日期，时间部分显示错误。\n\n### 1.0\n\n### 1.0.10\n\n- Datum.Form 增加 validateClear 方法，清除校验结果。\n- Upload 修复删除文件恢复 bug。\n- Modal.confirm 按钮事件支持 Promise。\n\n### 1.0.9\n\n- Form.Field 增加 bind 属性，触发绑定字段校验。\n- Modal 加入 position，实现 Drawer 功能。\n- 增加 Input.Password。\n- 修复表单内 Upload 错误时可提交表单。\n\n### 1.0.8\n\n- 修复 Table 展开行后行高变化导致滚动条位置问题。\n- ScrollBar 默认宽度从 12px 改为 16px。\n- Table 滚动条高度超出实际高度时，隐藏滚动条超出部分。\n- Table 增加 rowClassName。\n- Table 在空数据时增加提示文字。\n- 修复 Tree 在更新数据时判断是否可选会报 undefined。\n\n### 1.0.7\n\n- Modal.Submit 延时提交。\n- Message DOM render 改为 ref，ReactDOM.render 某些情况下会返回 null。\n- 修复 Message closeAll 后关闭动画无效。\n- 修复 Table 宽度变化时，某些场景下内容表与表头宽度不一致。\n- 修复 Select 数据源变化时，在某些条件下选中结果未变化。\n- Upload 增加 ext 校验。\n\n### 1.0.6\n\n- 修复 Table 浏览器缩放后，如果数据量不满一屏，仍会出现滚动条并可以滚动。\n- 修改 Alert 图标布局为 flex。\n- Message 增加 4 个 position，实现 Notification 功能。\n- Form.validate 性能优化（提交时不处理状态）。\n- Windows 下表格滚动速度调整。\n- Upload 文件名过长换行。\n\n### 1.0.5\n\n- Form.inputable bind 移动到 componentDidMount 中（React 组件修改 key 时会先创建新组件，再移除旧组件）。\n\n### 1.0.2\n\n- Select 动态修改数据时，重置滚动条位置。\n\n### 1.0.1\n\n- 修复 Table column render 函数丢失 index。\n"}}]);