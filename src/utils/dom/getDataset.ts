export default (props: { [x: string]: any }) => {
  type Key = keyof typeof props
  if (!props) return {}
  const keys: Key[] = Object.keys(props)
  return keys.reduce((acc: Key | { [x: Key]: any }, key: keyof typeof acc) => {
    if (key.indexOf('data-') !== 0) return acc
    acc[key] = props[key]
    return acc
  }, {})
}
