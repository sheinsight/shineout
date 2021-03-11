export const getFilterTree = (
  treeNodes,
  filterFunc,
  filterExpandKeys,
  keyFunc,
  childrenKey = 'children',
  showHitDescendants,
  firstMatchNode
) => {
  const mapFilteredNodeToData = node => {
    if (!node) return null
    let match = false
    if (filterFunc(node)) {
      if (firstMatchNode) firstMatchNode(node)
      match = true
    }

    const children = (node[childrenKey] || []).map(mapFilteredNodeToData).filter(n => n)
    if (children.length || match) {
      const key = keyFunc(node)
      if (filterExpandKeys) filterExpandKeys.push(key)
      if (!node[childrenKey]) return node
      return {
        ...node,
        [childrenKey]: showHitDescendants && match ? node[childrenKey] || [] : children,
      }
    }
    return null
  }
  return treeNodes.map(mapFilteredNodeToData).filter(node => node)
}

export const getFlattenTree = (data, childrenKey = 'children') => {
  const arr = []
  let path = []
  const flatten = list => {
    list.forEach(item => {
      const children = item[childrenKey]
      if (children && children.length > 0) {
        path.push(item)
        flatten(children)
      } else {
        arr.push([...path, item])
      }
    })
    path = []
  }
  flatten(data)
  return arr
}
