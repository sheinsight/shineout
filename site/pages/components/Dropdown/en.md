# Dropdown

<example />

## API

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| data | \[] | required | See the detail in the data of the drop down box. |
| renderItem | func \| string | 'content' | Set the displayed content. If it is a string,  the corresponding value will be displayed. <br />If it is a function, the return value will be displayed and its parameter is the current data. |
| className | string | none | Extend className |
| disabled | bool | false | disabled |
| hover | boolean | false | When it is true, trigger the option to pop up through mouseenter. |
| outline | boolean | false | The same as [Button](#/components/Button) |
| placeholder | string \| ReactElement | required | Displayed content of the button |
| columns | number | none | Display multiple elements on the page. This property depends on the width attribute. Please set the number of columns and width appropriately. |
| size | string | 'default' | The same as [Button](#/components/Button) |
| type | string | 'default' | options: \['primary', 'secondary', 'success', 'info', 'warning', 'danger', 'link'] |
| width | number | none | The width of the pop-up option layer |
| onClick | func | none | The click event. The parameter is the rendered data. <br /> Note: if the onClick is set in the data, this method will be ignored and data.onclick will be called. |

### data

When the data item is the ReactElement, we don't process. When the data item is a object, the parameters are as follows:

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| content | string \| element | | 默认从content获取内容 |
| url | string | none | When the url is not empty, a url will be rendered. |
| target | string | none | It is valid when the url is not empty. |
| onClick | function | none | The click event |