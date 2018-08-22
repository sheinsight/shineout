# Breadcrumb

<example />

## API

| Property | Type | Default | Description |
| --- | --- | --- | ---|
| data | Array | [] | The array of breadcrumb objects, see data |
| separator | String\|ReactNode | "/" | A breadcrumb separator which can be strings or custom elements |
| keygen | string \| function(obj):string \| true | required | Key generator<br />When it is true, the data itself is used as the key equivalent to (d => d)<br />When it is a function, use its return value.<br />When it is a string，ues the value of the string.For example, 'id' is the same thing as (d) => d.id. |

### data

| Property | Type | Default | Description |
| --- | --- | --- | ---|
| title | string\|ReactElement | - | Displayed content |
| url | string | - | Link address |
| onClick | function | - | The click event |