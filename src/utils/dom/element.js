if (Element && !Element.prototype.matches) {
  const proto = Element.prototype
  proto.matches =
    proto.matchesSelector ||
    proto.mozMatchesSelector ||
    proto.msMatchesSelector ||
    proto.oMatchesSelector ||
    proto.webkitMatchesSelector
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

export function dispatchEvent(form, name, detail) {
  if (!form) return
  let event
  if (CustomEvent) {
    event = new CustomEvent(name, { bubbles: false, cancelable: true, detail })
  } else {
    event = document.createEvent('HTMLEvents')
    event.initEvent(name, true, true)
  }
  form.dispatchEvent(event)
}

export function cssSupport(attr, value) {
  const element = document.createElement('div')
  if (attr in element.style) {
    element.style[attr] = value
    return element.style[attr] === value
  }
  return false
}

export function getCursorOffset(length) {
  if (window.getSelection) {
    return window.getSelection().anchorOffset
  }
  if (document.selection) {
    const range = document.selection.createRange()
    range.moveStart('character', -length)
    return range.text.length
  }
  return null
}

function end(element) {
  if (window.getSelection) {
    element.focus()
    const range = window.getSelection()
    range.selectAllChildren(element)
    range.collapseToEnd()
  } else if (document.selection) {
    const range = document.selection.createRange()
    range.moveToElementText(element)
    range.collapse(false)
    range.select()
  }
}

function select(element) {
  if (element && element.innerText.length === 0) {
    element.focus()
    return
  }
  if (window.getSelection && document.createRange) {
    element.focus()
    const range = document.createRange()
    range.selectNodeContents(element)
    const sel = window.getSelection()
    sel.removeAllRanges()
    sel.addRange(range)
  } else if (document.selection) {
    const range = document.selection.createRange()
    range.moveToElementText(element)
    range.select()
  }
}

export const focusElement = {
  select,
  end,
}
