import { getKey } from '../utils/uid'

export default function splitSelecteds(selecteds, props) {
  if (!selecteds) return null

  const { data, keygen, datum } = props
  const left = []
  const right = []

  selecteds.forEach(s => {
    const v = data.find((d, i) => getKey(d, keygen, i) === s)

    if (v) {
      if (datum.check(v)) right.push(s)
      else left.push(s)
    }
  })

  return [left, right]
}
