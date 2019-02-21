export default function(callback) {
  if (!callback) return
  if (document.readyState !== 'loading') callback()
  else {
    document.addEventListener('DOMContentLoaded', callback)
  }
}
