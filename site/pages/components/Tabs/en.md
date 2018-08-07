# Sticky

Similar to position: sticky. Holding the element in the visible area of the screen while the screen is scrolling.

<example />

## API

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| bottom | number | none | How much offset is triggered from the bottom. |
| className | string | none | Extend className |
| style | object | none | Extend style. The default z-Index after the float is triggered is 900, and you can change the z-Index to changed its style. |
| target | string \| HTMLElement | none | The attached target, by default, is document.body. You can pass in a HTMLELement or css selector, and the target must be the ancestor node of the Sticky component. |
| top | number | none | How much offset is triggered from the top. |