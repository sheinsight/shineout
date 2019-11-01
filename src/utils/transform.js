function mapToArray(map, key) {
  if (!map || map.size === 0) return []
  const v = []
  const it = map[key]()
  for (const i of it) v.push(i)
  return v
}

export function keysToArray(map) {
  return mapToArray(map, 'keys')
}

export function valuesToArray(map) {
  return mapToArray(map, 'values')
}
