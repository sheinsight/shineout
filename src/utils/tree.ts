import immer from 'immer'
import { deepClone } from './clone'

type Node = {
  [x: string]: any
}
type ExpandKeys = (string | number)[]
interface Conf {
  advanced?: boolean
}
export const getFilterTree = (
  treeNodes: Node[],
  filterFunc: Function,
  filterExpandKeys: ExpandKeys,
  keyFunc: Function,
  childrenKey = 'children',
  showHitDescendants: boolean,
  firstMatchNode: Function,
  { advanced }: Conf = {}
) => {
  const mapFilteredNodeToData = (node: Node) => {
    if (!node) return null
    let match = false
    if (filterFunc(node)) {
      if (firstMatchNode) firstMatchNode(node)
      match = true
    }
    const children = (node[childrenKey] || []).map(mapFilteredNodeToData).filter((n: Node) => n)
    if (children.length || match) {
      const key = keyFunc(node)
      if (filterExpandKeys && children.length > 0) filterExpandKeys.push(key)
      if (!node[childrenKey]) return node
      let childNodes = showHitDescendants && match ? node[childrenKey] || [] : children
      if (advanced && match && children.length > 0) childNodes = children
      return { ...node, [childrenKey]: childNodes }
    }
    return null
  }
  return treeNodes.map(mapFilteredNodeToData).filter(node => node)
}

export const getFlattenTree = (data: Node[], childrenKey = 'children') => {
  const arr: Node[][] = []
  const flatten = (list: Node[], path: Node[]) => {
    list.forEach(item => {
      const children = item[childrenKey]
      if (children && children.length > 0) {
        const clonedPath = [...path]
        clonedPath.push(item)
        flatten(children, clonedPath)
      } else {
        arr.push([...path, item])
      }
    })
  }
  flatten(data, [])
  return arr
}

type FilterDatum<T> = {
  data: T[]
  childrenKey: string
  getKey: (node: T) => string
  getDataById: (id: string) => T
}

export const mergeFilteredTree = (filterDatum: FilterDatum<any>, rawDatum: FilterDatum<any>, tiledId: string[]) => {
  const filterData = filterDatum.data
  const { childrenKey } = filterDatum
  if (tiledId.length === 0) return filterData
  const recursion = (node: { [x: string]: any }) => {
    const nodeKey = filterDatum.getKey(node)
    if (tiledId.indexOf(nodeKey) >= 0) {
      node[childrenKey] = deepClone(rawDatum.getDataById(nodeKey)[childrenKey] || [])
    } else {
      const item = filterDatum.getDataById(nodeKey)
      if (item && item[childrenKey]) {
        node[childrenKey] = deepClone(item[childrenKey] || [])
      }
    }
    const children = node[childrenKey] || []
    children.map(recursion)
  }
  return immer(filterData, draft => {
    draft.map(recursion)
  })
}
