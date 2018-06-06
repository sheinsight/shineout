import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { treeClass } from '../styles'
import Spin from '../Spin'
import Checkbox from './Checkbox'

class Content extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      fetching: false,
    }

    this.handleNodeClick = this.handleNodeClick.bind(this)
  }

  handleNodeClick() {
    const { data, id } = this.props
    this.props.onNodeClick(data, id)
  }

  /*
  handleIndicatorClick() {
    const {  }
  }
  */

  renderNode() {
    const {
      id, active, data, renderItem, expanded,
    } = this.props
    const render = typeof renderItem === 'function' ? renderItem : d => d[renderItem]
    return render(data, expanded, active === id)
  }

  renderIndicator() {
    const { data, onClick, expanded } = this.props

    if (data.children && data.children.length > 0) {
      return (
        <a
          href="javascript:;"
          onClick={onClick}
          className={treeClass(`icon-${expanded ? 'sub' : 'plus'}`)}
        >
          <span />
        </a>
      )
    }

    if (this.state.fetching) {
      return <Spin name="ring" size={14} />
    }

    return null
  }

  render() {
    const {
      data, onClick, onChange, expanded, draggable, onDragOver, onDrop, ...other
    } = this.props
    const hasChildren = data.children && data.children.length > 0

    console.log(data.id)
    return (
      <div onDragOver={onDragOver}>
        {
          hasChildren &&
          <a
            href="javascript:;"
            onClick={onClick}
            className={treeClass(`icon-${expanded ? 'sub' : 'plus'}`)}
          >
            <span />
          </a>
        }
        <div className={treeClass('content')}>
          {
            onChange &&
            <Checkbox {...other} onChange={onChange} />
          }
          <div className={treeClass('text')} onClick={this.handleNodeClick}>
            {this.renderNode()}
          </div>
        </div>
      </div>
    )
  }
}

Content.propTypes = {
  active: PropTypes.any,
  data: PropTypes.object,
  draggable: PropTypes.bool,
  expanded: PropTypes.bool,
  fetchData: PropTypes.func,
  id: PropTypes.string,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  onDragOver: PropTypes.func,
  onDrop: PropTypes.func,
  onNodeClick: PropTypes.func,
  renderItem: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
  ]).isRequired,
}

export default Content
