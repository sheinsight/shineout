//
export default <T extends {}>(props?: T) => {
  if (!props) return {}
  const keys = Object.keys(props)
  return keys.reduce((acc: { [key: string]: T[keyof T] }, key: keyof typeof acc) => {
    if ((key as string).indexOf('data-') !== 0) return acc
    acc[key] = props[key as keyof T]
    return acc
  }, {})
}
