import { deepMerge } from '../utils/objects'
import { getLocale } from '../locale'

export default function ({ message, tip } = {}) {
  return deepMerge(
    {
      required: true,
      message: getLocale('rules.required.message'),
      tip: getLocale('rules.required.tip'),
    },
    { message, tip },
    { skipUndefined: true },
  )
}
