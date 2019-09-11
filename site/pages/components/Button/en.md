# Button

<example />

## API

### Button

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| children | string \| ReactElement | required | The content inside the button, can be a text icon, etc.  |
| className | string | - | extend className |
| disabled | bool | false | Specifies the button should be disabled |
| href | string | - | If the href attribute is set, &lt;a> will be used instead of &lt;button>. |
| outline | boolean | false | When outline is true, the background is transparent. |
| size | string | 'default' | optional value \['large', 'default', 'small'] |
| style | object | - | Container element style |
| type | string | 'default' | optional value \['default', 'primary', 'secondary', 'success', 'warning', 'danger', 'link'] |

### Button.Group

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| children | \[Button] | required | array of Button |
| size | string | - | same as Button |
| outline | boolean | - | same as Button |
| type | string | - | same as Button |