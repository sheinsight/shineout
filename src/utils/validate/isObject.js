
export default function (obj) {
  return obj && typeof obj === 'object' && !Array.isArray(obj)
}
