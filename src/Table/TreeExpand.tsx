import React, { ComponentType } from 'react'
import immer from 'immer'
import { getKey } from '../utils/uid'
import { keysToArray } from '../utils/transform'
import { KeygenResult } from '../@types/common'
import { TableProps, GetTreeExpandProps } from './Props'

const TREE_TABLE_DEFAULT_INDENT = 15

interface treeExpandState {
  expandKeys: Map<KeygenResult, boolean>
}

const defaultProps = {
  defaultTreeExpandKeys: [],
}
export default <DataItem, Value>(WrappedComponent: ComponentType<TableProps<DataItem, Value>>) =>
  class TreeExpand extends React.Component<GetTreeExpandProps<TableProps<DataItem, Value>, DataItem>, treeExpandState> {
    changedByExpand: boolean

    expandLevel: Map<KeygenResult, number>

    static defaultProps = defaultProps

    constructor(props: GetTreeExpandProps<TableProps<DataItem, Value>, DataItem>) {
      super(props)
      this.state = {
        expandKeys: TreeExpand.getMapFromArray(props.defaultTreeExpandKeys!),
      }

      this.handleTreeExpand = this.handleTreeExpand.bind(this)
    }

    componentDidUpdate() {
      this.changedByExpand = false
    }

    getTreeIndent() {
      const { columns } = this.props
      for (let i = 0; i < columns.length; i++) {
        if (typeof columns[i].treeIndent === 'number') return columns[i].treeIndent
      }
      return TREE_TABLE_DEFAULT_INDENT
    }

    getExpandKeys() {
      const { treeExpandKeys } = this.props
      if (!treeExpandKeys) return this.state.expandKeys
      return TreeExpand.getMapFromArray(treeExpandKeys)
    }

    static getMapFromArray(arr: KeygenResult[]) {
      return arr.reduce((map, key) => {
        map.set(key, true)
        return map
      }, new Map<KeygenResult, boolean>())
    }

    // getChildrenLength(children) {
    //   const { treeColumnsName, keygen } = this.props
    //   const { expandKeys } = this.state
    //   if (!children) return 0
    //   let { length = 0 } = children
    //   for (let i = 0; i < children.length; i++) {
    //     const child = children[i]
    //     const key = getKey(child, keygen)
    //     if (!expandKeys.get(key)) continue
    //     expandKeys.delete(key)
    //     if (child[treeColumnsName] && child[treeColumnsName].length) {
    //       length += this.getChildrenLength(child[treeColumnsName])
    //     }
    //   }
    //   return length
    // }

    getExpandData() {
      const { data, keygen, treeColumnsName } = this.props
      const expandKeys = this.getExpandKeys()
      this.expandLevel = new Map()
      if (expandKeys.size === 0) return data

      const storeExpandKeys = new Map()
      expandKeys.forEach((value, key) => storeExpandKeys.set(key, value))
      const cloneData = JSON.parse(JSON.stringify(data))
      return immer(cloneData, draft => {
        let dataCo = draft
        for (let i = 0; i < dataCo.length; i++) {
          if (storeExpandKeys.size === 0) break
          const item = dataCo[i] as DataItem
          const key = getKey(item, keygen, i)
          const parentLevel = this.expandLevel.get(key) || 0
          const children = (item[treeColumnsName!] as unknown) as DataItem[]
          if (storeExpandKeys.get(key) && children) {
            children.forEach(child => {
              this.expandLevel.set(getKey(child, keygen), parentLevel + 1)
            })
            draft.splice(i + 1, 0, ...(children as any))
            dataCo = draft
            storeExpandKeys.delete(key)
          }
        }
      })
    }

    handleTreeExpand(data: DataItem, index: number) {
      const { keygen, treeExpandKeys, onTreeExpand } = this.props
      const expandKeys = this.getExpandKeys()
      const key = getKey(data, keygen, index)
      const changedKeys = immer(expandKeys, draft => {
        // eslint-disable-next-line no-unused-expressions
        expandKeys.get(key) ? draft.delete(key) : draft.set(key, true)
      })
      if (treeExpandKeys && onTreeExpand) {
        onTreeExpand(keysToArray(changedKeys), data, !!expandKeys.get(key), index)
        return
      }
      this.changedByExpand = true
      this.setState({
        expandKeys: changedKeys,
      })
    }

    render() {
      const { treeColumnsName } = this.props
      const expandKeys = this.getExpandKeys()
      const data = this.getExpandData()
      const rootTree =
        data.filter(v => v && v[treeColumnsName!] && ((v[treeColumnsName!] as unknown) as DataItem[]).length).length ===
        0
      const treeIndent = this.getTreeIndent()
      return (
        <WrappedComponent
          {...(this.props as unknown) as TableProps<DataItem, Value>}
          changedByExpand={this.changedByExpand || this.props.changedByExpand}
          data={data}
          onTreeExpand={this.handleTreeExpand}
          treeExpandKeys={expandKeys}
          treeExpandLevel={this.expandLevel}
          treeRoot={rootTree}
          treeIndent={treeIndent!}
        />
      )
    }
  }
