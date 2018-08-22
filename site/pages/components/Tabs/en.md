# Tabs

<example />

## API

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| active | string \| int | 0 | Current active tab id or index |
| background | string | '#fff' | Active background color |
| border | string | '#ddd' | Border color |
| className | string | - | Extend className |
| defaultActive | string \| int | 0 | Default active tab id or index |
| inactiveBackground | string | 'transparent' | Inactive background color |
| onChange | function(key) | - | Change callback |
| shape | string | - | Options: \['line', 'button']. If shape is not null, the style properties such as background, border will lose effect |
| style | object | - | Container element style |

<br />

### Panel

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| className | string | - | Extend className |
| background | string | - | Background color, override the Tab's background |
| border | string | - | Border color, override the Tab's border |
| id | string \| number | - | The default is index |
| style | object | - | Content style |
| tab | string \| ReactElement | required | Tab content |