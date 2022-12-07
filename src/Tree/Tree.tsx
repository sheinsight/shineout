import React from 'react'
import immer from 'immer'
import { PureComponent } from '../component'
import DatumTree, { TreeModeType } from '../Datum/Tree'
import Root from './Root'
import { TreeProps, UpdateFunc } from './Props'
import { keyType } from '../@types/common'

interface TreeState {
  active: null | keyType
}

const DefaultProps = {
  data: [],
  defaultExpanded: [],
  defaultValue: [],
  mode: 0 as TreeModeType,
  dataUpdate: true,
  childrenKey: 'children',
  dragImageStyle: {},
}

class Tree<DataItem, Value extends any[]> extends PureComponent<TreeProps<DataItem, Value>, TreeState> {
  handleDragImageSelector: () => string | undefined

  handleClidrenClass: () => string | undefined

  handleLeafClass: () => string | undefined

  nodes: Map<keyType, UpdateFunc>

  datum: DatumTree<DataItem, Value>

  static defaultProps = DefaultProps as any

  constructor(props: TreeProps<DataItem, Value>) {
    super(props)

    this.state = { active: null }

    this.nodes = new Map()
    this.datum =
      props.datum ||
      new DatumTree({
        data: props.data,
        loader: props.loader,
        keygen: props.keygen,
        mode: props.mode,
        onChange: props.onChange,
        value: props.value || props.defaultValue,
        disabled: typeof props.disabled === 'function' ? props.disabled : undefined,
        childrenKey: props.childrenKey || DefaultProps.childrenKey,
        unmatch: props.unmatch,
      })
    this.handleDrop = this.handleDrop.bind(this)
    this.handleToggle = this.handleToggle.bind(this)
    this.handleNodeClick = this.handleNodeClick.bind(this)
    this.bindNode = this.bindNode.bind(this)
    this.unbindNode = this.unbindNode.bind(this)
    this.handleDragImageSelector = this.handleProps.bind(this, 'dragImageSelector')
    this.handleClidrenClass = this.handleProps.bind(this, 'childrenClass')
    this.handleLeafClass = this.handleProps.bind(this, 'leafClass')
    this.bindDatum()
  }

  componentDidUpdate(prevProps: TreeProps<DataItem, Value>) {
    if (prevProps.expanded !== this.props.expanded) {
      this.handleExpanded(this.props.expanded)
    }
    if (prevProps.active !== this.props.active) {
      this.handleActive(this.props.active)
    }

    if (this.props.onChange || this.props.onDrop || this.props.radioUpdate) {
      this.datum.mode = this.props.mode
      if (prevProps.value !== this.props.value) this.datum.setValue(this.props.value || ([] as any))
      if (prevProps.data !== this.props.data && this.props.dataUpdate) this.datum.setData(this.props.data)
    }
  }

  getActive() {
    const { active } = this.props
    return active === undefined ? this.state.active : active
  }

  bindDatum() {
    const { bindDatum } = this.props
    if (bindDatum) bindDatum(this.datum)
  }

  bindNode(id: keyType, update: UpdateFunc) {
    /*
    if (this.nodes.has(id)) {
      console.error(`Node with '${id}' key has already been added. Tree node's key must be unique.`)
      return {}
    }
    */
    this.nodes.set(id, update)

    const active = this.props.active === id
    const expanded = this.props.expanded || this.props.defaultExpanded
    if (this.props.defaultExpandAll) {
      return { active, expanded: true }
    }

    return { active, expanded: !!(expanded && expanded.indexOf(id) >= 0) }
  }

  unbindNode(id: keyType) {
    this.nodes.delete(id)
  }

  handleExpanded(expanded?: keyType[]) {
    const temp = new Set(expanded)
    for (const [id, update] of this.nodes) {
      update('expanded', temp.has(id))
    }
  }

  handleActive(active?: keyType) {
    for (const [id, update] of this.nodes) {
      update('active', id === active)
    }
  }

