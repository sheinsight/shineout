export default function(el) {
  return typeof HTMLElement === 'function'
    ? el instanceof HTMLElement
    : el && typeof el === 'object' && el.nodeType === 1 && typeof el.nodeName === 'string'
}
