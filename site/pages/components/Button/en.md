# Button

<example />

## API

### Button

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| children | string \| ReactElement | required |  |
| className | string | none | extend className |
| disabled | bool | false | disable status of button |
| href | string | none | If the href attribute is set, &lt;a> will be used instead of &lt;button>. |
| outline | boolean | false | When outline is true, the background is transparent. |
| size | string | 'default' | optional value \['large', 'default', 'small'] |
| style | object | none | the outermost extension style |
| type | string | 'default' | optional value \['default', 'primary', 'secondary', 'success', 'warning', 'danger', 'link'] |

### Button.Group

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| children | \[Button] | required | array of Button |
| size | string | none | same as Button; If the size of Button and Group is set at the same time, the Group shall prevail |
| outline | boolean | none | same as Button; Use this value if Button is not set the value of outline. |
| type | string | none | same as Button; If the type of Button and Group is set at the same time, the Group shall prevail |