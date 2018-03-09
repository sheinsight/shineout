# menu *菜单*

<example />

## API

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| data | array | [] | 需要渲染成菜单的数据 |
| itemRender | string \| function | 'title' | 元素渲染方式,如果为字符串,则会以对应的值作为显示内容;如果为函数,则以函数返回的结果作为显示内容,函数参数为对应的数据对象 |
| active | function | (data) => false | 验证是否激活,参数为对应的数据对象,返回true则代表该菜单激活 <br /> 注:激活态下,菜单为选中状态,菜单组为打开状态|
| onClick | function | (data) => {} | 子菜单点击时间,参数为当条数据|
| inlineIndent | number | 14 | 缩进,每一层子菜单的缩进会依次递增
| style | object | 无 | 最外层扩展样式 |
| type | string | *warning* |  4 选 1，\[*success*, *info*, *warning*, *danger(error)*] |