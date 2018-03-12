# menu *菜单*

<example />

## API

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| data | array | [] | 需要渲染成菜单的数据 |
| mode | string | 'inline'| 菜单样式,提供 'inline', 'vertical', 'horizontal'三种|
| itemRender | string \| function | 'title' | 元素渲染方式,如果为字符串,则会以对应的值作为显示内容;如果为函数,则以函数返回的结果作为显示内容,函数参数为对应的数据对象 |
| keygen | string \| function | 无 | key的生成规则,如果为字符串,则会以对应的值作为key值;如果为函数,则以函数返回的结果作为key值,参数为对应的数据对象|
| active | function | null | 验证是否激活,参数为对应的数据对象,返回true则代表该菜单激活 <br /> 参数为data,即该条数据 <br /> 注: 是否是多选由函数内部筛选规则来确定 |
| defaultOpenKeys | array | [] | 初始展开的菜单;如果需要设置此值,则需要设置keygen,此值为一个包含key的数组|
| onClick | function | null | 子菜单点击事件,参数为当条数据|
| inlineIndent | number | 14 | 缩进,每一层子菜单的缩进会依次递增|
| style | object | 无 | 最外层扩展样式 |