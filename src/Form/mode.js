import { formConsumer } from './formContext'
import { memoize } from '../utils/func'

const createMode = memoize(mode => formConsumer(['formMode'], (props) => {
  let isMatch = mode === props.formMode
  if (props.reverse) isMatch = !isMatch
  return isMatch ? props.children : true
}))

export default (...args) => args.map(createMode)
