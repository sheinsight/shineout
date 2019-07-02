# Tabs

<example />

## API

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| active | string \| int | 0 | Current active tab id or index |
| align | string | 无 | set the label align, options: \['left', 'right', 'vertical-left', 'vertical-right'] |
| background | string | '#fff' | Active background color |
| border | string | '#ddd' | Border color |
| className | string | - | Extend className |
| collapsible | bool | false | Whether can be collapsed |
| defaultActive | string \| int | 0 | Default active tab id or index |
| inactiveBackground | string | 'transparent' | Inactive background color |
| tabBarExtraContent | string \| ReactElement | - | extra element in tab bar | 
| tabBarStyle | style | - | style in tab bar |
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
| disabled | bool | false | Specifies the Panel should be disabled |
| id | string \| number | - | The default is index |
| style | object | - | Content style |
| tab | string \| ReactElement | required | Tab content |