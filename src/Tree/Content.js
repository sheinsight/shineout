import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { treeClass } from '../styles'

class Content extends PureComponent {
  constructor(props) {
    super(props)
    this.handleNodeClick = this.handleNodeClick.bind(this)
  }

  handleNodeClick() {
    const { data, id } = this.props
    this.props.onNodeClick(data, id)
  }

  renderNode() {
    const {
      id, active, data, renderItem, expanded,
    } = this.props
    const render = typeof renderItem === 'function' ? renderItem : d => d[renderItem]
    return render(data, expanded, active === id)
  }

  render() {
    const { data, onClick, expanded } = this.props
    const hasChildren = data.children && data.children.length > 0

    console.log(data.id)
    return (
      <div>
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
        <div onClick={this.handleNodeClick} className={treeClass('content')}>
          {this.renderNode()}
        </div>
      </div>
    )
  }
}

Content.propTypes = {
  active: PropTypes.any,
  data: PropTypes.object,
  expanded: PropTypes.bool,
  id: PropTypes.string,
  onClick: PropTypes.func,
  onNodeClick: PropTypes.func,
  renderItem: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
  ]).isRequired,
}

export default Content
