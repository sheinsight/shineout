import React, { createElement } from 'react'
import classnames from 'classnames'
import { PureComponent } from '../component'
import { isFunc, isString } from '../utils/is'
import { treeClass } from './styles'
import Content from './Content'
import { getDirectionClass } from '../utils/classname'
import { NodeProps } from './Props'
import { KeygenResult, ObjectType } from '../@types/common'

const placeElement = document.createElement('div')
placeElement.className = treeClass('drag-place')
const innerPlaceElement = document.createElement('div')
placeElement.appendChild(innerPlaceElement)

const placeInfo: {
  start: KeygenResult
  target: KeygenResult
} = {
  start: '',
  target: '',
}

let isDragging = false

interface NodeState {
  active: boolean
  expanded: boolean
  fetching: boolean
}

class Node<DataItem, Value extends any[]> extends PureComponent<NodeProps<DataItem, Value>, NodeState> {
  element: HTMLDivElement

  dragImage: HTMLDivElement

  constructor(props: NodeProps<DataItem, Value>) {
    super(props)

    const { active, expanded } = props.bindNode(props.id, this.update.bind(this))
    this.state = { active, expanded, fetching: false }

    this.bindElement = this.bindElement.bind(this)
    this.handleToggle = this.handleToggle.bind(this)
    this.handleDragStart = this.handleDragStart.bind(this)
    this.handleDragOver = this.handleDragOver.bind(this)
    this.handleDragEnd = this.handleDragEnd.bind(this)
    this.setFetching = this.setFetching.bind(this)
    this.isLeaf = this.isLeaf.bind(this)
  }

  componentWillUnmount() {
    super.componentWillUnmount()
    this.props.unbindNode(this.props.id)
  }

  setFetching(fetching: boolean) {
    this.setState({ fetching })
  }

  update(key: keyof NodeState, value: boolean) {
    if (this.state[key] !== value) this.setState({ [key]: value })
  }

  bindElement(el: HTMLDivElement) {
    this.element = el
  }

  isLeaf() {
    const { childrenKey, data, loader } = this.props
    const { fetching } = this.state
    const children = (data[childrenKey] as unknown) as DataItem[]
    if (children && children.length > 0) return false
    if (Array.isArray(children) || children === null) return true

    if (fetching && !children) return false
    if (loader && !fetching) return false

    return true
  }

  handleToggle() {
    const { id, onToggle } = this.props
    // eslint-disable-next-line
    const expanded = !this.state.expanded
    this.setState({ expanded })
    if (onToggle) onToggle(id, expanded)
  }

  handleDragStart(event: React.DragEvent) {
    const { dragImageSelector, dragImageStyle, data } = this.props
    if (isDragging) return
    isDragging = true

    event.dataTransfer.effectAllowed = 'copyMove'
    event.dataTransfer.setData('text/plain', this.props.id as string)
    placeInfo.start = this.props.id
    const element = document.querySelector(dragImageSelector(data)!)

    const dragImage = element || (this.element.querySelector(`.${treeClass('content')}`) as HTMLDivElement)
    const rect = dragImage.getBoundingClientRect()
    this.dragImage = dragImage.cloneNode(true) as HTMLDivElement
    document.body.appendChild(this.dragImage)
    this.dragImage.style.position = 'absolute'
    this.dragImage.style.top = '-1000px'
    this.dragImage.style.left = '-1000px'
    this.dragImage.style.width = `${rect.width}px`
    this.dragImage.style.background = '#fff'
    this.dragImage.style.boxShadow = '0 0 5px 0 rgba(0, 0, 0, 0.1)'

    if (dragImageStyle) {
      Object.keys(dragImageStyle).forEach(k => {
        const styleKey = k as keyof typeof dragImageStyle
        ;(this.dragImage.style as ObjectType)[styleKey] = dragImageStyle[styleKey]
      })
    }

    event.dataTransfer.setDragImage(this.dragImage, event.clientX - rect.left, event.clientY - rect.top)

    setTimeout(() => {
      this.element.style.display = 'none'
    }, 0)
  }

  handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    if (!isDragging) return

    const { dragHoverExpand, datum, dragSibling } = this.props
    const startId = placeInfo.start
    const current = datum.getPath(startId)
    const target = datum.getPath(this.props.id)

    const currentPathStr = current.path.join('/')
    const targetPathStr = target.path.join('/')

    if (dragSibling && targetPathStr !== currentPathStr) return

    if (dragHoverExpand && !this.state.expanded) this.handleToggle()

    const hover = this.element
    const rect = hover.getBoundingClientRect()
    const clientHeight = (e.target as HTMLDivElement).getBoundingClientRect().height || 20
    const hoverMiddleY = (rect.bottom - rect.top) / 2
    const hoverClientY = e.clientY - rect.top

    let position = this.props.index
    innerPlaceElement.style.height = '0px'
    if (hoverClientY < hoverMiddleY + clientHeight * 0.2) {
      hover.parentNode!.insertBefore(placeElement, hover)
      if (hoverClientY > clientHeight * 0.3) {
        if (!dragSibling) {
          position = -1
          innerPlaceElement.style.height = `${rect.height}px`
        } else {
          position += 1
          hover.parentNode!.insertBefore(placeElement, hover.nextElementSibling)
        }
      }
    } else {
      position += 1
      hover.parentNode!.insertBefore(placeElement, hover.nextElementSibling)
    }
    placeInfo.target = this.props.id
    // @ts-ignore
    placeElement.setAttribute('data-position', position)
  }

  handleDragEnd() {
    this.element.style.display = ''
    if (!isDragging) return
    isDragging = false
    if (!placeElement.parentNode) return

    if (this.dragImage && this.dragImage.parentNode) this.dragImage.parentNode.removeChild(this.dragImage)
    const { id, index, onDrop } = this.props
    const position = parseInt(placeElement.getAttribute('data-position') || '', 10)
    const { target } = placeInfo

    placeElement.parentNode.removeChild(placeElement)
    if (onDrop && (target !== id || index !== position)) {
      onDrop(id, target, position)
    }
  }

  render() {
    const { data, listComponent, onDrop, childrenClass, leafClass, nodeClass, ...other } = this.props

    const children = (data[other.childrenKey] as unknown) as DataItem[]
    const hasChildren = children && children.length > 0
    const { expanded, fetching } = this.state

    const listProps = {
      ...other,
      data: children,
      expanded,
      onDrop,
      leafClass,
      childrenClass,
      nodeClass,
      childrenClassName: childrenClass(data),
    }

    const wrapProps = {}
    if (onDrop) {
      Object.assign(wrapProps, {
        draggable: true,
        onDragStart: this.handleDragStart,
        onDragEnd: this.handleDragEnd,
      })
    }

    // node className
    let nodeClassName = null
    if (isString(nodeClass)) {
      nodeClassName = nodeClass
    } else if (isFunc(nodeClass)) {
      nodeClassName = nodeClass(data)
    }

    return (
      <div
        {...wrapProps}
        ref={this.bindElement}
        className={classnames(treeClass(getDirectionClass('node')), this.isLeaf() && leafClass(data), nodeClassName)}
      >
        <Content
          {...other}
          active={this.state.active}
          data={data}
          expanded={expanded}
          onToggle={this.handleToggle}
          onDragOver={this.handleDragOver}
          setFetching={this.setFetching}
          fetching={fetching}
        />
        {hasChildren && createElement(listComponent, listProps)}
      </div>
    )
  }
}
export default Node
