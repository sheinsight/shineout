function getFilterTree(treeNodes, filterFunc, filterExpandKeys, keyFunc) {
  const mapFilteredNodeToData = node => {
    if (!node) return null
    let match = false
    if (filterFunc(node)) {
      match = true
    }

    const children = (node.children || []).map(mapFilteredNodeToData).filter(n => n)
    if (children.length || match) {
      const key = keyFunc(node)
      filterExpandKeys.push(key)
      return {
        ...node,
        children,
      }
    }
    return null
  }
  return treeNodes.map(mapFilteredNodeToData).filter(node => node)
}

export { getFilterTree }
