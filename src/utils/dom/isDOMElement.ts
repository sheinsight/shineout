interface El {
  nodeType: number
  nodeName: string
}
export default function(el: HTMLElement | El) {
  return typeof HTMLElement === 'function'
    ? el instanceof HTMLElement
    : el && typeof el === 'object' && el.nodeType === 1 && typeof el.nodeName === 'string'
}
