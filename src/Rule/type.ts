import { deepMerge } from '../utils/objects'
import { substitute } from '../utils/strings'
import { getLocale } from '../locale'
import { ObjectType } from '../@types/common'
import { MessageType } from './Props'

export const typeMessage = (props: ObjectType) => {
  const path = props.title ? 'rules.type' : 'rules.reg'
  return substitute(getLocale(path), props)
}

const options = { skipUndefined: true }

export default (type: string, { message, tip }: { message?: MessageType; tip?: string } = {}) => (msg: MessageType) =>
  deepMerge(
    {
      type,
      message: typeMessage,
    },
    deepMerge({ message, tip }, { message: msg }, options),
    options
  )
