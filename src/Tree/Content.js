import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { treeClass } from '../styles'

class Content extends PureComponent {
  render() {
    const {
      data, onClick, expanded, renderNode,
    } = this.props
    const hasChildren = data.children && data.children.length > 0

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
        <div className={treeClass('text')}>{renderNode(data)}</div>
      </div>
    )
  }
}

Content.propTypes = {
  data: PropTypes.object,
  expanded: PropTypes.bool,
  onClick: PropTypes.func,
  renderNode: PropTypes.func.isRequired,
}

export default Content
