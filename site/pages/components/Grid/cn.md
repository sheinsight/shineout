# Grid *栅格*

动态栅格体系，用于某些不适合使用 flex 的地方

<example />

## API

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| className | string | 无 | 扩展className |
| gutter | number | 无 | 栅格之间间距 |
| offset | number | 0 | 左偏移百分比，0 <= offset < 1 |
| style | object | 无 | 最外层扩展样式 |
| width | number | 1 | 宽度百分比，0 < number <= 1 |
| responsive | 'sm' \| 'md' \| 'lg' \| 'xl' | 'md' | 激活响应式的最小尺寸： <br /> sm: 568px  <br />md: 768px  <br />lg: 992px  <br />xl: 1200px <br /> 例如：设置为 sm 时，屏幕尺寸若低于568px，栅格系统的响应性将不会生效。|
| stretch | boolean | 无 | 是否撑满容器高度 |
