import { range } from 'shineout/utils/numbers'
import { pickNumber } from '../utils/faker'

const maxDeepLength = 10

export const allIds = []

const createNode = (deep, index, path) => {
  const id = path.join('-')
  const childLength = pickNumber(5, deep === 0 ? 1 : 0)
  const node = { id }
  if (childLength > 0 && deep < maxDeepLength) {
    node.children = range(childLength).map(i => createNode(deep + 1, i, [...path, i]))
  }

  allIds.push(id)

  return node
}

const tree = range(4).map(i => createNode(0, i, [i]))

export default tree
