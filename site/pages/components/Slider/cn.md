# Slider *滑块*

<example />

## API

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| defaultValue | number\|array\[number] | 无 | 默认值 |
| formatScale | function\|false | v => v | 格式化显示刻度，为false时，不显示刻度 |
| formatValue | function\|false | v => v | 格式化显示当前值，为false时，不显示当前值 |
| height | number | 200 | 高度，仅在 vertical 为 true 情况下有效 |
| onChange | function | 无 | 值改变时回调函数 |
| scale | array\[number] | \[0, 100] | 取值范围，长度 >= 2 的数组 |
| step | number | 1 | 步长，必须大于等于0；为0时，只能选取 scale 指定的值 |
| value | number\|array\[number] | 无 | 当前值 |
| vertical | bool | false | 是否垂直 |
| autoHide | bool | false | 是否自动隐藏当前值和刻度 |
| disabled | bool | false | 是否禁用组件 |
| range | bool | false | 是否显示双滑块 |
| onIncrease | func | 无 | 拖动超过最大值事件 |
