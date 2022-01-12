const listeners = new Set()

export const addZoomListener = function(cb) {
  listeners.add(cb)
}
export const removeZoomListener = function(cb) {
  listeners.delete(cb)
}

const dispatch = function(data) {
  listeners.forEach(cb => {
    cb(data)
  })
}

const updatePixelRatio = e => {
  const pr = window.devicePixelRatio
  if (e) {
    dispatch(pr)
  }
  window.matchMedia(`(resolution: ${pr}dppx)`).addEventListener('change', updatePixelRatio, { once: true })
}

updatePixelRatio()
