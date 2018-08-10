# Sticky

Similar to position: sticky, keep the element visible in the visible area of the screen as the screen scrolls.

<example />

## API

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| bottom | number | none | How many offsets are triggered from the bottom. |
| className | string | none | Extend className |
| style | object | none | Extend style. The default z-Index after triggering the float is 900, and you can modify the z-Index of the style to change. |
| target | string \| HTMLElement | none | Attached target. the default is the document.body. You can pass in an HTMLElement or css selector, and the target must be an ancestor node of the Sticky component. |
| top | number | none | How many offsets are triggered from the top. |