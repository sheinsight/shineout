type API = 'keys' | 'values'

function mapToArray<K, V>(map: Map<K, V>, key: API) {
  if (!map || map.size === 0) return []
  const v: Array<K | V> = []
  const it = map[key]()
  for (const i of it) v.push(i)
  return v
}

export function keysToArray(map: Map<unknown, unknown>) {
  return mapToArray(map, 'keys')
}

export function valuesToArray(map: Map<unknown, unknown>) {
  return mapToArray(map, 'values')
}
