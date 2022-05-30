# Tabs

<example />

## API

### Tabs

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| active | string \| number | 0 | Current active tab id or index |
| align | 'left' \| 'right' \| 'vertical-left' \| 'vertical-right' | 无 | set the label align |
| background | string | - | Active background color |
| border | string | - | Border color |
| className | string | - | Extend className |
| collapsible | boolean | false | Whether can be collapsed |
| defaultActive | string \| number | 0 | Default active tab id or index |
| inactiveBackground | string | - | Inactive background color |
| tabBarExtraContent | string \| ReactNode | - | extra element in tab bar |
| tabBarStyle | object | - | style in tab bar |
| onChange | (key: any) => void | - | Change callback |
| shape | string | - | Options: \['card', 'line', 'button', 'bordered', 'dash'\]. If shape is not null, the style properties such as background, border will lose effect |
| style | object | - | Container element style |
| lazy | boolean | true | lazy load |
| autoFill | boolean | false | auto fill the panel |
| sticky | boolean \| number \| object | - | sticky header |
| switchToTop | boolean | - | switch tabs will scroll to Tabs |
| hideSplit | boolean | false | whether to hide the dividing line |
| color | string | - | the color of tab's text |
| defaultCollapsed | boolean | - | when the collapsible is True，the content will not be open when setting the collapsible as True  |

### Tabs.Panel

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| className | string | - | Extend className |
| background | string | - | Background color, override the Tab's background |
| border | string | - | Border color, override the Tab's border |
| disabled | boolean | false | Specifies the Panel should be disabled |
| id | string \| number | - | The default is index |
| style | object | - | Content style |
| tab | string \| ReactNode | required | Tab content |
