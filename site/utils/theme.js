function getParameterByName(name) {
  const { search } = window.location
  const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`)
  const results = regex.exec(search)
  if (!results) return null
  if (!results[2]) return ''
  return decodeURIComponent(results[2].replace(/\+/g, ' '))
}

(() => {
  const theme = getParameterByName('theme') || 'default'
  const link = document.createElement('link')
  link.setAttribute('rel', 'stylesheet')
  link.setAttribute('type', 'text/css')
  link.setAttribute('href', `${theme}.css`)

  document.head.appendChild(link)
})()
