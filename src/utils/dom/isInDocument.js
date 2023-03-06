export function isInDocument(element) {
  if (element instanceof HTMLElement) {
    return element.isConnected
  }
  return false
}
