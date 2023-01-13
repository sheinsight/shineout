import React from 'react'
import classnames from 'classnames'
import { PureComponent } from '../component'
import { treeClass } from './styles'
import Spin from '../Spin'
import Checkbox from './Checkbox'
import { CHANGE_TOPIC } from '../Datum/types'
import { ContentProps } from './Props'
import { ValueItem } from '../@types/common'

const loading = (
  <span className={treeClass('icon-loading')}>
    <Spin name="ring" size={12} />
  </span>
)

class Content<DataItem, Value extends any[]> extends PureComponent<ContentProps<DataItem, Value>> {
  constructor(props: ContentProps<DataItem, Value>) {
    super(props)

    this.handleNodeClick = this.handleNodeClick.bind(this)
    this.handleNodeExpand = this.handleNodeExpand.bind(this)
    this.handleIndicatorClick = this.handleIndicatorClick.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
  }

  componentDidMount() {
    super.componentDidMount()
    const { datum } = this.props
    datum.subscribe(CHANGE_TOPIC, this.handleUpdate)
  }

  componentWillUnmount() {
    super.componentWillUnmount()
    const { datum } = this.props
    datum.unsubscribe(CHANGE_TOPIC, this.handleUpdate)
  }

  handleNodeClick() {
    const { data, id, parentClickExpand, childrenKey } = this.props
    const children = (data[childrenKey] as unknown) as DataItem[]
    const hasChildren = children && children.length > 0
    if (hasChildren && parentClickExpand) {
      this.handleIndicatorClick()
    } else {
      this.props.onNodeClick(data, id)
    }
  }

  handleUpdate() {
    this.forceUpdate()
  }

  handleNodeExpand() {
    const { data, childrenKey, doubleClickExpand } = this.props
    if (!doubleClickExpand) return
    const children = (data[childrenKey] as unknown) as DataItem[]
    const hasChildren = children && children.length > 0
    if (hasChildren) this.handleIndicatorClick()
  }

  handleIndicatorClick() {
    const { id, data, onToggle, loader, childrenKey, setFetching } = this.props

    onToggle()

    if (data[childrenKey] !== undefined) return

    setFetching(true)
    if (loader) loader(id as ValueItem<Value>, data)
  }

  renderNode() {
    const { id, active, data, renderItem, expanded } = this.props
    const render = typeof renderItem === 'function' ? renderItem : (d: DataItem) => d[renderItem]
    return render(data, expanded, active, id)
  }

  renderIndicator() {
    const { data, expanded, expandIcons, loader, childrenKey, fetching, iconClass } = this.props
    const children = (data[childrenKey] as unknown) as DataItem[]
    // @ts-ignore
    const icon = expandIcons ? expandIcons[expanded + 0] : <span className={treeClass('default-icon')} />
    const indicator = (
      <a
        onClick={this.handleIndicatorClick}
        className={classnames(treeClass(`icon-${expanded ? 'sub' : 'plus'}`), iconClass)}
      >
        {typeof icon === 'function' ? icon(data) : icon}
      </a>
    )

    if (children && children.length > 0) return indicator
    if (Array.isArray(children) || children === null) return null

    if (fetching && !children) return loading
    if (loader && !fetching) return indicator

    return null
  }

  render() {
    const { data, onToggle, onChange, expanded, onDragOver, ...other } = this.props

    return (
      <div onDragOver={onDragOver}>
        {this.renderIndicator()}
        <div className={treeClass('content')}>
          {onChange && <Checkbox {...other} onChange={onChange} />}
          <div className={treeClass('text')} onClick={this.handleNodeClick} onDoubleClick={this.handleNodeExpand}>
            {this.renderNode()}
          </div>
        </div>
      </div>
    )
  }
}

export default Content
