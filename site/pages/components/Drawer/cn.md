# Drawer *抽屉*
屏幕边缘滑出的浮层面板。

<example />

## API

### Drawer

| 属性 | 类型 | 默认值 | 说明 | 可用版本 |
| --- | --- | --- | --- | --- |
| className | string | 无 | 扩展className | |
| bodyStyle | object | - | 扩展 Drawer body 的样式 | |
| footer | ReactNode | 无 | 底部内容 | |
| maskCloseAble | boolean | true | 点击遮罩层是否关闭抽屉 | |
| maskOpacity | number | 0.25 | 遮罩层透明度 | |
| position | string | 'right' | 弹出位置，可选值为 \['top', 'right', 'bottom', 'left'] | |
| style | object | 无 | 最外层扩展样式 | |
| title | ReactNode | 无 | 弹出层的标题 | |
| usePortal | boolean | true | 为 true 时，使用 ReactDOM.createPortal 创建弹出层，为 false 时，使用 ReactDOM.render<br />函数式调用时使用 ReactDOM.render | |
| visible | boolean | false | 是否显示 | |
| width | number \| string | 'auto' | 对话框宽度, 当 position 为 'right' 或 'left' 时生效 | |
| height | number \| string | 'auto' | 对话框高度, 当 position 为 'top' 或 'bottom' 时生效  | |
| zIndex | number | 1050 | 抽屉 z-index 值，注意：如 Drawer 嵌套 Select 组件，并且 Select 组件含有 absolute 字段，需要修改 Select 的 z-index的值 | |
| rootClassName | string | - | Drawer 的根元素类名, 为遮罩层的父元素 | 1.4.2 |
| container | () => HTMLElement \| HTMLElement | document.body | 渲染的目标节点 | |
| maskBackground | string | 无 | 遮罩背景色，设置后透明度将失效 | |
| onClose | () => void | 无 | 模态框关闭回调 | |
| destroy | boolean | false | 关闭时是否销毁元素 | |
| hideClose | boolean | 无 | 是否隐藏关闭按钮 | |
| type | 'info' \| 'success' \| 'warning' \| 'error' \| 'normal' | 无 | Drawer title 显示状态icon | 1.6.1 |
| zoom | boolean | false | 是否开启 zoom 动画效果 | |
| esc | boolean | true | 是否支持 esc 键关闭 | |
| events | object | 无 | 外层元素所接受的事件列表，可用于在 createPortal 场景中阻止冒泡 | |
| fullScreen | boolean | false | 是否全屏展示 | |
| forceMask | boolean | false | 是否强制设置遮罩透明度（多层Drawer中，除第一层外的其他Drawer遮罩透明度会被调整为0.01） | |
