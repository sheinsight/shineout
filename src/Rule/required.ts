import { deepMerge } from '../utils/objects'
import { substitute } from '../utils/strings'
import { getLocale } from '../locale'
import { ObjectType } from '../@types/common'
import { MessageType } from './Props'

const options = { skipUndefined: true }

export const requiredMessage = (props: ObjectType) => {
  const type = props.type === 'array' ? 'array' : 'string'
  return substitute(getLocale(`rules.required.${type}`), props)
}

export default ({ message, tip }: { message?: MessageType; tip?: string } = {}) => (msg: MessageType) =>
  deepMerge(
    {
      required: true,
      message: requiredMessage,
    },
    deepMerge({ message, tip }, { message: msg }, options),
    options
  )
