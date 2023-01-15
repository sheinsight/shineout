import { getKey } from '../utils/uid'

import { BaseTransferProps } from './Props'
import { keyType } from '../@types/common'

export default function splitSelecteds<DataItem, Value extends any[]>(
  selecteds: keyType[] | undefined,
  props: BaseTransferProps<DataItem, Value>
) {
  if (!selecteds) return null

  const { data, keygen, datum } = props
  const left: keyType[] = []
  const right: keyType[] = []

  selecteds.forEach(s => {
    const v = data.find((d, i) => getKey(d, keygen, i) === s)

    if (v) {
      if (datum.check(v)) right.push(s)
      else left.push(s)
    }
  })
  const result: [keyType[], keyType[]] = [left, right]
  return result
}
