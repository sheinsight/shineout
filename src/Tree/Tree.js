import React from 'react'
import PropTypes from 'prop-types'
import immer from 'immer'
import { PureComponent } from '../component'
import { getProps } from '../utils/proptypes'
import DatumTree from '../Datum/Tree'
import Root from './Root'

class Tree extends PureComponent {
  constructor(props) {
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
        childrenKey: props.childrenKey,
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
  }

  componentDidUpdate(prevProps) {
    if (prevProps.expanded !== this.props.expanded) {
      this.handleExpanded(this.props.expanded)
    }
    if (prevProps.active !== this.props.active) {
      this.handleActive(this.props.active)
    }

    if (this.props.onChange || this.props.onDrop || this.props.radioUpdate) {
      this.datum.mode = this.props.mode
      if (prevProps.value !== this.props.value) this.datum.setValue(this.props.value || [])
      if (prevProps.data !== this.props.data && this.props.dataUpdate) this.datum.setData(this.props.data)
    }
  }

  getActive() {
    const { active } = this.props
    return active === undefined ? this.state.active : active
  }

  bindNode(id, update) {
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

    return { active, expanded: expanded && expanded.indexOf(id) >= 0 }
  }

  unbindNode(id) {
    this.nodes.delete(id)
  }

  handleExpanded(expanded) {
    const temp = new Set(expanded)
    for (const [id, update] of this.nodes) {
      update('expanded', temp.has(id))
    }
  }

  handleActive(active) {
    for (const [id, update] of this.nodes) {
      update('active', id === active)
    }
  }

  handleNodeClick(node, id) {
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

  handleToggle(id) {
    const { expanded, onExpand } = this.props
    let newExpanded

    if (!expanded && onExpand) {
      onExpand([id])
      return
    }

    if (expanded.indexOf(id) >= 0) {
      newExpanded = expanded.filter(e => e !== id)
    } else {
      newExpanded = [...expanded, id]
    }
    if (onExpand) onExpand(newExpanded)
  }

  handleDrop(id, targetId, position) {
    const { childrenKey } = this.props
    const current = this.datum.getPath(id)
    const target = this.datum.getPath(targetId)
    const data = immer(this.props.data, draft => {
      let node = draft
      let temp
      let removeNode
      current.indexPath.forEach((p, i) => {
        if (i < current.indexPath.length - 1) {
          node = node[p][childrenKey]
        } else {
          temp = node
          removeNode = () => temp.splice(p, 1)[0]
          node = node[p]
        }
      })

      let tnode = draft
      target.indexPath.forEach((p, i) => {
        if (i < target.indexPath.length - 1) {
          tnode = tnode[p][childrenKey]
        } else if (tnode === temp) {
          // same parent
          removeNode()
          removeNode = () => {}
        }
      })

      if (position === -1) {
        tnode = tnode[target.index]
        if (!Array.isArray(tnode[childrenKey])) tnode[childrenKey] = []
        tnode[childrenKey].push(node)
        position = tnode[childrenKey].length - 1
        const update = this.nodes.get(targetId)
        if (update) update('expanded', true)
      } else {
        tnode.splice(position, 0, node)
        targetId = target.path[target.path.length - 1]
      }

      removeNode()
    })
    this.props.onDrop(data, id, targetId, position)
  }

  handleProps(key) {
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
      mode,
      onDrop,
      loader,
      parentClickExpand,
      childrenKey,
      expandIcons,
      dragImageStyle,
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
        disabled={typeof disabled !== 'function' && disabled}
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
        childrenKey={childrenKey}
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

Tree.propTypes = {
  ...getProps(PropTypes),
  active: PropTypes.any,
  data: PropTypes.array,
  defaultExpanded: PropTypes.arrayOf(PropTypes.string),
  defaultValue: PropTypes.arrayOf(PropTypes.string),
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  expanded: PropTypes.arrayOf(PropTypes.string),
  line: PropTypes.bool,
  loader: PropTypes.func,
  mode: PropTypes.oneOf([0, 1, 2, 3, 4]),
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  onExpand: PropTypes.func,
  onDrop: PropTypes.func,
  value: PropTypes.array,
  datum: PropTypes.object,
  parentClickExpand: PropTypes.bool,
  defaultExpandAll: PropTypes.bool,
  dataUpdate: PropTypes.bool,
  childrenKey: PropTypes.string,
  expandIcons: PropTypes.array,
  dragImageStyle: PropTypes.object,
  radioUpdate: PropTypes.bool,
  doubleClickExpand: PropTypes.bool,
  dragSibling: PropTypes.bool,
  nodeClass: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  unmatch: PropTypes.bool,
}

Tree.defaultProps = {
  data: [],
  defaultExpanded: [],
  defaultValue: [],
  mode: 0,
  dataUpdate: true,
  childrenKey: 'children',
  dragImageStyle: {},
}

export default Tree
