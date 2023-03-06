export default function flexGapSupport() {
  const flex = document.createElement('div')
  flex.style.display = 'flex'
  flex.style.flexDirection = 'column'
  flex.style.rowGap = '1px'

  flex.appendChild(document.createElement('div'))
  flex.appendChild(document.createElement('div'))

  document.body.appendChild(flex)
  const isSupported = flex.scrollHeight === 1
  if (flex.parentNode) flex.parentNode.removeChild(flex)

  return isSupported
}
