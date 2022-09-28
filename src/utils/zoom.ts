const listeners: Set<Function> = new Set()

export const addZoomListener = function(cb: Function) {
  listeners.add(cb)
}
export const removeZoomListener = function(cb: Function) {
  listeners.delete(cb)
}

const dispatch = function(data: any) {
  listeners.forEach(cb => {
    cb(data)
  })
}

const updatePixelRatio = (e?: Event) => {
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