  handleNodeClick(node: DataItem, id: keyType) {
    const { active, onClick } = this.props
    if (active === undefined) {
      this.setState({ active: id }, () => {
        this.handleActive(id)
      })
    }
    if (onClick) {
      onClick(node, id, this.datum.getPath(id))
    }
  }

  handleToggle(id: keyType) {
    const { expanded, onExpand } = this.props
    let newExpanded

    if (!expanded && onExpand) {
      onExpand([id])
      return
    }
    const expandedArr = expanded!
    if (expandedArr.indexOf(id) >= 0) {
      newExpanded = expandedArr.filter(e => e !== id)
    } else {
      newExpanded = [...expandedArr, id]
    }
    if (onExpand) onExpand(newExpanded)
  }

  handleDrop(id: keyType, targetId: keyType, position: number) {
    const { childrenKey } = this.props
    const current = this.datum.getPath(id)
    const target = this.datum.getPath(targetId)
    const data = immer(this.props.data, draft => {
      let node: any = draft
      let temp: DataItem[]
      let removeNode: () => void
      let offset = 0
      current.indexPath.forEach((p, i) => {
        if (i < current.indexPath.length - 1) {
          node = (node[p][childrenKey!] as unknown) as DataItem[]
        } else {
          temp = node
          removeNode = () => temp.splice(p, 1)[0]
          node = node[p]
        }
      })

      let tnode: any = draft
      target.indexPath.forEach((p, i) => {
        if (i < target.indexPath.length - 1) {
          tnode = tnode[p][childrenKey]
        } else if (tnode === temp) {
          // same parent
          removeNode()
          if (current.index <= target.index) {
            offset = -1
          }
          removeNode = () => {}
        }
      })

      if (position === -1) {
        tnode = tnode[target.index + offset]
        if (!Array.isArray(tnode[childrenKey])) tnode[childrenKey] = []
        tnode[childrenKey].push(node)
        position = tnode[childrenKey].length - 1
        const update = this.nodes.get(targetId)
        if (update) update('expanded', true)
      } else {
        tnode.splice(position + offset, 0, node)
        targetId = target.path[target.path.length - 1]
      }

      // @ts-ignore
      removeNode()
    })
    if (this.props.onDrop) {
      this.props.onDrop(data, id, targetId, position)
    }
  }

  handleProps(key: 'dragImageSelector' | 'childrenClass' | 'leafClass') {
    return this.props[key]
  }

  render() {
    const {
      className,
      style,
      data,
      disabled,
      line,
      keygen,
      onExpand,
      onChange,
      renderItem,
      mode = DefaultProps.mode,
      onDrop,
      loader,
      parentClickExpand,
      childrenKey,
      expandIcons,
      dragImageStyle = DefaultProps.dragImageStyle,
      dragImageSelector,
      childrenClass,
      leafClass,
      dragHoverExpand,
      doubleClickExpand,
      iconClass,
      nodeClass,
      dragSibling,
    } = this.props
    const onToggle = onExpand ? this.handleToggle : undefined

    return (
      <Root
        className={className}
        data={data}
        datum={this.datum}
        disabled={typeof disabled !== 'function' && !!disabled}
        bindNode={this.bindNode}
        keygen={keygen}
        line={line}
        loader={loader}
        mode={mode}
        unbindNode={this.unbindNode}
        onChange={onChange}
        onDrop={onDrop && this.handleDrop}
        onToggle={onToggle}
        onNodeClick={this.handleNodeClick}
        renderItem={renderItem}
        style={style}
        parentClickExpand={parentClickExpand}
        childrenKey={childrenKey!}
        expandIcons={expandIcons}
        dragImageStyle={dragImageStyle}
        dragImageSelector={typeof dragImageSelector === 'function' ? dragImageSelector : this.handleDragImageSelector}
        childrenClass={typeof childrenClass === 'function' ? childrenClass : this.handleClidrenClass}
        leafClass={typeof leafClass === 'function' ? leafClass : this.handleLeafClass}
        dragHoverExpand={dragHoverExpand}
        doubleClickExpand={doubleClickExpand}
        iconClass={iconClass}
        nodeClass={nodeClass}
        dragSibling={dragSibling}
      />
    )
  }
}

export default Tree
