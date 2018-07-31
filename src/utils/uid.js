let uid = Date.now()

export function getUid() {
  uid += 1
  return uid
}

export function getUidStr() {
  return getUid().toString(36)
}

export function getKey(d, gen, index) {
  if (gen === true) return d
  if (typeof gen === 'string') return d[gen]
  if (typeof gen === 'function') return gen(d)
  return index
}
