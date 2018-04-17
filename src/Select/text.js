const text = {
  noData: 'No data found',
}

export function setDefaultText(obj) {
  if (!obj) return
  Object.keys(obj).forEach((key) => {
    text[key] = obj[key]
  })
}

export default text
