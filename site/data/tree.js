import { range } from 'shineout/utils/numbers'
import { pickNumber } from '../utils/faker'

const maxDeepLength = 3

const createNode = (deep, index, path) => {
  const id = path.join('-')
  const childLength = pickNumber(4)
  const node = { id }
  if (childLength > 0 && deep < maxDeepLength) {
    node.children = range(childLength).map(i => createNode(deep + 1, i, [...path, i]))
  }

  return node
}

const tree = range(6).map(i => createNode(0, i, [i]))

export default tree
