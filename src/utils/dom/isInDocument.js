export function isInDocument(element) {
  if (element && 'isConnected' in element) {
    return element.isConnected
  }
  return document.documentElement.contains(element)
}
