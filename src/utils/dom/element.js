if (Element && !Element.prototype.matches) {
  const proto = Element.prototype
  proto.matches = proto.matchesSelector ||
      proto.mozMatchesSelector || proto.msMatchesSelector ||
      proto.oMatchesSelector || proto.webkitMatchesSelector
}

export function getParent(el, target) {
  if (!target) {
    return null
  }

  let temp = el
  while (temp) {
    if (typeof target === 'string') {
      if (temp.matches(target)) {
        return temp
      }
    } else if (temp === target) {
      return temp
    }

    temp = temp.parentElement
  }

  return null
}

export function dispatchEvent(form, name) {
  if (!form) return
  let event
  if (CustomEvent) {
    event = new CustomEvent(name, { bubbles: true, cancelable: true })
  } else {
    event = document.createEvent('HTMLEvents')
    event.initEvent(name, true, true)
  }
  form.dispatchEvent(event)
}

