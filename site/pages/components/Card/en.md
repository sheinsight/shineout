# Card

<example />

## API

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| className | string | none | Extend className |
| collapsible | bool \| 'bottom' | false | Whether can be collapsed，'bottom' can collaps on bottom |
| collapsed | bool | - | Whether to be collapsed. |
| defaultCollapsed | bool | true | Initial collapsed state |
| onCollapse | function | - | Callback when collapsed state changed |
| shadow | \[true, false, 'hover'] | false | Whether to show the shadow.<br />'hover' - Display it when the mouse is over the element.<br />true - Always show<br />false - Never show |
| style | object | - | Container element style |

<br />

#### Card.Header, Card.Body, Card.Footer

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| className | string | - | Extend className |
| style | object | - | Element style |

<br />

### Card.Accordion

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| active | number | none | Active index. It is -1 when fully closed. Used in controlled state. |
| defaultActive | number | 0 | The default active index for uncontrolled state |
| onChange | function | none | The callback function when the panel is opened |

<br />

#### Card.Submit

The same as [Button](/components/Button)
