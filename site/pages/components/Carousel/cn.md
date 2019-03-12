# Carousel *轮播*

<example />

## API

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| animation | string | 'slide' | 动画效果，可选值为<br />slide - 横向滑动<br />slide-y - 垂直滑动<br />fade - 淡入淡出 |
| className | string | 无 | 扩展className |
| indicatorPosition | string | 'center' | 指示标示位置，可选值为 \['left', 'center', 'right'] |
| indicatorType | string \| function | 'circle' | 指示标示样式，字符串可以是：\['circle', 'number', 'line']，函数则可以自定义样式: (current, moveTo) => (<Component /\>) |
| interval | number | 0 | 动画间隔时间，为 0 时，不自动播放 |
| style | object | 无 | 最外层扩展样式 |
