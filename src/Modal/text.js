const text = {
  ok: 'Ok',
  cancel: 'Cancel',
}

export function setDefaultText(obj) {
  if (!obj) return
  Object.keys(obj).forEach((key) => {
    text[key] = obj[key]
  })
}

export function getText(key, opt) {
  if (opt && opt[key]) return opt[key]
  return text[key]
}

export default text

