function getFilterTree(treeNodes, filterFunc, filterExpandKeys, keyFunc, childrenKey = 'children', showHitDescendants) {
  const mapFilteredNodeToData = node => {
    if (!node) return null
    let match = false
    if (filterFunc(node)) {
      match = true
    }

    const children = (node[childrenKey] || []).map(mapFilteredNodeToData).filter(n => n)
    if (children.length || match) {
      const key = keyFunc(node)
      filterExpandKeys.push(key)
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

export { getFilterTree }
