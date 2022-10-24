type API = 'keys' | 'values'

function mapToArray<K, V>(map: Map<K, V>, api: API) {
  if (!map || map.size === 0) return []
  const v: Array<K | V> = []
  const it = map[api]()
  for (const i of it) v.push(i)
  return v
}

export function keysToArray<K, V extends Map<K, V>>(map: V) {
  return mapToArray(map, 'keys')
}

export function valuesToArray<K, V extends Map<K, V>>(map: V) {
  return mapToArray(map, 'values')
}
