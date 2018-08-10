# Icon
Instead of having a built-in set of icons the component library provides a function to generate a new icon component.<br />
Multiple icon components with different names can be created within a project.

<example />

## API

### Icon *function(url, fontFamily, prefix):ReactClass*
Function, returns a new component. A project can create more than one, but fontFamily cannot be the same.

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| url | string |  | The address of css file of the icon. Use online addresses and It does not need to be introduced into the project. If it has been introduced in the link, it can be empty. |
| fontFamily | string | 'iconfont' | The font-family needs to be the same as the font-family in the introduced CSS file. |
| prefix | string | 'icon' | The prefix of the class |

### MyIcon *The group of icons created by the Icon function*
| Property | Type | Default | Description |
| --- | --- | --- | --- |
| children | string | none | The unicode code of the icon. Choose between it and name |
| name | string | '' | The name of the icon class (with the prefix removed), and the value refers to the library of ICONS used. |
| fontSize | string | none | The size of the icon, is the same as the style.fontSize. |
| style | object | none | Extend style, can be used to set specific size and color, etc. |
| type | string | 'default' | Built-in color, options: \['default', 'primary', 'secondary', 'success', 'info', 'warning', 'danger'] |