import React from 'react'
import PropTypes from 'prop-types'
import immer from 'immer'
import { getKey } from '../utils/uid'
import { getProps } from '../utils/proptypes'

const TREE_TABLE_DEFAULT_INDENT = 25
export default WrappedComponent => {
  class TreeExpand extends React.Component {
    constructor(props) {
      super(props)
      this.handleTreeExpand = this.handleTreeExpand.bind(this)
      this.expandLevel = new Map()
      this.state = {
        expandKeys: new Map(),
      }
    }

    getTreeIndent() {
      const { columns } = this.props
      for (let i = 0; i < columns.length; i++) {
        if (typeof columns[i].treeIndent === 'number') return columns[i].treeIndent
      }
      return TREE_TABLE_DEFAULT_INDENT
    }

    getChildrenLength(children) {
      const { treeColumnsName, keygen } = this.props
      const { expandKeys } = this.state
      if (!children) return 0
      let { length = 0 } = children
      for (let i = 0; i < children.length; i++) {
        const child = children[i]
        const key = getKey(child, keygen)
        if (!expandKeys.get(key)) continue
        expandKeys.delete(key)
        if (child[treeColumnsName] && child[treeColumnsName].length) {
          length += this.getChildrenLength(child[treeColumnsName])
        }
      }
      return length
    }

    getExpandData() {
      const { data, keygen, treeColumnsName } = this.props
      const { expandKeys } = this.state
      if (expandKeys.size === 0) return data

      const storeExpandKeys = new Map()
      expandKeys.forEach((value, key) => storeExpandKeys.set(key, value))

      return immer(data, draft => {
        let dataCo = draft
        for (let i = 0; i < dataCo.length; i++) {
          if (storeExpandKeys.size === 0) break
          const item = dataCo[i]
          const key = getKey(item, keygen, i)
          if (storeExpandKeys.get(key) && item[treeColumnsName]) {
            draft.splice(i + 1, 0, ...item[treeColumnsName])
            dataCo = draft
            storeExpandKeys.delete(key)
          }
        }
      })
    }

    handleTreeExpand(data, index) {
      const { treeColumnsName, keygen } = this.props
      const { expandKeys } = this.state
      const children = data[treeColumnsName]
      const key = getKey(data, keygen, index)
      const parentLevel = this.expandLevel.get(key) || 0
      if (expandKeys.get(key)) {
        this.setState(immer(draft => draft.expandKeys.delete(key)))
      } else {
        children.forEach((child, i) => {
          this.expandLevel.set(getKey(child, keygen, index + i + 1), parentLevel + 1)
        })
        this.setState(immer(draft => draft.expandKeys.set(key, true)))
      }
    }

    render() {
      const { treeColumnsName } = this.props
      const { expandKeys } = this.state
      const data = this.getExpandData()
      const rootTree = data.filter(v => v && v[treeColumnsName] && v[treeColumnsName].length).length === 0
      const treeIndent = this.getTreeIndent()
      return (
        <WrappedComponent
          {...this.props}
          data={data}
          onTreeExpand={this.handleTreeExpand}
          treeExpandKeys={expandKeys}
          treeExpandLevel={this.expandLevel}
          treeRoot={rootTree}
          treeIndent={treeIndent}
        />
      )
    }
  }

  TreeExpand.propTypes = {
    ...getProps(PropTypes, 'keygen'),
    data: PropTypes.arrayOf(PropTypes.object),
    treeColumnsName: PropTypes.string,
  }

  return TreeExpand
}
