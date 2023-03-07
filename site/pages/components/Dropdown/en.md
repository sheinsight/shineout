# Dropdown

<example />

## API

### Dropdown

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| className | string | none | Extend className |
| columns | number | none | Display multiple elements on the page. This property depends on the width attribute. Please set the number of columns and width appropriately. |
| data | object[] | required | See the detail in the data of the drop down box. |
| disabled | boolean | false | disabled |
| onClick | (data: object) => void | none | The click event. The parameter is the rendered data. <br /> Note: if the onClick is set in the data, this method will be ignored and data.onclick will be called. |
| outline | boolean | false | The same as [Button](/components/Button) |
| placeholder | string \| ReactNode | required | Displayed content of the button |
| renderItem | (data: object) => ReactNode \| string | 'content' | Set the displayed content. If it is a string,  the corresponding value will be displayed. <br />If it is a function, the return value will be displayed and its parameter is the current data. |
| size | string | 'default' | The same as [Button](/components/Button) |
| trigger | 'click' \| 'hover' | 'click' | Toggle mode, options |
| type | 'primary' \| 'secondary' \|  'success' \| 'info' \|  'warning' \|  'danger' \|  'link' | 'default' | type of Dropdown |
| width | number | none | The width of the pop-up option layer |
| animation | boolean | true | animation toggle |
| open | boolean | none | Set visible of dropdown popup |
| absolute \| (() => element) | boolean | false | When it is true, the pop-up layer of option append into document.body. When it is function, the pop-up layer of option append into it's return DOM.  |
| position | 'left-top' \| 'left-bottom' \| 'right-top' \| 'right-bottom' \| 'top-right' \| 'top-left' \| 'bottom-right' \| 'bottom-left' \| 'auto' | 'auto' | Set position property can control the direction and position of the drop-down menu.
 |


### DropdownData

- If data item is a ReactElement, render the item;
- If data item is an object and renderItem is set, render the renderItem's result;
- if data item is an object and renderItem is not set, handle the parameters as follows;

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| content | string \| element | |  |
| url | string | none | When the url is not empty, a url will be rendered. |
| target | string | none | It is valid when the url is not empty. |
| onClick | function | none | The click event |
