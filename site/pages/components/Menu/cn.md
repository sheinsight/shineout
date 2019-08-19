# menu *菜单*

<example />

## API

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| data | array | [] | 需要渲染成菜单的数据 |
| disabled | function | d => d.disabled | 是否禁用选项 |
| mode | string | 'inline'| 菜单样式,提供 'inline', 'vertical', 'horizontal'三种|
| renderItem | string \| function | 'title' | 元素渲染方式,如果为字符串,则会以对应的值作为显示内容;如果为函数,则以函数返回的结果作为显示内容,函数参数为对应的数据对象 |
| keygen | string \| function(obj):string \| true | 必填 | 生成每一项key的辅助方法<br />为 true 时，以数据项本身作为key，相当于 (d => d)<br />为函数时，使用此函数返回值<br />为string时，使用这个string对应的数据值。如 'id'，相当于 (d => d.id) |
| active | function | null | 验证是否激活,参数为对应的数据对象,返回true则代表该菜单激活 |
| defaultOpenKeys | array | [] | 初始展开的菜单;如果需要设置此值,则需要设置keygen,此值为一个包含key的数组 |
| openKeys | array | [] | 展开的菜单(受控) | 
| onClick | function | null | 子菜单点击事件,参数为当条数据|
| style | object | 无 | 最外层扩展样式 |
| inlineIndent | number | 24 | 每一层缩进宽度 |
| linkKey | string | 无 | 需要注入子菜单的链接键值 |  
