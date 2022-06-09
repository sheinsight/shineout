# Breadcrumb

<example />

## API

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| data | any[] | [] | The array of breadcrumb objects, see data |
| separator | string \| ReactNode | "/" | A breadcrumb separator which can be strings or custom elements |
| keygen | ((data: any) => any) \| string \| boolean | required | Key generator<br />When it is true, the data itself is used as the key equivalent to (d => d)<br />When it is a function, use its return value.<br />When it is a string，ues the value of the string.For example, 'id' is the same thing as (d) => d.id. |
| renderItem | (value:BreadcrumbData) => ReactNode | - | Custom render content |

### BreadcrumbData

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| title | string\|ReactElement | - | Displayed content |
| url | string | - | Link address |
| onClick | () => void | - | The click event |
