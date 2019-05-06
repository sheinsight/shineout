# Dropdown

<example />

## API

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| className | string | none | Extend className |
| columns | number | none | Display multiple elements on the page. This property depends on the width attribute. Please set the number of columns and width appropriately. |
| data | \[] | required | See the detail in the data of the drop down box. |
| disabled | bool | false | disabled |
| onClick | func | none | The click event. The parameter is the rendered data. <br /> Note: if the onClick is set in the data, this method will be ignored and data.onclick will be called. |
| outline | boolean | false | The same as [Button](/components/Button) |
| placeholder | string \| ReactElement | required | Displayed content of the button |
| renderItem | func \| string | 'content' | Set the displayed content. If it is a string,  the corresponding value will be displayed. <br />If it is a function, the return value will be displayed and its parameter is the current data. |
| size | string | 'default' | The same as [Button](/components/Button) |
| trigger | string | 'click' | Toggle mode, options: \['click', 'hover'] |
| type | string | 'default' | options: \['primary', 'secondary', 'success', 'info', 'warning', 'danger', 'link'] |
| width | number | none | The width of the pop-up option layer |

### data

- If data item is a ReactElement, render the item;
- If data item is an object and renderItem is set, render the renderItem's result;
- if data item is an object and renderItem is not set, handle the parameters as follows;

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| content | string \| element | |  |
| url | string | none | When the url is not empty, a url will be rendered. |
| target | string | none | It is valid when the url is not empty. |
| onClick | function | none | The click event |