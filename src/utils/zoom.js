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
  if (window.matchMedia) {
    const media = window.matchMedia(`(resolution: ${pr}dppx)`)
    if (media.addEventListener) {
      media.addEventListener('change', updatePixelRatio, { once: true })
    }
  }
}

updatePixelRatio()
