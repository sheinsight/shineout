import React, { PureComponent, createElement } from 'react'
import PropTypes from 'prop-types'
import { getProps } from '../utils/proptypes'
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
    this.state = { active, expanded }

    this.bindElement = this.bindElement.bind(this)
    this.handleToggle = this.handleToggle.bind(this)
    this.handleDragStart = this.handleDragStart.bind(this)
    this.handleDragOver = this.handleDragOver.bind(this)
    this.handleDragEnd = this.handleDragEnd.bind(this)
  }

  componentWillUnmount() {
    this.props.unbindNode(this.props.id)
  }

  update(key, value) {
    if (this.state[key] !== value) this.setState({ [key]: value })
  }

  bindElement(el) {
    this.element = el
  }

  handleToggle() {
    const { id, onToggle } = this.props
    const expanded = !this.state.expanded
    this.setState({ expanded })
    if (onToggle) onToggle(id, expanded)
  }

  handleDragStart(event) {
    if (isDragging) return
    isDragging = true

    event.dataTransfer.effectAllowed = 'copyMove'
    event.dataTransfer.setData('text/plain', this.props.id)

    const dragImage = this.element.querySelector(`.${treeClass('content')}`)
    const rect = dragImage.getBoundingClientRect()
    this.dragImage = dragImage.cloneNode(true)
    document.body.appendChild(this.dragImage)
    this.dragImage.style.position = 'absolute'
    this.dragImage.style.top = '-1000px'
    this.dragImage.style.left = '-1000px'
    this.dragImage.style.width = `${rect.width}px`
    this.dragImage.style.background = '#fff'
    this.dragImage.style.boxShadow = '0 0 5px 0 rgba(0, 0, 0, 0.1)'

    event.dataTransfer.setDragImage(
      this.dragImage,
      event.clientX - rect.left,
      event.clientY - rect.top,
    )

    setTimeout(() => {
      this.element.style.display = 'none'
    }, 0)
  }

  handleDragOver(e) {
    if (!isDragging) return

    const hover = this.element
    const rect = hover.getBoundingClientRect()

    const hoverMiddleY = (rect.bottom - rect.top) / 2
    const hoverClientY = e.clientY - rect.top

    let position = this.props.index
    innerPlaceElement.style.height = '0px'
    if (hoverClientY < hoverMiddleY + 4) {
      hover.parentNode.insertBefore(placeElement, hover)
      if (hoverClientY > 6) {
        position = -1
        innerPlaceElement.style.height = `${rect.height}px`
      }
    } else {
      position += 1
      hover.parentNode.insertBefore(placeElement, hover.nextElementSibling)
    }

    placeElement.setAttribute('data-target', this.props.id)
    placeElement.setAttribute('data-position', position)
  }

  handleDragEnd() {
    if (!isDragging || !placeElement.parentNode) return
    isDragging = false

    document.body.removeChild(this.dragImage)

    const { id, index, onDrop } = this.props
    const position = parseInt(placeElement.getAttribute('data-position'), 10)
    const target = placeElement.getAttribute('data-target')

    placeElement.parentNode.removeChild(placeElement)

    this.element.style.display = ''
    if (target !== id || index !== position) {
      onDrop(id, target, position)
    }
  }

  render() {
    const {
      data, expandedMap, listComponent, onDrop, ...other
    } = this.props

    const hasChildren = data.children && data.children.length > 0
    const { expanded } = this.state

    const listProps = {
      ...other,
      data: data.children,
      expanded,
      expandedMap,
      onDrop,
    }

    const wrapProps = {}
    if (onDrop) {
      Object.assign(wrapProps, {
        draggable: true,
        onDragStart: this.handleDragStart,
        onDragEnd: this.handleDragEnd,
      })
    }

    return (
      <div {...wrapProps} ref={this.bindElement} className={treeClass('node')}>
        <Content
          {...other}
          active={this.state.active}
          data={data}
          expanded={expanded}
          onToggle={this.handleToggle}
          onDragOver={this.handleDragOver}
        />
        { hasChildren && createElement(listComponent, listProps) }
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
  keygen: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]).isRequired,
  onDrop: PropTypes.func,
}

export default Node
