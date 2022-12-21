import { formConsumer } from './formContext'
import { memoize } from '../utils/func'
import { FormModeProps } from './Props'

const createMode = memoize((mode: string) =>
  formConsumer(['formMode'], (props: FormModeProps) => {
    let isMatch = mode === props.formMode
    if (props.reverse) isMatch = !isMatch
    return isMatch ? props.children : true
  })
)

export default (...args: string[]) => args.map(createMode)
