# Breadcrumb

<example />

## API

| Property | Type | Default | Description |
| --- | --- | --- | ---|
| data | Array | [] | The array of breadcrumb objects, see data |
| separator | String\|ReactNode | "/" | A breadcrumb separator which can be strings or custom elements |
| keygen | String \| Function | none | The rule for generating keys. If it is a function whose parameter is single data, its return value will be  the key and  if it is not be set, the index will be the key |

### data

| Property | Type | Default | Description |
| --- | --- | --- | ---|
| title | string\|ReactElement | none | Displayed content |
| url | string | none | Select one of the url and onClick property |
| onClick | function | none | The click event |