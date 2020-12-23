# Menu

<example />

## API

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| data | object[] | [] | Menu items data |
| disabled | (data: object) => boolean | d => d.disabled | Whether to be disabled |
| mode | 'inline' \| 'vertical' \| 'horizontal' \| 'vertical-auto' | 'inline' | style of menu |
| renderItem | (data: object, index: number) => ReactNode \| string | 'title' | Element render mode. <br />If it is a string, the corresponding value is taken as the display content; <br />If it is a function, the result returned by the function is taken as the display content. |
| keygen | ((data: object) => string) \| string \| true  | required | Key generator<br />When it is true, the data itself is used as the key equivalent to (d => d)<br />When it is a function, use its return value.<br />When it is a string，ues the value of the string.For example, 'id' is the same thing as (d) => d.id. |
| active | (data: object) => boolean | null | The item is actived when the active function return true. |
| defaultOpenKeys | string[] | [] | Initial expanded menu |
| openKeys | string[] | [] | expended menu | 
| onClick | (data: object) => void | null | The function will be called when the user clicks the menu item. |
| style | object | - | Container element style |
| inlineIndent | number | 24 | indent of each level |   
| linkKey | (d: object) => string \| string | - |  the key of inject the link value of the submenu |
| onOpenChange | (keys: string[]) => void | none | menu open change callback |
| frontCaret | boolean | null | Front solid triangle expansion |