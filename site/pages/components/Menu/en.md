# Menu

<example />

## API

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| data | array | [] | Menu items data |
| disabled | function | d => d.disabled | Whether to be disabled |
| mode | string | 'inline' | Options: 'inline', 'vertical', 'horizontal' |
| renderItem | string \| function | 'title' | Element render mode. <br />If it is a string, the corresponding value is taken as the display content; <br />If it is a function, the result returned by the function is taken as the display content. |
| keygen | string \| function(obj):string \| true | required | Key generator<br />When it is true, the data itself is used as the key equivalent to (d => d)<br />When it is a function, use its return value.<br />When it is a string，ues the value of the string.For example, 'id' is the same thing as (d) => d.id. |
| active | function | null | The item is actived when the active function return true. |
| defaultOpenKeys | array | [] | Initial expanded menu |
| openKeys | array | [] | expended menu | 
| onClick | function | null | The function will be called when the user clicks the menu item. |
| style | object | - | Container element style |
| inlineIndent | number | 24 | indent of each level |   
| linkKey | string | - |  the key of inject the link value of the submenu |
