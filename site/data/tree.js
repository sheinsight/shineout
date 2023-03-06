import { range } from 'shineout/utils/numbers'
import { pickNumber } from '../utils/faker'

export const allIds = []
export const exampleIds = []

const createNode = (deep, index, path, max, length, ids) => {
  const id = path.join('-')
  const childLength = pickNumber(length, deep === 0 ? 1 : 0)
  const node = { id, text: id }
  if (childLength > 0 && deep < max) {
    node.children = range(childLength).map(i => createNode(deep + 1, i, [...path, i], max, length, ids))
  }

  if (ids) ids.push(id)

  return node
}

const tree = range(4).map(i => createNode(0, i, [i], 10, 5, allIds))

export const cascader = range(20).map(i => createNode(0, i, [i], 4, 10))

export const exampleTree = range(3).map(i => createNode(0, i, [i], 2, 3, exampleIds))

export default tree
