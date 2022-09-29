export default function(callback: (...args: any)=> void) {
  if (!callback) return
  if (document.readyState !== 'loading') callback()
  else {
    document.addEventListener('DOMContentLoaded', callback)
  }
}
