export default props => {
  if (!props) return {}
  const keys = Object.keys(props)
  return keys.reduce((acc, key) => {
    if (key.indexOf('data-') !== 0) return acc
    acc[key] = props[key]
    return acc
  }, {})
}
