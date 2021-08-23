import React, { createElement } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { PureComponent } from '../component'
import { getProps } from '../utils/proptypes'
import { isFunc, isString } from '../utils/is'
import { treeClass } from '../styles'
import Content from './Content'

const placeElement = document.createElement('div')
placeElement.className = treeClass('drag-place')
const innerPlaceElement = document.createElement('div')
placeElement.appendChild(innerPlaceElement)

let isDragging = false

class Node extends PureComponent {
  constructor(props) {
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

  setFetching(fetching) {
    this.setState({ fetching })
  }

  update(key, value) {
    if (this.state[key] !== value) this.setState({ [key]: value })
  }

  bindElement(el) {
    this.element = el
  }

  isLeaf() {
    const { childrenKey, data, loader } = this.props
    const { fetching } = this.state
    const children = data[childrenKey]
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

  handleDragStart(event) {
    const { dragImageSelector, dragImageStyle, data, index } = this.props
    if (isDragging) return
    isDragging = true

    event.dataTransfer.effectAllowed = 'copyMove'
    event.dataTransfer.setData('text/plain', this.props.id)
    placeElement.setAttribute('data-start', this.props.id)
    placeElement.setAttribute('data-start-index', index)
    const element = document.querySelector(dragImageSelector(data))

    const dragImage = element || this.element.querySelector(`.${treeClass('content')}`)
    const rect = dragImage.getBoundingClientRect()
    this.dragImage = dragImage.cloneNode(true)
    document.body.appendChild(this.dragImage)
    this.dragImage.style.position = 'absolute'
    this.dragImage.style.top = '-1000px'
    this.dragImage.style.left = '-1000px'
    this.dragImage.style.width = `${rect.width}px`
    this.dragImage.style.background = '#fff'
    this.dragImage.style.boxShadow = '0 0 5px 0 rgba(0, 0, 0, 0.1)'

    if (dragImageStyle) {
      Object.keys(dragImageStyle).forEach(k => {
        this.dragImage.style[k] = dragImageStyle[k]
      })
    }

    event.dataTransfer.setDragImage(this.dragImage, event.clientX - rect.left, event.clientY - rect.top)

    setTimeout(() => {
      this.element.style.display = 'none'
    }, 0)
  }

  handleDragOver(e) {
    if (!isDragging) return

    const { dragHoverExpand, datum, dragSibling, index } = this.props
    const startId = placeElement.getAttribute('data-start')
    const startIndex = parseInt(placeElement.getAttribute('data-start-index'), 10)
    const current = datum.getPath(startId)
    const target = datum.getPath(this.props.id)

    const currentPathStr = current.path.join('/')
    const targetPathStr = target.path.join('/')

    if (dragSibling && targetPathStr !== currentPathStr) return

    if (dragHoverExpand && !this.state.expanded) this.handleToggle()

    const hover = this.element
    const rect = hover.getBoundingClientRect()
    const clientHeight = e.target.getBoundingClientRect().height || 20
    const hoverMiddleY = (rect.bottom - rect.top) / 2
    const hoverClientY = e.clientY - rect.top

    let position = this.props.index
    innerPlaceElement.style.height = '0px'
    if (hoverClientY < hoverMiddleY + clientHeight * 0.2) {
      hover.parentNode.insertBefore(placeElement, hover)
      if (hoverClientY > clientHeight * 0.3) {
        if (!dragSibling) {
          position = -1
          innerPlaceElement.style.height = `${rect.height}px`
        } else {
          position += 1
          hover.parentNode.insertBefore(placeElement, hover.nextElementSibling)
        }
      }
    } else {
      position += 1
      hover.parentNode.insertBefore(placeElement, hover.nextElementSibling)
    }
    position += startIndex <= index ? -1 : 0
    placeElement.setAttribute('data-target', this.props.id)
    placeElement.setAttribute('data-position', position)
  }

  handleDragEnd() {
    this.element.style.display = ''
    if (!isDragging) return
    isDragging = false
    if (!placeElement.parentNode) return

    document.body.removeChild(this.dragImage)

    const { id, index, onDrop } = this.props
    const position = parseInt(placeElement.getAttribute('data-position'), 10)
    const target = placeElement.getAttribute('data-target')

    placeElement.parentNode.removeChild(placeElement)

    if (target !== id || index !== position) {
      onDrop(id, target, position)
    }
  }

  render() {
    const { data, expandedMap, listComponent, onDrop, childrenClass, leafClass, nodeClass, ...other } = this.props

    const children = data[other.childrenKey]
    const hasChildren = children && children.length > 0
    const { expanded, fetching } = this.state

    const listProps = {
      ...other,
      data: children,
      expanded,
      expandedMap,
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
        className={classnames(treeClass('node'), this.isLeaf() && leafClass(data), nodeClassName)}
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

Node.propTypes = {
  ...getProps(PropTypes),
  bindNode: PropTypes.func.isRequired,
  unbindNode: PropTypes.func.isRequired,
  data: PropTypes.object,
  index: PropTypes.number,
  listComponent: PropTypes.func,
  keygen: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
  onDrop: PropTypes.func,
  nodeClass: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  handleDragoverAble: PropTypes.func,
  dragSibling: PropTypes.bool,
}

export default Node
