# Menu

<example />

## API

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| data | array | [] | Data that needs to be rendered into a menu |
| disabled | function | d => d.disabled | Whether to be disabled |
| mode | string | 'inline'| the style of the menu, options: 'inline', 'vertical', 'horizontal' |
| renderItem | string \| function | 'title' | Element render mode. If it is a string, the corresponding value is taken as the display content; If it is a function, the result returned by the function is taken as the display content, and the parameter of the function is the corresponding data object. |
| keygen | string \| function | none | The generation rule of the key. If it's a string, the corresponding value is taken as the key value. If it is a function, the result returned by the function is taken as the key value and the parameter of the function is the corresponding data object. |
| active | function | null | Verify whether it is activated. The parameter is the corresponding data object and returning true means that the menu is active.<br />The parameter is data,and that is the data.<br /> note: whether it is multiple is determined by the filtering rules of the function. |
| defaultOpenKeys | array | [] | Initial expanded menu;If you need to set this value, you need to set keygen, which is an array of keys. |
| onClick | function | null | the click event of Submenu. Its parameter is the current data.|
| style | object | - | Container element style |