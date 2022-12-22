import { deepMerge } from '../utils/objects'
import { substitute } from '../utils/strings'
import { getLocale } from '../locale'
import { ObjectType } from '../@types/common'
import { MessageType } from './Props'

const createMessage = (key: 'min' | 'max') => (props: ObjectType) => {
  let lt = ''
  switch (props.type) {
    case 'integer':
    case 'number':
      lt = 'number'
      break
    case 'array':
      lt = 'array'
      break
    default:
      lt = 'string'
  }

  return substitute(getLocale(`rules.length.${key}.${lt}`), props)
}

const options = { skipUndefined: true }

export const lengthMessage = {
  max: createMessage('max'),
  min: createMessage('min'),
}

export default (key: 'min' | 'max', { message }: { message?: MessageType } = {}) => (
  len: number,
  msg?: MessageType
) => {
  if (typeof len !== 'number') {
    console.error(new Error(`Rule "${key}" param expect a number, get ${typeof len}`))
    return null
  }
  return deepMerge(
    { message: lengthMessage[key] },
    deepMerge({ message, [key]: len }, { message: msg }, options),
    options
  )
}
