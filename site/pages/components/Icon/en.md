# Icon
Icon is  a function to generate a new ReactClass with css path.
<br />
Multiple icon components with different names can be created in a project.

<example />

## API

### Icon *function(url, fontFamily, prefix):ReactClass*
Function, returns a new component. A project can create more than one, but fontFamily must be the unique.

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| url | string |  | The address of css file of the icon. If it has been introduced in the link tag, it can be empty. |
| fontFamily | string | 'iconfont' | The font-family needs to be the same as the font-family in the introduced CSS file. |
| prefix | string | 'icon' | The prefix of the class |

### MyIcon *Component created by the Icon function*
| Property | Type | Default | Description |
| --- | --- | --- | --- |
| children | string | - | The unicode code of the icon. |
| name | string | '' | The name of the icon class (without prefix). |
| fontSize | string | - | The size of the icon, same as the style.fontSize. |
| style | object | - | Extend style. |
| type | string | 'default' | Built-in color, options: \['default', 'primary', 'secondary', 'success', 'info', 'warning', 'danger'] |