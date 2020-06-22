# Card

<example />

## API

### Card

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| className | string | none | Extend className |
| collapsible | boolean \| 'bottom' | false | Whether can be collapsed，'bottom' can collaps on bottom |
| collapsed | boolean | - | Whether to be collapsed. |
| defaultCollapsed | boolean | true | Initial collapsed state |
| onCollapse | () => void | - | Callback when collapsed state changed |
| shadow | true \| false \| 'hover' | false | Whether to show the shadow.<br />'hover' - Display it when the mouse is over the element.<br />true - Always show<br />false - Never show |
| style | object | - | Container element style |
| id | any | none | Card.Accordion expand controlled key |
| bordered | boolean | true | Whether to show border |

### Card.Header, Card.Body, Card.Footer

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| className | string | - | Extend className |
| style | object | - | Element style |

### Card.Accordion

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| active | any | none | Active value. It is -1 when fully closed. Used in controlled state. be id while Card.id setted |
| defaultActive | any | 0 | The default active value for uncontrolled state, be id while Card.id setted|
| onChange | () => void | none | The callback function when the panel is opened |

### Card.Submit

The same as [Button](/components/Button)
